import { Button } from '@mui/material'
import { TPropsForTicketsItem } from '../../interfaces'
import './ticketsItem.scss'
import getTransfersName from '../../shared/ustils/transferNames/transferNames'
import TicketsInfo from '../ticketsInfo/ticketsInfo'

function TicketsItem(props: TPropsForTicketsItem) {
	const {
		origin,
		origin_name,
		destination,
		destination_name,
		departure_date,
		departure_time,
		arrival_date,
		arrival_time,
		stops,
		price,
	} = props.ticket

	return (
		<li className='tickets__item'>
			<div className='tickets__bye'>
				<i className='tickets__logo'></i>
				{price && (
					<Button className='tickets__buttons-bye' variant='contained'>
						{`Купить\nза ${price.toLocaleString()}₽`}
					</Button>
				)}
			</div>
			<div className='tickets__descr-wrp'>
				<TicketsInfo
					departureTime={departure_time}
					departureDate={departure_date}
					originName={origin_name}
					origin={origin}
				/>
				<div className='tickets__descr tickets__descr--transfer'>
					<span className='tickets__content tickets__content--transfers'>
						{getTransfersName(stops)?.toUpperCase()}
					</span>
					<div className='tickets__line-wrp'>
						<span className='tickets__content tickets__content--line'></span>
						<i className='tickets__i-airplane'></i>
					</div>
				</div>
				<TicketsInfo
					departureTime={arrival_time}
					departureDate={arrival_date}
					originName={destination_name}
					origin={destination}
				/>
			</div>
		</li>
	)
}

export default TicketsItem
