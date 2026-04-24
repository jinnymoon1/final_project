"use client";

import { useEffect, useRef } from "react";
import styled from "styled-components";
import { MUSEUM_DATA, MuseumKey } from "@/lib/museumTypes";

/*
  MuseumMap component.
  Logic:
  - Renders a Google Map on the client side.
  - useRef keeps track of the map and markers.
  - useEffect creates the map and adds museum markers from MUSEUM_DATA.
  - Clicking a marker shows museum info and a detail page link.
  Responsible: Sang Hyup Lee
*/

const MapContainer = styled.div`
    width: 100%;
    height: 500px;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export default function MuseumMap() {
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstance = useRef<any>(null);
    const markers = useRef<any[]>([]);

    useEffect(() => {
        if (!mapRef.current) return;
        if (!(window as any).google) return;

        const googleMaps = (window as any).google;

        mapInstance.current = new googleMaps.maps.Map(mapRef.current, {
            zoom: 3,
            center: { lat: 20, lng: 0 },
            styles: [
                {
                    featureType: "poi",
                    elementType: "labels",
                    stylers: [{ visibility: "off" }],
                },
            ],
        });

        markers.current.forEach((marker) => marker.setMap(null));
        markers.current = [];

        const museumEntries = Object.entries(MUSEUM_DATA) as [MuseumKey, typeof MUSEUM_DATA[MuseumKey]][];

        museumEntries.forEach(([key, museum]) => {
            const marker = new googleMaps.maps.Marker({
                position: { lat: museum.lat, lng: museum.lng },
                map: mapInstance.current,
                title: museum.name,
            });

            marker.addListener("click", () => {
                const infoWindow = new googleMaps.maps.InfoWindow({
                    content: `
                        <div style="padding: 8px;">
                            <h3 style="margin: 0 0 8px 0; font-size: 14px;">${museum.name}</h3>
                            <p style="margin: 4px 0; font-size: 12px;"><strong>Address:</strong> ${museum.address}</p>
                            <p style="margin: 4px 0; font-size: 12px;"><strong>Phone:</strong> ${museum.phone || "No information available"}</p>
                            <a href="/${key}" style="display: inline-block; margin-top: 8px; padding: 6px 12px; background: #007bff; color: white; text-decoration: none; border-radius: 4px;">View Details</a>
                        </div>
                    `,
                });
                infoWindow.open(mapInstance.current, marker);
            });

            markers.current.push(marker);
        });
    }, []);

    return <MapContainer ref={mapRef} />;
}
