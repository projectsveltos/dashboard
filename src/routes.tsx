import { RouteObject } from "react-router-dom";

import { Applayout } from "@/lib/components/layouts/AppLayout";

import NoMatch from "./modules/fallback/NoMatch";
import ClustersPage from "@/modules/clusters/clusters-list/ClustersPage";
import { appConfig } from "@/config/app";
import { ClusterInfoById } from "@/modules/clusters/cluster-information/ClusterInfoById";
import { Authentication } from "@/modules/authentication/Authentication";
import { ProfileInformation } from "@/modules/profiles/profile-information/ProfileInformation";
import { Logout } from "@/modules/authentication/Logout";
import PreserveSearchNavigate from "@/hooks/NavigateWithParams";
import { ProfilePage } from "@/modules/profiles/profiles-list/ProfilePage";

const defaultTab = appConfig.defaultType;
const defaultPage = appConfig.defaultPage;


export const routes: RouteObject[] = [
  {
    path: "/",
    element: <PreserveSearchNavigate to={"/login"} />,
  },
  {
    path: "/login",
    element: <Authentication />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },

  {
    path: "/sveltos",
    element: <Applayout />,
    children: [
      {
        path: "/sveltos",
        element: (
          <PreserveSearchNavigate
            to={`/sveltos/clusters/${defaultTab}/${defaultPage}`}
          />
        ),
      },
      {
        path: "/sveltos/profiles",
        element: <ProfilePage />,
      },
      {
        path: "/sveltos/profile/:namespace/:name/:kind",
        element: <ProfileInformation />,
      },
      {
        path: "/sveltos/profile/:name/:kind",
        element: <ProfileInformation />,
      },
      {
        path: "/sveltos/clusters",
        element: (
          <PreserveSearchNavigate
            to={`/sveltos/clusters/${defaultTab}/${defaultPage}`}
          />
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
];
