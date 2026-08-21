import { describe, expect, jest, test } from '@jest/globals';
import { act, renderHook } from '@testing-library/react';

import { ComboboxField, DateRangeField, DropdownField, TextInputField } from '@/components/dynamic-form/components';
import { type FilterFieldProps, useFilterField } from '@/components/dynamic-form/components';

describe('useFilterField Custom Hook', () => {
  const createMockProps = (type: 'dropdown' | 'date_range' | 'text', multiple = false): FilterFieldProps => ({
    filterKey: 'Region',
    filterItem: {
      title: 'Region',
      type,
      required: true,
      data: [],
      props: {
        placeholder: 'Select option...',
        multiple,
      },
    },
    value: undefined,
    onChange: jest.fn(),
    onRemove: jest.fn(),
  });

  test('should render a ComboboxField when type is a single-select dropdown', () => {
    const props = createMockProps('dropdown');
    const { result } = renderHook(() => useFilterField(props));

    expect(result.current.Component.type).toBe(ComboboxField);
  });

  test('should render a DropdownField when type is a multi-select dropdown', () => {
    const props = createMockProps('dropdown', true);
    const { result } = renderHook(() => useFilterField(props));

    expect(result.current.Component.type).toBe(DropdownField);
  });

  test('should render a DateRangeField when type is date_range', () => {
    const props = createMockProps('date_range');
    const { result } = renderHook(() => useFilterField(props));

    expect(result.current.Component.type).toBe(DateRangeField);
  });

  test('should render a TextInputField when type is text', () => {
    const props = createMockProps('text');
    const { result } = renderHook(() => useFilterField(props));

    expect(result.current.Component.type).toBe(TextInputField);
  });

  test('should send the new value up to the parent component when a change happens', () => {
    const props = createMockProps('dropdown');
    const { result } = renderHook(() => useFilterField(props));

    act(() => {
      result.current.Component.props.onChange('AMER');
    });

    expect(props.onChange).toHaveBeenCalledWith('Region', 'AMER');
  });

  test('should tell the parent component to remove this filter field', () => {
    const props = createMockProps('dropdown');
    const { result } = renderHook(() => useFilterField(props));

    act(() => {
      result.current.handleRemove();
    });

    expect(props.onRemove).toHaveBeenCalledWith('Region');
  });
});
