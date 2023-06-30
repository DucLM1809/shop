import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from './components/screens/Home'
import ProductInfo from './components/screens/ProductInfo'
import Products from './components/screens/Products'
import MyFavourite from './components/screens/MyFavourite'

export default function App() {
  const Stack = createNativeStackNavigator()

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='MyFavourite' component={MyFavourite} />
        <Stack.Screen name='Products' component={Products} />
        <Stack.Screen name='ProductInfo' component={ProductInfo} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
