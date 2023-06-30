import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLOURS, Items } from '../database/Database'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Products = ({ route, navigation }) => {
  const [product, setProduct] = useState()
  const { category } = route.params

  useEffect(() => {
    const unscribe = navigation.addListener('focus', () => {
      getDataFromDB()
    })

    return unscribe
  }, [navigation])

  // get data from local DB by ID
  const getDataFromDB = () => {
    setProduct(
      category ? Items.filter((item) => item.category === category) : Items
    )
  }

  const renderProducts = (data, index) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('ProductInfo', { productID: data.id })
        }
        key={index}
        className='w-full h-[100px] my-1 flex-row items-center bg-white p-2'
      >
        <View className='w-[30%] h-[90] p-3 justify-center items-center bg-backgroundLight rounded-md mr-5'>
          <Image
            source={{ uri: data.productImage }}
            resizeMode='contain'
            className='w-full h-full'
          />
        </View>

        <View className='flex-1 h-full justify-around'>
          <View>
            <Text className='text-sm max-w-full text-black font-semibold tracking-widest'>
              {data.productName}
            </Text>

            <View className='flex-row items-center'>
              <Text className={`text-${COLOURS.textGray}`}>
                {data.description}
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
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#f5f5f5',
        position: 'relative'
      }}
    >
      <ScrollView>
        <View className='w-full flex-row pt-4 px-4 justify-between items-center'>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className='bg-gray-200 rounded-lg'
          >
            <MaterialCommunityIcons
              name='chevron-left'
              style={{
                flexShrink: 10,
                color: COLOURS.backgroundDark,
                padding: 12
              }}
            />
          </TouchableOpacity>

          <Text className='text-sm text-black font-normal'>Orchids</Text>

          <View></View>
        </View>

        <Text className='text-xl text-black font-medium tracking-widest pt-5 pl-4 mb-3'>
          Products
        </Text>

        <View style={{ paddingHorizontal: 16 }}>
          {product?.map(renderProducts)}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Products
