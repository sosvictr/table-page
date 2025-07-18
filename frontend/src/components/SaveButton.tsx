import React from 'react';
import './SaveButton.css';
import useParameterStore from '../store/parameters.store';
import parameterService from '../services/parameter.service';
import { IParameter } from '../interfaces/parameter.interface';

export const SaveButton = () => {
	const { parameters, error } = useParameterStore();
	const handleSaveClick = () => {
		console.log('save action');
		// parameterService.save(parameters);
	};

	return (
		<button className="button" onClick={handleSaveClick}>
			Сохранить
		</button>
	);
};
