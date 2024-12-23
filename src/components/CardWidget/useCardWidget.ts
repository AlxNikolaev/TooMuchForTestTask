import { useState } from "react";

const ARRAY_LENGTH = 300;

export interface IItem {
  value: string;
  index: number;
}

const testItemsList: IItem[] = new Array(ARRAY_LENGTH)
  .fill(null)
  .map((_, index) => ({
    value: `Element ${index + 1}`,
    index,
  }));

export const useCardWidget = () => {
  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());

  const onSave = (itemsToSave: number[]) => {
    setSelectedItems(new Set(itemsToSave));
  };

  const deleteItem = (index: number) => {
    const copy = new Set(selectedItems);
    copy.delete(index);
    setSelectedItems(copy);
  };

  return {
    selectedItems,
    testItemsList,
    onSave,
    deleteItem,
  };
};
