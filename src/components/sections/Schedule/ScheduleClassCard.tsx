import * as Dialog from "@radix-ui/react-dialog";
import { Clock, User, MapPin, Users, Building2, X } from "lucide-react";
import { DAYS, getModalityColor, type ScheduleClass } from "@/data/schedule";
import { getEvoBranch } from "@/lib/evo/branches";
import { cn } from "@/lib/utils";

interface ScheduleClassCardProps {
  cls: ScheduleClass;
  onSelect: (cls: ScheduleClass) => void;
}

export function ScheduleClassCard({ cls, onSelect }: ScheduleClassCardProps) {
  const tone = getModalityColor(cls.modalityId);

  return (
    <button
      type="button"
      onClick={() => onSelect(cls)}
      className={cn(
        "relative flex h-[6.75rem] w-full min-w-0 max-w-full flex-col overflow-hidden rounded-lg border border-border bg-white p-2.5 pl-3.5 text-left shadow-sm",
        "transition-shadow hover:border-primary/30 hover:shadow-md",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      )}
      aria-label={`Ver detalhes de ${cls.modalityLabel} às ${cls.time}`}
    >
      <div
        className={cn("absolute inset-y-0 left-0 w-1", !cls.accentColor && tone.accent)}
        style={cls.accentColor ? { backgroundColor: cls.accentColor } : undefined}
        aria-hidden
      />
      <p className="truncate text-[13px] font-semibold uppercase tracking-wide text-foreground">
        {cls.modalityLabel}
      </p>
      <p className="mt-1 flex items-center gap-1 text-[13px] text-primary">
        <Clock className="h-2.5 w-2.5 shrink-0" aria-hidden />
        <span className="tabular-nums font-semibold">{cls.time}</span>
        <span className="text-border">·</span>
        <span className="truncate text-muted-foreground">{cls.durationMin}min</span>
      </p>
      <p className="mt-1 flex min-w-0 items-center gap-1 text-[13px] text-muted-foreground">
        <User className="h-2.5 w-2.5 shrink-0" aria-hidden />
        <span className="truncate">{cls.instructor}</span>
      </p>
      <p className="mt-0.5 flex min-w-0 items-center gap-1 text-[13px] text-muted-foreground/80">
        <MapPin className="h-2.5 w-2.5 shrink-0" aria-hidden />
        <span className="truncate">{cls.room || "Sala a confirmar"}</span>
      </p>
    </button>
  );
}

interface ScheduleClassModalProps {
  cls: ScheduleClass | null;
  onClose: () => void;
}

export function ScheduleClassModal({ cls, onClose }: ScheduleClassModalProps) {
  const open = cls !== null;
  const tone = cls ? getModalityColor(cls.modalityId) : null;
  const dayLabel = cls
    ? DAYS.find((day) => day.key === cls.day)?.label
    : undefined;
  const unitName = cls ? getEvoBranch(cls.unitSlug)?.name : undefined;
  const timeRange =
    cls?.endTime && cls.endTime !== cls.time
      ? `${cls.time} – ${cls.endTime}`
      : cls?.time;

  return (
    <Dialog.Root open={open} onOpenChange={(next) => !next && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" />
        <Dialog.Content
          className={cn(
            "fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2",
            "overflow-hidden rounded-2xl border border-border bg-background shadow-xl focus:outline-none"
          )}
        >
          {cls ? (
            <div className="relative">
              <div
                className={cn("h-1.5 w-full", !cls.accentColor && tone?.accent)}
                style={cls.accentColor ? { backgroundColor: cls.accentColor } : undefined}
                aria-hidden
              />
              <div className="p-5 sm:p-6">
                <Dialog.Title className="pr-10 text-xl font-bold text-foreground">
                  {cls.modalityLabel}
                </Dialog.Title>
                <Dialog.Description className="mt-1 text-sm text-muted-foreground">
                  {dayLabel}
                  {timeRange ? ` · ${timeRange}` : ""}
                  {cls.durationMin ? ` · ${cls.durationMin} min` : ""}
                </Dialog.Description>

                {cls.description ? (
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {cls.description}
                  </p>
                ) : null}

                <dl className="mt-5 space-y-3 border-t border-border pt-5">
                  <ModalRow
                    icon={Clock}
                    label="Horário"
                    value={`${timeRange} (${cls.durationMin} min)`}
                  />
                  <ModalRow icon={User} label="Professor" value={cls.instructor} />
                  <ModalRow
                    icon={MapPin}
                    label="Local"
                    value={cls.room || "Sala a confirmar"}
                  />
                  {unitName ? (
                    <ModalRow
                      icon={Building2}
                      label="Unidade"
                      value={`Pacer ${unitName}`}
                    />
                  ) : null}
                  <ModalRow
                    icon={Users}
                    label="Público"
                    value={cls.publicoAlvo === "kids" ? "Kids" : "Adulto"}
                  />
                </dl>
              </div>

              <Dialog.Close
                className="absolute right-3 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background/90 text-muted-foreground transition-colors hover:text-foreground"
                aria-label="Fechar"
              >
                <X className="h-4 w-4" />
              </Dialog.Close>
            </div>
          ) : null}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function ModalRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Clock;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
      <div className="min-w-0">
        <dt className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70">
          {label}
        </dt>
        <dd className="mt-0.5 text-sm text-foreground">{value}</dd>
      </div>
    </div>
  );
}
