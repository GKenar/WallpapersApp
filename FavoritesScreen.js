import React from "react";
import { StyleSheet, View, FlatList, TouchableHighlight } from "react-native";
import { Button, Text } from "react-native-elements";
import { Query } from "react-apollo";
import GET_FAVORITES from "./getFavorites.gql";

export default class FavoritesScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    title: "Избранное"
  };

  render() {
    return (
      <Query query={GET_FAVORITES}>
        {({ loading, data, error }) => {
          if (loading) return null;
          if (error) return null;

          return (
            <View style={styles.container}>
              <FlatList
                data={data.getFavorites.favoriteAuthors}
                renderItem={({ item }) => {
                  return (
                    <TouchableHighlight
                      onPress={() =>
                        this.props.navigation.navigate("Wallpapers", {
                          currentAuthor: item
                        })
                      }
                      underlayColor="#009FBF"
                    >
                      <View style={styles.itemContainer}>
                        <Text h4 style={styles.item}>
                          {item}
                        </Text>
                      </View>
                    </TouchableHighlight>
                  );
                }}
                keyExtractor={item => item.toString()}
              />
            </View>
          );
        }}
      </Query>
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
    justifyContent: "center",
    margin: 1,
    padding: 5,
    borderColor: "black",
    borderWidth: 1
  },
  item: {
    textAlign: "center"
  }
});
