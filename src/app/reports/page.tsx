import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const rows = [
  { title: "Neon Harbor", tickets: 412, revenue: "$6,180" },
  { title: "Orbit City", tickets: 301, revenue: "$4,515" },
  { title: "Last Light Express", tickets: 274, revenue: "$4,384" },
  { title: "Velvet Curtain", tickets: 97, revenue: "$1,261" },
];

export default function ReportsPage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Reports</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Today&apos;s ticket mix. Concession reports are still in the nightly close.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Title performance</CardTitle>
          <CardDescription>Paid tickets only, excluding comps</CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full min-w-[24rem] text-left text-sm">
            <thead className="text-muted-foreground">
              <tr className="border-b border-border">
                <th className="pb-3 font-medium">Title</th>
                <th className="pb-3 font-medium">Tickets</th>
                <th className="pb-3 font-medium">Revenue</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.title} className="border-b border-border last:border-0">
                  <td className="py-3 font-medium">{row.title}</td>
                  <td className="py-3">{row.tickets}</td>
                  <td className="py-3">{row.revenue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
