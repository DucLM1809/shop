import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Image,
  Animated,
  ToastAndroid
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLOURS, Items } from '../database/Database'
import Entypo from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AsyncStorage from '@react-native-async-storage/async-storage'

const ProductInfo = ({ route, navigation }) => {
  const { productID } = route.params

  const [product, setProduct] = useState({})
  const [isProductInWishList, setIsProductInWishList] = useState(false)

  const width = Dimensions.get('window').width

  const scrollX = new Animated.Value(0)

  let position = Animated.divide(scrollX, width)

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getDataFromDB()
    })

    return unsubscribe
  }, [])

  // get product data by productID
  const getDataFromDB = async () => {
    let itemArray = await AsyncStorage.getItem('cartItems')
    itemArray = JSON.parse(itemArray)

    if (itemArray?.length) {
      if (itemArray.includes(productID)) {
        setIsProductInWishList(true)
      } else {
        setIsProductInWishList(false)
      }
    } else {
      setIsProductInWishList(false)
    }

    setProduct(Items.find((item) => item.id === productID))
  }

  // add to cart
  const addToCart = async (id) => {
    let itemArray = await AsyncStorage.getItem('cartItems')
    itemArray = JSON.parse(itemArray)
    if (itemArray) {
      let array = itemArray
      array.push(id)

      try {
        await AsyncStorage.setItem('cartItems', JSON.stringify(array))
        ToastAndroid.show(
          'Orchid Added successfully to wishlist',
          ToastAndroid.SHORT
        )
        navigation.navigate('Home')
      } catch (error) {
        return error
      }
    } else {
      let array = []
      array.push(id)
      try {
        await AsyncStorage.setItem('cartItems', JSON.stringify(array))
        ToastAndroid.show(
          'Orchid Added successfully to wishlist',
          ToastAndroid.SHORT
        )
        navigation.navigate('Home')
      } catch (error) {
        return error
      }
    }
  }

  // product horizontal scroll product card
  const renderProduct = ({ item, index }) => {
    return (
      <View
        style={{
          width: width,
          height: 240,
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Image
          source={{ uri: item }}
          style={{
            width: '100%',
            height: '100%',
            resizeMode: 'contain'
          }}
        />
      </View>
    )
  }

  console.log(isProductInWishList)

  return (
    <SafeAreaView className='w-full h-full bg-white relative'>
      <StatusBar
        backgroundColor={COLOURS.backgroundLight}
        barStyle='dark-content'
      />
      <ScrollView>
        <View className='w-full bg-backgroundLight rounded-br-2xl rounded-bl-2xl relative justify-center items-center mb-1'>
          <View className='w-full flex-row justify-between pt-4 pl-4'>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Entypo
                name='chevron-left'
                style={{
                  fontSize: 18,
                  color: COLOURS.backgroundDark,
                  padding: 12,
                  backgroundColor: COLOURS.white,
                  borderRadius: 10
                }}
              />
            </TouchableOpacity>
          </View>
          <FlatList
            data={product.productImageList ? product.productImageList : null}
            horizontal
            renderItem={renderProduct}
            showsHorizontalScrollIndicator={false}
            decelerationRate={0.8}
            snapToInterval={width}
            bounces={false}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: false }
            )}
          />

          <View className='w-full flex-row items-center justify-center mb-4 mt-8'>
            {product.productImageList
              ? product.productImageList.map((data, index) => {
                  let opacity = position.interpolate({
                    inputRange: [index - 1, index, index + 1],
                    outputRange: [0.2, 1, 0.2],
                    extrapolate: 'clamp'
                  })
                  return (
                    <Animated.View
                      key={index}
                      className='w-[16%] h-[2.4] bg-black mx-1 rounded-[100]'
                      style={{
                        opacity
                      }}
                    ></Animated.View>
                  )
                })
              : null}
          </View>
        </View>

        <View className='px-4 mt-2'>
          <View className='flex-row my-1 items-center justify-between'>
            <Text className='text-xl font-semibold tracking-widest my-1 text-black max-w-[84%]'>
              {product.productName}
            </Text>
          </View>

          <Text className='text-xs text-black tracking-widest font-light leading-5 max-w-[85%] max-h-[44] mb-4'>
            {product.description}
          </Text>
        </View>
      </ScrollView>

      <View className='absolute bottom-2 h-[8%] w-full justify-center items-center'>
        <TouchableOpacity
          disabled={isProductInWishList}
          onPress={() => (product.isAvailable ? addToCart(product.id) : null)}
          className={`w-[85%] h-[90%] ${
            isProductInWishList ? 'bg-slate-300' : 'bg-[#4b8e4b]'
          }  rounded-lg justify-center items-center`}
        >
          <Text className='text-xs font-medium tracking-widest uppercase text-white'>
            {product.isAvailable ? 'Add to favourite' : 'Not Available'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default ProductInfo
