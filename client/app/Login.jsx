import React, { useEffect,useState } from 'react';
import { StyleSheet, View, Text ,TouchableOpacity,TextInput} from 'react-native';
import { Image } from 'expo-image';

import Animated, { withTiming, useSharedValue, useAnimatedStyle, withRepeat, interpolate, Easing } from 'react-native-reanimated';
import Fontisto from '@expo/vector-icons/Fontisto';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {  Link, useRouter } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Formik ,useFormikContext} from 'formik';
import * as Yup from "yup"

const Login = () => {
  const router = useRouter();

  const positionXEmail = useSharedValue(200);
  const positionXPassword = useSharedValue(200);
  const [isFocused,setIsFocused] = useState(false)
  const PasswordlabelPosition= useSharedValue(0)
  const EmaillabelPosition= useSharedValue(0)
  const ReviewSchema = Yup.object().shape({
    email:Yup.string().required().email("well that's not an email"),
    password:Yup.string().required().min(2,"pretty sure this will be hacked")
  })
  useEffect(() => {
    
       positionXEmail.value=withTiming(-20, { duration: 1000 }),
       positionXPassword.value=withTiming(-20, { duration: 2000 }) // Move to X: 300 in 2 seconds
  },[]);
      const handleFocusEmail = ()=>{
        
        EmaillabelPosition.value=withTiming(1,{ duration:200,easing:Easing.ease,})
      }
        const handleFocusPassword = ()=>{
          PasswordlabelPosition.value=withTiming(1,{ duration:200,easing:Easing.ease,})
         
        }
      
      const handleBlurEmail =(oldEmail)=>{
        if(! oldEmail){
          EmaillabelPosition.value=withTiming(0,{
            duration:200,easing:Easing.ease,
          })
        }
        // if(! oldPassword){
        //   EmaillabelPosition.value=withTiming(0,{
        //     duration:200,easing:Easing.ease,
        //   })
        // }
      }
      // const handleBlurPassword =()=>{
      
      //   if(! password){
      //     PasswordlabelPosition.value=withTiming(0,{
      //       duration:200,easing:Easing.ease,
      //     })
      //   }
      // }
   const animatedStyleEmail = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: positionXEmail.value }, // Apply the animated X position
        
      ],
    };
  });
  const animatedStylePassword= useAnimatedStyle(() => {
    return {
      transform: [
       
        { translateX: positionXPassword.value },
      ],
    };
  });
  const animatedPasswordStyle = useAnimatedStyle(() => {
    const translateY = interpolate(PasswordlabelPosition.value, [0, 1], [0, -16]);
    const scale = interpolate(PasswordlabelPosition.value, [0, 1], [1, 0.85]);
    const opacity = interpolate(PasswordlabelPosition.value, [0, 1], [1, 0.65]);

    return {
      opacity,
      transform: [{ translateY }, { scale }],
    };
  });
  const animatedEmailStyle = useAnimatedStyle(() => {
    const translateY = interpolate(EmaillabelPosition.value, [0, 1], [0, -16]);
    const scale = interpolate(EmaillabelPosition.value, [0, 1], [1, 0.85]);
    const opacity = interpolate(EmaillabelPosition.value, [0, 1], [1, 0.65]);

    return {
      opacity,
      transform: [{ translateY }, { scale }],
    };
  });
  
    
    const handleChangeEmail = (newText,fieldName,setFieldValue,validateField) => {
      setFieldValue(fieldName,newText);
      validateField(fieldName);
      if (newText) {
        EmaillabelPosition.value = withTiming(1, {
          duration: 200,
          easing: Easing.ease,
        });
      } else {
        EmaillabelPosition.value = withTiming(0, {
          duration: 200,
          easing: Easing.ease,
        });
      }
    };
  
  
  const handleChangePassword = (newText) => {
    setPassword(newText);
    if (newText) {
      PasswordlabelPosition.value = withTiming(1, {
        duration: 200,
        easing: Easing.ease,
      });
    } else {
      PasswordlabelPosition.value = withTiming(0, {
        duration: 200,
        easing: Easing.ease,
      });
    }
  };
  const Space = ({size})=><View style={{height:size}}/>
  
  

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={()=>router.back()}><Text>Back</Text></TouchableOpacity>
      <Space size={30}/>
      <Text style={styles.title}>Welcome</Text>
      
      <View style={styles.box}>
        <Space size={40}/>
     <Formik
     initialValues={{email:"",password:""}}
     validationSchema={ReviewSchema}
     onSubmit={(values)=>{
      console.log(values)
     }}
     >
     {({handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue, validateField })=>(
    
      <View>
      <Animated.View style={[animatedStyleEmail,styles.inputView,]}>
     
     
      <View style={{justifyContent:'center',alignItems:'center'}}>
      <MaterialIcons name="email" size={25} color="black" />
      </View>
      <Animated.Text style={[styles.inputText,animatedEmailStyle]}>Email Address</Animated.Text>
      <TextInput
        onChangeText={(newText)=>handleChangeEmail(newText,"email",setFieldValue,validateField)}
        value={values.email}
        onFocus={handleFocusEmail}
        onBlur={handleBlurEmail('email')}
      placeholder=''
      keyboardType='email-address'
      style={styles.input}/>
      
      </Animated.View>
      {touched.email && errors.email && <Text style={{color:'red'}}>{errors.email}</Text>}
      <Space size={30}/>
      
      <Animated.View style={[animatedStylePassword,styles.inputView,]}>
      
      
        <View style={{justifyContent:'center',alignItems:'center'}}>
      <Fontisto name="locked" size={25} color="black" />
      </View>
      <Animated.Text style={[styles.inputText,animatedPasswordStyle]}>Password</Animated.Text>
      <TextInput
      onChangeText={handleChangePassword}
      value={values.password}
      onFocus={handleFocusPassword}
      // onBlur={handleBlurPassword("password")}
      placeholder=''
      secureTextEntry
      style={[styles.input,]}/>
      
      </Animated.View>
      </View>
      
     )}
      </Formik>
        <View style={{
          width:"auto",justifyContent:"flex-end",alignItems:"flex-end"
        }}>
        <TouchableOpacity><Text>Forgot Password</Text></TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.loginBut}>
          <Text>Login</Text>
        </TouchableOpacity>
        <View style={styles.oauthView}>
        <AntDesign name="google" size={24} color="black" />
        <FontAwesome5 name="facebook" size={24} color="black" />
        <AntDesign name="github" size={24} color="black" />
        </View>
        <TouchableOpacity><Text>Create Account</Text></TouchableOpacity>
        
      </View>
       
    </View>
  )
}
const styles=StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:"center",
    padding:20,
    
  },
  box:{
    paddingVertical:60
  },
  oauthView:{
    flexDirection:"row",
    justifyContent:"space-between",
    
    paddingVertical:20,
  },
  loginBut:{

  },
  inputView:{
   flexDirection:"row",
   justifyContent:'center',
  },
  title:{
    
  },
  loginBut:{
    height:10,
    width:"auto",
    backgroundColor:"black",
    borderRadius:20,
    justifyContent:'center',
    alignItems:'center',
    paddingVertical:20
  },
  input:{
    width:220,
    borderColor:"gray",
    borderBottomWidth:2,
    marginStart:20,
    outline:'none',
    
    
  },
  inputText:{
    position: 'absolute',
    left: 0,
    top: 0,
    fontSize: 18,
    color: '#aaa',
    paddingHorizontal: 45,
    fontWeight: '400',
  },
  
  

})
export default Login
