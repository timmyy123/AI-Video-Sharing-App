import { View, Text, FlatList, Image, RefreshControl, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import SearchInput from '../../components/SearchInput'
import Trending from '../../components/Trending'
import EmptyState from '../../components/EmptyState'
import { getAllPosts } from '../../lib/appwrite'
import useAppwrite from '../../hooks/useAppwrite'
import VideoCard from '../../components/VideoCard'

const Home = () => {
  const [refreshing, setRefreshing] = useState(false)

  const{data: posts, fetchData} = useAppwrite(getAllPosts)
  
  
  const onRefresh = async () => {
    setRefreshing(true)
    await fetchData()
    setRefreshing(false)
  }

  
  return (
    <SafeAreaView className='bg-primary h-full'>
      <FlatList data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={({item}) => (
        <VideoCard video={item}/>
      )}
      ListHeaderComponent={()=>(
        <View className='my-6 px-4 space-y-6'>
          <View className='justify-between items-start flex-row mb-6'>
            <View>
              <Text className='font-pmedium text-sm text-gray'>
                Welcome Back
              </Text>
              <Text className='text-2xl font-psemibold text-white'>
                a
              </Text>
            </View>
            <View className='mt-1.5'>
              <Image source={images.logoSmall} className='w-9 h-10' resizeMode='contain'></Image>
            </View>
          </View>
          <SearchInput></SearchInput>
          <View className='w-full flex-1 pt5 pb-8'>
            <Text className='text-gray text-lg font-pregular mb-3'>Latest Videos</Text>
            <Trending posts={[{id: 1}]}/>
          </View>
        </View>
      )}
      ListEmptyComponent={()=>(
        <EmptyState
        title='No Videos Found'
        subtitle='Be the first one to upload a video'/>
  )}
  refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}/>
      
    </SafeAreaView>
  )
}

export default Home