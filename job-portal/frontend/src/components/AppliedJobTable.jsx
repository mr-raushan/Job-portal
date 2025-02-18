import { Badge } from "./ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

export default function AppliedJobTable() {
  return (
    <div>
      <Table className="mb-20">
        <TableCaption>A list of your applied jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[1, 2, 3, 4, 5].map((item, index) => {
            return (
              <TableRow key={index}>
                <TableCell>10-02-2025</TableCell>
                <TableCell>Frontend Developer</TableCell>
                <TableCell>Google</TableCell>
                <TableCell className="text-right">
                  <Badge
                    variant="ghost"
                    className="rounded-full cursor-pointer"
                  >
                    status
                  </Badge>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
