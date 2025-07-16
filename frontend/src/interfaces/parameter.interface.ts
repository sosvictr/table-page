interface IMeaning {
	[year: string]: number;
}

export interface IParameter {
	id: number;
	name: string;
	unit_name: string;
	meanings?: IMeaning;
}
