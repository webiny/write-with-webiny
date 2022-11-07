import React from "react";
import styled from "styled-components";

const Navbar = styled.header`
  position: fixed;
  width: 100%;
  height: 70px;
  color: black;
  padding: 10px 50px 0 50px;
  border-bottom: 2px solid var(--main);
  background: ghostwhite;

  h3 {
    padding: 12px 0;
  }
`;

export default function Header() {
  return (
    <Navbar>
      <nav>
        <h3>Blog</h3>
      </nav>
    </Navbar>
  );
}
