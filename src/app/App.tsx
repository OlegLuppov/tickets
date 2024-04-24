import './app.scss'
import TicketsList from '../components/ticketsList/ticketsList'
import { CircularProgress } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { useEffect } from 'react'
import { getTicketsFetch } from '../features/ticketsSlice'
import cl from 'classnames'

function App() {
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(getTicketsFetch())
	}, [])

	const isLoading = useAppSelector((state) => state.tickets.isLoading)

	return (
		<section className='tickets'>
			<div className={cl('bg-loader', { 'bg-loader--active': isLoading })}>
				<CircularProgress />
			</div>
			<TicketsList />
		</section>
	)
}

export default App
