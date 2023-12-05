// LIST_WEB_SCRAPERS_QUERY.js
import { gql } from '@apollo/client';

export const LIST_WEB_SCRAPERS_QUERY = gql`
  query webScraper {
    listWebScrapers (limit: 115) {
      data {
        title
        image
        location
        salary
        company
        datePosted
        jobLink
      }
    }
  }
`;
