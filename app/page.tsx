"use client";

import styled from "styled-components";
import MuseumMap from "@/components/MuseumMap";

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

export default function HomePage() {
    return (
        <Wrapper>
            <Header>
                <Heading>Museum Tour</Heading>
                <SubHeading>Meet the world's most famous museums in one place</SubHeading>
            </Header>

            <MapSection>
                <MapTitle>Museum Locations</MapTitle>
                <MapContainer>
                    <MuseumMap />
                </MapContainer>
            </MapSection>
        </Wrapper>
    );
}
