"use client";

import styled from "styled-components";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MUSEUM_DATA, MuseumKey } from "@/lib/museumTypes";

const Nav = styled.nav`
    background: #fff;
    border-bottom: 2px solid #ddd;
    position: sticky;
    top: 0;
    z-index: 100;
`;

const NavContainer = styled.div`
    display: flex;
    gap: 0;
    overflow-x: auto;
    padding: 0;

    &::-webkit-scrollbar {
        display: none;
    }
`;

const NavLink = styled(Link)`
    padding: 16px 24px;
    text-decoration: none;
    color: #666;
    border-bottom: 3px solid transparent;
    white-space: nowrap;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.3s ease;

    &:hover {
        color: #333;
        border-bottom-color: #999;
    }
`;

const HomeLink = styled(Link)`
    padding: 16px 24px;
    text-decoration: none;
    color: #666;
    border-bottom: 3px solid transparent;
    white-space: nowrap;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.3s ease;

    &:hover {
        color: #333;
        border-bottom-color: #999;
    }
`;

export default function Navigation() {
    const pathname = usePathname();
    const museums = Object.entries(MUSEUM_DATA) as [MuseumKey, typeof MUSEUM_DATA[MuseumKey]][];
    const activeLinkStyle = {
        color: "#333",
        borderBottom: "3px solid #333",
        fontWeight: 600,
    };

    return (
        <Nav>
            <NavContainer>
                <HomeLink href="/" style={pathname === "/" ? activeLinkStyle : undefined}>
                    🏛️ Home
                </HomeLink>
                {museums.map(([key, museum]) => (
                    <NavLink
                        key={key}
                        href={`/${key}`}
                        style={pathname === `/${key}` ? activeLinkStyle : undefined}
                    >
                        {museum.name}
                    </NavLink>
                ))}
            </NavContainer>
        </Nav>
    );
}
