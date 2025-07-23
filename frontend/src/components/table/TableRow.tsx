import React, { useCallback, useMemo } from 'react';
import styles from './Table.module.css';
import { ITableRowProps } from '../../interfaces/tableRowProps.interface';
import { TableCellInput } from './TableCellInput';
import { TableTextCellInput } from './TableTextCellInput';
import useParametersStore from '../../store/parameters.store';

export const TableRow = React.memo(
	({
		r,
		selectedRowId,
		handleRowClick,
		years,
		handleCellValueChange,
	}: ITableRowProps) => {
		const meanings = useMemo(() => r.meanings, [r.meanings]);

		// Получаем updateParameter напрямую из стора
		const updateParameter = useParametersStore(
			(state) => state.updateParameter,
		);

		const handleNameChange = useCallback(
			(value: string) => updateParameter(r.id, 'name', value),
			[r.id, updateParameter],
		);

		const handleUnitNameChange = useCallback(
			(value: string) => updateParameter(r.id, 'unit_name', value),
			[r.id, updateParameter],
		);

		const handleCellChange = useCallback(
			(year: string, value: any) =>
				handleCellValueChange(r.id, year, value),
			[r.id, handleCellValueChange],
		);

		const handleRowClickCallback = useCallback(
			() => handleRowClick(r.id),
			[r.id, handleRowClick],
		);

		return (
			<tr
				key={r.id}
				className={selectedRowId === r.id ? styles['selected-row'] : ''}
				onClick={handleRowClickCallback}
			>
				<td
					className={`${styles.fixed} ${styles.measure} ${styles.col1}`}
				>
					<TableTextCellInput
						initialValue={r.name}
						onChange={handleNameChange}
					/>
				</td>
				<td
					className={`${styles.fixed} ${styles.units} ${styles.col2}`}
				>
					<TableTextCellInput
						initialValue={r.unit_name}
						onChange={handleUnitNameChange}
					/>
				</td>
				{years.map((year) => (
					<td key={`${r.id}-${year}`}>
						<TableCellInput
							initialValue={meanings?.[year] ?? null}
							onValueChange={(value: any) =>
								handleCellChange(year, value)
							}
						/>
					</td>
				))}
			</tr>
		);
	},
);
