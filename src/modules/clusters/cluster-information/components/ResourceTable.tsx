import {
  Blocks,
  File,
  ListFilter,
  MoreHorizontal,
  PlusCircle,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function ResourceTable() {
  return (
    <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
      <main className="">
        <Tabs defaultValue="all">
          <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
              <CardTitle className={"flex items-center"}>
                <Blocks className={"w-4 h-4"} /> Addons
              </CardTitle>
              <CardDescription>
                Manage the cluster addons and resources
                <div className="flex items-center">
                  <div className="ml-auto flex items-center gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 gap-1"
                        >
                          <ListFilter className="h-3.5 w-3.5" />
                          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                            Filter
                          </span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuCheckboxItem checked>
                          Active
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem>
                          Draft
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem>
                          Archived
                        </DropdownMenuCheckboxItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <Button size="sm" variant="outline" className="h-7 gap-1">
                      <File className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Export
                      </span>
                    </Button>
                    <Button size="sm" className="h-7 gap-1">
                      <PlusCircle className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Add Addon
                      </span>
                    </Button>
                  </div>
                </div>
              </CardDescription>
            </CardHeader>

            <CardContent>
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="active">Resources</TabsTrigger>
                <TabsTrigger value="draft">Helm Charts</TabsTrigger>
              </TabsList>
              <TabsContent value="all">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Cluster</TableHead>
                      <TableHead>Resource type</TableHead>
                      <TableHead>Namespace</TableHead>
                      <TableHead className={"hidden sm:table-cell"}>
                        Name
                      </TableHead>
                      <TableHead className={"hidden sm:table-cell"}>
                        Version
                      </TableHead>
                      <TableHead className={"hidden sm:table-cell"}>
                        Time
                      </TableHead>
                      <TableHead className={"hidden sm:table-cell"}>
                        Profiles
                      </TableHead>
                      <TableHead>
                        <span className="sr-only">Actions</span>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>default/clusterapi-workload</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={"p-2 rounded"}>
                          helm chart
                        </Badge>
                      </TableCell>
                      <TableCell>kyverno</TableCell>

                      <TableCell className="hidden md:table-cell">
                        kyverno-latest
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        3.1.4
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        2023-07-12 10:42 AM
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        ClusterProfile/deploy-kyverno
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              aria-haspopup="true"
                              size="icon"
                              variant="ghost"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell>default/clusterapi-workload</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={"p-2 rounded"}>
                          helm chart
                        </Badge>
                      </TableCell>
                      <TableCell>kyverno</TableCell>

                      <TableCell className="hidden md:table-cell">
                        kyverno-latest
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        3.1.4
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        2023-07-12 10:42 AM
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        ClusterProfile/deploy-kyverno
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              aria-haspopup="true"
                              size="icon"
                              variant="ghost"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>default/clusterapi-workload</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={"p-2 rounded"}>
                          helm chart
                        </Badge>
                      </TableCell>
                      <TableCell>kyverno</TableCell>

                      <TableCell className="hidden md:table-cell">
                        kyverno-latest
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        3.1.4
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        2023-07-12 10:42 AM
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        ClusterProfile/deploy-kyverno
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              aria-haspopup="true"
                              size="icon"
                              variant="ghost"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>default/clusterapi-workload</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={"p-2 rounded"}>
                          helm chart
                        </Badge>
                      </TableCell>
                      <TableCell>kyverno</TableCell>

                      <TableCell className="hidden md:table-cell">
                        kyverno-latest
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        3.1.4
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        2023-07-12 10:42 AM
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        ClusterProfile/deploy-kyverno
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              aria-haspopup="true"
                              size="icon"
                              variant="ghost"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TabsContent>
            </CardContent>
            <CardFooter>
              <div className="text-xs text-muted-foreground">
                Showing <strong>1-10</strong> of <strong>4</strong> addons
              </div>
            </CardFooter>
          </Card>
        </Tabs>
      </main>
    </div>
  );
}
