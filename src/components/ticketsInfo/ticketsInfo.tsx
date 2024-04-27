import './ticketsInfo.scss'
import { TPropsForTicketsInfo } from '../../interfaces'
import converDate from '../../shared/ustils/date/converDate'

function TicketsInfo(props: TPropsForTicketsInfo) {
	const { departureTime, originName, departureDate, origin } = props
	return (
		<div className='tickets__descr tickets__descr--info'>
			{departureTime && (
				<div>
					<span className='tickets__content tickets__content--time'>{departureTime}</span>
				</div>
			)}

			<div className='tickets__address-wrp'>
				<span className='tickets__content tickets__content--address'>{`${origin ? origin + ',' : ''} ${originName ? originName : ''}`}</span>
				<span className='tickets__content tickets__content--date'>{`${departureDate ? converDate(departureDate) : ''}`}</span>
			</div>
		</div>
	)
}

export default TicketsInfo
