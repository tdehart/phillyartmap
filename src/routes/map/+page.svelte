<script lang="ts">
	import mapbox from 'mapbox-gl';
	import type { FeatureCollection, Geometry, GeoJsonProperties } from 'geojson';
	import { onMount, onDestroy } from 'svelte';
	import { PUBLIC_MAPBOX_TOKEN } from '$env/static/public';

	let map: mapbox.Map;
	let mapContainer: HTMLDivElement;
	let lng: number;
	let lat: number;
	let zoom: number;

	const id = Math.floor(Math.random() * 559) + 1;

	lng = -75.163526;
	lat = 39.952724;
	zoom = 11;

	function updateData() {
		zoom = map.getZoom();
		lng = map.getCenter().lng;
		lat = map.getCenter().lat;
	}

	onMount(() => {
		const initialState = { lng: lng, lat: lat, zoom: zoom };

		map = new mapbox.Map({
			container: mapContainer,
			accessToken: PUBLIC_MAPBOX_TOKEN,
			style: 'mapbox://styles/mapbox/outdoors-v11',
			center: [initialState.lng, initialState.lat],
			zoom: initialState.zoom
		});

		const geojson: FeatureCollection<Geometry, GeoJsonProperties> = {
			type: 'FeatureCollection',
			features: [
				{
					type: 'Feature',
					geometry: {
						type: 'Point',
						coordinates: [-75.218, 40.022]
					},
					properties: {
						title: 'Mapbox',
						description: 'Road Race'
					}
				},
				{
					type: 'Feature',
					geometry: {
						type: 'Point',
						coordinates: [-75.166, 39.957]
					},
					properties: {
						title: 'Mapbox',
						description: 'Freedom'
					}
				}
			]
		};

		map.on('load', async () => {
			map.addControl(new mapbox.NavigationControl());
			map.addSource('places', {
				type: 'geojson',
				data: geojson
			});
			map.addLayer({
				id: 'places',
				type: 'circle',
				source: 'places',
				paint: {
					'circle-color': '#4264fb',
					'circle-radius': 6,
					'circle-stroke-width': 2,
					'circle-stroke-color': '#ffffff'
				}
			});
		});

		map.on('move', () => {
			updateData();
		});
	});

	onDestroy(() => {
		if (map) {
			map.remove();
		}
	});
</script>

<h2 class="text-2xl font-bold leading-7 sm:truncate sm:text-3xl sm:tracking-tight py-4">Map</h2>
<div class="sidebar">
	Longitude: {lng.toFixed(4)} | Latitude: {lat.toFixed(4)} | Zoom: {zoom.toFixed(2)}
</div>

<div class="map-wrap">
	<div class="map" bind:this={mapContainer}></div>
</div>

<style>
	.map {
		position: absolute;
		width: 600px;
		height: 400px;
	}

	.sidebar {
		background-color: rgb(35 55 75 / 90%);
		color: #fff;
		padding: 6px 12px;
		font-family: monospace;
		z-index: 1;
		position: absolute;
		top: 60px;
		left: 30px;
		margin: 12px;
		border-radius: 4px;
	}
</style>
