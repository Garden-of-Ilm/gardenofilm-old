export function formatAudioSize(memorySizeInBytes: number) {
  const sizeInKB: number = memorySizeInBytes / 1024;
  const sizeInMB: number = sizeInKB / 1024;

  let formattedSize: string;
  let unit: string;

  if (sizeInMB >= 1) {
    formattedSize = sizeInMB.toFixed(2);
    unit = "MB";
  } else {
    formattedSize = sizeInKB.toFixed(2);
    unit = "KB";
  }

  return `${formattedSize} ${unit}`;
}

export function calculateDurationInMinutes(duration: number) {
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;
  return `${minutes}:${seconds}`;
}
