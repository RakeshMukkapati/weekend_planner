import Image from "next/image";
import Link from "next/link";
import { Clock3, Ticket } from "lucide-react";

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
import { movies } from "@/data/movies";

export default function HomePage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <section className="rounded-2xl border border-border bg-linear-to-br from-card via-card to-primary/5 px-6 py-8 sm:px-8">
        <p className="text-sm font-medium text-primary">Lumina Cinema</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          Now Showing
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
          Six features on the marquee tonight. Pick a showtime and reserve your
          seats in a few taps.
        </p>
      </section>

      <section aria-labelledby="now-showing-grid">
        <h2 id="now-showing-grid" className="sr-only">
          Movie listings
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {movies.map((movie) => (
            <Card key={movie.id} className="overflow-hidden py-0">
              <div className="relative aspect-[2/3] w-full overflow-hidden bg-muted">
                <Image
                  src={movie.image}
                  alt={`${movie.title} poster`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className="object-cover"
                />
                <Badge className="absolute top-3 right-3">{movie.rating}</Badge>
              </div>
              <CardHeader>
                <CardTitle>{movie.title}</CardTitle>
                <CardDescription>
                  {movie.genre} · {movie.duration}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {movie.showtimes.map((time) => (
                    <span
                      key={time}
                      className="inline-flex items-center gap-1 rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground"
                    >
                      <Clock3 className="size-3" />
                      {time}
                    </span>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t bg-muted/30">
                <Button className="w-full" render={<Link href={`/book/${movie.id}`} />}>
                  <Ticket data-icon="inline-start" />
                  Book Tickets
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
