import { MediaModel } from "~/models/media.model";

export interface IMediaItem {
  image: MediaModel;
  onClick: (image: any) => void;
}
