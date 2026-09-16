import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const screens = [
  { name: "IMAX 1", capacity: 198, status: "Running Neon Harbor" },
  { name: "Dolby 2", capacity: 142, status: "Cleaning until 6:50" },
  { name: "Screen 3", capacity: 120, status: "Ready" },
  { name: "Screen 4", capacity: 118, status: "Running Orbit City" },
  { name: "Screen 7", capacity: 96, status: "Preview seating" },
];

export default function ScreensPage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Screens</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          House status for the evening program. Capacities include companion seats.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {screens.map((screen) => (
          <Card key={screen.name} size="sm">
            <CardHeader>
              <CardTitle>{screen.name}</CardTitle>
              <CardDescription>{screen.capacity} seats</CardDescription>
            </CardHeader>
            <CardContent>{screen.status}</CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
