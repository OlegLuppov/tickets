import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { URLS_TICKETS } from '../shared/ustils/api/urls'
import { getApiResourse } from '../shared/ustils/api/networks'
import {
	TInitialStateTickets,
	TGetApiResourse,
	TTicketData,
	TFilterStops,
	TCheckboxOptions,
} from '../interfaces'

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

		changeFilterQuantityStops(state, action: PayloadAction<TCheckboxOptions>) {
			if (
				!state.filters.quantityStops ||
				!state.filters.quantityStops.length ||
				(!action.payload.id && action.payload.id === '')
			)
				return
			// Если клик по кнопке ТОЛЬКО
			if (action.payload.checked === undefined || action.payload.checked === null) {
				state.filters.quantityStops.forEach((filter) => {
					if (filter.id === action.payload.id) {
						filter.checked = true
					} else {
						filter.checked = false
					}
				})

				return
			}

			const findFilter = state.filters.quantityStops.find(
				(filter) => filter.id === action.payload.id
			)

			if (!findFilter) return

			// Если клик по checkbox ALL
			if (action.payload.checked === undefined || action.payload.checked === null) return

			if (findFilter.isAll) {
				state.filters.quantityStops.forEach((filter) => (filter.checked = action.payload.checked!))
				return
			}

			// Если клик НЕ по checkbox ALL
			findFilter.checked = action.payload.checked
			const findFilterIsAll = state.filters.quantityStops.find((filter) => filter.isAll)
			if (!findFilterIsAll) return

			let counterCheckboxes = 0
			state.filters.quantityStops.forEach((filter) => {
				if (filter.isAll) return
				if (filter.checked) {
					counterCheckboxes++
				}
			})

			if (counterCheckboxes === state.filters.quantityStops.length - 1) {
				findFilterIsAll.checked = true
			} else {
				findFilterIsAll.checked = false
			}
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
				state.data = action.payload.result
			}
		)
	},
})

export const { setFilterQuantityStops, changeFilterQuantityStops } = companiesSlice.actions

export default companiesSlice.reducer
