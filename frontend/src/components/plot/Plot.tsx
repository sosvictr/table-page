import React, { useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import './Plot.css';

import {
	registerChartJS,
	defaultChartOptions,
} from '../../config/chart.config';
import { useChartData } from '../../hooks/useChartData';
import useParameterStore from '../../store/parameters.store';

registerChartJS();

export const Plot: React.FC = () => {
	const { selectedPlotId } = useParameterStore();
	const { IParameter: parameterData, chartData } =
		useChartData(selectedPlotId);

	if (!parameterData || !chartData) {
		return (
			<div
				className="plot-container"
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					color: 'black',
					fontSize: '40px',
				}}
			>
				Loading
			</div>
		);
	}

	return (
		<div className="plot-container">
			<Line data={chartData} options={defaultChartOptions} />
		</div>
	);
};
