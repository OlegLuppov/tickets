import './ticketsList.scss'
import { useEffect, useState } from 'react'
import { useAppSelector } from '../../store/hooks'
import { TTicketData } from '../../interfaces'
import { v4 } from 'uuid'
import TicketsItem from '../ticketsItem/ticketsItem'
import Notification from '../../ui/notification/notification'

// TODO Рассмотреть надобность "Пагинации", "lazy loading" или кнопки "Показать еще"(Будет ли большое кол-во билетов при рендере?)

function TicketsList() {
	const _dataTickets = useAppSelector((state) => state.tickets.data)
	const ticketsFilters = useAppSelector((state) => state.tickets.filters)
	const [tickets, setTickets] = useState<TTicketData[] | undefined>(undefined)

	useEffect(() => {
		filterData()
	}, [_dataTickets])

	useEffect(() => {
		filterData()
	}, [ticketsFilters])

	function filterData() {
		if (
			!_dataTickets ||
			!_dataTickets.length ||
			!ticketsFilters.quantityStops ||
			!ticketsFilters.quantityStops.length
		)
			return

		let filteredData = _dataTickets.filter((ticket) => {
			const findFilter = ticketsFilters.quantityStops!.find(
				(filter) => filter.stops === ticket.stops && filter.checked
			)
			if (!findFilter) return false
			return true
		})

		filteredData = filteredData.sort((a, b) => a.price - b.price)
		setTickets(filteredData)
	}

	return (
		<>
			{tickets && tickets.length ? (
				<ul className='tickets__list'>
					{tickets.map((ticket) => (
						<TicketsItem key={v4()} ticket={ticket} />
					))}
				</ul>
			) : (
				<Notification name='Не найдены билеты по заданным фильтрам' />
			)}
		</>
	)
}

export default TicketsList
