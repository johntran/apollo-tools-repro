import gql from 'graphql-tag';

const query = gql`
  query HeroQuery {
    hero {
      name
    }
  }
`;
