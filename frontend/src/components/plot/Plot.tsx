import React from 'react';
import { Line } from 'react-chartjs-2';
import styles from './Plot.module.css';

import {
	registerChartJS,
	defaultChartOptions,
} from '../../config/chart.config';
import { useChartData } from '../../hooks/useChartData';
import useParametersStore from '../../store/parameters.store';

registerChartJS();

export const Plot: React.FC = () => {
	const selectedPlotId = useParametersStore((state) => state.selectedPlotId);

	const { chartData } = useChartData(selectedPlotId);

	if (!chartData) {
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
				Данные загружаются...
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<Line data={chartData} options={defaultChartOptions} />
		</div>
	);
};
