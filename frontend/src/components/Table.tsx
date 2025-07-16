import { useEffect, useState } from 'react';
import './Table.css';
import axios, { AxiosError } from 'axios';
import { IParameter } from '../interfaces/parameter.interface';

export const Table = () => {
	const [results, setResult] = useState<IParameter[]>([]);
	const [error, setError] = useState('');
	const startYear = 2026;
	const endYear = 2040;
	const years = Array.from({ length: endYear - startYear + 1 }, (_, i) =>
		String(startYear + i),
	);

	const [selectedRow, setSelectedRow] = useState(null);

	const handleRowClick = (id: any, e: any) => {
		setSelectedRow(id === selectedRow ? null : id);
		console.log(id);
	};

	//Retrieve
	async function fetchIndicators() {
		try {
			setError('');
			const response = await axios.get<IParameter[]>(
				'http://localhost:3000/parameters',
			);
			if (response.data) setResult(response.data);
		} catch (e: unknown) {
			const error = e as AxiosError;
			setError(error.message);
			console.log({ error });
		}
	}

	useEffect(() => {
		fetchIndicators();
	}, []);

	const [val, setValue] = useState<IParameter[]>(results);

	const handleCellChange = (id: number, year: string, value: any) => {
		setValue((prevResults: IParameter[]) =>
			prevResults.map((r) =>
				r.id === id
					? {
							...r,
							meanings: {
								...r.meanings,
								[year]: value,
							},
					  }
					: r,
			),
		);
	};

	// //Add
	// const addIndicators = async (indicator) => {
	// 	console.log(indicator);
	// 	const request = {
	// 		id: 0,
	// 		...indicator,
	// 	};
	// 	const response = await api.post('/indicators', request);
	// 	setData([...indicators, response.data]);
	// };

	// const removeIndicator = (id) => {
	// 	const newList = addIndicators.filter((indicator) => {
	// 		return indicator.id != id;
	// 	});
	// 	setData(newList);
	// };

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
						{results.map((r) => (
							<tr
								key={r.id}
								className={
									selectedRow === r.id ? 'selected-row' : ''
								}
								onClick={(e) => handleRowClick(r.id, e)}
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
