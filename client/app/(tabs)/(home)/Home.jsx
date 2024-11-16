import React from 'react'
import { StatusBar, View } from 'react-native'
import { Provider,useDispatch,useSelector } from 'react-redux'
import { Button,DefaultTheme } from 'react-native-paper'
import store from '../../../state/store'
import { Text } from 'react-native'
import { setMode } from '../../../state/authSlice'
const Home = () => {
    const dispatch =useDispatch();
    const mode = useSelector((state)=>state.theme.mode)
  return (
   <View>
      <StatusBar barStyle={mode === "light " ?"dark-content":"light-content"}><Text>Statu</Text></StatusBar>
      <Button 
      mode='contained'
      onPress={()=>dispatch(setMode())}
      style={{marginTop:20,marginLeft:20}}
      >Click (Current:{mode})</Button>
    </View>
  )
}

export default Home
