import './SaveButton.css';
import useParametersStore from '../store/parameters.store';
import { useShallow } from 'zustand/react/shallow';

export const SaveButton = () => {
	const parameters = useParametersStore(
		useShallow((state) => state.getExistingParameters()),
	);

	const { saveChanges } = useParametersStore.getState();

	const handleSaveClick = async () => {
		// console.log(parameters);
		saveChanges();
	};

	return (
		<button className="button" onClick={handleSaveClick}>
			Сохранить
		</button>
	);
};
