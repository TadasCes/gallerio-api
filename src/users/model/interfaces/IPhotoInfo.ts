import { IDimensions } from "./IDimensions";

export interface IPhotoInfo {
  cameraBrand?: string  
  cameraModel?: string
  focalLength?: string
  aperture?: string
  shutterSpeed?: string
  iso?: string
  dimmensions?: IDimensions
}