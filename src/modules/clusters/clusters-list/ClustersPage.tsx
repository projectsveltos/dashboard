import { PageHeading } from "@/components/ui/PageHeading";
import { appConfig, clusterType } from "@/config/app";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

import { ClusterList } from "@/modules/clusters/clusters-list/components/ClusterList";

export default function ClustersPage() {
  const dummyClusterData = [
    {
      name: "Cluster 1",
      version: "v1.22.3",
      namespace: "namespace1",
      type: "clusterAPI",
      status: true,
      labels: [
        {
          designation: "env:production",
          color: "red",
        },
        {
          designation: "euw:devp1",
          color: "green",
        },
      ],
    },
    {
      name: "Cluster 2",
      version: "v1.20.7",
      type: "sveltosCluster",
      namespace: "namespace2",
      status: true,
      labels: [
        {
          designation: "ru:devp2",
          color: "amber",
        },
        {
          designation: "env:engi",
          color: "purple",
        },
      ],
    },
    {
      name: "Cluster 2",
      version: "v1.20.7",
      type: "clusterAPI",
      namespace: "namespace2",
      status: false,
      labels: [
        {
          designation: "weu:development",
          color: "yellow",
        },
        {
          designation: "env:eng",
          color: "purple",
        },
      ],
    },
    {
      name: "Cluster 2",
      version: "v1.20.7",
      type: "clusterAPI",
      namespace: "namespace2",
      status: true,
      labels: [
        {
          designation: "env:development",
          color: "yellow",
        },
        {
          designation: "euw:engineering",
          color: "purple",
        },
      ],
    },
    {
      name: "Cluster 2",
      version: "v1.20.7",
      type: "sveltosCluster",
      namespace: "namespace2",
      status: true,
      labels: [
        {
          designation: "env:development",
          color: "yellow",
        },
        {
          designation: "env:eng",
          color: "purple",
        },
      ],
    },
    {
      name: "Cluster 2",
      type: "sveltosCluster",
      version: "v1.20.7",
      namespace: "namespace2",
      status: false,
      labels: [
        {
          designation: "euw:development",
          color: "yellow",
        },
        {
          designation: "euw:engineering",
          color: "purple",
        },
      ],
    },
    {
      name: "Cluster 2",
      version: "v1.20.7",
      type: "clusterAPI",
      namespace: "namespace2",
      status: false,
      labels: [
        {
          designation: "euw:par1",
          color: "amber",
        },
        {
          designation: "euw:par2",
          color: "purple",
        },
      ],
    },
    {
      name: "Cluster 78",
      version: "v1.21.5",
      type: "sveltosCluster",
      namespace: "namespace3",
      status: true,
      labels: [
        {
          designation: "env:staging",
          color: "orange",
        },
        {
          designation: "na:qa",
          color: "red",
        },
      ],
    },
  ];
  const navigate = useNavigate();
  const defaultTab = appConfig.defaultType;
  const defaultPage = appConfig.defaultPage;
  const { tab: urlTab, page: urlPage } = useParams();
  const [currentTab, setCurrentTab] = useState<clusterType>(() => {
    return urlTab ? (urlTab as clusterType) : defaultTab;
  });

  const [currentPage, setCurrentPage] = useState<number>(() => {
    return urlPage ? parseInt(urlPage) : defaultPage;
  });

  const handleTabChange = (value: clusterType) => {
    navigate(`/clusters/${value}/${currentPage}`);
  };

  return (
    <>
      <PageHeading
        title={"Clusters"}
        description={
          "You can view all clusters,retry failed deployments, and find\n" +
          "              troubleshooting guides for any cluster."
        }
      />
      <ClusterList
        data={dummyClusterData}
        currentTab={currentTab}
        handleTabChange={handleTabChange}
      />
    </>
  );
}
