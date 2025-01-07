export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const parseTime = (timeString: string): number => {
  const [mins, secs] = timeString.split(':').map(Number);
  return mins * 60 + secs;
};