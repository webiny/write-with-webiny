import React from "react";
import Link from "next/link";
import styled from "styled-components";

export const Navbar = styled.header`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid var(--card-border);
  padding: 15px 60px;
  color: var(--wine);

  h3 {
    font-size: 30px;

    :hover {
      cursor: pointer;
    }
  }

  li {
    list-style: none;
    margin-top: 16px;

    :hover {
      cursor: pointer;
    }
  }
`;

export default function Header() {
  return (
    <Navbar>
      <Link href="/">
        <h3>Disrupt</h3>
      </Link>
      <ul>
        <Link href={"/author"}>
          <li>Authors</li>
        </Link>
      </ul>
    </Navbar>
  );
}
