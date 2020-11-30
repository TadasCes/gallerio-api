import { IPicture } from "./IPicture";

export interface IGallery {
  pictures?: IPicture[]
  pictureCount: number
  galleryDescription?: string
}