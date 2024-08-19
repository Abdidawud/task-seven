import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { Data } from './Data/data'

export const store = configureStore({
  reducer: {
    [Data.reducerPath]: Data.reducer
   
}
    , middleware: getDefaultMiddleware =>
        getDefaultMiddleware()
          .concat(Data.middleware)
})

setupListeners(store.dispatch)