import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { Button, Text } from "react-native-elements";
import Swiper from "react-native-swiper";
import ApolloClient from "apollo-boost";
import { ApolloProvider, Query, ApolloConsumer, Mutation } from "react-apollo";
import gql from "graphql-tag";
import GET_All_WALLPAPERS from "./wallpapers.gql";
import GET_RANDOM_WALLPAPERS from "./randomWallpapers.gql";

const client = new ApolloClient({
  uri: "https://wallpapersapp.glitch.me/"
});

const RandomWallpapers = () => (
  <Query query={GET_RANDOM_WALLPAPERS} variables={{ c: 5 }}>
    {({ loading, error, data }) => {
      if (loading) return <Text>Loading...</Text>;
      if (error) return <Text>Error!</Text>;

      return (
        <View style={styles.mainContainer}>
          <Swiper
            dot={
              <View
                style={{
                  backgroundColor: "#000",
                  width: 8,
                  height: 8,
                  borderRadius: 10,
                  marginLeft: 3,
                  marginRight: 3,
                  marginTop: 3,
                  marginBottom: 3
                }}
              />
            }
            activeDot={
              <View
                style={{
                  backgroundColor: "#00f",
                  width: 13,
                  height: 13,
                  borderRadius: 7,
                  marginLeft: 7,
                  marginRight: 7
                }}
              />
            }
            loop={false}
            onMomentumScrollEnd={this.onMomentumScrollEnd}
          >
            {data.GetRandomWallpapers.map((item, index) => {
              return (
                <View key={item.id} style={styles.wallpaperContainer}>
                  <Image
                    source={{
                      uri: "https://picsum.photos/400/400?image=" + item.id
                    }}
                    style={{
                      width: "98%",
                      height: "80%",
                      borderRadius: 10
                    }}
                  />
                  <Text
                    style={{ fontSize: 20, fontStyle: "italic", margin: 10 }}
                  >
                    Author: {item.author}
                  </Text>
                </View>
              );
            })}
          </Swiper>
        </View>
      );
    }}
  </Query>
);

export default class WallpapersScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <RandomWallpapers />
      </ApolloProvider>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "stretch",
    paddingTop: 50
  },
  wallpaperContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    margin: 50
  }
});
