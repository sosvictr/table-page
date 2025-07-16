import React, { useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import './Plot.css';

import {
	registerChartJS,
	defaultChartOptions,
} from '../../config/chart.config';
import { useChartData } from '../../hooks/useChartData';

registerChartJS();

interface PlotProps {
	indicatorId: number;
}

export const Plot: React.FC<PlotProps> = ({ indicatorId }) => {
	const { indicatorData, chartData } = useChartData(indicatorId);

	if (!indicatorData || !chartData) {
		return (
			<div style={{ color: 'red', textAlign: 'center', padding: '20px' }}>
				Показатель с ID "{indicatorId}" не найден.
			</div>
		);
	}

	return (
		<div className="plot-container">
			<Line data={chartData} options={defaultChartOptions} />
		</div>
	);
};
