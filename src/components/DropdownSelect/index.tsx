import { FC } from "react";

export interface IDropdownSelectOption {
	value: number
	label: string
}

export interface IDropdownSelectProps {
	options: IDropdownSelectOption[]
	onChange: (newValue: number) => void
}

export const DropdownSelect: FC<IDropdownSelectProps> = ({options, onChange}) => {
	return (
		<select onChange={(e) => onChange(Number(e.target.value))}>
			{ options.map((option, index) => (
				<option value={option.value} key={index}>{option.label}</option>
			)) }
		</select>
	)
}