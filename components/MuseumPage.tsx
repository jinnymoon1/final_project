"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import SearchBar from "./SearchBar";
import ArtworkGrid from "./ArtworkGrid";
import LoadingState from "./LoadingState";
import ErrorState from "./ErrorState";
import { ArtworkItem, MuseumKey } from "@/lib/museumTypes";

/*
  MuseumPage component.
  Logic:
  - Client-side state with useState.
  - useEffect loads default artworks when a museum page opens.
  - Search button triggers fetch to our own Next.js API route.
  - API route returns normalized data, so UI stays identical for every museum tab.
  Responsible: Jinny Moon
*/

const Wrapper = styled.main`
  padding: 24px;
`;

const Heading = styled.h1`
  margin-bottom: 16px;
`;

interface MuseumPageProps {
    museum: MuseumKey;
    title: string;
}

const DEFAULT_QUERY = "painting";

async function fetchMuseumItems(museum: MuseumKey, searchText: string) {
    const response = await fetch(
        `/api/museums?museum=${museum}&q=${encodeURIComponent(searchText)}`
    );

    if (!response.ok) {
        throw new Error("Could not load museum data.");
    }

    const data = await response.json();
    return data.items as ArtworkItem[];
}

export default function MuseumPage(props: MuseumPageProps) {
    const [query, setQuery] = useState(DEFAULT_QUERY);
    const [items, setItems] = useState<ArtworkItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function runSearch(searchText: string) {
        try {
            setLoading(true);
            setError("");
            const nextItems = await fetchMuseumItems(props.museum, searchText);
            setItems(nextItems);
        } catch {
            setError("Something went wrong while loading artworks.");
            setItems([]);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        async function loadDefaultArtworks() {
            try {
                setLoading(true);
                setError("");
                const nextItems = await fetchMuseumItems(props.museum, DEFAULT_QUERY);
                setItems(nextItems);
            } catch {
                setError("Something went wrong while loading artworks.");
                setItems([]);
            } finally {
                setLoading(false);
            }
        }

        loadDefaultArtworks();
    }, [props.museum]);

    return (
        <Wrapper>
            <Heading>{props.title}</Heading>
            <SearchBar query={query} setQuery={setQuery} onSearch={() => runSearch(query)} />
            {loading ? <LoadingState /> : null}
            {error !== "" ? <ErrorState message={error} /> : null}
            {loading === false && error === "" ? <ArtworkGrid items={items} /> : null}
        </Wrapper>
    );
}