import { useEffect, useCallback, useMemo } from 'react';
import styles from './Table.module.css';
import useParametersStore from '../../store/parameters.store';
import { useShallow } from 'zustand/shallow';
import { TableRow } from './TableRow';

export const Table = () => {
	const parameters = useParametersStore(
		useShallow((state) => state.getExistingParameters()),
	);
	const error = useParametersStore((state) => state.error);
	const selectedRowId = useParametersStore((state) => state.selectedRowId);
	const { fetchParameters, updateParameter, setSelectedRow } =
		useParametersStore.getState();

	const startYear = useMemo(() => 2026, []);
	const endYear = useMemo(() => 2040, []);
	const years = useMemo(
		() =>
			Array.from({ length: endYear - startYear + 1 }, (_, i) =>
				String(startYear + i),
			),
		[startYear, endYear],
	);

	const handleRowClick = useCallback(
		(id: number) => {
			setSelectedRow(id);
		},
		[setSelectedRow],
	);

	useEffect(() => {
		fetchParameters();
	}, [fetchParameters]);

	const handleCellValueChange = useCallback(
		(id: number, year: string, value: string) => {
			let storeValue: number | null = null;
			if (value === '') {
				storeValue = null;
			} else {
				const numericValue = parseFloat(value);
				storeValue = isNaN(numericValue) ? null : numericValue;
			}
			updateParameter(id, year, storeValue);
		},
		[updateParameter],
	);

	if (error) {
		return <div>Произошла ошибка при загрузке данных.</div>;
	}

	return (
		<div className={styles.container}>
			<table className={styles.table}>
				<thead className={`${styles.fixed} ${styles.head}`}>
					<tr>
						<th className={`${styles.fixed} ${styles.measure}`}>
							Показатель
						</th>
						<th className={`${styles.fixed} ${styles.units}`}>
							ед.изм.
						</th>
						{years.map((year) => (
							<th
								className={`${styles.fixed} ${styles.header}`}
								key={year}
							>
								{year}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{parameters.map((r) => (
						<TableRow
							key={r.id}
							r={r}
							selectedRowId={selectedRowId}
							handleRowClick={handleRowClick}
							years={years}
							handleCellValueChange={handleCellValueChange}
						/>
					))}
				</tbody>
			</table>
		</div>
	);
};
