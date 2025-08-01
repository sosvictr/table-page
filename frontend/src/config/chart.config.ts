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

export const registerChartJS = () => {
	ChartJS.register(
		CategoryScale,
		LinearScale,
		PointElement,
		LineElement,
		Title,
		Tooltip,
		Legend,
	);
};

export const defaultChartOptions = {
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
			afterFit(scale: any) {
				scale.width = 40;
			},
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
				maxTicksLimit: 5,
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
