import { useMemo } from 'react';
import jsonData from '../../src/components/data.json'; // Путь к вашему JSON-файлу
import { IParameter } from '../interfaces/parameter.interface'; // Импортируем типы

export const useChartData = (indicatorId: number) => {
	const indicatorData = jsonData.find(
		(item: IParameter) => item.id === indicatorId,
	);

	const chartData = useMemo(() => {
		if (!indicatorData) {
			return null;
		}

		const labels = Object.keys(indicatorData.meanings).map(String);
		const dataValues = Object.values(indicatorData.meanings);

		return {
			labels: labels,
			datasets: [
				{
					data: dataValues,
					borderColor: '#007DF0',
					tension: 0,
					fill: false,
				},
			],
		};
	}, [indicatorData]);

	return { indicatorData, chartData };
};
