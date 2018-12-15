import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { Button, Text } from "react-native-elements";
import Swiper from "react-native-swiper";
import ApolloClient from "apollo-boost";
import { ApolloProvider, Query, ApolloConsumer, Mutation } from "react-apollo";
import gql from "graphql-tag";

const client = new ApolloClient({
  uri: "https://qxjm8781vp.lp.gql.zone/graphql"
});

export default class WallpapersScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const arr = [1, 2, 3];

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
          {arr.map((item, index) => {
            return (
              <View key={index} style={styles.wallpaperContainer}>
                <Image
                  source={{
                    uri: "https://picsum.photos/400/400?image=1"
                  }}
                  style={{
                    width: "98%",
                    height: "80%",
                    borderRadius: 10
                  }}
                />
                <Text style={{ fontSize: 20, fontStyle: "italic", margin: 10 }}>
                  Author: {"Ivan Petrovich"}
                </Text>
              </View>
            );
          })}
        </Swiper>
      </View>
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
