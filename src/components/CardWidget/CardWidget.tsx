import React, { useState } from "react";
import styles from "./CardWidget.module.scss";
import { ItemSelector } from "../ItemSelector";
import { useCardWidget } from "./useCardWidget";
import { SelectedItem } from "../SelectedItem";
import { Button, EButtonColors, EButtonSizes } from "../Button";

const CardWidget: React.FC = () => {
  const { onSave, testItemsList, selectedItems, deleteItem } = useCardWidget();
  const [isSelectorVisible, setIsSelectorVisible] = useState(true);

  const onClose = () => {
    setIsSelectorVisible(false);
  };

  const onCancel = () => {
    onClose();
  };

  const handleSave = (selectedItems: number[]) => {
    onSave(selectedItems)
    setIsSelectorVisible(false)
  }

  return (
    <div className={styles.cardWidget}>
      <header>Select Items</header>
      <div className={styles.selectedItems}>
        {Array.from(selectedItems).map((item, index) => (
          <SelectedItem
            onDelete={() => deleteItem(item)}
            key={index}
            label={testItemsList[item].value}
          />
        ))}
      </div>
      {!isSelectorVisible && (
        <Button
          onClick={() => setIsSelectorVisible(true)}
          label="Change selection"
          color={EButtonColors.green}
          size={EButtonSizes.M}
        />
      )}
      {isSelectorVisible && (
        <ItemSelector
          parentSelectedItems={Array.from(selectedItems)}
          items={testItemsList}
          onSave={handleSave}
          onCancel={onCancel}
          onClose={onClose}
        />
      )}
    </div>
  );
};

export default CardWidget;
