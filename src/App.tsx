import "./index.css";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

// 각 페이지 컴포넌트를 import
import Layout from "./layout/Layout";
import CelebrityPage from "./pages/celebrity/CelebrityPage";
import ContactPage from "./pages/contact/ContactPage";
import ContentCreate from "./pages/contentCreate/ContentCreate";
import EventPage from "./pages/event/EventPage";
import LoginPage from "./pages/login/LoginPage";
import MainPage from "./pages/main/MainPage";
import PartyPage from "./pages/party/PartyPage";
import SearchPage from "./pages/search/SearchPage";
import StudyPage from "./pages/study/StudyPage";
import SystemPage from "./pages/system/SystemPage";
import TeamPage from "./pages/team/TeamPage";
import TeamDetailPage from "./pages/teamDetailPage/TeamDetailPage";
import Paths from "./types/paths";

// React Router의 BrowserRouter와 관련된 요소들을 사용하여 라우터 설정
const router = createBrowserRouter(
  createRoutesFromElements(
    // Layout 컴포넌트가 감싸는 최상위 라우트
    <Route element={<Layout />}>
      {/* 각 경로에 대한 페이지 컴포넌트 설정 */}
      <Route path="*" element={<MainPage />} />
      <Route path={Paths.Main} element={<MainPage />} />
      <Route path={Paths.Teams} element={<TeamPage />} />
      <Route path={Paths.Celebrities} element={<CelebrityPage />} />
      <Route path={Paths.Systems} element={<SystemPage />} />
      <Route path={Paths.TeamDetail + ":id"} element={<TeamDetailPage />} />
      <Route path={Paths.Contact} element={<ContactPage />} />
      <Route path={Paths.Search} element={<SearchPage />} />
      <Route path={Paths.Login} element={<LoginPage />} />
      <Route path={Paths.ContentCreate} element={<ContentCreate />} />
      <Route path={Paths.Event} element={<EventPage />} />
      <Route path={Paths.Party} element={<PartyPage />} />
      <Route path={Paths.Study} element={<StudyPage />} />
    </Route>,
  ),
);

// React Router의 RouterProvider를 사용하여 앱 전체에 라우터를 적용
function App() {
  return (
    <div className="layout">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
