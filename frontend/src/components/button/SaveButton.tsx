import styles from './SaveButton.module.css';
import useParametersStore from '../../store/parameters.store';

export const SaveButton = () => {
	const { saveChanges } = useParametersStore.getState();

	const handleSaveClick = async () => {
		saveChanges();
	};

	return (
		<button className={styles.button} onClick={handleSaveClick}>
			Сохранить
		</button>
	);
};
