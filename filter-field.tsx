import './filter-field.css';

import { Icon } from '@/ds-components';

import { type FilterFieldProps, useFilterField } from './use-filter-field';

export const FilterField = (props: FilterFieldProps) => {
  const { filterKey, filterItem } = props;
  const { Component, handleRemove } = useFilterField(props);

  if (!Component) {
    return <div key={filterKey}>Filter type ({filterItem?.type}) is not implemented</div>;
  }

  return (
    <div className="filter-field">
      <div className="filter-field-header">
        <div>{filterItem?.title ?? ''}</div>
        {!filterItem?.required && <Icon name="nav_close_alt" size="md" onClick={handleRemove} />}
      </div>

      {Component}
    </div>
  );
};
