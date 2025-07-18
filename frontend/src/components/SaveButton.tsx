import './SaveButton.css';
import useParameterStore from '../store/parameters.store';
import parameterService from '../services/parameter.service';

export const SaveButton = () => {
	const { parameters } = useParameterStore();
	const handleSaveClick = async () => {
		try {
			await parameterService.save(parameters);
			console.log('Сохранено в data.json');
		} catch (error) {
			console.error('Ошибка при сохранении параметров:', error);
		}
	};

	return (
		<button className="button" onClick={handleSaveClick}>
			Сохранить
		</button>
	);
};
