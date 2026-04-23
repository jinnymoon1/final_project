import styled from "styled-components";

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