import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { Button, Text, Icon } from "react-native-elements";
import Swiper from "react-native-swiper";
import { Query, Mutation } from "react-apollo";
import GET_All_WALLPAPERS from "./wallpapers.gql";
import GET_RANDOM_WALLPAPERS from "./randomWallpapers.gql";
import GET_SETTINGS from "./getSettings.gql";
import GET_FAVORITES from "./getFavorites.gql";
import STAR_AUTHOR from "./starAuthor.gql";

const LoadingComponent = () => (
  <View style={{ flex: 1, justifyContent: "center", alignContent: "center" }}>
    <Text h2 style={{ textAlign: "center" }}>
      Loading...
    </Text>
  </View>
);

const ErrorComponent = () => (
  <View style={{ flex: 1, justifyContent: "center", alignContent: "center" }}>
    <Text h2 style={{ textAlign: "center" }}>
      Error
    </Text>
  </View>
);

const FavoriteAuthors = props => (
  <Query query={GET_FAVORITES}>
    {({ loading, data, error }) => {
      if (loading) return <LoadingComponent />;
      if (error) return <ErrorComponent />;

      return (
        <RandomWallpapers
          {...props}
          favoriteAuthors={data.getFavorites.favoriteAuthors}
        />
      );
    }}
  </Query>
);

const RandomWallpapers = props => (
  <Query
    query={GET_RANDOM_WALLPAPERS}
    variables={{ count: props.picturesCount, authorName: props.currentAuthor }}
  >
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
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      margin: 10
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        fontStyle: "italic",
                        marginRight: 10
                      }}
                    >
                      Автор: {item.author}
                    </Text>
                    <Mutation
                      mutation={STAR_AUTHOR}
                      refetchQueries={[{ query: GET_FAVORITES }]}
                    >
                      {starAuthor => {
                        return (
                          <Icon
                            raised
                            name={
                              props.favoriteAuthors.includes(item.author)
                                ? "star"
                                : "star-o"
                            }
                            size={28}
                            type="font-awesome"
                            color="orange"
                            onPress={() =>
                              starAuthor({
                                variables: { authorName: item.author }
                              })
                            }
                          />
                        );
                      }}
                    </Mutation>
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
    title: "Изображения"
  };

  render() {
    const currentAuthor = this.props.navigation.getParam("currentAuthor", null);

    return (
      <Query query={GET_SETTINGS} fetchPolicy="network-only">
        {({ loading, data, error, refetch }) => {
          if (loading) return null;
          if (error) return <ErrorComponent />;

          return (
            <FavoriteAuthors
              {...this.props}
              currentAuthor={currentAuthor}
              picturesCount={data.getSettings.picturesCount}
            />
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
