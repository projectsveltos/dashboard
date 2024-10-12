import { createBrowserRouter, Navigate } from "react-router-dom";

import { Applayout } from "./components/layouts/AppLayout";

import NoMatch from "./modules/fallback/NoMatch";
import ClustersPage from "@/modules/clusters/clusters-list/ClustersPage";
import { appConfig } from "@/config/app";
import { ClusterInfoById } from "@/modules/clusters/cluster-information/ClusterInfoById";
import { Authentication } from "@/modules/authentication/Authentication";
const defaultTab = appConfig.defaultType;
const defaultPage = appConfig.defaultPage;
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to={"/login"} />,
  },
  {
    path: "/login",
    element: <Authentication />,
  },
  {
    path: "/sveltos",
    element: <Applayout />,
    children: [
      {
        path: "/sveltos",
        element: (
          <Navigate to={`/sveltos/clusters/${defaultTab}/${defaultPage}`} />
        ),
      },
      {
        path: "/sveltos/clusters",
        element: (
          <Navigate to={`/sveltos/clusters/${defaultTab}/${defaultPage}`} />
        ),
      },
      {
        path: "/sveltos/clusters/:tab/:pageNumber",
        element: <ClustersPage />,
      },
      {
        path: "/sveltos/cluster/:tab/:namespace/:name",
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
