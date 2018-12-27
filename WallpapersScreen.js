import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { Button, Text, Icon } from "react-native-elements";
import Swiper from "react-native-swiper";
import { Query, Mutation } from "react-apollo";
import GET_All_WALLPAPERS from "./wallpapers.gql";
import GET_RANDOM_WALLPAPERS from "./randomWallpapers.gql";
import GET_SETTINGS from "./getSettings.gql";

const LoadingComponent = () => (
  <View style={{ justifyContent: "center", alignContent: "center" }}>
    <Text h2 style={{ textAlign: "center" }}>
      Loading...
    </Text>
  </View>
);

const ErrorComponent = () => (
  <View style={{ justifyContent: "center", alignContent: "center" }}>
    <Text h2 style={{ textAlign: "center" }}>
      Error
    </Text>
  </View>
);

const RandomWallpapers = props => (
  <Query query={GET_RANDOM_WALLPAPERS} variables={{ c: props.picturesCount }}>
    {({ loading, error, data, refetch }) => {
      if (loading) return <LoadingComponent />;
      if (error) return <ErrorComponent />;

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
            {data.getRandomWallpapers.map((item, index) => {
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
                  <View
                    style={{
                      justifyContent: "flex-start",
                      alignItems: "center",
                      margin: 10,
                    }}
                  >
                    <Text style={{ fontSize: 20, fontStyle: "italic" }}>
                      Автор: {item.author}
                    </Text>
                    <Icon
                      raised
                      name="heart-o"
                      size={28}
                      type="font-awesome"
                      color="red"
                      onPress={() => console.log("Pressed!")}
                    />
                  </View>
                </View>
              );
            })}
          </Swiper>
          <View style={{ justifyContent: "center", margin: 15 }}>
            <Button
              title="Следующие изображения"
              titleStyle={{ fontSize: 24 }}
              onPress={() => refetch()}
            />
          </View>
        </View>
      );
    }}
  </Query>
);

export default class WallpapersScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    title: "Wallpapers"
  };

  render() {
    return (
      <Query query={GET_SETTINGS} fetchPolicy="network-only">
        {({ loading, data, error, refetch }) => {
          if (loading) return null;
          if (error) return <ErrorComponent />;

          return (
            <RandomWallpapers picturesCount={data.getSettings.picturesCount} />
          );
        }}
      </Query>
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
