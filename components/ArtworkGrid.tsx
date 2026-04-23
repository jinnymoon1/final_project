import styled from "styled-components";
import ArtworkCard from "./ArtworkCard";
import { ArtworkItem } from "@/lib/museumTypes";

/*
  ArtworkGrid component.
  Logic:
  - Maps over normalized artwork data.
  - Uses a safe fallback key if item.id is missing.
  Responsible: Your name here
*/

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
`;

interface ArtworkGridProps {
    items: ArtworkItem[];
}

export default function ArtworkGrid(props: ArtworkGridProps) {
    if (props.items.length === 0) {
        return <p>No artworks found for this search.</p>;
    }

    return (
        <Grid>
            {props.items.map((item, index) => (
                <ArtworkCard
                    key={item.id !== "" ? item.id : `artwork-${index}`}
                    item={item}
                />
            ))}
        </Grid>
    );
}