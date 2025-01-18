import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";
import WebView from "react-native-webview";

const VideoCard = ({
  video: {
    title,
    thumbnail,
    video,
    creator: { username, avatar },
  },
}) => {
  const [play, setPlay] = useState(false);
  return (
    <View className="flex-col items-center px-4 mb-14">
      <View className="flex-row gap-3 items-start">
        <View className="justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg">
            <Image
              source={{ uri: avatar }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>
          <View className="justify-center flex-1 ml-3 gap-y-1">
            <Text
              className="text-white font-psemibold text-sm"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text className="text-gray text-xs font-pregular" numberOfLines={1}>
              {username}
            </Text>
          </View>
        </View>
        <View>
          <Image source={icons.menu} className="w-5 h-5" resizeMode="contain" />
        </View>
      </View>
      {play ? (
        <View className="w-full h-60 relative mt-3">
          <WebView
            source={{ uri: `${video}&muted` }}
            className="w-full h-60 rounded-xl  bg-white/10"
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
          className="w-full h-60 rounded-xl mt-3 relative justify-center items-center"
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <Image
            source={{ uri: thumbnail }}
            className="w-full h-full rounded-xl mt-3"
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="cover"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;
