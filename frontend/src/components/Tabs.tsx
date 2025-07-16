import React, { useState } from 'react';
import './Tabs.css';

export const Tabs = () => {
	const [activeTab, setActiveTab] = useState('Газ (вал.)');

	const properties = {
		'Газ (вал.)': String,
		'Конденсат (нестаб.)': String,
		Пик: String,
	};

	return (
		<div className="tab-container">
			{Object.keys(properties).map(option => (
				<button
					key={option}
					className={`tab ${
						activeTab === option ? 'selected' : 'disabled'
					}`}
					onClick={() => setActiveTab(option)}
				>
					{option}
				</button>
			))}
		</div>
	);
};
