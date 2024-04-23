import { configureStore } from '@reduxjs/toolkit'
import ticketsReduser from '../features/ticketsSlice'

const store = configureStore({
	reducer: {
		tickets: ticketsReduser,
	},
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
