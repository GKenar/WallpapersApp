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
            buttonStyle={styles.button}
            title="Перейти к просмотру изображений"
            onPress={() => this.props.navigation.navigate("Wallpapers")}
          />
          <Button
            buttonStyle={styles.button}
            title="Список избранных авторов"
            onPress={() => this.props.navigation.navigate("Favorites")}
          />
          <Button
            buttonStyle={styles.button}
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
  },
  buttonsContainer: {
    flex: 0.8,
    backgroundColor: "#fff",
    alignItems: "stretch",
    justifyContent: "center",
  },
  button: {
    margin: 20,
    height: 70,
    borderRadius: 15
  }
});
