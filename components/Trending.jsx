import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Image,
  Button,
} from "react-native";
import * as Animatable from "react-native-animatable";
import WebView from "react-native-webview";
import { icons } from "../constants";

const zoomIn = {
  0: {
    scale: 0.9,
  },
  1: {
    scale: 1,
  },
};

const zoomOut = {
  0: {
    scale: 1,
  },
  1: {
    scale: 0.9,
  },
};

const TrendingItem = ({ activeItem, item }) => {
  const [play, setPlay] = useState(false);

  return (
    <Animatable.View
      className="mr-5"
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {play ? (
        <View className="w-52 h-72 relative">
          <WebView
            source={{ uri: `${item.video}&muted` }}
            className="w-52 h-72 rounded-[33px] mt-3 bg-white/10"
            allowsFullscreenVideo
            onLoadEnd={() => console.log("Video Loaded")}
            onError={(e) => console.log("WebView Error:", e.nativeEvent)}
          />
          <TouchableOpacity
            style={{ position: "absolute", bottom: 10, right: 10 }}
            onPress={() => setPlay(false)}
          >
            <View
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.6)",
                borderRadius: 10,
                padding: 5,
              }}
            >
              <Text style={{ color: "white", fontSize: 12 }}>Finish</Text>
            </View>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          className="relative justify-center items-center"
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <ImageBackground
            source={{ uri: item.thumbnail }}
            className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40"
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

const Trending = ({ posts }) => {
  const [activeItem, setActiveItem] = useState(posts[0] && posts[0].$id);

  const viewableItemsChanged = useCallback(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  }, []);

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      horizontal
    />
  );
};

export default Trending;
