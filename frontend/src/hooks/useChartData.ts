import { useMemo } from 'react';
import { IParameter } from '../interfaces/parameter.interface';
import useParametersStore from '../store/parameters.store';
import { useShallow } from 'zustand/react/shallow';

export const useChartData = (parameterId: number | null) => {
	const parameters = useParametersStore(
		useShallow((state) => state.getExistingParameters()),
	);

	const parameterData = useMemo(() => {
		if (parameterId === null) {
			return null;
		}
		return parameters.find((item: IParameter) => item.id === parameterId);
	}, [parameterId, parameters]);

	const chartData = useMemo(() => {
		if (!parameterData || !parameterData.meanings) {
			return null;
		}

		const dataValues = parameterData.meanings;
		const labels = Object.keys(dataValues).map(String);

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
	}, [parameterData]);

	return { IParameter: parameterData, chartData };
};
