import React from 'react'
import { View, Text } from 'react-native'
import store from './redux/store'
import { Provider } from 'react-redux'
import Home from './screens/Home'
import Splash from './screens/Splash';
import Navigation from './navigation'
const App = () => {
  
  return (
    <Provider store = {store}>
      <Navigation />
   </Provider>
  )
}

export default App
