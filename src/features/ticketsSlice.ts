import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { URLS_TICKETS } from '../shared/ustils/api/urls'
import { getApiResourse } from '../shared/ustils/api/networks'
import { TInitialStateTickets, TGetApiResourse, TTicketData } from '../interfaces'

const initialState: TInitialStateTickets = {
	data: undefined,
	isLoading: false,
}

export const getTicketsFetch = createAsyncThunk('getTickets', async () => {
	const URL = `${URLS_TICKETS.BASE_URL}${URLS_TICKETS.ROUTES.TICKETS}`
	const tickets = await getApiResourse(URL)

	return tickets
})

export const companiesSlice = createSlice({
	name: 'tickets',
	initialState,

	reducers: {},

	extraReducers: (builder) => {
		// get tickets
		builder.addCase(getTicketsFetch.pending, (state) => {
			state.isLoading = true
		})
		builder.addCase(
			getTicketsFetch.fulfilled,
			(state, action: PayloadAction<TGetApiResourse<TTicketData[]>>) => {
				state.isLoading = false
				if (!action.payload.ok) {
					state.error = action.payload.err?.message
					return
				}
				if (!action.payload.result || !action.payload.result.length) return
				state.data = action.payload.result.sort((a, b) => a.price - b.price)
			}
		)
	},
})

export const {} = companiesSlice.actions

export default companiesSlice.reducer
