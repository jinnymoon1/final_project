import { NextRequest, NextResponse } from "next/server";
import { ArtworkItem, MuseumKey } from "@/lib/museumTypes";

/*
  Server-side API route.
  Logic:
  - Keeps private keys on the server.
  - Converts different museum API responses into one shared ArtworkItem shape.
  - Ensures every artwork always has a usable id string.
  Responsible: Sang Hyup Lee
*/

function safeString(value: unknown): string {
    return typeof value === "string" ? value : "";
}

function safeNumberString(value: unknown): string {
    if (typeof value === "number") {
        return String(value);
    }
    if (typeof value === "string") {
        return value;
    }
    return "";
}

function buildFallbackId(prefix: string, index: number, title: string): string {
    if (title !== "") {
        return `${prefix}-${index}-${title}`;
    }
    return `${prefix}-${index}`;
}

function buildChicagoImageUrl(imageId: string): string {
    if (imageId === "") {
        return "";
    }
    return `https://www.artic.edu/iiif/2/${imageId}/full/400,/0/default.jpg`;
}

async function getMet(q: string): Promise<ArtworkItem[]> {
    const searchUrl = `https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=${encodeURIComponent(q)}`;
    const searchRes = await fetch(searchUrl, { cache: "no-store" });
    const searchData = await searchRes.json();

    const ids: number[] = Array.isArray(searchData.objectIDs)
        ? searchData.objectIDs.slice(0, 12)
        : [];

    const results = await Promise.all(
        ids.map(async (id, index) => {
            const res = await fetch(
                `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`,
                { cache: "no-store" }
            );
            const item = await res.json();

            const title = safeString(item.title);

            const normalized: ArtworkItem = {
                id:
                    safeNumberString(item.objectID) !== ""
                        ? safeNumberString(item.objectID)
                        : buildFallbackId("met", index, title),
                title: title,
                artist: safeString(item.artistDisplayName),
                image: safeString(item.primaryImageSmall),
                date: safeString(item.objectDate),
                source: "The Metropolitan Museum of Art",
                link: safeString(item.objectURL),
            };

            return normalized;
        })
    );

    return results;
}

async function getSmithsonian(q: string): Promise<ArtworkItem[]> {
    const key = process.env.SMITHSONIAN_API_KEY ?? "";
    const url = `https://api.si.edu/openaccess/api/v1.0/search?q=${encodeURIComponent(q)}&api_key=${key}`;
    const res = await fetch(url, { cache: "no-store" });
    const data = await res.json();

    const rows = Array.isArray(data.response?.rows)
        ? data.response.rows.slice(0, 12)
        : [];

    return rows.map((row: any, index: number) => {
        const media =
            row?.content?.descriptiveNonRepeating?.online_media?.media?.[0]?.content ??
            "";

        const title = safeString(row?.title);

        return {
            id:
                safeString(row?.id) !== ""
                    ? safeString(row.id)
                    : buildFallbackId("smithsonian", index, title),
            title: title,
            artist: safeString(
                row?.content?.freetext?.name?.[0]?.content ?? "Unknown"
            ),
            image: safeString(media),
            date: safeString(
                row?.content?.freetext?.date?.[0]?.content ?? "Unknown"
            ),
            source: "Smithsonian Institution",
            link: safeString(
                row?.content?.descriptiveNonRepeating?.record_link ?? ""
            ),
        };
    });
}

async function getChicago(q: string): Promise<ArtworkItem[]> {
    const url =
        `https://api.artic.edu/api/v1/artworks/search?q=${encodeURIComponent(q)}` +
        `&limit=12&fields=id,title,artist_title,date_display,image_id`;

    const res = await fetch(url, { cache: "no-store" });
    const data = await res.json();

    const rows = Array.isArray(data.data) ? data.data : [];

    return rows.map((row: any, index: number) => {
        const title = safeString(row?.title);

        return {
            id:
                safeNumberString(row?.id) !== ""
                    ? safeNumberString(row.id)
                    : buildFallbackId("chicago", index, title),
            title: title,
            artist: safeString(row?.artist_title),
            image: buildChicagoImageUrl(safeString(row?.image_id)),
            date: safeString(row?.date_display),
            source: "Art Institute of Chicago",
            link:
                safeNumberString(row?.id) !== ""
                    ? `https://www.artic.edu/artworks/${row.id}`
                    : "",
        };
    });
}

