import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, Slider, Divider } from "react-native-elements";
import { Query, Mutation } from "react-apollo";
import GET_SETTINGS from "./getSettings.gql";
import SET_SETTINGS from "./setSettings.gql";

export default (SettingsScreen = () => (
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
));

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
          marginTop: 50
        }}
      >
        <Text h4 style={{ textAlign: "center" }}>
          Настройки
        </Text>
        <Divider style={{ backgroundColor: "black" }} />
        <View
          style={{
            flex: 0.4,
            justifyContent: "center",
            margin: 10
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
          <Button title="Очистить список избранного" />
          <Divider style={{ margin: 20 }} />
          <Button
            title="Применить настройки"
            onPress={() => this.props.applySettings({ variables: { picturesCount: this.state.picturesCount } })}
          />
        </View>
      </View>
    );
  }
}
