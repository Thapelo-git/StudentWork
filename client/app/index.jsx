import React, { useEffect } from 'react';
import { StyleSheet, View, Text ,TouchableOpacity} from 'react-native';
import { Image } from 'expo-image';
import Animated, { withTiming, useSharedValue, useAnimatedStyle, withRepeat, withDelay } from 'react-native-reanimated';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import images from '../assets/images/images';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import {  Link, useRouter } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
const Home = () => {

  const router =useRouter();
  // Shared value to track position
  const positionY = useSharedValue(0);

  // Set up continuous movement back and forth
  useEffect(() => {
   positionY.value = withRepeat(
      positionY.value=withTiming(-200, { duration: 5000 }) ,// Move to Y: 300 in 2 seconds
     -1, // Repeat infinitely
     true // Reverse the direction after each cycle
    ); 
  }, []);

  // Animated style to apply the position
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: positionY.value }, // Apply the animated Y position
      ],
    };
  });
  const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';
  return (
    <View style={styles.container}>
      <View style={[styles.container,{top:0, 
    transform: [{ translateY: -10 }], }]}>
      <Image style={styles.image} source={images.smartphone}
      // placeholder={{blurhash}} 
      // contentFit='cover' 
      // transition={1000}
      />
      <Image style={styles.timage} source={images.teacher}/>
      <AntDesign style={[styles.timage,{top:270,left:-10}]}name="playcircleo" size={24} color="black" />
      <GestureHandlerRootView>
      <Animated.View style={[animatedStyle,styles.icon,{right:-150,}]}>
      <MaterialIcons name="science" size={24} color="black" />
      
      </Animated.View>
      <Animated.View style={[animatedStyle,styles.icon,{left:-150,}]}>
      <Entypo name="calculator" size={24} color="black" />
      </Animated.View>
      </GestureHandlerRootView>
      <Image  style={[styles.sideImage, styles.leftImage]} source={images.student1}/>
      <Image style={[styles.sideImage, styles.rightImage]} source={images.student2}/>
      </View>
     <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
      <TouchableOpacity style={styles.startbut}
      onPress={()=>router.navigate("/Login")}
      ><Text style={{color:"white"}}>Lets Start</Text></TouchableOpacity>
     </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding:10,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  image: {
    // flex: 1,
    //width: '90%',
    position: 'absolute', 
    width:350,
    height:220,
    zIndex:0,
    
  },
  icon: {
    position: 'absolute',
    top: '50%', 
    transform: [{ translateY: -15 }], 
    zIndex: 1,
  },
  timage:{
    width: 200,
    height: 200,
    position: 'absolute', 
    zIndex: 1,

  },
  sideImage: {
    position: 'absolute', 
    width: 200, 
    height: 200, 
    // zIndex:1,
  },
  leftImage: {
    left: -200, 
    top: '70%', 
    transform: [{ translateY: -10 }], 
  },
  rightImage: {
    right: -200,
    top: '70%', 
    transform: [{ translateY: -25 }],
  },
  startbut:{
    width:150,
    height:50,
    borderRadius:40,
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:"black",
    position: 'absolute', 
    bottom: 50,  
    


  }
});

export default Home;