async function getHarvard(q: string): Promise<ArtworkItem[]> {
    const key = process.env.HARVARD_API_KEY ?? "";
    const url =
        `https://api.harvardartmuseums.org/object?apikey=${key}` +
        `&size=12&title=${encodeURIComponent(q)}` +
        `&fields=objectid,title,dated,primaryimageurl,people,url`;

    const res = await fetch(url, { cache: "no-store" });
    const data = await res.json();

    const rows = Array.isArray(data.records) ? data.records : [];

    return rows.map((row: any, index: number) => {
        const title = safeString(row?.title);

        return {
            id:
                safeNumberString(row?.objectid) !== ""
                    ? safeNumberString(row.objectid)
                    : buildFallbackId("harvard", index, title),
            title: title,
            artist: safeString(row?.people?.[0]?.name ?? "Unknown"),
            image: safeString(row?.primaryimageurl),
            date: safeString(row?.dated),
            source: "Harvard Art Museums",
            link: safeString(row?.url),
        };
    });
}

async function getCleveland(q: string): Promise<ArtworkItem[]> {
    const url = `https://openaccess-api.clevelandart.org/api/artworks/?q=${encodeURIComponent(q)}&limit=12`;

    const res = await fetch(url, { cache: "no-store" });
    const data = await res.json();

    const rows = Array.isArray(data.data) ? data.data : [];

    return rows.map((row: any, index: number) => {
        const title = safeString(row?.title);

        return {
            id:
                safeNumberString(row?.id) !== ""
                    ? safeNumberString(row.id)
                    : buildFallbackId("cleveland", index, title),
            title: title,
            artist: safeString(row?.creators?.[0]?.description ?? "Unknown"),
            image: safeString(row?.images?.web?.url ?? ""),
            date: safeString(row?.creation_date),
            source: "Cleveland Museum of Art",
            link: safeString(row?.url),
        };
    });
}

async function getRijksmuseum(): Promise<ArtworkItem[]> {
    const url = `https://data.rijksmuseum.nl/search/collection`;
    const res = await fetch(url, { cache: "no-store" });
    const data = await res.json();

    const rows = Array.isArray(data.orderedItems)
        ? data.orderedItems.slice(0, 12)
        : [];

    return rows.map((row: any, index: number) => {
        const title = safeString(row?._label ?? "Rijksmuseum object");
        const rowId = safeString(row?.id);

        return {
            id: rowId !== "" ? rowId : buildFallbackId("rijksmuseum", index, title),
            title: title,
            artist: "Unknown",
            image: "",
            date: "",
            source: "Rijksmuseum",
            link: rowId,
        };
    });
}

async function getGetty(): Promise<ArtworkItem[]> {
    return [
        {
            id: "getty-placeholder-1",
            title: "Getty integration starter",
            artist: "Add response mapping after testing Getty response structure",
            image: "",
            date: "",
            source: "The Getty",
            link: "https://data.getty.edu/museum/collection/",
        },
    ];
}

async function getCooperHewitt(): Promise<ArtworkItem[]> {
    return [
        {
            id: "cooper-hewitt-placeholder-1",
            title: "Cooper Hewitt integration starter",
            artist: "Add tested Cooper Hewitt endpoint and response mapping",
            image: "",
            date: "",
            source: "Cooper Hewitt",
            link: "https://api.collection.cooperhewitt.org/rest/",
        },
    ];
}

export async function GET(request: NextRequest) {
    try {
        const museum = request.nextUrl.searchParams.get("museum") as MuseumKey | null;
        const q = request.nextUrl.searchParams.get("q") ?? "cats";

        let items: ArtworkItem[] = [];

        if (museum === "met") {
            items = await getMet(q);
        } else if (museum === "smithsonian") {
            items = await getSmithsonian(q);
        } else if (museum === "chicago") {
            items = await getChicago(q);
        } else if (museum === "harvard") {
            items = await getHarvard(q);
        } else if (museum === "cleveland") {
            items = await getCleveland(q);
        } else if (museum === "rijksmuseum") {
            items = await getRijksmuseum();
        } else if (museum === "getty") {
            items = await getGetty();
        } else if (museum === "cooper-hewitt") {
            items = await getCooperHewitt();
        } else {
            return NextResponse.json(
                { error: "Invalid museum tab." },
                { status: 400 }
            );
        }

        return NextResponse.json({ items });
    } catch (error) {
        return NextResponse.json(
            { error: "Server failed to load museum API." },
            { status: 500 }
        );
    }
}