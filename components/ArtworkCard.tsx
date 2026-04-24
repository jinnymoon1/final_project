import styled from "styled-components";
import { ArtworkItem } from "@/lib/museumTypes";

/*
  ArtworkCard component.
  Logic:
  - Displays one normalized artwork object.
  - Uses safe fallback text when image is missing.
  Responsible: Chanmin Woo
*/

const Card = styled.div`
  border: 1px solid #1f3b57;
  padding: 14px;
  background-color: white;
`;

const Image = styled.img`
  width: 100%;
  height: 240px;
  object-fit: cover;
  display: block;
  margin-bottom: 10px;
`;

const Title = styled.h3`
  margin-bottom: 8px;
`;

const Text = styled.p`
  margin-bottom: 6px;
`;

const MuseumLink = styled.a`
  text-decoration: none;
  color: #1f3b57;
`;

interface ArtworkCardProps {
    item: ArtworkItem;
}

export default function ArtworkCard(props: ArtworkCardProps) {
    return (
        <Card>
            {props.item.image !== "" ? (
                <Image src={props.item.image} alt={props.item.title} />
            ) : (
                <Text>No image available.</Text>
            )}
            <Title>{props.item.title}</Title>
            <Text><strong>Artist:</strong> {props.item.artist}</Text>
            <Text><strong>Date:</strong> {props.item.date}</Text>
            <Text><strong>Museum:</strong> {props.item.source}</Text>
            <MuseumLink href={props.item.link} target="_blank">
                View at museum
            </MuseumLink>
        </Card>
    );
}