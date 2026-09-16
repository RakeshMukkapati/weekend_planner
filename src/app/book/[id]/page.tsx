import { notFound } from "next/navigation";

import { BookingInterface } from "@/components/booking/booking-interface";
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

  return <BookingInterface movie={movie} />;
}
