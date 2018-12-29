import React from "react";
import { StyleSheet, View } from "react-native";
import MainScreen from "./MainScreen.js";
import WallpapersScreen from "./WallpapersScreen";
import SettingsScreen from "./SettingsScreen";
import FavoritesScreen from "./FavoritesScreen";
import { createStackNavigator, createAppContainer } from "react-navigation";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { resolvers } from "./resolvers";

const client = new ApolloClient({
  uri: "https://wallpapersapp.glitch.me/",
  clientState: {
    resolvers
  }
});

const AppNavigator = createStackNavigator(
  {
    Home: MainScreen,
    Wallpapers: WallpapersScreen,
    Settings: SettingsScreen,
    Favorites: FavoritesScreen
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#006AFF"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
        textAlign: "center"
      }
    }
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <AppContainer />
      </ApolloProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center"
  }
});
