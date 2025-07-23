import { useMemo } from 'react';
import { IParameter } from '../interfaces/parameter.interface';
import useParametersStore from '../store/parameters.store';
import { useShallow } from 'zustand/react/shallow';

export const useChartData = (parameterId: number | null) => {
	const startYear = useMemo(() => 2026, []);
	const endYear = useMemo(() => 2040, []);
	const years = useMemo(
		() =>
			Array.from({ length: endYear - startYear + 1 }, (_, i) =>
				String(startYear + i),
			),
		[startYear, endYear],
	);
	const parameters = useParametersStore(
		useShallow((state) => state.getExistingParameters()),
	);

	const parameterData = useMemo(() => {
		return parameters.find((item: IParameter) => item.id === parameterId);
	}, [parameterId, parameters]);

	const chartData = useMemo(() => {
		if (!parameterData || !parameterData.meanings) {
			return null;
		}

		const dataValues = parameterData.meanings;

		return {
			labels: years,
			datasets: [
				{
					data: dataValues,
					borderColor: '#007DF0',
					tension: 0,
					fill: false,
				},
			],
		};
	}, [parameterData, years]);

	return { IParameter: parameterData, chartData };
};
