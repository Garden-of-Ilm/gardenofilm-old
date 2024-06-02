import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toKebabCase(input: string): string {
  const filteredString = input
    .replace(/[^\p{L}\p{N}\s,-]/gu, "")
    .toLowerCase()
    .replace(",", "");

  return filteredString
    .replace(/([^\p{L}a-z])([^\p{L}a-z])/gu, "$1-$2")
    .replace(/\s+/g, "-")
    .toLowerCase();
}

export function formatDate(dateString?: string) {
  if (!dateString) return "";
  const dateObject = new Date(dateString);
  return dateObject.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

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

export function calculateDurationInMinutes(time: number) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  const formattedMinutes = String(minutes).padStart(1, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");
  return `${formattedMinutes}:${formattedSeconds}`;
}

export function formatAdditionalReferences(reference?: string) {
  if (!reference) return "";
  const userInput = reference.trim();

  const containsLinks = /https?:\/\/\S+/gi.test(userInput);

  const formattedHTML = containsLinks
    ? userInput.replace(
        /(https?:\/\/\S+)/gi,
        '<a href="$1" style="color: blue;">$1</a>',
      ) // Replace links with <a> tags
    : "<p>" + userInput?.replace(/\n/g, "<br>") + "</p>"; // Wrap the input in <p> tags and handle line breaks

  return formattedHTML;
}

export function convertGoogleDriveLinkToDownloadLink(link: string): string {
  const regex = /\/d\/([^/]+)\/view/;
  const match = link.match(regex);
  if (match && match[1]) {
    return `https://drive.google.com/uc?export=download&id=${match[1]}`;
  }
  return "";
}

export function convertDropboxLinkToAudioSrcLink(link: string) {
  return link.replace("&dl=0", "").replace("www.", "dl.");
}

export function isTokenExpired(token?: string) {
  if (!token) return;
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join(""),
  );
  const { exp } = JSON.parse(jsonPayload);
  return Date.now() >= exp * 1000;
}
