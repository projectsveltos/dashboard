import { TableCell, TableRow } from "@/components/ui/table";

export const LoadingTableRow = ({ columns }: { columns: number }) => {
  return (
    <>
      {Array.from({ length: columns }).map((_, index) => (
        <TableRow key={index}>
          {" "}
          {Array.from({ length: columns }).map((_, index) => (
            <TableCell key={index}>
              <div
                key={index}
                className="h-4 mx-4 bg-slate-200 pulse dark:bg-slate-600 rounded h-14 w-60"
              ></div>
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
};
