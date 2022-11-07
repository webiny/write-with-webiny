import styled from "styled-components";

export const BlogPostSection = styled.section`
  margin-top: 80px;
  padding: var(--desktop-pad);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  @media only screen and (min-width: 0px) and (max-width: 576px) {
    padding: var(--mobile-sm-pad);
  }

  @media only screen and (min-width: 577px) and (max-width: 768px) {
    padding: var(--mobile-md-pad);
  }
`;

export const IndexWrapper = styled.main`
  border: 1px solid #fff;
  height: 100vh;
`;
