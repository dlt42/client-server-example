import React, { ChangeEvent, ReactNode, useCallback, useContext, useState } from 'react';
import { Filter, LikedFilter, VisibilityFilter } from '../shared';

type UseFilterResult<T extends Filter> = {
  filter: T;
  setFilter: React.Dispatch<React.SetStateAction<T>>;
  onFilterChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

type FilterContextValue = {
  liked: UseFilterResult<LikedFilter>;
  visibility: UseFilterResult<VisibilityFilter>;
};

const FilterContext = React.createContext<FilterContextValue>(null!);

const useFilter = <T extends Filter>(value: T): UseFilterResult<T> => {
  const [filter, setFilter] = useState<T>(value);
  const onFilterChange = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    setFilter({ value: event.target.value, name: value.name } as T);
  }, []);
  return { filter, setFilter, onFilterChange };
};

export function FilterProvider({ children }: { children: ReactNode }) {
  const liked = useFilter<LikedFilter>({ name: 'liked', value: '' });
  const visibility = useFilter<VisibilityFilter>({ name: 'visibility', value: '' });
  return <FilterContext.Provider value={{ liked, visibility }}>{children}</FilterContext.Provider>;
}

export const useFilters = () => useContext(FilterContext);
