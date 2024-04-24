export type TInitialStateTickets = {
	data?: TTicketData[]
	itemsLength?: number
	isLoading: boolean
	error?: string
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