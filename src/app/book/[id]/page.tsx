import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock3 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getMovieById } from "@/data/movies";

type BookPageProps = {
  params: Promise<{ id: string }>;
};

export default async function BookPage({ params }: BookPageProps) {
  const { id } = await params;
  const movie = getMovieById(id);

  if (!movie) {
    notFound();
  }

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6">
      <Button variant="ghost" className="w-fit" render={<Link href="/" />}>
        <ArrowLeft data-icon="inline-start" />
        Back to Now Showing
      </Button>

      <div className="grid gap-6 md:grid-cols-[220px_1fr]">
        <div className="relative mx-auto aspect-[2/3] w-full max-w-[220px] overflow-hidden rounded-xl bg-muted">
          <Image
            src={movie.image}
            alt={`${movie.title} poster`}
            fill
            sizes="220px"
            className="object-cover"
            priority
          />
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                {movie.title}
              </h1>
              <Badge>{movie.rating}</Badge>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              {movie.genre} · {movie.duration}
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Select a showtime</CardTitle>
              <CardDescription>
                Choose a time to continue to seat selection.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-2">
              {movie.showtimes.map((time) => (
                <Button key={time} variant="outline" className="justify-start">
                  <Clock3 data-icon="inline-start" />
                  {time}
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
