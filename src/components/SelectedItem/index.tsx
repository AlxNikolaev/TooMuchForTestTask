import { FC } from "react";
import { Button, EButtonColors, EButtonSizes } from "../Button";
import styles from './index.module.scss'

export interface ISelectedItem {
	label: string
	onDelete: () => void
}

export const SelectedItem: FC<ISelectedItem> = ({label, onDelete}) => {
	return (
		<div className={styles.root}>
			<span className={styles.label}>{label}</span>
			<Button size={EButtonSizes.XS} onClick={onDelete} color={EButtonColors.transparent} label='X' /> 
		</div>
	)
}