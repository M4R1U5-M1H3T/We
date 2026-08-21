import type { ComponentType } from 'react';

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
  const { filterKey, filterItem, onChange, onRemove } = props;

  // Built per-call so each entry can use filterItem directly (e.g. dropdown's
  // multi-select case) instead of a growing chain of ternaries outside the map.
  // Adding a new filter type later is just one more entry here.
  const componentsByType: Record<string, ComponentType<any>> = {
    // Multi-select dropdowns keep the tag-based Select; single-select dropdowns get
    // free text support (besides the default choices) via the ComboboxField.
    dropdown: filterItem.props?.multiple ? DropdownField : ComboboxField,
    date_range: DateRangeField,
    text: TextInputField,
  };

  const Component = componentsByType[filterItem.type];

  const handleChange = (newValue: string) => {
    onChange(filterKey, newValue);
  };

  const handleRemove = () => {
    onRemove(filterKey);
  };

  return {
    Component,
    handleChange,
    handleRemove,
  };
};
