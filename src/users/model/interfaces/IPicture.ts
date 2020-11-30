import { IPhotoInfo } from "./IPhotoInfo";

export interface IPicture {
  url: string;
  views: number
  // TODO pridet komentarus ir like'us
  description?: string;
  photoInfo?: IPhotoInfo
}