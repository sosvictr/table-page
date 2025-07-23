import styles from './App.module.css';
import { Plot } from './components/plot/Plot';
import { SaveButton } from './components/button/SaveButton';
import { Table } from './components/table/Table';
import { TableIcons } from './components/icons/TableIcons';
import { Tabs } from './components/tabs/Tabs';

function App() {
	return (
		<div className={styles.app}>
			<header className={styles.head}>
				<h1 className={styles.title}>Месторождение</h1>
			</header>
			<div className={styles.table}>
				<TableIcons />
				<Table />
			</div>
			<div className={styles.display}>
				<Tabs />
				<hr></hr>
				<div className={styles.plot}>
					<Plot />
					<SaveButton />
				</div>
			</div>
		</div>
	);
}

export default App;
