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
  useDeskproLatestAppContext
} from "@deskpro/app-sdk";
import { useLogOut, useUnlinkTask } from './hooks';
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
  AdminCallbackPage,
  LogInPage
} from "./pages";
import type { FC } from "react";
import type { EventPayload, Settings } from './types';

const App: FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { client } = useDeskproAppClient();
  const { unlinkTask, isLoading: isLoadingUnlink } = useUnlinkTask();
  const { context } = useDeskproLatestAppContext<unknown, Settings>();
  const { logOut } = useLogOut();

  const isAdmin = useMemo(() => pathname.includes("/admin/"), [pathname]);
  const isLoading = [isLoadingUnlink].some((isLoading) => isLoading);
  const isUsingOAuth2 = context?.settings?.use_access_token !== true;

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
      .with('logOut', () => {
        if (isUsingOAuth2) {
          logOut();
        };
      })
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
        <Route path='/admin/callback' element={<AdminCallbackPage />} />
        <Route path='/log_in' element={<LogInPage />} />
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
