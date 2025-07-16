import './App.css';
import { Plot } from './components/plot/Plot';
import { SaveButton } from './components/SaveButton';
import { Table } from './components/Table';
import { TableIcons } from './components/TableIcons';
import { Tabs } from './components/Tabs';

function App() {
	return (
		<div className="app">
			<header className="head">
				<h1 className="head__title">Месторождение</h1>
			</header>
			<div className="table-container">
				<TableIcons />
				<Table />
			</div>
			<div className="display-container">
				<Tabs />
				<hr></hr>
				<div className="lower-container">
					<Plot indicatorId={1} />
					<SaveButton />
				</div>
			</div>
		</div>
	);
}

export default App;
