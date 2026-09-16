"use client";

import { useEffect, useId, useMemo, useState } from "react";
import {
  CheckCircle2,
  Loader2,
  Printer,
  Sparkles,
  X,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { createQrPattern, generateBookingId } from "@/lib/booking";
import { TICKET_PRICE } from "@/lib/seats";
import { cn } from "@/lib/utils";

type CheckoutPhase = "processing" | "success";

export type CheckoutDetails = {
  movieTitle: string;
  showtime: string;
  seats: string[];
  totalAmount: number;
};

type CheckoutModalProps = {
  open: boolean;
  details: CheckoutDetails;
  onClose: () => void;
};

function MockQrCode({ value }: { value: string }) {
  const pattern = useMemo(() => createQrPattern(value), [value]);

  return (
    <div
      className="grid gap-0.5 rounded-md bg-white p-2"
      style={{ gridTemplateColumns: `repeat(${pattern.length}, minmax(0, 1fr))` }}
      aria-hidden
    >
      {pattern.flatMap((row, rowIndex) =>
        row.map((filled, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={cn("aspect-square size-2.5 sm:size-3", filled ? "bg-zinc-900" : "bg-white")}
          />
        ))
      )}
    </div>
  );
}

export function CheckoutModal({ open, details, onClose }: CheckoutModalProps) {
  const titleId = useId();
  const [phase, setPhase] = useState<CheckoutPhase>("processing");
  const [bookingId] = useState(() => generateBookingId());

  useEffect(() => {
    if (!open) return;

    const timer = window.setTimeout(() => {
      setPhase("success");
    }, 2000);

    return () => window.clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && phase === "success") {
        onClose();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose, phase]);

  if (!open) return null;

  const sortedSeats = [...details.seats].sort();

  function handlePrint() {
    window.print();
  }

  return (
      <div
        id="checkout-print-root"
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <button
          type="button"
          className="checkout-overlay absolute inset-0 bg-black/75 backdrop-blur-sm"
          aria-label="Close checkout"
          onClick={phase === "success" ? onClose : undefined}
        />

        <div className="checkout-dialog relative z-10 w-full max-w-lg">
          {phase === "processing" ? (
            <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-2xl">
              <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-primary/15">
                <Loader2 className="size-8 animate-spin text-primary" />
              </div>
              <h2 id={titleId} className="mt-6 text-xl font-semibold">
                Processing payment
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Securing your seats for {details.movieTitle} at {details.showtime}
              </p>
              <div className="mt-6 overflow-hidden rounded-full bg-muted">
                <div className="h-2 w-full animate-[checkout-progress_2s_ease-in-out_forwards] rounded-full bg-primary" />
              </div>
              <p className="mt-4 text-xs text-muted-foreground">
                {sortedSeats.join(", ")} · ${details.totalAmount.toFixed(2)}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="checkout-success-header flex items-center justify-between text-emerald-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-5" />
                  <span className="text-sm font-medium">Payment successful</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  type="button"
                  onClick={onClose}
                  aria-label="Close"
                >
                  <X className="size-4" />
                </Button>
              </div>

              <div
                className="ticket-stub relative overflow-hidden rounded-2xl border border-primary/30 bg-linear-to-br from-zinc-900 via-zinc-950 to-black p-6 shadow-2xl shadow-primary/10"
              >
                <div className="pointer-events-none absolute -top-10 -right-10 size-40 rounded-full bg-primary/20 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-8 -left-8 size-32 rounded-full bg-primary/10 blur-2xl" />

                <div className="relative flex flex-col gap-6 sm:flex-row sm:items-stretch">
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-2 text-primary">
                      <Sparkles className="size-4" />
                      <span className="text-xs font-semibold tracking-[0.25em] uppercase">
                        Lumina Cinema
                      </span>
                    </div>

                    <div>
                      <h2 className="text-2xl font-semibold text-white">
                        {details.movieTitle}
                      </h2>
                      <p className="mt-1 text-sm text-zinc-400">
                        {details.showtime} · Digital ticket
                      </p>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between gap-4 border-b border-white/10 pb-2">
                        <span className="text-zinc-400">Booking ID</span>
                        <span className="font-mono font-medium text-primary">
                          {bookingId}
                        </span>
                      </div>
                      <div className="flex justify-between gap-4 border-b border-white/10 pb-2">
                        <span className="text-zinc-400">Seats</span>
                        <span className="text-right font-medium text-white">
                          {sortedSeats.join(", ")}
                        </span>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span className="text-zinc-400">Total paid</span>
                        <span className="font-semibold text-white">
                          ${details.totalAmount.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <Badge variant="secondary" className="bg-primary/20 text-primary">
                      {details.seats.length} ticket
                      {details.seats.length === 1 ? "" : "s"} · $
                      {TICKET_PRICE} each
                    </Badge>
                  </div>

                  <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-white/15 bg-white/5 p-4">
                    <MockQrCode value={bookingId} />
                    <p className="text-[10px] tracking-widest text-zinc-500 uppercase">
                      Scan at entry
                    </p>
                  </div>
                </div>

                <div
                  aria-hidden
                  className="mt-6 flex justify-between gap-2 opacity-40"
                >
                  {Array.from({ length: 24 }).map((_, index) => (
                    <span
                      key={index}
                      className="size-2 rounded-full bg-zinc-700"
                    />
                  ))}
                </div>
              </div>

              <div className="checkout-actions flex flex-col gap-2 sm:flex-row">
                <Button
                  className="flex-1"
                  type="button"
                  onClick={handlePrint}
                >
                  <Printer data-icon="inline-start" />
                  Print ticket
                </Button>
                <Button
                  className="flex-1"
                  variant="outline"
                  type="button"
                  onClick={onClose}
                >
                  Done
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
  );
}
