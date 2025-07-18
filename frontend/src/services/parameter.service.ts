import { IParameter } from '../interfaces/parameter.interface';
import { httpService } from './http.service';

const parameterEndPoint = 'parameters';

const parameterService = {
	findAll: async (): Promise<IParameter[]> => {
		const { data } = await httpService.get(`${parameterEndPoint}`);
		return data;
	},

	// create: async (parameter: Partial<IParameter>): Promise<void> => {
	// 	await httpService.post(parameterEndPoint, parameter);
	// }, ///как?

	// remove: async (id: string): Promise<void> => {
	// 	await httpService.delete(`${parameterEndPoint}${id}`);
	// }, //?????

	save: async (parametersToSave: IParameter[]): Promise<void> => {
		await httpService.put(`${parameterEndPoint}`, parametersToSave);
	},
};

export default parameterService;
