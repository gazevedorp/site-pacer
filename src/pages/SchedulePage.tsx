import { useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { CalendarDays } from "lucide-react";
import { useSeoMeta } from "@/hooks/useSeoMeta";
import { useActivities } from "@/hooks/evo/useActivities";
import { useActivitySchedule } from "@/hooks/evo/useActivitySchedule";
import { getEvoBranch } from "@/lib/evo/branches";
import {
  mapScheduleItem,
  uniqueScheduleModalities,
} from "@/lib/evo/mappers/schedule";
import {
  getTodayScheduleDay,
  type ScheduleDay,
} from "@/data/schedule";
import { readScheduleFilters } from "@/components/sections/Schedule/ScheduleFilterBar";
import { ScheduleBanner } from "@/components/sections/Schedule/ScheduleBanner";
import { ScheduleFilterBar } from "@/components/sections/Schedule/ScheduleFilterBar";
import { ScheduleDesktop } from "@/components/sections/Schedule/ScheduleDesktop";
import { ScheduleMobile } from "@/components/sections/Schedule/ScheduleMobile";
import { CmsLoading } from "@/components/shared/CmsStates";

export default function SchedulePage() {
  const [params, setParams] = useSearchParams();
  const { unitSlug, modalityId } = readScheduleFilters(params);
  const selectedDay =
    (params.get("dia") as ScheduleDay | null) ?? getTodayScheduleDay();

  useEffect(() => {
    if (!params.has("publico")) return;
    setParams(
      (p) => {
        const next = new URLSearchParams(p);
        next.delete("publico");
        return next;
      },
      { replace: true }
    );
  }, [params, setParams]);

  const selectedBranch = unitSlug ? getEvoBranch(unitSlug) : undefined;
  const unitName = selectedBranch ? `Pacer ${selectedBranch.name}` : undefined;
  const idBranch = selectedBranch?.idBranch;

  const { data: activities } = useActivities();
  const {
    data: scheduleItems,
    isLoading,
    error,
  } = useActivitySchedule(idBranch);

  const activityById = useMemo(() => {
    const map = new Map(activities.map((activity) => [activity.idActivity, activity]));
    return map;
  }, [activities]);

  const classes = useMemo(() => {
    if (!unitSlug) return [];
    const items = Array.isArray(scheduleItems) ? scheduleItems : [];
    return items.map((item) =>
      mapScheduleItem(item, unitSlug, activityById.get(item.idActivity))
    );
  }, [scheduleItems, unitSlug, activityById]);

  const modalities = useMemo(() => uniqueScheduleModalities(classes), [classes]);

  const filteredClasses = useMemo(() => {
    return classes.filter((cls) => {
      if (modalityId && cls.modalityId !== modalityId) return false;
      return true;
    });
  }, [classes, modalityId]);

  const seoTitle = unitName
    ? `Grade de Aulas — ${unitName} | Pacer Academia`
    : "Grade de Aulas | Pacer Academia";

  useSeoMeta({
    title: seoTitle,
    description:
      "Consulte a grade completa de aulas da Pacer Academia. Filtre por unidade e modalidade para encontrar os horários disponíveis.",
    canonical: "/aulas",
  });

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

  const showLoading = Boolean(unitSlug && idBranch && isLoading);

  return (
    <main>
      <ScheduleBanner />
      <ScheduleFilterBar modalities={modalities} />

      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {!unitSlug ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <CalendarDays
              className="mb-6 h-16 w-16 text-muted"
              aria-hidden
              strokeWidth={1}
            />
            <h2 className="text-lg font-semibold text-muted-foreground">
              Selecione uma unidade
            </h2>
            <p className="mt-2 max-w-xs text-sm text-muted-foreground/70">
              Escolha uma unidade nos filtros acima para visualizar a grade de
              aulas.
            </p>
          </div>
        ) : showLoading ? (
          <CmsLoading className="py-24" />
        ) : error ? (
          <p className="py-24 text-center text-sm text-muted-foreground" role="alert">
            Não foi possível carregar a grade. Tente novamente em instantes.
          </p>
        ) : filteredClasses.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <CalendarDays
              className="mb-6 h-16 w-16 text-muted"
              aria-hidden
              strokeWidth={1}
            />
            <h2 className="text-lg font-semibold text-muted-foreground">
              Nenhuma aula encontrada
            </h2>
            <p className="mt-2 max-w-xs text-sm text-muted-foreground/70">
              Tente ajustar os filtros acima ou selecione outra modalidade.
            </p>
          </div>
        ) : (
          <>
            <div className="hidden lg:block">
              <ScheduleDesktop
                classes={filteredClasses}
                highlightDay={selectedDay}
              />
            </div>
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
