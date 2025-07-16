import { create } from 'zustand';
import { IParameter } from '../interfaces/parameter.interface';
import parameterService from '../services/parameter.service';

interface IUseParameterStore {
	parameters: IParameter[];
	selectedRow: number | null;
	error: null | unknown;
	selectedPlotId: number | null;
	fetchParameters: () => void;
	setSelectedRow: (id: number) => void;
	updateParameter: (id: number, year: string, value: any) => void;
	setSelectedPlotId: (id: number | null) => void;
	// createParameter: (parameter: Partial<IParameter>) => void;
	// deleteParameter: (id: number) => void;
}

const useParameterStore = create<IUseParameterStore>((set) => ({
	parameters: [],
	selectedRow: null,
	selectedPlotId: 1,
	error: null,

	fetchParameters: () => {
		set({ error: null });
		parameterService
			.findAll()
			.then((parameters) => set({ parameters }))
			.catch((error) => {
				console.log({ error });
				set({ error });
			});
	},

	setSelectedRow: (id) => {
		set((state) => ({
			selectedRow: state.selectedRow === id ? null : id,
		}));
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

	setSelectedPlotId: (id) => {
		set({ selectedPlotId: id });
	},
}));

export default useParameterStore;
