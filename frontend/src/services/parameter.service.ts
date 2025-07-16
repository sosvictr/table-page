import { IParameter } from '../interfaces/parameter.interface';
import { httpService } from './http.service';

const parameterEndPoint = 'parameters';

const parameterService = {
	findAll: async (): Promise<IParameter[]> => {
		const { data } = await httpService.get(`${parameterEndPoint}`);
		return data;
	},

	create: async (parameter: Partial<IParameter>): Promise<IParameter> => {
		const { data } = await httpService.post(parameterEndPoint, parameter);
		return data;
	},

	update: async (
		id: string,
		parameter: Partial<IParameter>,
	): Promise<IParameter> => {
		const { data } = await httpService.patch(
			`${parameterEndPoint}${id}`,
			parameter,
		);
		return data;
	},

	remove: async (id: string): Promise<void> => {
		await httpService.delete(`${parameterEndPoint}${id}`);
	},
};

export default parameterService;
