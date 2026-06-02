import { useEffect } from "react";
import { MapContainer, Marker, useMap, useMapEvents } from "react-leaflet";
import type { LeafletMouseEvent } from "leaflet";
import "leaflet/dist/leaflet.css";
import { MaptilerLayer } from "@maptiler/leaflet-maptilersdk";
import type { Coords } from "../types";

type Props = Readonly<{
  coords: Coords;
  onMapClick: (lat: number, lon: number) => void;
  mapType: string;
}>;

export default function WeatherMap({ coords, onMapClick, mapType }: Props) {
  const { lat, lon } = coords;

  return (
    <MapContainer
      center={[lat, lon]}
      zoom={5}
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <MapClick onMapClick={onMapClick} coords={coords} />

      <MapTileLayer mapType={mapType} />

      <Marker position={[lat, lon]} />
    </MapContainer>
  );
}

type MapClickProps = Readonly<{
  onMapClick: (lat: number, lon: number) => void;
  coords: Coords;
}>;

function MapClick({ onMapClick, coords }: MapClickProps) {
  const map = useMapEvents({
    click(e: LeafletMouseEvent) {
      onMapClick(e.latlng.lat, e.latlng.lng);
    },
  });

  useEffect(() => {
    map.panTo([coords.lat, coords.lon]);
  }, [coords, map]);

  return null;
}

function MapTileLayer({ mapType }: { mapType: string }) {
  const map = useMap();

  useEffect(() => {
    const tileLayer = new MaptilerLayer({
      style: mapType,
      apiKey: import.meta.env.VITE_MAPTILER_KEY,
    });

    tileLayer.addTo(map);

    return () => {
      map.removeLayer(tileLayer);
    };
  }, [map, mapType]);

  return null;
}
