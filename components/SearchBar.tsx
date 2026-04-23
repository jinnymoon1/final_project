"use client";

import styled from "styled-components";

/*
  SearchBar component.
  Logic:
  - Controlled by props from parent.
  - Keeps data flow one-way: parent owns state, child receives props.
  Responsible: Your name here
*/

const Wrapper = styled.div`
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 70%;
  padding: 10px;
  margin-right: 10px;
  border: 1px solid #1f3b57;
`;

const Button = styled.button`
  padding: 10px 16px;
  background-color: #1f3b57;
  color: white;
  border: 1px solid #1f3b57;
`;

interface SearchBarProps {
    query: string;
    setQuery: (value: string) => void;
    onSearch: () => void;
}

export default function SearchBar(props: SearchBarProps) {
    return (
        <Wrapper>
            <Input
                type="text"
                value={props.query}
                maxLength={60}
                onChange={(e) => props.setQuery(e.target.value)}
                placeholder="Search artworks"
            />
            <Button onClick={props.onSearch}>Search</Button>
        </Wrapper>
    );
}