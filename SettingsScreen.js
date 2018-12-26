import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { Button, Text, Overlay, Slider, Divider } from "react-native-elements";
import Swiper from "react-native-swiper";
import ApolloClient from "apollo-boost";
import { ApolloProvider, Query, ApolloConsumer, Mutation } from "react-apollo";
import gql from "graphql-tag";
import GET_SETTINGS from "./getSettings.gql";

// const GET_SETTINGS = gql`
//   query GetSettings {
//     GetSettings @client {
//       maxPicturesCount
//     }
//   }
// `;

const TestQuery = () => (
  <Query query={GET_SETTINGS}>
    {({loading, data, error}) => {
      ///
      if(loading) return null;

      console.log(data.GetSettings);
      return null;
    }}
  </Query>
);

export default class SettingsScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "flex-start",
          alignItems: "stretch",
          marginTop: 50,
        }}
      >
      <TestQuery />
        <Text h4 style={{ textAlign: "center" }}>
          Настройки
        </Text>
        <Divider style={{ backgroundColor: "black" }} />
        <View
          style={{
            flex: 0.4,
            justifyContent: "center",
            margin: 10,
          }}
        >
          <Text h4 style={{ textAlign: "left" }}>
            Количество изображений:
          </Text>
          <Slider minimumValue={0} maximumValue={10} step={1} />
          <Divider style={{ backgroundColor: "black", margin: 20 }} />
          <Button title="Очистить список избранного" />
        </View>
      </View>
    );
  }
}
