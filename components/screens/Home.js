import {
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Text,
  Image
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLOURS, Items, categories } from '../database/Database'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const Home = ({ navigation }) => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getDataFromDB()
    })

    return unsubscribe
  }, [navigation])

  // get data from DB
  const getDataFromDB = () => {
    let productList = []
    for (let index = 0; index < Items.length; index++) {
      productList.push(Items[index])
    }

    setProducts(productList)
  }

  const PopularCard = ({ data }) => {
    return (
      <TouchableOpacity
        className='w-1/6 my-4 mr-3 bg-white p-2 rounded-lg'
        onPress={() =>
          navigation.navigate('ProductInfo', { productID: data.id })
        }
      >
        <View className='w-full h-[100] rounded-lg bg-backgroundLight relative justify-center items-center mb-2'>
          <TouchableOpacity className='absolute w-8 h-8 bg-gray-300 top-2 right-2 rounded-lg items-center justify-center'>
            <Text className='text-xs text-white font-bold tracking-widest'>
              <MaterialCommunityIcons
                name='cards-heart-outline'
                size={14}
                color='#007300'
              />
            </Text>
          </TouchableOpacity>
          <Image
            source={{ uri: data.productImage }}
            className='w-4/5 h-4/5'
            resizeMode='contain'
          />
        </View>

        <Text className='text-xs text-black font-semibold mb-1'>
          {data.productName}
        </Text>

        <View className='flex-row items-center'>
          <Text className={`text-${COLOURS.textGray}`}>
            {data.description?.slice(0, 5) + '...'}
          </Text>
        </View>

        <View className='flex-row justify-between'>
          <Text className='text-base text-black font-bold mb-1'>
            {/* $ {data.productPrice} */}
          </Text>
          <View className='bg-[#4b8e4b] h-8 w-8 rounded-lg flex items-center justify-center'>
            <MaterialCommunityIcons
              name='leaf'
              size={18}
              color={COLOURS.white}
            />
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  const CategoryCard = ({ data }) => {
    return (
      <TouchableOpacity
        className='w-1/12 my-4 mr-3 bg-white p-2 rounded-lg'
        onPress={() => navigation.navigate('Products', { category: data.id })}
      >
        <View className='w-full h-[100] rounded-lg bg-backgroundLight relative justify-center items-center mb-2'>
          <Image
            source={{ uri: data.productImage }}
            className='w-4/5 h-4/5'
            resizeMode='cover'
          />
        </View>

        <View className='flex-row justify-between'>
          <Text className='text-xs text-black font-semibold mb-1'>
            {data.productName}
          </Text>

          <TouchableOpacity>
            <Entypo
              name='chevron-right'
              style={{
                fontSize: 18,
                color: COLOURS.backgroundDark,
                backgroundColor: COLOURS.white,
                borderRadius: 10
              }}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView className={`w-full h-full bg-[#f5f5f5]`}>
      <StatusBar backgroundColor={COLOURS.white} barStyle='dark-content' />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className='w-full flex flex-row justify-between p-4'>
          <TouchableOpacity className='p-4 rounded-xl bg-gray-200'>
            <Entypo name='home' size={14} color={COLOURS.backgroundMedium} />
          </TouchableOpacity>
          <TouchableOpacity
            className='p-4 rounded-xl bg-gray-200'
            onPress={() => navigation.navigate('MyFavourite')}
          >
            <MaterialCommunityIcons
              name='heart'
              size={14}
              color={COLOURS.backgroundMedium}
            />
          </TouchableOpacity>
        </View>

        <View className='mb-3 p-4'>
          <Text className='text-2xl text-black font-medium tracking-widest mb-3'>
            Orchids Wishlist
          </Text>
          <Text className='text-sm text-black font-normal tracking-widest mb-3 leading-6'>
            Find your favorite orchids here. {'\n'}This shop offers plenty of
            orchids
          </Text>
        </View>

        <View className='p-4'>
          <View className='flex-row items-center justify-between'>
            <View className='flex-row items-center'>
              <Text className='text-lg text-black font-medium tracking-widest'>
                Most Popular
              </Text>
              <Text className='text-sm text-black font-medium tracking-wider opacity-50 ml-2'>
                41
              </Text>
            </View>

            <Text
              className='text-sm text-[#007700] font-normal'
              onPress={() => navigation.navigate('Products', { category: '' })}
            >
              See All
            </Text>
          </View>

          {/* <View className='flex-row flex-wrap justify-around'> */}
          <ScrollView
            className='p-4'
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {products.splice(0, 12).map((data) => {
              return <PopularCard data={data} key={data.id} />
            })}
          </ScrollView>
          {/* </View> */}

          <View className='flex-row items-center justify-between'>
            <View className='flex-row items-center'>
              <Text className='text-lg text-black font-medium tracking-widest'>
                Categories
              </Text>
              <Text className='text-sm text-black font-medium tracking-wider opacity-50 ml-2'>
                20
              </Text>
            </View>

            <Text
              className='text-sm text-[#007700] font-normal'
              onPress={() => navigation.navigate('MyFavourite')}
            >
              See All
            </Text>
          </View>
          <ScrollView
            className='p-4'
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {categories.map((data) => {
              return <CategoryCard data={data} key={data.id} />
            })}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home
