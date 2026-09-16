import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const bookings = [
  {
    id: "BK-1842",
    guest: "Priya N.",
    movie: "Neon Harbor",
    time: "6:15 PM",
    seats: "G12–G14",
    status: "Paid",
  },
  {
    id: "BK-1843",
    guest: "James L.",
    movie: "Orbit City",
    time: "6:40 PM",
    seats: "C4–C5",
    status: "Hold",
  },
  {
    id: "BK-1844",
    guest: "Amina K.",
    movie: "Last Light Express",
    time: "7:05 PM",
    seats: "IMAX 22–23",
    status: "Paid",
  },
  {
    id: "BK-1845",
    guest: "Chen W.",
    movie: "Velvet Curtain",
    time: "7:30 PM",
    seats: "A8",
    status: "Refund pending",
  },
];

export default function BookingsPage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Bookings</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Holds expire after 12 minutes. Refunds require a manager override.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Recent tickets</CardTitle>
          <CardDescription>Latest activity from the kiosk and web desk</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="flex flex-col gap-2 border-b border-border pb-4 last:border-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-medium">
                  {booking.guest} · {booking.id}
                </p>
                <p className="text-sm text-muted-foreground">
                  {booking.movie} · {booking.time} · {booking.seats}
                </p>
              </div>
              <Badge
                variant={
                  booking.status === "Paid"
                    ? "default"
                    : booking.status === "Hold"
                      ? "secondary"
                      : "outline"
                }
              >
                {booking.status}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
