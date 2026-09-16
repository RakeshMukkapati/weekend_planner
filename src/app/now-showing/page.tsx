import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { movies } from "@/lib/data";

export default function NowShowingPage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Now showing</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Four titles on the marquee this week. Preview titles can be booked for
          members only.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {movies.map((movie) => (
          <Card key={movie.id} className="overflow-hidden py-0">
            <div className={`h-44 bg-linear-to-br ${movie.poster}`} />
            <CardHeader>
              <div className="flex items-start justify-between gap-2">
                <CardTitle>{movie.title}</CardTitle>
                <Badge variant={movie.status === "Preview" ? "outline" : "default"}>
                  {movie.status}
                </Badge>
              </div>
              <CardDescription>
                {movie.genre} · {movie.runtime}
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-4 text-sm text-muted-foreground">
              Rated {movie.rating} · {movie.score.toFixed(1)} audience
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
