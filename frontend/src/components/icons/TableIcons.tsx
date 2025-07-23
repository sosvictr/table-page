import styles from './TableIcons.module.css';
import icon2 from '../../images/delete_row.svg';
import icon1 from '../../images/insert_row.svg';
import useParametersStore from '../../store/parameters.store';

export const TableIcons = () => {
	const selectedRowId = useParametersStore((state) => state.selectedRowId);
	const { addParameter, deleteParameter } = useParametersStore.getState();

	const handleDeleteClick = () => {
		if (selectedRowId !== null) {
			deleteParameter(selectedRowId);
		}
	};

	return (
		<div className={styles.container}>
			<img
				className={styles.add}
				src={icon1}
				alt={'add'}
				onClick={addParameter}
			></img>
			<img
				className={styles.delete}
				src={icon2}
				alt={'delete'}
				onClick={handleDeleteClick}
			></img>
		</div>
	);
};
