import { LikedFilterValue, VisibilityFilterValue } from 'server/src/types/MessageQuery.types';

export type VisibilityFilter = {
  name: 'visibility';
  value: VisibilityFilterValue;
};

export type LikedFilter = {
  name: 'liked';
  value: LikedFilterValue;
};

export type Filter = VisibilityFilter | LikedFilter;


