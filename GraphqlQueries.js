import gql from "graphql-tag";

const GET_All_WALLPAPERS = gql`
  query Wallpapers {
    GetAllWallpapers {
      id
      author
    }
  }
`;

const GET_RANDOM_WALLPAPERS = gql`
  query RandomWallpapers($c: Int!) {
    GetRandomWallpapers(count: $c) {
      id
      author
    }
  }
`;
