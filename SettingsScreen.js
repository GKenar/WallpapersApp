import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, Slider, Divider } from "react-native-elements";
import { Query, Mutation } from "react-apollo";
import GET_SETTINGS from "./getSettings.gql";
import SET_SETTINGS from "./setSettings.gql";
import CLEAR_FAVORITES from "./clearFavorites.gql";
import GET_FAVORITES from "./getFavorites.gql";

export default class SettingsScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    title: "Настройки"
  };

  render() {
    return (
      <Query query={GET_SETTINGS}>
        {({ loading, data, error }) => {
          if (loading) return null;
          if (error) return <Text style={{ textAlign: "center" }}>Error!</Text>;

          return (
            <Mutation mutation={SET_SETTINGS}>
              {updateSettings => {
                return (
                  <SettingsFrame
                    picturesCount={data.getSettings.picturesCount}
                    applySettings={updateSettings}
                  />
                );
              }}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}

class SettingsFrame extends React.Component {
  constructor(props) {
    super(props);
    this.MIN_PICTURES_COUNT = 3;
    this.MAX_PICTURES_COUNT = 10;

    this.state = {
      picturesCount: props.picturesCount
        ? props.picturesCount
        : this.MIN_PICTURES_COUNT
    };
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "flex-start",
          alignItems: "stretch",
          marginTop: 20,
          marginLeft: 10,
          marginRight: 10
        }}
      >
        <Text h4 style={{ textAlign: "left" }}>
          Количество изображений: {this.state.picturesCount}
        </Text>
        <Slider
          minimumValue={this.MIN_PICTURES_COUNT}
          maximumValue={this.MAX_PICTURES_COUNT}
          value={this.state.picturesCount}
          step={1}
          onValueChange={value => this.setState({ picturesCount: value })}
        />
        <Divider style={{ backgroundColor: "black", margin: 20 }} />
        <Mutation mutation={CLEAR_FAVORITES} refetchQueries={[{ query: GET_FAVORITES }]}>
          {clearFavoriteList => (
            <Button
              title="Очистить список избранного"
              onPress={() => clearFavoriteList()}
            />
          )}
        </Mutation>
        <Divider style={{ margin: 20 }} />
        <Button
          title="Применить настройки"
          onPress={() =>
            this.props.applySettings({
              variables: { picturesCount: this.state.picturesCount }
            })
          }
        />
      </View>
    );
  }
}
