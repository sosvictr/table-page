import { create } from 'zustand';
import { IParameter } from '../interfaces/parameter.interface';
import { IParameterWithStatus } from '../interfaces/parameterWithStatus.interface';
import parameterService from '../services/parameter.service';

interface IParameterState {
	parameters: IParameterWithStatus[];
	selectedRowId: number | null;
	selectedPlotId: number | null;

	error: string | null;
}

interface IParameterActions {
	fetchParameters: () => Promise<void>;
	updateParameter: (
		id: number,
		field: 'name' | 'unit_name' | string,
		value: any | null,
	) => void;

	setSelectedRow: (id: number) => void;
	setSelectedPlotId: (id: number | null) => void;

	getParameterById: (id: number) => IParameter | undefined;
	getAllParameters: () => IParameterWithStatus[];
	getExistingParameters: () => IParameterWithStatus[];

	addParameter: () => void;
	deleteParameter: (id: number) => void;

	saveChanges: () => Promise<void>;
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
			try {
				const paramsArray = await parameterService.getAll();
				const parametersWithStatus = paramsArray.map(
					(p: IParameter): IParameterWithStatus => ({
						...p,
						status: 'pristine',
					}),
				);

				set({
					parameters: parametersWithStatus,
					error: null,
				});
			} catch (error: any) {
				set({ error: error.message || 'Неизвестная ошибка' });
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

		updateParameter: (id, field, value) => {
			set((state) => {
				const index = state.parameters.findIndex(
					(param) => param.id === id,
				);
				if (index === -1) return state;

				const param = state.parameters[index];
				const newStatus: 'new' | 'updated' | 'deleted' | 'pristine' =
					param.status !== 'new' ? 'updated' : 'new';

				const updatedParam: IParameterWithStatus =
					field === 'name' || field === 'unit_name'
						? { ...param, [field]: value, status: newStatus }
						: {
								...param,
								status: newStatus,
								meanings: { ...param.meanings, [field]: value },
						  };

				return {
					parameters: [
						...state.parameters.slice(0, index),
						updatedParam,
						...state.parameters.slice(index + 1),
					],
				};
			});
		},

		getParameterById: (id) =>
			get().parameters.find((param) => param.id === id),

		getAllParameters: () => get().parameters,

		getExistingParameters: () => {
			return get().parameters.filter((p) => p.status !== 'deleted');
		},

		addParameter: () => {
			set((state) => {
				const newParameter: IParameterWithStatus = {
					id: -Date.now(),
					name: `Новый показатель`,
					unit_name: '-',
					meanings: {},
					status: 'new',
				};
				return { parameters: [...state.parameters, newParameter] };
			});
		},

		deleteParameter: (id) => {
			set((state) => {
				let newSelectedPlotId = state.selectedPlotId;
				if (state.selectedPlotId === id) {
					const firstAvailableParam = state.parameters.find(
						(p) => p.id !== id && p.status !== 'deleted',
					);
					newSelectedPlotId = firstAvailableParam
						? firstAvailableParam.id
						: newSelectedPlotId;
				}

				return {
					parameters: state.parameters.map(
						(param): IParameterWithStatus =>
							param.id === id
								? { ...param, status: 'deleted' }
								: param,
					),
					selectedRowId:
						state.selectedRowId === id ? null : state.selectedRowId,
					selectedPlotId: newSelectedPlotId,
				};
			});
		},

		saveChanges: async () => {
			const { parameters } = get();
			const changesPromises: Promise<any>[] = [];
			const updatedParametersWithNewIds: IParameterWithStatus[] = [];

			for (const param of parameters) {
				try {
					if (param.status === 'deleted') {
						if (param.id > 0) {
							changesPromises.push(
								parameterService.remove(param.id),
							);
						}
					} else if (param.status === 'new') {
						const { id, status, ...rest } = param;
						changesPromises.push(
							parameterService
								.create(rest)
								.then((createdParam) => {
									updatedParametersWithNewIds.push({
										...createdParam,
										status: 'pristine',
									});
									return createdParam;
								}),
						);
					} else if (param.status === 'updated') {
						const { status, ...rest } = param;
						changesPromises.push(parameterService.update(rest));
					} else if (param.status === 'pristine') {
						updatedParametersWithNewIds.push(param);
					}
				} catch (error: any) {
					set({
						error:
							error.message ||
							'Ошибка при отправке данных на сервер',
					});
				}
			}

			try {
				await Promise.allSettled(changesPromises);
				await get().fetchParameters();
				get().setSelectedPlotId(get().getExistingParameters()[0].id);
				alert('Данные сохранены');
			} catch (error: any) {
				set({
					error: error.message || 'Ошибка при сохранении изменений',
				});
			}
		},
	}),
);

export default useParametersStore;
