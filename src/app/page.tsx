import { ArrowUpRight, Clock3, Ticket } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { movies, stats, showtimes } from "@/lib/data";

export default function DashboardPage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm text-primary">Wednesday, Sep 16</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
            Evening rush is filling up
          </h1>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            Track occupancy, sell remaining seats, and keep IMAX 1 on schedule.
          </p>
        </div>
        <Button render={<Link href="/showtimes" />}>
          Open box office
          <ArrowUpRight data-icon="inline-end" />
        </Button>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} size="sm">
            <CardHeader>
              <CardDescription>{stat.label}</CardDescription>
              <CardTitle className="text-2xl font-semibold">{stat.value}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">{stat.hint}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-medium">Now showing</h2>
            <Link
              href="/now-showing"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              View all
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {movies.map((movie) => (
              <Card key={movie.id} className="overflow-hidden py-0">
                <div
                  className={`h-36 bg-linear-to-br ${movie.poster} px-4 py-4`}
                >
                  <Badge variant="secondary">{movie.status}</Badge>
                </div>
                <CardHeader>
                  <CardTitle>{movie.title}</CardTitle>
                  <CardDescription>
                    {movie.genre} · {movie.runtime} · {movie.rating}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-4">
                  <p className="text-sm text-muted-foreground">
                    Audience score {movie.score.toFixed(1)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Tonight&apos;s showtimes</CardTitle>
            <CardDescription>Next five houses across the multiplex</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {showtimes.map((show) => (
              <div
                key={show.id}
                className="flex items-start justify-between gap-3 border-b border-border pb-4 last:border-0 last:pb-0"
              >
                <div>
                  <p className="font-medium">{show.movie}</p>
                  <p className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <Clock3 className="size-3" />
                      {show.time}
                    </span>
                    <span>{show.screen}</span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{show.occupancy}% full</p>
                  <p className="mt-1 inline-flex items-center gap-1 text-xs text-muted-foreground">
                    <Ticket className="size-3" />
                    {show.seatsLeft} left
                  </p>
                </div>
              </div>
            ))}
            <Button variant="outline" render={<Link href="/showtimes" />}>
              Manage showtimes
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
