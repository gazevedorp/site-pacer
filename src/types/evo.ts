export interface EvoActivity {
  idActivity: number;
  photo: string | null;
  name: string;
  color: string;
  activityGroup: string;
  totalRecords: number;
  inactive: boolean;
  description: string;
  idActivityGroup: number;
  showOnMobile: boolean;
  showOnWebsite: boolean;
  idBranch: number;
  audience: unknown[];
  idAudience: number | null;
  code: string | null;
}

export function isPublicActivity(activity: EvoActivity): boolean {
  return activity.showOnWebsite && !activity.inactive;
}

export const EVO_ACTIVITY_STATUS_CANCELLED = 7;

export interface EvoScheduleItem {
  idConfiguration: number;
  idActivity: number;
  idAtividadeSessao: number;
  idGroupActivity: number;
  name: string;
  description: string | null;
  imageUrl: string | null;
  area: string | null;
  idArea: number | null;
  capacity: number | null;
  ocupation: number;
  startTime: string | null;
  endTime: string | null;
  instructor: string | null;
  instructorPhoto: string | null;
  activityDate: string;
  audience: string | null;
  idAudience: number | null;
  status: number;
  statusName: string | null;
}
