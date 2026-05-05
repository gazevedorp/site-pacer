import { useSearchParams } from "react-router-dom";
import { CalendarDays } from "lucide-react";
import { useSeoMeta } from "@/hooks/useSeoMeta";
import { units } from "@/data/units";
import {
  getFilteredClasses,
  getTodayScheduleDay,
} from "@/data/schedule";
import type { ScheduleDay, PublicoAlvo } from "@/data/schedule";
import { readScheduleFilters } from "@/components/sections/Schedule/ScheduleFilterBar";
import { ScheduleBanner } from "@/components/sections/Schedule/ScheduleBanner";
import { ScheduleFilterBar } from "@/components/sections/Schedule/ScheduleFilterBar";
import { ScheduleDesktop } from "@/components/sections/Schedule/ScheduleDesktop";
import { ScheduleMobile } from "@/components/sections/Schedule/ScheduleMobile";

export default function SchedulePage() {
  const [params, setParams] = useSearchParams();
  const { unitSlug, modalityId, publico } = readScheduleFilters(params);
  const selectedDay =
    (params.get("dia") as ScheduleDay | null) ?? getTodayScheduleDay();

  const selectedUnit = units.find((u) => u.slug === unitSlug);
  const unitName = selectedUnit ? `Pacer ${selectedUnit.name}` : undefined;

  const seoTitle = unitName
    ? `Grade de Aulas — ${unitName} | Pacer Academia`
    : "Grade de Aulas | Pacer Academia";
  const seoDescription =
    "Consulte a grade completa de aulas da Pacer Academia. Filtre por unidade e modalidade para encontrar os horários disponíveis.";

  useSeoMeta({ title: seoTitle, description: seoDescription });

  function setDay(day: ScheduleDay) {
    setParams(
      (p) => {
        const next = new URLSearchParams(p);
        next.set("dia", day);
        return next;
      },
      { replace: true }
    );
  }

  // Only fetch classes when a unit is selected
  const filteredClasses = unitSlug
    ? getFilteredClasses({
        unitSlug,
        modalityId: modalityId || undefined,
        publicoAlvo: (publico || undefined) as PublicoAlvo | undefined,
      })
    : [];

  return (
    <main>
      <ScheduleBanner />
      <ScheduleFilterBar />

      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Empty / select-prompt state */}
        {!unitSlug ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <CalendarDays
              className="mb-6 h-16 w-16 text-white/10"
              aria-hidden
              strokeWidth={1}
            />
            <h2 className="text-lg font-semibold text-white/50">
              Selecione uma unidade
            </h2>
            <p className="mt-2 max-w-xs text-sm text-white/30">
              Escolha uma unidade nos filtros acima para visualizar a grade de
              aulas.
            </p>
          </div>
        ) : filteredClasses.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <CalendarDays
              className="mb-6 h-16 w-16 text-white/10"
              aria-hidden
              strokeWidth={1}
            />
            <h2 className="text-lg font-semibold text-white/50">
              Nenhuma aula encontrada
            </h2>
            <p className="mt-2 max-w-xs text-sm text-white/30">
              Tente ajustar os filtros acima ou selecione outra modalidade.
            </p>
          </div>
        ) : (
          <>
            {/* Desktop timeline (≥1024px) */}
            <div className="hidden lg:block">
              <ScheduleDesktop
                classes={filteredClasses}
                highlightDay={selectedDay}
              />
            </div>

            {/* Mobile carousel + list (<1024px) */}
            <div className="lg:hidden">
              <ScheduleMobile
                classes={filteredClasses}
                selectedDay={selectedDay}
                onDayChange={setDay}
              />
            </div>
          </>
        )}
      </div>
    </main>
  );
}
