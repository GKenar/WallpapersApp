import { AsyncStorage } from "react-native";

export const resolvers = {
  Query: {
    getSettings: async (_, variables) => {
      const result = await AsyncStorage.getItem("picturesCount");
      return { __typename: "Settings", picturesCount: parseInt(result) };
    }
  },
  Mutation: {
    setSettings: async (_, variables) => {
      await AsyncStorage.setItem("picturesCount", variables.picturesCount.toString());
      return null;
    }
  }
};
