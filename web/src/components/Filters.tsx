import { useFilters } from '../context';
import React from 'react';
import { Liked, Visibility } from 'server/src/types';

export const Filters = () => {
  const { liked, visibility } = useFilters();
  return (
    <div className="row">
      <details>
        <summary>Filters</summary>
        <p>
          <div className="filters">
            <div>
              <span>Visibility</span>
              <select onChange={visibility.onFilterChange} defaultValue={visibility.filter.value}>
                <option key="all" value={''}>
                  All
                </option>
                <option key={Visibility.PUBLIC} value={Visibility.PUBLIC}>
                  Public
                </option>
                <option key={Visibility.PRIVATE} value={Visibility.PRIVATE}>
                  Private
                </option>
              </select>
            </div>
            <div>
              <span>Liked</span>
              <select onChange={liked.onFilterChange} defaultValue={liked.filter.value}>
                <option key="all" value={''}>
                  All
                </option>
                <option key={Liked.LIKED} value={Liked.LIKED}>
                  Liked
                </option>
                <option key={Liked.NOT_LIKED} value={Liked.NOT_LIKED}>
                  Not Liked
                </option>
              </select>
            </div>
          </div>
        </p>
      </details>
    </div>
  );
};
