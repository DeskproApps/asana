import { useMemo } from "react";
import get from "lodash/get";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
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
  CreateTaskCommentPage,
} from "./pages";
import type { FC } from "react";
import type { EventPayload } from "./types";

const App: FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { client } = useDeskproAppClient();
  const { unlinkTask, isLoading: isLoadingUnlink } = useUnlinkTask();

  const isAdmin = useMemo(() => pathname.includes("/admin/"), [pathname]);
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
      .with("unlink", () => unlinkTask(get(payload, ["task"])))
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
        <Route path="/view/:taskId/comments/new" element={<CreateTaskCommentPage/>} />
        <Route index element={<LoadingAppPage/>} />
      </Routes>
      {!isAdmin && (<><br/><br/><br/></>)}
    </>
  );
}

export { App };
