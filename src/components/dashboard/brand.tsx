import { Clapperboard } from "lucide-react";

export function Brand() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <Clapperboard className="size-4" />
      </div>
      <div className="leading-tight">
        <p className="text-sm font-semibold tracking-wide">Lumina Cinema</p>
        <p className="text-xs text-muted-foreground">Box office desk</p>
      </div>
    </div>
  );
}
