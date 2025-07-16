import React from 'react';
import { Line } from 'react-chartjs-2';
import './Plot.css';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';

import jsonData from './data.json';

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
);

interface Meaning {
	[year: string]: number;
}

interface DataItem {
	id: number;
	name: string;
	unit_name: string;
	meanings: Meaning;
}

interface ChartJSComponentProps {
	indicatorId: number;
}

export const Plot: React.FC<ChartJSComponentProps> = ({ indicatorId }) => {
	const indicatorData = jsonData.find(
		(item: DataItem) => item.id === indicatorId,
	);

	if (!indicatorData) {
		return (
			<div style={{ color: 'red', textAlign: 'center', padding: '20px' }}>
				Показатель с ID "{indicatorId}" не найден.
			</div>
		);
	}

	const labels = Object.keys(indicatorData.meanings).map((year) =>
		year.toString(),
	);
	const dataValues = Object.values(indicatorData.meanings);

	const data = {
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

	const options = {
		responsive: true,
		maintainAspectRatio: false,
		color: '#ffffff',
		elements: {
			point: {
				radius: 3,
				backgroundColor: '#FFFFFF',
				borderWidth: 2,
				borderColor: '#007DF0',
			},
		},
		plugins: {
			legend: {
				display: false,
			},
		},
		scales: {
			x: {
				title: {
					display: false,
				},
				grid: {
					lineWidth: 1,
					color: '#D0D0D0',
					drawTicks: false,
				},
				border: {
					dash: [5, 5],
					color: '#D0D0D0',
				},
				ticks: {
					padding: 6,
					color: '#202020',
					font: {
						size: 14,
						family: 'Roboto',
						weight: 400,
					},
				},
			},
			y: {
				title: {
					display: false,
				},
				beginAtZero: false,
				grid: {
					lineWidth: 1,
					color: (ctx: any) => {
						const lastTick = ctx.chart.scales.y.ticks.length - 1;
						if (
							!ctx.chart ||
							!ctx.chart.scales.y ||
							!ctx.chart.scales.y.ticks
						) {
							return '#D0D0D0';
						}
						if (ctx.index === lastTick) {
							return '#FFFFFF';
						}
						return '#D0D0D0';
					},
					drawTicks: false,
				},
				border: {
					dash: [5, 5],
					display: false,
				},
				ticks: {
					padding: 10,
					stepSize: 200,
					callback: function (value: string | number, index: number) {
						if (typeof index === 'number' && index === 0) {
							return '';
						}
						return value;
					},
					color: '#202020',
					font: {
						size: 14,
						family: 'Roboto',
						weight: 400,
					},
				},
			},
		},
	};

	return (
		<div className="plot-container">
			<Line data={data} options={options} />
		</div>
	);
};
