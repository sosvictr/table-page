import './SaveButton.css';
import useParametersStore from '../store/parameters.store';
import parameterService from '../services/parameter.service';

export const SaveButton = () => {
	const parameters = useParametersStore((state) => state.getAllParameters());
	const handleSaveClick = async () => {
		await parameterService.save(parameters);
	};

	return (
		<button className="button" onClick={handleSaveClick}>
			Сохранить
		</button>
	);
};
