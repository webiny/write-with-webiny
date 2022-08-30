import styled from "styled-components";

export const Card = styled.div`
  height: 400px;
  width: 291px;
  border-radius: 4px;
  margin: 0 15px 40px 0px;
  border: 1px solid var(--card-border);

  :hover {
    cursor: pointer;
  }

  .featured-image {
    padding: 2px 2px;
    height: 200px;
    width: 100%;

    img {
      border-radius: 4px;
    }
  }

  .card-info {
    padding: 7px 3px;

    .title {
      padding: 4px 0;
      font-size: 17px;
      font-weight: 500;
    }

    .description {
      height: 110px;
      font-size: 14px;
    }

    .author-date {
      display: flex;
      justify-content: space-between;
      font-size: 14px;
    }
  }
`;
