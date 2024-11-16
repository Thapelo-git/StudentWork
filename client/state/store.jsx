import { configureStore } from "@reduxjs/toolkit"
import authreducer from './authSlice'



const store = configureStore({
    reducer: {theme:authreducer ,},
})

export default store;