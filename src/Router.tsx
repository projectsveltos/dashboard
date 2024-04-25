import { createBrowserRouter, Navigate } from "react-router-dom";

import { Applayout } from "./components/layouts/AppLayout";

import NoMatch from "./modules/fallback/NoMatch";
import ClustersPage from "@/modules/clusters/clusters-list/ClustersPage";
import { appConfig } from "@/config/app";
import { ClusterInfo } from "@/modules/clusters/cluster-information/ClusterInfo";
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
        {
          path: "/clusters/:clusterId",
          element: <ClusterInfo />,
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
