import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { URLS_TICKETS } from '../shared/ustils/api/urls'
import { getApiResourse } from '../shared/ustils/api/networks'
import { TInitialStateTickets, TGetApiResourse, TTicketData } from '../interfaces'
import { TRange } from '../shared/hooks/interfaces'

const initialState: TInitialStateTickets = {
	data: undefined,
	isLoading: false,
}

export const getTicketsFetch = createAsyncThunk('getTickets', async (range: TRange) => {
	const URL = `${URLS_TICKETS.BASE_URL}${URLS_TICKETS.ROUTES.TICKETS}?_start=${range.start}&_limit=${range.limit}`
	const tickets = await getApiResourse(URL)

	return tickets
})

export const getItemsLength = createAsyncThunk('getItemsLength', async () => {
	const URL = `${URLS_TICKETS.BASE_URL}${URLS_TICKETS.ROUTES.LENGTH}`
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

				state.data = action.payload.result
			}
		)

		// get items length
		builder.addCase(getItemsLength.pending, (state) => {
			state.isLoading = true
		})

		builder.addCase(
			getItemsLength.fulfilled,
			(state, action: PayloadAction<TGetApiResourse<{ length: number }>>) => {
				state.isLoading = false
				if (!action.payload.ok) {
					state.error = action.payload.err?.message
					return
				}

				state.itemsLength = action.payload.result?.length
			}
		)
	},
})

export const {} = companiesSlice.actions

export default companiesSlice.reducer
