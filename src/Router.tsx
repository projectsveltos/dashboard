import { createBrowserRouter } from "react-router-dom";

import { Applayout } from "./components/layouts/AppLayout";

import NoMatch from "./pages/NoMatch";
import ClustersPage from "./pages/clusters-list/ClustersPage";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Applayout />,
      children: [
        {
          path: "",
          element: <ClustersPage />,
        },
      ],
    },
    {
      path: "*",
      element: <NoMatch />,
    },
  ],
  {
    basename: global.basename,
  },
);
