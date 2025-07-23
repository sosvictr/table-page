import React, { useCallback, useEffect, useState } from 'react';
import styles from './Table.module.css';

export const TableTextCellInput = React.memo(
	({
		initialValue,
		onChange,
	}: {
		initialValue: any;
		onChange: (value: string) => void;
	}) => {
		const [inputValue, setInputValue] = useState(initialValue);

		useEffect(() => {
			setInputValue(initialValue);
		}, [initialValue]);

		const handleChange = useCallback(
			(e: React.ChangeEvent<HTMLInputElement>) => {
				setInputValue(e.target.value);
			},
			[setInputValue],
		);

		const handleBlur = useCallback(() => {
			onChange(inputValue);
		}, [onChange, inputValue]);

		return (
			<input
				type="text"
				value={inputValue}
				onChange={handleChange}
				onBlur={handleBlur}
				className={styles['col-input']}
			/>
		);
	},
);
