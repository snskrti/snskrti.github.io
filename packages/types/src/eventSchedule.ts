export interface ScheduleItem {
  id: string;
  time: string;
  title: string;
  description: string;
}

export interface DaySchedule {
  date: string;
  day: string;
  scheduleItems: ScheduleItem[];
}