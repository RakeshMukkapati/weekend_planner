import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { showtimes } from "@/lib/data";

export default function ShowtimesPage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Showtimes</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Houses with fewer than 20 seats left should be marked as selling fast.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Tonight</CardTitle>
          <CardDescription>Live occupancy from the box office feed</CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full min-w-[32rem] text-left text-sm">
            <thead className="text-muted-foreground">
              <tr className="border-b border-border">
                <th className="pb-3 font-medium">Title</th>
                <th className="pb-3 font-medium">Screen</th>
                <th className="pb-3 font-medium">Time</th>
                <th className="pb-3 font-medium">Occupancy</th>
                <th className="pb-3 font-medium">Seats left</th>
              </tr>
            </thead>
            <tbody>
              {showtimes.map((show) => (
                <tr key={show.id} className="border-b border-border last:border-0">
                  <td className="py-3 font-medium">{show.movie}</td>
                  <td className="py-3 text-muted-foreground">{show.screen}</td>
                  <td className="py-3">{show.time}</td>
                  <td className="py-3">{show.occupancy}%</td>
                  <td className="py-3">
                    {show.seatsLeft < 20 ? (
                      <Badge variant="destructive">{show.seatsLeft} left</Badge>
                    ) : (
                      show.seatsLeft
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
