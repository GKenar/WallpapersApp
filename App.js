import React from "react";
import { StyleSheet, View } from "react-native";
import MainScreen from "./MainScreen.js";
import WallpapersScreen from "./WallpapersScreen";
import SettingsScreen from "./SettingsScreen";
import { Button, Text } from "react-native-elements";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { resolvers } from "./resolvers";

const client = new ApolloClient({
  uri: "https://wallpapersapp.glitch.me/",
  clientState: {
    resolvers
  }
});

export default class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <View style={styles.container}>
          <WallpapersScreen />
        </View>
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
