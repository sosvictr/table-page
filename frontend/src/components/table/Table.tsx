import { useEffect } from 'react';
import styles from './Table.module.css';
import useParametersStore from '../../store/parameters.store';
import { TableCellInput } from './TableCellInput';
import { useShallow } from 'zustand/shallow';

export const Table = () => {
	const parameters = useParametersStore(
		useShallow((state) => state.getExistingParameters()),
	);
	const error = useParametersStore((state) => state.error);
	const selectedRowId = useParametersStore((state) => state.selectedRowId);
	const { fetchParameters, updateParameter, setSelectedRow } =
		useParametersStore.getState();

	const startYear = 2026;
	const endYear = 2040;
	const years = Array.from({ length: endYear - startYear + 1 }, (_, i) =>
		String(startYear + i),
	);

	const handleRowClick = (id: number) => {
		setSelectedRow(id);
	};

	useEffect(() => {
		fetchParameters();
	}, [fetchParameters]);

	const handleCellValueChange = (id: number, year: string, value: string) => {
		let storeValue: number | null = null;
		if (value === '') {
			storeValue = null;
		} else {
			const numericValue = parseFloat(value);
			storeValue = isNaN(numericValue) ? null : numericValue;
		}
		updateParameter(id, year, storeValue);
	};

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
						<tr
							key={r.id}
							className={
								selectedRowId === r.id
									? styles['selected-row']
									: ''
							}
							onClick={() => handleRowClick(r.id)}
						>
							<td
								className={`${styles.fixed} ${styles.measure} ${styles.col1}`}
							>
								<input
									type="text"
									value={r.name}
									onChange={(e) =>
										updateParameter(
											r.id,
											'name',
											e.target.value,
										)
									}
									className={styles['col-input']}
								/>
							</td>
							<td
								className={`${styles.fixed} ${styles.units} ${styles.col2}`}
							>
								<input
									type="text"
									value={r.unit_name}
									onChange={(e) =>
										updateParameter(
											r.id,
											'unit_name',
											e.target.value,
										)
									}
									className={styles['col-input']}
								/>
							</td>
							{years.map((year) => {
								return (
									<td key={`${r.id}-${year}`}>
										<TableCellInput
											initialValue={
												r.meanings?.[year] ?? null
											}
											onValueChange={(value: any) =>
												handleCellValueChange(
													r.id,
													year,
													value,
												)
											}
										/>
									</td>
								);
							})}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};
