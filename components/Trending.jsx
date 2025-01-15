import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import * as Animatable from "react-native-animatable";
import { icons } from "../constants";
import { ResizeMode, Video } from "expo-av";
import { useVideoPlayer, VideoView } from "expo-video";

const zoom = (isZoomIn) => {
  return {
    0: {
      scale: isZoomIn ? 0.9 : 1.0,
    },
    1: {
      scale: isZoomIn ? 1.0 : 0.9,
    },
  };
};

const TrendingItem = ({ activeItem, item }) => {
  const videoSource = item.video;
  const [play, setPlay] = useState(false);
  const videoViewRef = useRef(null)

  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = false;
    // if(play) 
      // player.play();
  });
  useEffect(()=>{
    if(play) player.play()
      console.log(play)
  },[play])
  return (
    <Animatable.View
      animation={zoom(activeItem === item.$id)}
      duration={500}
      className="mr-5"
    >
      {play ? (
        <VideoView
          player={player}
          className="w-52 h-72 rounded-[35px] mt-3 bg-white/10"
          allowsFullscreen
          allowsPictureInPicture
          contentFit="contain"
        />
      ) : (
        // <Video source={{uri: item.video}}
        // className='w-52 h-72 rounded-[35px] mt-3 bg-white/10'
        // resizeMode={ResizeMode.CONTAIN}
        // useNativeControls
        // shouldPlay
        // onPlaybackStatusUpdate={(status) => {
        //   if(status.didJustFinish){
        //     setPlay(false)
        //   }
        // }}/>
        <TouchableOpacity
          className="relative justify-center items-center"
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <ImageBackground
            source={{ uri: item.thumbnail }}
            className="w-52 h-72 rounded-[35px] my-5
            overflow-hidden shadow-lg shadow-black/40"
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
      contentOffset={{ x: 170 }}
      horizontal
    />
  );
};

export default Trending;
