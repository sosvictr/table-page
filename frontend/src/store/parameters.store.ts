import { create } from 'zustand';
import { IParameter } from '../interfaces/parameter.interface';
import parameterService from '../services/parameter.service';
// import { handleHttpError } from '../errors/handle-http.error';
import { AxiosError } from 'axios';

interface IUseParameterStore {
	parameters: IParameter[];
	selectedRow: IParameter | null;
	error: null | unknown;
	clickedButton: number;
	fetchParameters: () => void;
	// createParameter: (parameter: Partial<IParameter>) => void;
	// updateParameter: (id: number, parameter: Partial<IParameter>) => void;
	// deleteParameter: (id: number) => void;
}

const useParameterStore = create<IUseParameterStore>((set) => ({
	parameters: [],
	selectedRow: null,
	clickedButton: 1,
	error: null,

	fetchParameters: () => {
		set({ error: null });
		parameterService
			.findAll()
			.then((parameters) => set({ parameters }))
			.catch((error) => {
				// handleHttpError(error, 'Ошибка при загрузке параметров');
				const e = error as AxiosError;
				console.log({ error });
				set({ error });
			});
	},
}));

export default useParameterStore;
