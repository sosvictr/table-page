import { useEffect, useMemo } from 'react';
import styles from './Tabs.module.css';
import useParametersStore from '../../store/parameters.store';
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
		<div className={styles.container}>
			{tabButtons.map((button) => (
				<button
					key={button.id}
					className={`${styles.tab} ${
						selectedPlotId === button.id
							? styles.selected
							: styles.disabled
					}`}
					onClick={() => handleTabClick(button.id)}
				>
					{button.name}
				</button>
			))}
		</div>
	);
};
