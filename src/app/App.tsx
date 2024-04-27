import './app.scss'
import TicketsList from '../components/ticketsList/ticketsList'
import { CircularProgress } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { useEffect } from 'react'
import { setFilterQuantityStops, getTicketsFetch } from '../features/ticketsSlice'
import cl from 'classnames'
import TicketsFiltersPanel from '../components/ticketsFiltersPanel/ticketsFiltersPanel'
import { v4 } from 'uuid'
import { TFilterStops } from '../interfaces'

function App() {
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(getTicketsFetch())
		const quantityStops: TFilterStops[] = [{ id: v4(), checked: true, isAll: true }]

		for (let i = 0; i < 4; i++) {
			quantityStops.push({ id: v4(), stops: i, checked: true, isAll: false })
		}
		dispatch(setFilterQuantityStops(quantityStops))
	}, [])

	const isLoading = useAppSelector((state) => state.tickets.isLoading)

	return (
		<>
			<header className='header'>
				<i className='header__logo'></i>
			</header>
			<section className='tickets'>
				<TicketsFiltersPanel />
				<div className={cl('bg-loader', { 'bg-loader--active': isLoading })}>
					<CircularProgress />
				</div>
				<TicketsList />
			</section>
		</>
	)
}

export default App
