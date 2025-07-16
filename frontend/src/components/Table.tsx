import { useEffect } from 'react';
import './Table.css';
import useParameterStore from '../store/parameters.store';

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

	const handleCellChange = (id: number, year: string, value: string) => {
		let newValue: number | null = null;
		if (value === '') {
			newValue = null;
		} else {
			const numericValue = parseFloat(value);
			newValue = isNaN(numericValue) ? 0 : numericValue;
		}
		updateParameter(id, year, newValue);
	};

	if (error) {
		return <div>Произошла ошибка при загрузке данных.</div>;
	}

	return (
		<div className="table__container">
			<div className="table__wrapper">
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
								{years.map((year) => (
									<td
										className="scroll-cell"
										key={`${r.id}-${year}`}
									>
										<input
											type="text"
											value={r.meanings?.[year] ?? '-'}
											onChange={(e) =>
												handleCellChange(
													r.id,
													year,
													e.target.value,
												)
											}
											className="cell-input"
										/>
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};
