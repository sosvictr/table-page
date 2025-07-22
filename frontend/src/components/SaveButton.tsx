import './SaveButton.css';
import useParametersStore from '../store/parameters.store';

export const SaveButton = () => {
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
