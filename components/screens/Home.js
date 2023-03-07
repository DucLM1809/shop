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
import { COLOURS, Items } from '../database/Database'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const Home = ({ navigation }) => {
  const [products, setProducts] = useState([])
  const [accessory, setAccessory] = useState([])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getDataFromDB()
    })

    return unsubscribe
  }, [navigation])

  // get data from DB
  const getDataFromDB = () => {
    let productList = []
    let accessoryList = []
    for (let index = 0; index < Items.length; index++) {
      if (Items[index].category === 'product') {
        productList.push(Items[index])
      } else if (Items[index].category === 'accessory') {
        accessoryList.push(Items[index])
      }
    }

    setProducts(productList)
    setAccessory(accessoryList)
  }

  // create an product reusable card
  const ProductCard = ({ data }) => {
    return (
      <TouchableOpacity
        className='w-2/5 my-4'
        onPress={() =>
          navigation.navigate('ProductInfo', { productID: data.id })
        }
      >
        <View className='w-full h-[100] rounded-lg bg-backgroundLight relative justify-center items-center mb-2'>
          {data.isOff ? (
            <View className='absolute w-1/5 h-1/4 bg-green top-0 left-0 rounded-tl-lg rounded-br-lg items-center justify-center'>
              <Text className='text-xs text-white font-bold tracking-widest'>
                {data.offPercentage}%
              </Text>
            </View>
          ) : (
            <></>
          )}
          <Image
            source={data.productImage}
            className='w-4/5 h-4/5'
            resizeMode='contain'
          />
        </View>

        <Text className='text-xs text-black font-semibold mb-1'>
          {data.productName}
        </Text>
        {data.category === 'accessory' ? (
          data.isAvailable ? (
            <View className='flex-row items-center'>
              <FontAwesome
                name='circle'
                style={{
                  fontSize: 12,
                  marginRight: 6,
                  color: COLOURS.green
                }}
              />
              <Text className='text-xs text-green'>Available</Text>
            </View>
          ) : (
            <View className='flex-row items-center'>
              <FontAwesome
                name='circle'
                style={{
                  fontSize: 12,
                  marginRight: 6,
                  color: COLOURS.red
                }}
              />
              <Text className='text-xs text-red'>Unavailable</Text>
            </View>
          )
        ) : null}
        <Text>$ {data.productPrice}</Text>
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView className={`w-full h-full bg-[#fff]`}>
      <StatusBar backgroundColor={COLOURS.white} barStyle='dark-content' />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className='w-full flex flex-row justify-between p-4'>
          <TouchableOpacity className='p-4 rounded-xl bg-backgroundLight'>
            <Entypo
              name='shopping-bag'
              size={14}
              color={COLOURS.backgroundMedium}
            />
          </TouchableOpacity>
          <TouchableOpacity
            className='p-4 rounded-xl bg-backgroundLight'
            onPress={() => navigation.navigate('MyCart')}
          >
            <MaterialCommunityIcons
              name='cart'
              size={14}
              color={COLOURS.backgroundMedium}
            />
          </TouchableOpacity>
        </View>

        <View className='mb-3 p-4'>
          <Text className='text-2xl text-black font-medium tracking-widest mb-3'>
            Hi-Fi Shop &amp; Service
          </Text>
          <Text className='text-sm text-black font-normal tracking-widest mb-3 leading-6'>
            Audio shop on Rustaveli Ave 57. {'\n'}This shop offers both products
            and services
          </Text>
        </View>

        <View className='p-4'>
          <View className='flex-row items-center justify-between'>
            <View className='flex-row items-center'>
              <Text className='text-lg text-black font-medium tracking-widest'>
                Products
              </Text>
              <Text className='text-sm text-black font-medium tracking-wider opacity-50 ml-2'>
                41
              </Text>
            </View>

            <Text className='text-sm text-blue font-normal'>See All</Text>
          </View>

          <View className='flex-row flex-wrap justify-around'>
            {products.map((data) => {
              return <ProductCard data={data} key={data.id} />
            })}
          </View>

          <View className='flex-row items-center justify-between'>
            <View className='flex-row items-center'>
              <Text className='text-lg text-black font-medium tracking-widest'>
                Accessories
              </Text>
              <Text className='text-sm text-black font-medium tracking-wider opacity-50 ml-2'>
                78
              </Text>
            </View>

            <Text className='text-sm text-blue font-normal'>See All</Text>
          </View>

          <View className='flex-row flex-wrap justify-around'>
            {accessory.map((data) => {
              return <ProductCard data={data} key={data.id} />
            })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home
