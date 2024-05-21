import { createBrowserRouter, Navigate } from "react-router-dom";

import { Applayout } from "./components/layouts/AppLayout";

import NoMatch from "./modules/fallback/NoMatch";
import ClustersPage from "@/modules/clusters/clusters-list/ClustersPage";
import { appConfig } from "@/config/app";
import { ClusterInfoById } from "@/modules/clusters/cluster-information/ClusterInfoById";
const defaultTab = appConfig.defaultType;
const defaultPage = appConfig.defaultPage;
export const router = createBrowserRouter([
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
        path: "/cluster/:tab/:namespace/:name",
        element: <ClusterInfoById />,
      },
      {
        path: "*",
        element: <NoMatch />,
      },
    ],
  },
  {
    path: "*",
    element: <NoMatch />,
  },
]);
