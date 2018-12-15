import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-elements";

export default class MainScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <Text h2 style={{ margin: 20 }}>
          Wallpapers App
        </Text>
        <View style={styles.buttonsContainer}>
          <Button buttonStyle={{ margin: 20 }} />
          <Button buttonStyle={{ margin: 20 }} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-evenly",
    borderColor: 'red',
    borderWidth: 2
  },
  buttonsContainer: {
    flex: 0.5,
    backgroundColor: "#fff",
    alignItems: "stretch",
    justifyContent: "center",
    borderColor: 'blue',
    borderWidth: 2
  }
});
