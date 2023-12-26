// index.css 파일을 import하여 전역 스타일을 적용합니다.
import "./index.css";

// react-query에서 제공하는 QueryClient 및 QueryClientProvider를 import합니다.
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// ReactDOM을 import합니다.
import ReactDOM from "react-dom/client";

// App 컴포넌트를 import합니다.
import App from "./App";

// QueryClient 인스턴스를 생성합니다.
const queryClient = new QueryClient();

// ReactDOM.createRoot를 사용하여 루트 DOM 요소에 App 컴포넌트를 렌더링합니다.
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // QueryClientProvider를 사용하여 App 컴포넌트를 감싸고, QueryClient를 제공합니다.
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>,
);
