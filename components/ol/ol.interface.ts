import type Feature from 'ol/Feature';
import type Style from 'ol/style/Style.js';

export interface IDraggableResizable {
	open?: boolean;

	z?: number;
	x?: number;
	y?: number;

	w?: number | string;
	h?: number | string;
	minWidth?: number;
	minHeight?: number;
	maxWidth?: number;
	maxHeight?: number;

	draggable?: boolean;
	resizable?: boolean;

	grid?: [number, number];
}

export interface IArea {
	feature: Feature;
	style: Style;
	config?: IDraggableResizable;
	calculate?: {
		event: string;
		value: any;
	};
}
