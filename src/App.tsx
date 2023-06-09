import get from "lodash/get";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useDebouncedCallback } from "use-debounce";
import { match } from "ts-pattern";
import {
  LoadingSpinner,
  useDeskproElements,
  useDeskproAppClient,
  useDeskproAppEvents,
} from "@deskpro/app-sdk";
import { useUnlinkTask } from "./hooks";
import { isNavigatePayload } from "./utils";
import {
  HomePage,
  LinkPage,
  ViewTaskPage,
  EditTaskPage,
  VerifySettings,
  LoadingAppPage,
  CreateTaskPage,
} from "./pages";
import type { FC } from "react";
import type { EventPayload } from "./types";

const App: FC = () => {
  const navigate = useNavigate();
  const { client } = useDeskproAppClient();
  const { unlinkTask, isLoading: isLoadingUnlink } = useUnlinkTask();

  const isLoading = [isLoadingUnlink].some((isLoading) => isLoading);

  useDeskproElements(({ registerElement }) => {
    registerElement("refresh", { type: "refresh_button" });
  });

  const debounceElementEvent = useDebouncedCallback((_, __, payload: EventPayload) => {
    match(payload.type)
      .with("changePage", () => {
        if (isNavigatePayload(payload)) {
          navigate(payload.path);
        }
      })
      .with("unlink", () => unlinkTask(get(payload, ["taskId"])))
      .run();
  }, 500);

  useDeskproAppEvents({
    onShow: () => {
      client && setTimeout(() => client.resize(), 200);
    },
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    onElementEvent: debounceElementEvent,
  }, [client]);

  if (!client || isLoading) {
    return (
      <LoadingSpinner/>
    );
  }

  return (
    <>
      <Routes>
        <Route path="/admin/verify_settings" element={<VerifySettings/>} />
        <Route path="/link" element={<LinkPage/>} />
        <Route path="/home" element={<HomePage/>} />
        <Route path="/create" element={<CreateTaskPage/>} />
        <Route path="/view/:taskId" element={<ViewTaskPage/>} />
        <Route path="/edit/:taskId" element={<EditTaskPage/>} />
        <Route index element={<LoadingAppPage/>} />
      </Routes>
      <br/><br/><br/>
    </>
  );
}

export { App };
