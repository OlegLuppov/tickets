import { TTicketData } from '../../interfaces'
import './ticketsItem.scss'
type TProps = {
	ticket: TTicketData
}
function TicketsItem(props: TProps) {
	const {
		id,
		origin,
		origin_name,
		destination,
		destination_name,
		departure_date,
		departure_time,
		arrival_date,
		arrival_time,
		carrier,
		stops,
		price,
	} = props.ticket
	return <li className='tickets__item'>{price.toLocaleString()}</li>
}

export default TicketsItem
