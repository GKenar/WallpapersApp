import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-elements";

export default class MainScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    title: "Wallpapers App"
  };

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.buttonsContainer}>
          <Button
            buttonStyle={{ margin: 20, height: 50 }}
            title="Перейти к просмотру"
            onPress={() => this.props.navigation.navigate("Wallpapers")}
          />
          <Button
            buttonStyle={{ margin: 20, height: 50 }}
            title="Настройки приложения"
            onPress={() => this.props.navigation.navigate("Settings")}
          />
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
    borderColor: "red",
    borderWidth: 2
  },
  buttonsContainer: {
    flex: 0.8,
    backgroundColor: "#fff",
    alignItems: "stretch",
    justifyContent: "center",
    borderColor: "blue",
    borderWidth: 2
  }
});
