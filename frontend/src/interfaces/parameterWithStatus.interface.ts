import { IParameter } from './parameter.interface';

export interface IParameterWithStatus extends IParameter {
	status?: 'new' | 'updated' | 'deleted' | 'pristine';
}
