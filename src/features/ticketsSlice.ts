import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { URLS_TICKETS } from '../shared/ustils/api/urls'
import { getApiResourse } from '../shared/ustils/api/networks'
import { TInitialStateTickets, TGetApiResourse, TTicketData, TFilterStops } from '../interfaces'

const initialState: TInitialStateTickets = {
	data: undefined,
	isLoading: false,
	filters: {},
}

export const getTicketsFetch = createAsyncThunk('getTickets', async () => {
	const URL = `${URLS_TICKETS.BASE_URL}${URLS_TICKETS.ROUTES.TICKETS}`
	const tickets = await getApiResourse(URL)

	return tickets
})

export const companiesSlice = createSlice({
	name: 'tickets',
	initialState,

	reducers: {
		setFilterQuantityStops(state, action: PayloadAction<TFilterStops[]>) {
			if (!action.payload || !action.payload.length) return
			state.filters.quantityStops = action.payload
		},

		changeFilterQuantityStops(state, action: PayloadAction<string>) {
			if (
				!state.filters.quantityStops ||
				!state.filters.quantityStops.length ||
				(action.payload && action.payload === '')
			)
				return

			const findCheckboxFilter = state.filters.quantityStops.find(
				(checkbox) => checkbox.id === action.payload
			)

			if (!findCheckboxFilter) return
		},
	},

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

export const { setFilterQuantityStops } = companiesSlice.actions

export default companiesSlice.reducer
