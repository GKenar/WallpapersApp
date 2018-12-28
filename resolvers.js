import { AsyncStorage } from "react-native";

export const resolvers = {
  Query: {
    getSettings: async (_, variables) => {
      const result = await AsyncStorage.getItem("picturesCount");
      return { __typename: "Settings", picturesCount: parseInt(result) };
    },
    getFavorites: async (_, variables) => {
      const favorites = JSON.parse(await AsyncStorage.getItem("favoriteAuthors"));
      return { __typename: "Favorites", favoriteAuthors: favorites };
    }
  },
  Mutation: {
    setSettings: async (_, variables) => {
      await AsyncStorage.setItem(
        "picturesCount",
        variables.picturesCount.toString()
      );
      return null;
    },
    starAuthor: async (_, variables) => {
      const favorites = JSON.parse(await AsyncStorage.getItem("favoriteAuthors"));
      const index = favorites.indexOf(variables.authorName);

      if (favorites === null || index == -1) {
        favorites.push(variables.authorName);
        console.log(favorites);
        await AsyncStorage.setItem(
          "favoriteAuthors",
          JSON.stringify(favorites)
        );
      }
      else{
        favorites.splice(index, 1);
        console.log(favorites);
        await AsyncStorage.setItem(
          "favoriteAuthors",
          JSON.stringify(favorites)
        );
      }
      return { __typename: "Favorites", favoriteAuthors: favorites }; //Попробуем так; было null
    }
  }
};
