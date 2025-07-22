import { IParameter } from '../interfaces/parameter.interface';
import { IParameterWithStatus } from '../interfaces/parameterWithStatus.interface';
import { httpService } from './http.service';

const parameterEndPoint = 'parameters';

const parameterService = {
	getAll: async (): Promise<IParameter[]> => {
		const { data } = await httpService.get(`${parameterEndPoint}`);
		return data;
	},

	create: async (
		newParameter: Omit<IParameterWithStatus, 'id' | 'status'>,
	): Promise<IParameter> => {
		const { data } = await httpService.post(
			`${parameterEndPoint}`,
			newParameter,
		);
		return data;
	},

	update: async (
		updatedParameter: Omit<IParameterWithStatus, 'status'>,
	): Promise<IParameter> => {
		const { data } = await httpService.patch(
			`${parameterEndPoint}/${updatedParameter.id}`,
			updatedParameter,
		);
		return data;
	},

	remove: async (id: number): Promise<void> => {
		await httpService.delete(`${parameterEndPoint}/${id}`);
	},
};

export default parameterService;
