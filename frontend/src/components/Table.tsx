import { useEffect } from 'react';
import './Table.css';
import useParameterStore from '../store/parameters.store';
import { TableCellInput } from './TableCellInput';

export const Table = () => {
	const {
		parameters,
		error,
		selectedRow,
		fetchParameters,
		updateParameter,
		setSelectedRow,
	} = useParameterStore();

	const startYear = 2026;
	const endYear = 2040;
	const years = Array.from({ length: endYear - startYear + 1 }, (_, i) =>
		String(startYear + i),
	);

	const handleRowClick = (id: number) => {
		setSelectedRow(id);
		console.log(id);
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
		<div className="table__container">
			<table className="table">
				<thead className="table__head">
					<tr>
						<th className="fixed table__measure">Показатель</th>
						<th className="fixed table__units">ед.изм.</th>
						{years.map((year) => (
							<th className="scroll-header" key={year}>
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
								selectedRow === r.id ? 'selected-row' : ''
							}
							onClick={() => handleRowClick(r.id)}
						>
							<td className="fixed table__measure col1">
								{r.name}
							</td>
							<td className="fixed table__units col2">
								{r.unit_name}
							</td>
							{years.map((year) => {
								return (
									<td
										className="scroll-cell"
										key={`${r.id}-${year}`}
									>
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
