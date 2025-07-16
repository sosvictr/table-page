import './TableIcons.css';
import icon2 from '../images/delete_row.svg';
import icon1 from '../images/insert_row.svg';

export const TableIcons = () => {
	return (
		<div className="icons">
			<img className="icon-add" src={icon1} alt={'add'}></img>
			<img className="icon-delete" src={icon2} alt={'delete'}></img>
		</div>
	);
};
