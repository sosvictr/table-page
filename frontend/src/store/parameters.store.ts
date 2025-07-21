import { create } from 'zustand';
import { IParameter } from '../interfaces/parameter.interface';
import parameterService from '../services/parameter.service';

interface IParameterState {
	parameters: IParameter[];
	selectedRowId: number | null;
	selectedPlotId: number | null;

	error: string | null;
}

interface IParameterActions {
	fetchParameters: () => Promise<void>;
	updateParameter: (id: number, year: string, value: any | null) => void;
	updateParameterName: (
		id: number,
		details: { name?: string; unit_name?: string },
	) => void;
	setSelectedRow: (id: number) => void;
	setSelectedPlotId: (id: number | null) => void;
	getParameterById: (id: number) => IParameter | undefined;
	getAllParameters: () => IParameter[];
	addParameter: () => void;
	deleteParameter: (id: number) => void;
}

const initialState: IParameterState = {
	parameters: [],
	selectedRowId: null,
	selectedPlotId: 1,
	error: null,
};

const useParametersStore = create<IParameterActions & IParameterState>(
	(set, get) => ({
		...initialState,

		fetchParameters: async () => {
			set({ error: null });
			try {
				const paramsArray = await parameterService.getAll();
				set({ parameters: paramsArray });
			} catch (error: any) {
				console.error('Failed to fetch parameters:', error);
				set({
					error: error.message || 'An unknown error occurred',
				});
			}
		},

		setSelectedRow: (id) => {
			set((state) => ({
				selectedRowId: state.selectedRowId === id ? null : id,
			}));
		},

		setSelectedPlotId: (id) => {
			set({ selectedPlotId: id });
		},

		updateParameter: (id, year, value) => {
			set((state) => ({
				parameters: state.parameters.map((param) =>
					param.id === id
						? {
								...param,
								meanings: {
									...param.meanings,
									[year]: value,
								},
						  }
						: param,
				),
			}));
		},

		updateParameterName: (id, details) => {
			set((state) => ({
				parameters: state.parameters.map((param) =>
					param.id === id ? { ...param, ...details } : param,
				),
			}));
		},

		getParameterById: (id) =>
			get().parameters.find((param) => param.id === id),

		getAllParameters: () => get().parameters,

		addParameter: () => {
			set((state) => {
				const newId =
					state.parameters.length > 0
						? Math.max(...state.parameters.map((p) => p.id)) + 1
						: 1;

				const newParameter: IParameter = {
					id: newId,
					name: `Показатель ${newId}`,
					unit_name: '-',
					meanings: {},
				};

				return {
					parameters: [...state.parameters, newParameter],
				};
			});
		},

		deleteParameter: (id) =>
			set((state) => ({
				selectedRowId:
					state.selectedRowId === id ? null : state.selectedRowId,
				parameters: state.parameters.filter(
					(parameter) => parameter.id !== id,
				),
			})),
	}),
);

export default useParametersStore;
