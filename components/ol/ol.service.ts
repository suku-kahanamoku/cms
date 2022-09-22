import { type FeatureCollection, featureCollection } from '@turf/turf';
import { Feature, View } from 'ol';
import type { Geometry } from 'ol/geom';
import type { Options as TileOptions } from 'ol/layer/BaseTile';
import type { Options as VectorOptions } from 'ol/layer/BaseVector';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';

import GeoJSON from 'ol/format/GeoJSON';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import Style from 'ol/style/Style';

import { ITERATE } from '@/utils/modify-object.function';
import { IDraggableResizable } from '@/components/ol/ol.interface';

export class OlService {
	/**
	 *
	 *
	 * @memberof OlService
	 */
	public dragResizeTable: any = {
		open: 'open',
		zIndex: 'z',
		left: 'x',
		top: 'y',
		width: 'w',
		height: 'h',
		minW: 'minWidth',
		minH: 'minHeight',
		maxW: 'maxWidth',
		maxH: 'maxHeight',
	};

	/**
	 * Prekonvertuje vstupni objekt na dragableResizable config
	 *
	 * @param {*} e
	 * @return {*}  {IDraggableResizable}
	 * @memberof OlService
	 */
	public convertToDragResizeConfig(value: any): IDraggableResizable {
		const config = <any>{};
		ITERATE(value, (value: any, key: string) => {
			const name = this.dragResizeTable[key];
			if (name) {
				config[name] = value;
			}
		});
		return config;
	}

	/**
	 * Vytvori view
	 *
	 * @param {ViewOptions} [options]
	 * @return {*}  {View}
	 * @memberof OlService
	 */
	public createView(options?: any): View {
		options = {
			...{
				zoom: 7,
				center: [1750000, 6500000],
				constrainResolution: true,
			},
			...options,
		};
		return new View(options);
	}

	/**
	 * Vytvori bitmapovou vrstvu
	 *
	 * @param {TileOptions<OSM>} [options]
	 * @return {*}  {TileLayer<any>}
	 * @memberof OlService
	 */
	public createTileLayer(options?: TileOptions<OSM>): TileLayer<any> {
		options = {
			...{
				source: new OSM(),
				visible: true,
			},
			...options,
		};
		return new TileLayer(options);
	}

	/**
	 * Vytvori vektorovou vrstvu
	 *
	 * @param {Feature<Geometry>[]} features
	 * @param {VectorOptions<VectorSource<Geometry>>} [options]
	 * @return {*}  {VectorLayer<VectorSource>}
	 * @memberof OlService
	 */
	createVectorLayer(
		features: Feature<Geometry>[],
		options?: VectorOptions<VectorSource<Geometry>>
	): VectorLayer<VectorSource> {
		options = {
			...{
				source: new VectorSource({
					features: this.setFeaturesStyle(features),
				}),
			},
			...options,
		};
		return new VectorLayer(options);
	}

	/**
	 * Vytvori features z GeoJson
	 *
	 * @param {FeatureCollection} collection
	 * @return {*}  {Feature<Geometry>[]}
	 * @memberof OlService
	 */
	createFeaturesFromGeoJson(collection: FeatureCollection): Feature<Geometry>[] {
		return new GeoJSON().readFeatures(featureCollection(collection.features), {
			// this is required since GeoJSON uses latitude/longitude,
			// but the map is rendered using “Web Mercator”
			featureProjection: 'EPSG:3857',
		});
	}

	/**
	 * Nastavi styly jednolivym feature
	 *
	 * @param {Feature<Geometry>[]} features
	 * @return {*}  {Feature<Geometry>[]}
	 * @memberof OlService
	 */
	public setFeaturesStyle(features: Feature<Geometry>[]): Feature<Geometry>[] {
		features.forEach((feature, index) => {
			/* feature.setId(`id_${index}`) */
			// todo - jednotlivym featuram doplnit styly, ktere se vemou z DB
			const style = new Style({
				fill: new Fill({
					color: 'transparent',
				}),
				stroke: new Stroke({
					color: '#808080',
				}),
			});
			feature.setStyle(style);
		});
		return features;
	}
}
