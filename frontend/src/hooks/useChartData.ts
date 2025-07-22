import { useMemo } from 'react';
import { IParameter } from '../interfaces/parameter.interface';
import useParametersStore from '../store/parameters.store';
import { useShallow } from 'zustand/react/shallow';

export const useChartData = (parameterId: number | null) => {
	const startYear = 2026;
	const endYear = 2040;
	const years = Array.from({ length: endYear - startYear + 1 }, (_, i) =>
		String(startYear + i),
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
