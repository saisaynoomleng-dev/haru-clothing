'use client';

import Map, { Marker } from 'react-map-gl/mapbox';

import clsx from 'clsx';

import 'mapbox-gl/dist/mapbox-gl.css';
import { env } from '@/lib/env/env.client';

const MAPBOX_TOKEN = env.NEXT_PUBLIC_REACT_MAPBOX_ACCESS_TOKEN;

export default function ReactMapBox({
  className,
  lat,
  long,
}: {
  className?: string;
  lat: number;
  long: number;
}) {
  return (
    <div className={clsx('overflow-hidden', className)}>
      <Map
        initialViewState={{
          latitude: lat,
          longitude: long,
          zoom: 15,
        }}
        style={{ width: 1200, height: 400 }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={MAPBOX_TOKEN}
        scrollZoom={false}
      >
        <Marker longitude={long} latitude={lat} color="red" />
      </Map>
    </div>
  );
}
