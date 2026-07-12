import { RouteObject } from "react-router-dom";

import { Applayout } from "@/lib/components/ui/layout/AppLayout";

import NoMatch from "./modules/common/components/feedback/NoMatch";
import ClustersPage from "@/modules/clusters/clusters-list/ClustersPage";
import { appConfig } from "@/config/app";
import { ClusterInfoById } from "@/modules/clusters/cluster-information/ClusterInfoById";
import { Authentication } from "@/modules/authentication/Authentication";
import { OidcCallback } from "@/modules/authentication/OidcCallback";
import {
  isOidcConfigured,
  oidcCallbackPath,
} from "@/modules/authentication/oidc";
import { ProfileInformation } from "@/modules/profiles/profile-information/ProfileInformation";
import { Logout } from "@/modules/authentication/Logout";
import PreserveSearchNavigate from "@/hooks/NavigateWithParams";
import { ProfilePage } from "@/modules/profiles/profiles-list/ProfilePage";

import { EventsPage } from "@/modules/events/events-list/EventsPage";
import EventDetails from "@/modules/events/event-details/EventDetails";
import { ClassifiersPage } from "@/modules/classifiers/classifiers-list/ClassifiersPage";
import ClassifierInformation from "@/modules/classifiers/classifier-information/ClassifierInformation";
import { OverviewPage } from "@/modules/overview/OverviewPage";
import { DryRunPage } from "@/modules/dry-run/DryRunPage";
import { DryRunView } from "@/modules/dry-run/DryRunView";
import { EnterprisePage } from "@/modules/enterprise/EnterprisePage";

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
  ...(isOidcConfigured
    ? [{ path: oidcCallbackPath, element: <OidcCallback /> }]
    : []),

  {
    path: "/sveltos",
    element: <Applayout />,
    children: [
      {
        path: "/sveltos",
        element: <PreserveSearchNavigate to={`/sveltos/overview`} />,
      },
      {
        path: "/sveltos/overview",
        element: <OverviewPage />,
      },
      {
        path: "/sveltos/events",
        element: <EventsPage />,
      },
      {
        path: "/sveltos/events/:pageNumber",
        element: <EventsPage />,
      },
      {
        path: "/sveltos/event/:name",
        element: <EventDetails />,
      },
      {
        path: "/sveltos/classifiers",
        element: <ClassifiersPage />,
      },
      {
        path: "/sveltos/classifiers/:pageNumber",
        element: <ClassifiersPage />,
      },
      {
        path: "/sveltos/classifier/:type/:name",
        element: <ClassifierInformation />,
      },
      {
        path: "/sveltos/dry-run",
        element: <DryRunPage />,
      },
      {
        path: "/sveltos/dry-run/:namespace/:name/:kind",
        element: <DryRunView />,
      },
      {
        path: "/sveltos/dry-run/:name/:kind",
        element: <DryRunView />,
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
        path: "/sveltos/enterprise",
        element: <EnterprisePage />,
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
