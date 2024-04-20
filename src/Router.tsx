import { createBrowserRouter, Navigate } from "react-router-dom";

import { Applayout } from "./components/layouts/AppLayout";

import NoMatch from "./pages/errors/NoMatch";
import ClustersPage from "./pages/clusters-list/ClustersPage";
import { appConfig } from "@/config/app";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Applayout />,
      children: [
        {
          path: "/",
          element: <Navigate to={`/clusters/${appConfig.sveltosType}/0`} />, // Redirect to default tab route
        },
        {
          path: "/clusters",
          element: <Navigate to={`/clusters/${appConfig.sveltosType}/0`} />, // Redirect to default tab route
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
