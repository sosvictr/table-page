import React, { useState, useEffect } from 'react';
import { ITableCellProps } from '../interfaces/tablecell.interface';

export const TableCellInput: React.FC<ITableCellProps> = ({
	initialValue,
	onValueChange,
}) => {
	const [inputValue, setInputValue] = useState<string>(
		initialValue === null ? '-' : initialValue,
	);
	const [isFocused, setIsFocused] = useState(false);

	useEffect(() => {
		if (!isFocused) {
			setInputValue(initialValue === null ? '-' : initialValue);
		}
	}, [initialValue, isFocused]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
	};

	const handleInputFocus = () => {
		setIsFocused(true);
		if (inputValue === '-') {
			setInputValue('');
		}
	};

	const handleInputBlur = () => {
		setIsFocused(false);
		let finalValue: string;

		if (inputValue === '') {
			finalValue = '';
			setInputValue('-');
		} else {
			finalValue = inputValue;
			const numericValue = parseFloat(inputValue);
			if (isNaN(numericValue) && inputValue !== '-') {
				setInputValue('-');
				finalValue = '';
			}
		}
		onValueChange(finalValue);
	};

	return (
		<input
			type="text"
			value={inputValue}
			onChange={handleInputChange}
			onFocus={handleInputFocus}
			onBlur={handleInputBlur}
			className="cell-input"
		/>
	);
};
