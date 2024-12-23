import { FC, useEffect, useMemo, useState } from "react";
import styles from "./index.module.scss";
import { Button, EButtonColors, EButtonSizes } from "../Button";
import { LabeledCheckbox } from "../LabeledCheckbox";
import { SelectedItem } from "../SelectedItem";
import { Input } from "../Input";
import { IItem } from "../CardWidget/useCardWidget";
import { DropdownSelect, IDropdownSelectOption } from "../DropdownSelect";

const MAX_SELECTION = 3;
const SELECT_OPTIONS: IDropdownSelectOption[] = [
  {
    value: -1,
    label: 'No filter'
  },
  {
    value: 10,
    label: '>10'
  },
  {
    value: 100,
    label: '>100'
  },
  {
    value: 200,
    label: '>200'
  }
]

export interface IItemSelectorProps {
  items: IItem[];
  parentSelectedItems: number[];
  onSave: (selectedItemsIndexes: number[]) => void;
  onCancel: () => void;
  onClose: () => void;
}

export const ItemSelector: FC<IItemSelectorProps> = ({
  items,
  onSave,
  onCancel,
  onClose,
  parentSelectedItems
}) => {
  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());
  const [areCheckboxesDisabled, setAreCheckboxesDisabled] = useState(false);
  const [searchValue, setSearchValue] = useState('')
  const [filterValue, setFilterValue] = useState(-1)

  useEffect(() => {
    const copy = new Set(parentSelectedItems);
    setSelectedItems(copy);
  }, [parentSelectedItems]);

  const filteredItems = useMemo(() => {
    let result = items.filter((item) =>
      item.value.toLowerCase().includes(searchValue.toLowerCase())
    );
    if (filterValue) {
      result = result.filter((item) => item.index > filterValue);
    }
    return result;
  }, [items, searchValue, filterValue]);

  const updateSet = (selectedIndex: number, value: boolean) => {
    const copy = new Set(selectedItems);

    if (value) {
      setSelectedItems(copy.add(selectedIndex));
      if (copy.size >= MAX_SELECTION) {
        setAreCheckboxesDisabled(true);
      }
      return;
    }

    copy.delete(selectedIndex);
    setSelectedItems(copy);
    if (copy.size < MAX_SELECTION && areCheckboxesDisabled) {
      setAreCheckboxesDisabled(false);
    }
  };

  return (
    <div className={styles.selectBox}>
      <div className={styles.header}>
        <h3>Select items</h3>
        <Button
          size={EButtonSizes.XS}
          onClick={() => onClose()}
          color={EButtonColors.transparent}
          label="X"
        />
      </div>
      <div className={styles.filters}>
        <Input value={searchValue} onChange={(newValue) => setSearchValue(newValue)} />
        <DropdownSelect options={SELECT_OPTIONS} onChange={(filterValue) => setFilterValue(filterValue)} />
      </div>
      <div className={styles.scrollBox}>
        {filteredItems.map((el, index) => (
          <LabeledCheckbox
            disabled={!selectedItems.has(el.index) && areCheckboxesDisabled}
            onSelect={(value) => updateSet(el.index, value)}
            checked={selectedItems.has(el.index)}
            key={index}
            label={el.value}
          />
        ))}
      </div>
      {selectedItems.size > 0 && (
        <div className={styles.selectedItems}>
          <h4>Current selected items:</h4>
          <div className={styles.items}>
            {Array.from(selectedItems).map((itemIndex, i) => (
              <SelectedItem
                label={items[itemIndex].value}
                key={i}
                onDelete={() => updateSet(itemIndex, false)}
              />
            ))}
          </div>
        </div>
      )}
      <div className={styles.actions}>
        <Button
          onClick={() => onSave(Array.from(selectedItems))}
          label="Save"
          color={EButtonColors.green}
        />
        <Button
          onClick={() => onCancel()}
          label="Cancel"
          color={EButtonColors.red}
        />
      </div>
    </div>
  );
};
