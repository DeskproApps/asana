import { useState, useCallback } from "react";
import map from "lodash/map";
import get from "lodash/get";
import size from "lodash/size";
import { useParams, useNavigate } from "react-router-dom";
import { delay } from "../../utils";
import { useSetTitle, useAsyncError } from "../../hooks";
import {
  createTaskCommentService,
  uploadTaskAttachmentService,
} from "../../services/asana";
import { queryClient } from "../../query";
import { CreateTaskComment } from "../../components";
import {
  getValues,
  getAttachments,
  getAttachFormData,
} from "../../components/TaskCommentForm";
import {
  useDeskproElements,
  useDeskproAppClient,
} from "@deskpro/app-sdk";
import type { FC } from "react";
import type { Maybe } from "../../types";
import type { FormValidationSchema } from "../../components/TaskCommentForm";

const CreateTaskCommentPage: FC = () => {
  const navigate = useNavigate();
  const { taskId } = useParams();
  const { client } = useDeskproAppClient();
  const { asyncErrorHandler } = useAsyncError();
  const [error, setError] = useState<Maybe<string|string[]>>(null);

  const onCancel = useCallback(() => {
    navigate(`/view/${taskId}`);
  }, [navigate, taskId]);

  const onSubmit = useCallback((data: FormValidationSchema) => {
    if (!client || !taskId) {
      return Promise.resolve();
    }

    const values = getValues(data);
    const attachments = getAttachments(data);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const promises: Array<Promise<any>> = [];

    if (values.text) {
      promises.push(createTaskCommentService(client, taskId, values));
    }

    if (size(attachments)) {
      promises.concat(attachments.map(({ file }) => {
        return uploadTaskAttachmentService(client, getAttachFormData(taskId, file));
      }));
    }

    setError(null);

    return Promise.all(promises)
      .then(() => queryClient.invalidateQueries())
      .then(() => delay(2000))
      .then(() => navigate(`/view/${taskId}`))
      .catch((err) => {
        const errors = map(get(err, ["data", "errors"]), "message").filter(Boolean);

        if (size(errors)) {
          setError(errors);
        } else {
          asyncErrorHandler(err);
        }
      })
  }, [client, taskId, navigate, asyncErrorHandler]);

  useSetTitle("Comment");

  useDeskproElements(({ clearElements, registerElement }) => {
    clearElements();

    registerElement("refresh", { type: "refresh_button" });
    registerElement("home", {
      type: "home_button",
      payload: { type: "changePage", path: "/home" },
    });
  });

  return (
    <CreateTaskComment
      error={error}
      onCancel={onCancel}
      onSubmit={onSubmit}
    />
  );
};

export { CreateTaskCommentPage };
