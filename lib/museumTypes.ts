export type MuseumKey =
    | "met"
    | "smithsonian"
    | "chicago"
    | "harvard"
    | "cleveland"
    | "rijksmuseum"
    | "cooper-hewitt"
    | "getty";

export interface ArtworkItem {
    id: string;
    title: string;
    artist: string;
    image: string;
    date: string;
    source: string;
    link: string;
}

export interface MuseumInfo {
    name: string;
    address: string;
    lat: number;
    lng: number;
    phone?: string;
    website?: string;
    hours?: string;
}

export const MUSEUM_DATA: Record<MuseumKey, MuseumInfo> = {
    met: {
        name: "The Metropolitan Museum of Art",
        address: "1000 5th Ave, New York, NY 10028",
        lat: 40.7813,
        lng: -73.9740,
        phone: "(212) 535-7710",
        website: "https://www.metmuseum.org",
        hours: "Sun-Thu 10am-5pm, Fri-Sat 10am-9pm"
    },
    smithsonian: {
        name: "Smithsonian American Art Museum",
        address: "600 Maryland Ave SW, Washington, DC 20024",
        lat: 38.8884,
        lng: -77.0286,
        phone: "(202) 633-7970",
        website: "https://americanart.si.edu",
        hours: "Daily 11:30am-7pm"
    },
    chicago: {
        name: "Art Institute of Chicago",
        address: "111 S Michigan Ave, Chicago, IL 60603",
        lat: 41.8797,
        lng: -87.6233,
        phone: "(312) 443-3600",
        website: "https://www.artic.edu",
        hours: "Daily 10:30am-5pm"
    },
    harvard: {
        name: "Harvard Art Museums",
        address: "32 Quincy Street, Cambridge, MA 02138",
        lat: 42.3734,
        lng: -71.1168,
        phone: "(617) 495-9400",
        website: "https://www.harvardartmuseums.org",
        hours: "Daily 10am-5pm"
    },
    cleveland: {
        name: "Cleveland Museum of Art",
        address: "11150 East Blvd, Cleveland, OH 44106",
        lat: 41.5038,
        lng: -81.6144,
        phone: "(216) 421-7340",
        website: "https://www.clevelandart.org",
        hours: "Tue-Sun 10am-5pm"
    },
    rijksmuseum: {
        name: "Rijksmuseum",
        address: "Museumstraat 1, Amsterdam 1071 XX",
        lat: 52.3602,
        lng: 4.8852,
        phone: "+31 20 674 7000",
        website: "https://www.rijksmuseum.nl",
        hours: "Daily 9am-5pm"
    },
    "cooper-hewitt": {
        name: "Cooper Hewitt Smithsonian Design Museum",
        address: "2 E 91st St, New York, NY 10128",
        lat: 40.7851,
        lng: -73.9524,
        phone: "(212) 849-8400",
        website: "https://www.cooperhewitt.org",
        hours: "Sun 10am-6pm, Mon-Sat 10am-9pm"
    },
    getty: {
        name: "J. Paul Getty Museum",
        address: "1200 Getty Center Dr, Los Angeles, CA 90049",
        lat: 34.0764,
        lng: -118.4743,
        phone: "(310) 440-7300",
        website: "https://www.getty.edu",
        hours: "Tue-Thu, Sun 10am-5:30pm, Fri-Sat 10am-9pm"
    }
};