export type TInitialStateTickets = {
	data?: TTicketData[]
	itemsLength?: number
	isLoading: boolean
	error?: string
	filters: TTicketsFilters
}

export type TTicketsFilters = {
	quantityStops?: TFilterStops[]
}

export type TFilterStops = {
	id: string
	stops?: number
	checked: boolean
	isAll: boolean
}

export type TTicketData = {
	id: string
	origin: string
	origin_name: string
	destination: string
	destination_name: string
	departure_date: string
	departure_time: string
	arrival_date: string
	arrival_time: string
	carrier: string
	stops: number
	price: number
}

export type TGetApiResourse<Data> = {
	ok: boolean
	status: number
	err?: Error
	result?: Data
}

export type TPropsForTicketsItem = {
	ticket: TTicketData
}

export type TPropsForTicketsInfo = {
	departureTime?: string
	originName?: string
	departureDate?: string
	origin?: string
}
