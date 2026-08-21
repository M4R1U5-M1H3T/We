import type { ReactElement } from 'react';

import type { FilterDefinition } from '@/components';

import { ComboboxField } from '../combobox-field';
import { DateRangeField } from '../date-range-field';
import { DropdownField } from '../dropdown-field';
import { TextInputField } from '../text-input-field';

export interface FilterFieldProps {
  filterKey: string;
  filterItem: FilterDefinition;
  value: string | undefined;
  onChange: (filterKey: string, value: string) => void;
  onRemove: (filterKey: string) => void;
}

export const useFilterField = (props: FilterFieldProps) => {
  const { filterKey, filterItem, value, onChange, onRemove } = props;

  const handleChange = (newValue: string) => {
    onChange(filterKey, newValue);
  };

  const handleRemove = () => {
    onRemove(filterKey);
  };

  // Each entry is already a fully-built element with exactly the props that field
  // needs - reading componentsByType[filterItem.type] tells you both which
  // component renders this filter and what it's given, no separate lookup needed.
  // Adding a new filter type later is just one more entry here.
  const componentsByType: Record<string, ReactElement> = {
    dropdown: filterItem.props?.multiple ? (
      <DropdownField
        data={filterItem.data}
        value={value}
        placeholder={filterItem.props?.placeholder}
        multiple
        clearable
        onChange={handleChange}
      />
    ) : (
      <ComboboxField
        data={filterItem.data}
        value={value}
        placeholder={filterItem.props?.placeholder}
        clearable
        onChange={handleChange}
      />
    ),
    date_range: <DateRangeField value={value} clearable onChange={handleChange} />,
    text: <TextInputField value={value} placeholder={filterItem.props?.placeholder} onChange={handleChange} />,
  };

  const Component = componentsByType[filterItem.type];

  return {
    Component,
    handleRemove,
  };
};
