import { useEffect } from 'react';
import './Tabs.css';
import useParameterStore from '../store/parameters.store';

export const Tabs = () => {
	const { selectedPlotId, setSelectedPlotId } = useParameterStore();

	const tabButtons = [
		{ id: 1, name: 'Газ (вал.)' },
		{ id: 3, name: 'Конденсат (нестаб.)' },
		{ id: 6, name: 'Пик' },
	];

	useEffect(() => {
		if (selectedPlotId === null && tabButtons.length > 0) {
			setSelectedPlotId(tabButtons[0].id);
		}
	}, [selectedPlotId, setSelectedPlotId, tabButtons]);

	const handleTabClick = (paramId: number) => {
		setSelectedPlotId(paramId);
	};

	return (
		<div className="tab-container">
			{tabButtons.map((button) => (
				<button
					key={button.id}
					className={`tab ${
						selectedPlotId === button.id ? 'selected' : 'disabled'
					}`}
					onClick={() => handleTabClick(button.id)}
				>
					{button.name}
				</button>
			))}
		</div>
	);
};
