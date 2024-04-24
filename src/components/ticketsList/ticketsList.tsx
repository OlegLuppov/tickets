import './ticketsList.scss'
import { useEffect, useState } from 'react'
import { useAppSelector } from '../../store/hooks'
import { TTicketData } from '../../interfaces'
import { v4 } from 'uuid'
import TicketsItem from '../ticketsItem/ticketsItem'

function TicketsList() {
	const _dataTickets = useAppSelector((state) => state.tickets.data)
	const [tickets, setTickets] = useState<TTicketData[] | undefined>(undefined)

	useEffect(() => {
		setTickets(_dataTickets)
		if (!_dataTickets || !_dataTickets.length) return

		setTickets(_dataTickets)
	}, [_dataTickets])

	return (
		<ul className='tickets__list'>
			{tickets &&
				tickets.length &&
				tickets.map((ticket) => {
					return <TicketsItem key={v4()} ticket={ticket} />
				})}
		</ul>
	)
}

export default TicketsList
