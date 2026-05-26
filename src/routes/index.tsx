import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import Blog from "../pages/Blog";
import Article from "../pages/Article";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,

    children: [
      { index: true, element: <Blog /> },
      { path: "blog", element: <Blog /> },
      { path: "article/:slug", element: <Article /> },
      { path: "article/:lang/:slug", element: <Article /> },
    ],
  },
]);
