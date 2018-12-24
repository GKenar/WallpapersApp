import React from "react";
import { StyleSheet, View } from "react-native";
import MainScreen from "./MainScreen.js";
import WallpapersScreen from "./WallpapersScreen";
import SettingsScreen from "./SettingsScreen";
import { Button, Text } from "react-native-elements";

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <WallpapersScreen />
      </View>
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
