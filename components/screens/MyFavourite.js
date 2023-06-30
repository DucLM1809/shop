import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View
} from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { COLOURS, Items } from '../database/Database'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const MyFavourite = ({ navigation }) => {
  const [product, setProduct] = useState([])

  useEffect(() => {
    const unscribe = navigation.addListener('focus', () => {
      getDataFromDB()
    })

    return unscribe
  }, [navigation])

  // get data from local DB by ID
  const getDataFromDB = async () => {
    let items = await AsyncStorage.getItem('cartItems')
    items = JSON.parse(items)
    let productData = []
    if (items) {
      Items.forEach((data) => {
        if (items.includes(data.id)) {
          productData.push(data)
          return
        }
      })
      setProduct(productData)
    } else {
      setProduct([])
    }
  }

  // remove selected data from cart
  const removeItemFromCart = async (id) => {
    Alert.alert('Confirm', 'Do you want to remove this orchid', [
      {
        text: 'Cancel',
        style: 'cancel'
      },
      {
        text: 'Ok',
        onPress: async () => {
          let itemArray = await AsyncStorage.getItem('cartItems')
          itemArray = JSON.parse(itemArray)
          if (itemArray) {
            let array = itemArray
            for (let index = 0; index < array.length; index++) {
              if (array[index] === id) {
                array.splice(index, 1)
              }

              await AsyncStorage.setItem('cartItems', JSON.stringify(array))
              await getDataFromDB()

              ToastAndroid.show(
                'Remove orchid successfully!',
                ToastAndroid.SHORT
              )
            }
          }
        },
        style: 'cancel'
      }
    ])

    // let itemArray = await AsyncStorage.getItem('cartItems')
    // itemArray = JSON.parse(itemArray)
    // if (itemArray) {
    //   let array = itemArray
    //   for (let index = 0; index < array.length; index++) {
    //     if (array[index] === id) {
    //       array.splice(index, 1)
    //     }

    //     await AsyncStorage.setItem('cartItems', JSON.stringify(array))
    //     await getDataFromDB()
    //   }
    // }
  }

  // checkout
  const checkOut = async () => {
    try {
      await AsyncStorage.removeItem('cartItemss')
    } catch (error) {
      return error
    }

    ToastAndroid.show('Items will be delivered soon!', ToastAndroid.SHORT)

    navigation.navigate('Home')
  }

  const removeAllItemsFromCart = async () => {
    Alert.alert('Confirm', 'Do you want to remove this orchid', [
      {
        text: 'Cancel',
        style: 'cancel'
      },
      {
        text: 'Ok',
        onPress: async () => {
          await AsyncStorage.removeItem('cartItems')
          setProduct([])
        },
        style: 'cancel'
      }
    ])
  }

  const renderProducts = (data, index) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('ProductInfo', { productID: data.id })
        }
        key={index}
        className='w-full h-[100px] my-1 flex-row items-center'
      >
        <View className='w-[30%] h-[100] p-3 justify-center items-center bg-backgroundLight rounded-md mr-5'>
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

            <View className='mt-1 flex-row items-center opacity-60'>
              <Text className='text-sm font-normal max-w-[85%] mr-1'>
                {data.description}
              </Text>

              <Text>
                {/* (~&#8377; {data.productPrice + data.productPrice / 20}) */}
              </Text>
            </View>
          </View>

          <View className='flex-row justify-between items-center'>
            <TouchableOpacity onPress={() => removeItemFromCart(data.id)}>
              <MaterialCommunityIcons
                name='delete-outline'
                style={{
                  fontSize: 16,
                  color: COLOURS.backgroundDark,
                  backgroundColor: COLOURS.backgroundLight,
                  padding: 8,
                  borderRadius: 100
                }}
              />
            </TouchableOpacity>
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
        backgroundColor: COLOURS.white,
        position: 'relative'
      }}
    >
      <ScrollView>
        <View className='w-full flex-row pt-4 px-4 justify-between items-center'>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons
              name='chevron-left'
              style={{
                flexShrink: 10,
                color: COLOURS.backgroundDark,
                padding: 12,
                backgroundColor: COLOURS.backgroundLight,
                borderRadius: 12
              }}
            />
          </TouchableOpacity>

          <Text className='text-sm text-black font-normal'>Wishlist</Text>
        </View>

        <View className='flex-row justify-between items-end mb-3'>
          <Text className='text-xl text-black font-medium tracking-widest pt-5 pl-4'>
            My Favourites
          </Text>

          <TouchableOpacity onPress={() => removeAllItemsFromCart()}>
            <MaterialCommunityIcons
              name='delete-outline'
              style={{
                fontSize: 16,
                color: COLOURS.red,
                backgroundColor: COLOURS.backgroundLight,
                padding: 8,
                borderRadius: 100,
                marginRight: 12,
                border: '1px solid red'
              }}
            />
          </TouchableOpacity>
        </View>

        <View style={{ paddingHorizontal: 16 }}>
          {product?.map(renderProducts)}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default MyFavourite
