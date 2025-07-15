export type AnimeCardSize = "small" | "medium" | "large";

export const cardSizeClasses = {
  small: "h-48 sm:h-56 lg:h-64",
  medium: "h-64 sm:h-72 lg:h-92",
  large: "h-80 sm:h-96 lg:h-[32rem]",
} as const;

export const cardTextSizes = {
  small: {
    title: "text-2xs",
    subtitle: "text-3xs",
    overlayTitle: "text-xs",
    overlaySubtitle: "text-2xs",
  },
  medium: {
    title: "text-2xs",
    subtitle: "text-xs",
    overlayTitle: "text-sm",
    overlaySubtitle: "text-xs",
  },
  large: {
    title: "text-xs",
    subtitle: "text-sm",
    overlayTitle: "text-base",
    overlaySubtitle: "text-sm",
  },
} as const;
