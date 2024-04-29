import './app.scss'
import TicketsList from '../components/ticketsList/ticketsList'
import { Button, CircularProgress, Drawer } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { useEffect, useState } from 'react'
import { setFilterQuantityStops, getTicketsFetch } from '../features/ticketsSlice'
import cl from 'classnames'
import TicketsFiltersPanel from '../components/ticketsFiltersPanel/ticketsFiltersPanel'
import { v4 } from 'uuid'
import { TFilterStops } from '../interfaces'

function App() {
	const dispatch = useAppDispatch()
	const [openDrawer, setOpenDrawer] = useState<boolean>(false)

	useEffect(() => {
		//Запрос на сервер для получения Билетов и присваивания в state
		dispatch(getTicketsFetch())

		// Установить начальное значение фильтров в state
		const quantityStops: TFilterStops[] = [{ id: v4(), checked: true, isAll: true }]

		for (let i = 0; i < 4; i++) {
			quantityStops.push({ id: v4(), stops: i, checked: true, isAll: false })
		}

		dispatch(setFilterQuantityStops(quantityStops))
	}, [])

	function toggleDrawer() {
		setOpenDrawer((prev) => !prev)
	}

	const isLoading = useAppSelector((state) => state.tickets.isLoading)

	return (
		<>
			<header className='header'>
				<i className='header__logo'></i>
				<nav className='header__nav'>
					<Button className='header__btn-filters' onClick={toggleDrawer}>
						FILTERS
					</Button>
				</nav>
			</header>
			<section className='tickets'>
				<div className='tickets__filter-panel-wrp'>
					<TicketsFiltersPanel />
				</div>
				<Drawer open={openDrawer} onClose={toggleDrawer}>
					<TicketsFiltersPanel />
				</Drawer>
				<div className={cl('bg-loader', { 'bg-loader--active': isLoading })}>
					<CircularProgress />
				</div>
				<TicketsList />
			</section>
		</>
	)
}

export default App
