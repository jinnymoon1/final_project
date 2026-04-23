"use client";

import styled from "styled-components";
import MuseumMap from "@/components/MuseumMap";
import Link from "next/link";
import { MUSEUM_DATA, MuseumKey } from "@/lib/museumTypes";

const Wrapper = styled.main`
    padding: 24px;
    max-width: 100%;
    margin: 0 auto;
`;

const Header = styled.div`
    margin-bottom: 24px;
    padding: 0 24px;
`;

const Heading = styled.h1`
    margin: 0 0 8px 0;
    font-size: 32px;
`;

const SubHeading = styled.p`
    margin: 0;
    color: #666;
    font-size: 16px;
`;

const MuseumBar = styled.div`
    display: flex;
    gap: 0;
    margin-bottom: 32px;
    border-bottom: 2px solid #ddd;
    padding: 0;
    overflow: hidden;
`;

const MuseumTab = styled(Link)`
    padding: 16px 12px;
    background: transparent;
    color: #333;
    text-decoration: none;
    border-bottom: 3px solid transparent;
    cursor: pointer;
    white-space: nowrap;
    font-size: 12px;
    font-weight: 500;
    transition: all 0.3s ease;
    flex: 1;
    min-width: 0;

    &:hover {
        background: #f5f5f5;
        border-bottom-color: #999;
    }
`;

const MapSection = styled.section`
    padding: 0 24px;
`;

const MapTitle = styled.h2`
    margin-bottom: 16px;
    font-size: 24px;
`;

const MapContainer = styled.div`
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const MUSEUM_SHORTCUTS: Record<MuseumKey, string> = {
    met: "Met",
    smithsonian: "Smithsonian",
    chicago: "Chicago",
    harvard: "Harvard",
    cleveland: "Cleveland",
    rijksmuseum: "Rijks",
    "cooper-hewitt": "Cooper",
    getty: "Getty"
};

export default function HomePage() {
    const museums = Object.entries(MUSEUM_DATA) as [MuseumKey, typeof MUSEUM_DATA[MuseumKey]][];

    return (
        <Wrapper>
            <Header>
                <Heading>Museum Tour</Heading>
                <SubHeading>Meet the world's most famous museums in one place</SubHeading>
            </Header>

            <MuseumBar>
                {museums.map(([key]) => (
                    <MuseumTab
                        key={key}
                        href={`/${key}`}
                        title={MUSEUM_DATA[key].name}
                    >
                        {MUSEUM_SHORTCUTS[key]}
                    </MuseumTab>
                ))}
            </MuseumBar>

            <MapSection>
                <MapTitle>Museum Locations</MapTitle>
                <MapContainer>
                    <MuseumMap />
                </MapContainer>
            </MapSection>
        </Wrapper>
    );
}
