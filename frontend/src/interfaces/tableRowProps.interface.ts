import { IParameterWithStatus } from './parameterWithStatus.interface';

export interface ITableRowProps {
	r: IParameterWithStatus;
	selectedRowId: number | null;
	handleRowClick: (id: number) => void;
	years: string[];
	handleCellValueChange: (id: number, year: string, value: string) => void;
}
