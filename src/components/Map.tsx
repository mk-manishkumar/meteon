import { useEffect } from "react";
import { MapContainer, Marker, TileLayer, useMap, useMapEvents } from "react-leaflet";
import type { LeafletMouseEvent } from "leaflet";
import "leaflet/dist/leaflet.css";
import { MaptilerLayer } from "@maptiler/leaflet-maptilersdk";
import type { Coords } from "../types";

const API_KEY = import.meta.env.VITE_API_KEY;

type Props = Readonly<{
  coords: Coords;
  onMapClick: (lat: number, lon: number) => void;
  mapType: string;
}>;

export default function WeatherMap({ coords, onMapClick, mapType }: Props) {
  const { lat, lon } = coords;

  return (
    <MapContainer center={[lat, lon]} zoom={5} style={{ width: "100%", height: "100%" }}>
      <MapClick onMapClick={onMapClick} coords={coords} />

      <MapTileLayer />

      <TileLayer opacity={0.7} url={`https://tile.openweathermap.org/map/${mapType}/{z}/{x}/{y}.png?appid=${API_KEY}`} />

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

function MapTileLayer() {
  const map = useMap();

  useEffect(() => {
    const tileLayer = new MaptilerLayer({
      style: "basic-dark",
      apiKey: "IhKaCSDZTkOXDUTqcSbm",
    });

    tileLayer.addTo(map);

    return () => {
      map.removeLayer(tileLayer);
    };
  }, [map]);

  return null;
}
