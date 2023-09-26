// import { createSlice } from '@reduxjs/toolkit'

// const initialState = null

// const notificationSlice = createSlice({
//   name: 'notification',
//   initialState,
//   reducers: {
//     setNotification: (state, action) => {
//       return action.payload
//     },
//     clearNotification: (state) => {
//       return null
//     },
//   },
// })

// export const { setNotification, clearNotification } = notificationSlice.actions
// export default notificationSlice.reducer

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: '',
  duration: 5,
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      state.message = action.payload.message
      state.duration = action.payload.duration || 5
    },
    clearNotification(state) {
      state.message = ''
      state.duration = 5
    },
  },
})

export const { setNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer
export const setNotificationTime = (message, duration) => {
  return (dispatch) => {
    dispatch(setNotification({ message, duration }))
    setTimeout(() => {
      dispatch(clearNotification())
    }, duration * 1000)
  }
}
