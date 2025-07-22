import { useEffect, useMemo } from 'react';
import './Tabs.css';
import useParametersStore from '../store/parameters.store';
import { useShallow } from 'zustand/react/shallow';

export const Tabs = () => {
	const selectedPlotId = useParametersStore((state) => state.selectedPlotId);
	const parameters = useParametersStore(
		useShallow((state) => state.getExistingParameters()),
	);
	const { setSelectedPlotId } = useParametersStore.getState();

	const tabButtons = useMemo(() => {
		return parameters.map((param) => ({ id: param.id, name: param.name }));
	}, [parameters]);

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
