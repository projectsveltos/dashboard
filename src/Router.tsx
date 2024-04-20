import { createBrowserRouter, Navigate } from "react-router-dom";

import { Applayout } from "./components/layouts/AppLayout";

import NoMatch from "./pages/errors/NoMatch";
import ClustersPage from "./pages/clusters-list/ClustersPage";
import { appConfig } from "@/config/app";
const defaultTab = appConfig.sveltosType;
const defaultPage = appConfig.defaultPage;
export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Applayout />,
      children: [
        {
          path: "/",
          element: <Navigate to={`/clusters/${defaultTab}/${defaultPage}`} />,
        },
        {
          path: "/clusters",
          element: <Navigate to={`/clusters/${defaultTab}/${defaultPage}`} />,
        },
        {
          path: "/clusters/:tab/:pageNumber",
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
