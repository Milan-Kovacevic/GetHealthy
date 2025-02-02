export const addMinutesToTime = (
  startTime: string | Date,
  duration: number
): string => {
  var programStart: Date = new Date();
  if (startTime instanceof Date) {
    programStart = startTime;
  }

  if (typeof startTime == "string") {
    const [startHour, startMinute] = startTime.split(":").map(Number);
    programStart.setHours(startHour, startMinute, 0, 0);
  }

  const programEnd = new Date(programStart.getTime() + duration * 60000);

  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const startTimeFormatted = formatTime(programStart);
  const endTimeFormatted = formatTime(programEnd);

  const timeRange = `${startTimeFormatted} - ${endTimeFormatted}`;
  return timeRange;
};

export const addMinutesToDate = (
  startDate: string,
  duration: number
): string => {
  var programStart: Date = new Date(startDate);
  const programEnd = new Date(programStart.getTime() + duration * 60000);

  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const startTimeFormatted = formatTime(programStart);
  const endTimeFormatted = formatTime(programEnd);

  const timeRange = `${startTimeFormatted} - ${endTimeFormatted}`;
  return timeRange;
};

export const parseTimeStringToDate = (timeString: string): Date => {
  const [hours, minutes] = timeString.split(":").map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return date;
};
