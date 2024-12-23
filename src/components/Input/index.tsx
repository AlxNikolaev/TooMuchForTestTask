import { FC } from "react";

export interface IInputProps {
  value: string;
  onChange: (newBalue: string) => void;
}

export const Input: FC<IInputProps> = ({ value, onChange }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};
