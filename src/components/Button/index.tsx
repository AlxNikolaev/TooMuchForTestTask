import { FC } from "react";
import styles from "./index.module.scss";
import cn from "classnames";

export enum EButtonColors {
  green = "green",
  red = "red",
  transparent = "transparent",
}

export enum EButtonSizes {
  XS = "XS",
  M = "M",
}

export interface IButtonProps {
  label: string;
  color: EButtonColors;
  onClick: () => void;
  size?: EButtonSizes;
}

export const Button: FC<IButtonProps> = ({ label, color, size, onClick }) => {
  return (
    <button
      className={cn(styles.root, styles[color], size ? styles[size] : styles.M)}
      onClick={() => {
        onClick();
      }}
    >
      {label}
    </button>
  );
};
