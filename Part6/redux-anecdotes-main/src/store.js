import { configureStore } from '@reduxjs/toolkit'
import acnedoteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import notificationReducer from './reducers/notificationReducer'
const store = configureStore({
  reducer: {
    anecdotes: acnedoteReducer,
    filter: filterReducer,
    notification: notificationReducer,
  },
})

export default store
