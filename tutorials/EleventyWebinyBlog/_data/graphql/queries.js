const { gql } = require('graphql-request');

const ListPosts = gql`
 {
        adminUsers {
          listUsers {
            data {
              email
              firstName
              createdOn
            }
          }
        }
      }    
`
