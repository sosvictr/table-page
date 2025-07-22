import './TableIcons.css';
import icon2 from '../images/delete_row.svg';
import icon1 from '../images/insert_row.svg';
import useParametersStore from '../store/parameters.store';

export const TableIcons = () => {
	const selectedRowId = useParametersStore((state) => state.selectedRowId);
	const { addParameter, deleteParameter } = useParametersStore.getState();

	const handleDeleteClick = () => {
		if (selectedRowId !== null) {
			deleteParameter(selectedRowId);
		}
	};

	return (
		<div className="icons">
			<img
				className="icon-add"
				src={icon1}
				alt={'add'}
				onClick={addParameter}
			></img>
			<img
				className="icon-delete"
				src={icon2}
				alt={'delete'}
				onClick={handleDeleteClick}
			></img>
		</div>
	);
};
