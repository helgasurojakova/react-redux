import { configureStore } from '@reduxjs/toolkit'
import { extractionsReducer } from './reducer'

export default configureStore({
  reducer: {
    extractions: extractionsReducer,
  },
})
