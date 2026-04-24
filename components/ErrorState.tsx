import styled from "styled-components";

/*
    Error handling state
    Responsible: Chanmin Woo
*/

const Box = styled.div`
  padding: 20px 0;
  color: darkred;
`;

interface ErrorStateProps {
    message: string;
}

export default function ErrorState(props: ErrorStateProps) {
    return <Box>{props.message}</Box>;
}