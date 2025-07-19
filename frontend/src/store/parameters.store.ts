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
	setSelectedRow: (id: number) => void;
	setSelectedPlotId: (id: number | null) => void;
	getParameterById: (id: number) => IParameter | undefined;
	getAllParameters: () => IParameter[];
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

		getParameterById: (id) =>
			get().parameters.find((param) => param.id === id),

		getAllParameters: () => get().parameters,

		deleteParameter: (id) =>
			set((state) => ({
				parameters: state.parameters.filter(
					(parameter) => parameter.id !== id,
				),
			})),
	}),
);

export default useParametersStore;
