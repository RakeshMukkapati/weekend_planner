"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowLeft, Clock3 } from "lucide-react";

import { CheckoutModal } from "@/components/booking/checkout-modal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Movie } from "@/data/movies";
import {
  COLS,
  getReservedSeats,
  ROWS,
  seatId,
  TICKET_PRICE,
} from "@/lib/seats";
import { cn } from "@/lib/utils";

type BookingInterfaceProps = {
  movie: Movie;
};

export function BookingInterface({ movie }: BookingInterfaceProps) {
  const [selectedShowtime, setSelectedShowtime] = useState(movie.showtimes[0]);
  const [selectedSeats, setSelectedSeats] = useState<Set<string>>(new Set());
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [checkoutKey, setCheckoutKey] = useState(0);

  const reservedSeats = useMemo(
    () => getReservedSeats(movie.id, selectedShowtime),
    [movie.id, selectedShowtime]
  );

  const selectedCount = selectedSeats.size;
  const totalAmount = selectedCount * TICKET_PRICE;

  function handleShowtimeChange(showtime: string) {
    setSelectedShowtime(showtime);
    setSelectedSeats(new Set());
  }

  function toggleSeat(id: string) {
    if (reservedSeats.has(id)) return;

    setSelectedSeats((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6 pb-28">
      <Button variant="ghost" className="w-fit" render={<Link href="/" />}>
        <ArrowLeft data-icon="inline-start" />
        Back to Now Showing
      </Button>

      <header className="rounded-2xl border border-border bg-card p-4 sm:p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start">
          <div className="relative mx-auto aspect-[2/3] w-full max-w-[140px] shrink-0 overflow-hidden rounded-lg bg-muted lg:mx-0">
            <Image
              src={movie.image}
              alt={`${movie.title} poster`}
              fill
              sizes="140px"
              className="object-cover"
              priority
            />
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-4">
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

            <div>
              <p className="mb-2 text-sm font-medium">Select showtime</p>
              <div className="flex flex-wrap gap-2">
                {movie.showtimes.map((time) => {
                  const active = selectedShowtime === time;
                  return (
                    <Button
                      key={time}
                      type="button"
                      variant={active ? "default" : "outline"}
                      onClick={() => handleShowtimeChange(time)}
                    >
                      <Clock3 data-icon="inline-start" />
                      {time}
                    </Button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="rounded-2xl border border-border bg-card p-4 sm:p-6">
        <div className="mb-8 flex flex-col items-center">
          <div
            aria-hidden
            className="h-10 w-full max-w-2xl rounded-t-[100%] border-t-4 border-primary/70 bg-linear-to-b from-primary/25 to-transparent shadow-[0_-8px_30px_-12px] shadow-primary/40"
          />
          <p className="mt-3 text-xs font-medium tracking-[0.35em] text-muted-foreground uppercase">
            Screen
          </p>
        </div>

        <div className="mb-4 flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-2">
            <span className="size-3 rounded-sm bg-zinc-500/80" />
            Available
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="size-3 rounded-sm bg-emerald-500" />
            Selected
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="size-3 rounded-sm bg-zinc-800 opacity-50" />
            Reserved
          </span>
        </div>

        <div className="overflow-x-auto pb-2">
          <div className="mx-auto min-w-[20rem] w-fit space-y-2">
            {Array.from({ length: ROWS }, (_, row) => (
              <div key={row} className="flex items-center gap-2">
                <span className="w-4 text-center text-xs font-medium text-muted-foreground">
                  {"ABCDEFGH"[row]}
                </span>
                <div className="grid grid-cols-10 gap-1.5 sm:gap-2">
                  {Array.from({ length: COLS }, (_, col) => {
                    const id = seatId(row, col);
                    const reserved = reservedSeats.has(id);
                    const selected = selectedSeats.has(id);

                    return (
                      <button
                        key={id}
                        type="button"
                        disabled={reserved}
                        aria-label={
                          reserved
                            ? `Seat ${id} reserved`
                            : selected
                              ? `Seat ${id} selected`
                              : `Seat ${id} available`
                        }
                        aria-pressed={selected}
                        onClick={() => toggleSeat(id)}
                        className={cn(
                          "size-7 rounded-md border text-[10px] font-medium transition-colors sm:size-8",
                          reserved &&
                            "cursor-not-allowed border-zinc-800 bg-zinc-800/60 text-zinc-600 opacity-60",
                          !reserved &&
                            !selected &&
                            "border-zinc-600 bg-zinc-500/70 text-zinc-100 hover:bg-zinc-400/80",
                          selected &&
                            "border-emerald-400 bg-emerald-500 text-emerald-950 hover:bg-emerald-400"
                        )}
                      >
                        {col + 1}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Card className="fixed inset-x-0 bottom-0 z-30 rounded-none border-x-0 border-b-0 bg-card/95 backdrop-blur-md">
        <CardContent className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="text-sm">
            <p className="font-medium">
              {selectedCount} seat{selectedCount === 1 ? "" : "s"} selected
            </p>
            <p className="text-muted-foreground">
              {movie.title} · {selectedShowtime}
            </p>
            <p className="mt-1 text-lg font-semibold text-primary">
              ${totalAmount.toFixed(2)}
              <span className="ml-2 text-xs font-normal text-muted-foreground">
                (${TICKET_PRICE} per ticket)
              </span>
            </p>
          </div>
          <Button
            size="lg"
            className="w-full sm:w-auto"
            disabled={selectedCount === 0}
            onClick={() => {
              setCheckoutKey((key) => key + 1);
              setCheckoutOpen(true);
            }}
          >
            Proceed to Checkout
          </Button>
        </CardContent>
      </Card>

      {checkoutOpen ? (
        <CheckoutModal
          key={checkoutKey}
          open
          onClose={() => setCheckoutOpen(false)}
          details={{
            movieTitle: movie.title,
            showtime: selectedShowtime,
            seats: Array.from(selectedSeats),
            totalAmount,
          }}
        />
      ) : null}
    </div>
  );
}
