import { Button } from '@mui/material'
import { TTicketData } from '../../interfaces'
import './ticketsItem.scss'
import moment from 'moment'
import converDate from '../../shared/ustils/date/converDate'
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

	return (
		<li className='tickets__item'>
			<div className='tickets__bye'>
				<i className='tickets__logo'></i>
				{price && (
					<Button
						onClick={() => console.log(`Цена билета: ${price.toLocaleString()}₽`)}
						className='tickets__buttons-bye'
						variant='contained'
					>
						{`Купить\nза ${price.toLocaleString()}₽`}
					</Button>
				)}
			</div>
			<div className='tickets__descr-wrp'>
				<div className='tickets__descr'>
					{departure_time && (
						<div className='tickets__time'>
							<span>{departure_time}</span>
						</div>
					)}

					<div className='tickets__address-wrp'>
						<span className='tickets__address'>{`${origin ? origin + ',' : ''} ${origin_name ? origin_name : ''}`}</span>
						<span className='tickets__date'>{`${departure_date ? converDate(departure_date) : ''}`}</span>
					</div>
				</div>
			</div>
		</li>
	)
}

export default TicketsItem
