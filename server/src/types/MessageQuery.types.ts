import { Liked, Visibility } from "./";

export type VisibilityFilterValue = Visibility.PRIVATE | Visibility.PUBLIC | '';

export type LikedFilterValue = Liked.LIKED | Liked.NOT_LIKED | '';

export type MessageQuery = {
  visibility: VisibilityFilterValue;
  liked: LikedFilterValue;
};

