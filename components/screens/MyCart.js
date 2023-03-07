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
import AsyncStorage from '@react-native-async-storage/async-storage'
import { COLOURS, Items } from '../database/Database'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const MyCart = ({ navigation }) => {
  const [product, setProduct] = useState()
  const [total, setTotal] = useState(null)

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
      getTotal(productData)
    } else {
      setProduct(false)
      getTotal(false)
    }
  }

  const getTotal = (productData) => {
    let total = 0
    for (let index = 0; index < productData.length; index++) {
      let productPrice = productData[index].productPrice
      total = total + productPrice
    }

    setTotal(total)
  }

  // remove selected data from cart
  const removeItemFromCart = async (id) => {
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
      }
    }
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
            source={data.productImage}
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
                &#8377;{data.productPrice}
              </Text>

              <Text>
                (~&#8377; {data.productPrice + data.productPrice / 20})
              </Text>
            </View>
          </View>

          <View className='flex-row justify-between items-center'>
            <View className='flex-row items-center'>
              <View
                className='rounded-full mr-5 p-1 border border-backgroundMedium opacity-50'
                //   style={{
                //     borderRadius: 100,
                //     marginRight: 20,
                //     padding: 4,
                //     borderWidth: 1,
                //     borderColor: COLOURS.backgroundMedium,
                //     opacity: 0.5
                //   }}
              >
                <MaterialCommunityIcons
                  name='minus'
                  style={{ fontSize: 16, color: COLOURS.backgroundDark }}
                />
              </View>

              <Text>1</Text>

              <View className='rounded-full ml-5 p-1 border border-backgroundMedium opacity-50'>
                <MaterialCommunityIcons
                  name='plus'
                  style={{ fontSize: 16, color: COLOURS.backgroundDark }}
                />
              </View>
            </View>

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

          <Text className='text-sm text-black font-normal'>Order Details</Text>

          <View></View>
        </View>

        <Text className='text-xl text-black font-medium tracking-widest pt-5 pl-4 mb-3'>
          My Cart
        </Text>

        <View style={{ paddingHorizontal: 16 }}>
          {product?.map(renderProducts)}
        </View>

        <View>
          <View className='px-4 my-3'>
            <Text className='text-lg text-black font-semibold tracking-widest mb-4'>
              Delivery Location
            </Text>

            <View className='flex-row items-center justify-between'>
              <View className='flex-row w-[80%] items-center'>
                <View className='text-blue bg-backgroundLight items-center justify-center p-3 rounded-md mr-5'>
                  <MaterialCommunityIcons
                    name='truck-delivery-outline'
                    style={{
                      fontSize: 18,
                      color: COLOURS.blue
                    }}
                  />
                </View>

                <View>
                  <Text className='text-sm text-black font-semibold'>
                    2 Petre Melikishvili St.
                  </Text>
                  <Text className='text-xs text-black font-normal leading-5 opacity-50'>
                    0162, Tbilisi
                  </Text>
                </View>
              </View>

              <MaterialCommunityIcons
                name='chevron-right'
                style={{
                  fontSize: 22,
                  color: COLOURS.black
                }}
              />
            </View>
          </View>

          <View className='px-4 my-3'>
            <Text className='text-lg text-black font-semibold tracking-widest mb-4'>
              Payment Method
            </Text>

            <View className='flex-row items-center justify-between'>
              <View className='flex-row w-[80%] items-center'>
                <View className='text-blue bg-backgroundLight items-center justify-center p-3 rounded-md mr-4'>
                  <Text className='text-[10px] font-[900] text-blue tracking-widest'>
                    VISA
                  </Text>
                </View>

                <View>
                  <Text className='text-sm text-black font-semibold'>
                    Visa Classic
                  </Text>
                  <Text className='text-xs text-black font-normal leading-5 opacity-50'>
                    ****-0902
                  </Text>
                </View>
              </View>

              <MaterialCommunityIcons
                name='chevron-right'
                style={{
                  fontSize: 22,
                  color: COLOURS.black
                }}
              />
            </View>
          </View>

          <View className='px-4 mt-10 mb-20'>
            <Text className='text-base text-black font-medium tracking-widest mb-6'>
              Order Info
            </Text>

            <View className='flex-row items-center justify-between mb-2'>
              <Text className='text-xs font-normal max-w-[80%] opacity-50'>
                Subtotal
              </Text>
              <Text className='text-xs font-normal max-w-[80%] opacity-80'>
                &#8377;{total}.00
              </Text>
            </View>

            <View className='flex-row items-center justify-between mb-4'>
              <Text className='text-xs font-normal max-w-[80%] opacity-50'>
                Shipping Tax
              </Text>
              <Text className='text-xs font-normal max-w-[80%] opacity-80'>
                &#8377;{total / 20}
              </Text>
            </View>

            <View className='flex-row items-center justify-between'>
              <Text className='text-xs font-normal max-w-[80%] opacity-50'>
                Total
              </Text>
              <Text className='text-lg font-medium text-black'>
                &#8377;{total + total / 20}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View className='absolute bottom-2 h-[8%] w-full justify-center items-center'>
        <TouchableOpacity
          onPress={() => (total !== 0 ? checkOut() : null)}
          className='w-[85%] h-[90%] bg-blue rounded-3xl justify-center items-center'
        >
          <Text className='text-xs font-medium tracking-widest uppercase text-white'>
            CHECKOUT (&#8377;{total + total / 20})
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default MyCart
