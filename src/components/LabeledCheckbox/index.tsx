import { FC } from "react";
import styles from './index.module.scss'

export interface ILabeledCheckboxProps {
	label: string
	onSelect: (value: boolean) => void
	disabled: boolean
	checked: boolean
}

export const LabeledCheckbox: FC<ILabeledCheckboxProps> = ({label, onSelect, disabled, checked}) => {
	return (
		<span className={styles.root}>
			<input checked={checked} disabled={disabled} type="checkbox" onChange={(e) => onSelect(e.target.checked)} />
			<span>
				{label} 
			</span>
		</span>
	)
}