import React, { useState, useEffect, useCallback } from 'react';
import styles from './TableCellInput.module.css';

export const TableCellInput: React.FC<{
	initialValue: number | null;
	onValueChange: (value: string) => void;
}> = React.memo(({ initialValue, onValueChange }) => {
	const [inputValue, setInputValue] = useState<string>(
		initialValue === null || initialValue === undefined
			? '-'
			: String(initialValue),
	);
	const [isFocused, setIsFocused] = useState(false);

	useEffect(() => {
		if (!isFocused) {
			setInputValue(
				initialValue === null || initialValue === undefined
					? '-'
					: String(initialValue),
			);
		}
	}, [initialValue, isFocused]);

	const handleInputChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setInputValue(e.target.value);
		},
		[setInputValue],
	);

	const handleInputFocus = useCallback(() => {
		setIsFocused(true);
		if (inputValue === '-') {
			setInputValue('');
		}
	}, [setIsFocused, setInputValue, inputValue]);

	const handleInputBlur = useCallback(() => {
		setIsFocused(false);
		let finalValue: string;

		if (inputValue === '') {
			finalValue = '';
			setInputValue('-');
		} else {
			const numericValue = parseFloat(inputValue);
			if (isNaN(numericValue)) {
				setInputValue('-');
				finalValue = '';
			} else {
				finalValue = String(numericValue);
				setInputValue(String(numericValue));
			}
		}
		onValueChange(finalValue);
	}, [inputValue, onValueChange]);

	return (
		<input
			type="text"
			value={inputValue}
			onChange={handleInputChange}
			onFocus={handleInputFocus}
			onBlur={handleInputBlur}
			className={styles.input}
		/>
	);
});
