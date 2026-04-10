import { LucideMapPin, LucidePhone, LucideStore } from "lucide-react";

const CustomerCard = () => {
  return (
    <div className="bg-card text-card-foreground border-border/50 group overflow-hidden rounded-xl border shadow-sm transition-all duration-200 hover:-translate-y-0.5">
      <div className="bg-primary/20 group-hover:bg-primary h-2 w-full transition-colors" />
      <div className="p-6">
        <div className="mb-4 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="text-primary bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full">
              <LucideStore className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-outfit text-lg leading-tight font-bold">
                Toko Elektronik Maju
              </h3>
              <p className="text-muted-foreground text-sm">Budi Santoso</p>
            </div>
          </div>
          <div className="text-muted-foreground bg-muted rounded-md px-2 py-1 text-xs font-semibold">
            ID: 1
          </div>
        </div>
        <div className="border-border/50 space-y-2 border-t pt-4 text-sm">
          <div className="text-muted-foreground flex items-center gap-3">
            <LucidePhone className="size-4 opacity-70" />
            <span className="text-foreground">0812-3456-7890</span>
          </div>
          <div className="text-muted-foreground flex gap-3">
            <LucideMapPin className="size-4 opacity-70" />
            <span className="text-foreground line-clamp-2">
              Jl. Sudirman No. 45, Jakarta
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerCard;
