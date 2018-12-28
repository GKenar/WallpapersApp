import React from "react";
import {
  StyleSheet,
  View,
  FlatList,
  TouchableHighlight,
  Image
} from "react-native";
import { Button, Text } from "react-native-elements";

export default class FavoritesScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    title: "Favorites"
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={[1, 2, 3]}
          renderItem={({ item }) => {
            return (
              <TouchableHighlight
                onPress={() => console.log("Pressed!")}
                underlayColor="#009FBF"
              >
                <View style={styles.itemContainer}>
                  <Image
                    source={{
                      uri: "https://picsum.photos/100/100?image=" + 0
                    }}
                    style={{
                      width: "20%",
                      height: "100%"
                    }}
                  />
                  <Text h4 style={styles.item}>
                    {"aaaaaaaaaaaaaa"}
                  </Text>
                </View>
              </TouchableHighlight>
            );
          }}
          keyExtractor={item => item.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  itemContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: 'space-between',
    margin: 1,
    padding: 5,
    borderColor: "black",
    borderWidth: 1
  },
  item: {
    textAlign: "center"
  }
});
