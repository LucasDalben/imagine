// Maps story IDs (slugs) to locally bundled cover images.
// When a local image is present it takes priority over the remote coverImage URL,
// and the emoji overlay is suppressed in all story-card/detail components.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const LOCAL_COVER_IMAGES: Record<string, any> = {
  'o-grande-dia-do-caju': require('@/assets/historia_um_o_despertar_.png'),
};

type ImageSource = number | { uri: string };

/** Returns the best available image source for a story. */
export function getStoryCoverSource(id: string, remoteUrl?: string | null): ImageSource | null {
  if (LOCAL_COVER_IMAGES[id] != null) {
    return LOCAL_COVER_IMAGES[id];
  }
  if (remoteUrl) {
    return { uri: remoteUrl };
  }
  return null;
}

/** True when the story has a locally bundled cover image. */
export function hasLocalCoverImage(id: string): boolean {
  return id in LOCAL_COVER_IMAGES;
}
