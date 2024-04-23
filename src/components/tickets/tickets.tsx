import { useEffect, useState } from 'react'
import Pagination from '@mui/material/Pagination'
import useRangePagination from '../../shared/hooks/useRangePagination'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { getItemsLength, getTicketsFetch } from '../../features/ticketsSlice'

function Tickets() {
	const [page, setPage] = useState(1)
	const ticketLength = useAppSelector((state) => state.tickets.itemsLength)
	const step = 6
	const quantityPages = getNumberPages()
	const { range, increaseRange } = useRangePagination({ start: 0, limit: step })
	const dispatch = useAppDispatch()

	function getNumberPages() {
		if (!ticketLength || ticketLength === 0) return 0
		const quantity = Math.ceil(ticketLength / step)
		return quantity
	}

	function handleChangePage(_event: React.ChangeEvent<unknown>, value: number) {
		if (!ticketLength || ticketLength === 0) return
		increaseRange(value, step)
		setPage(value)
	}

	useEffect(() => {
		dispatch(getItemsLength())
		dispatch(getTicketsFetch(range))
		console.log(range)
	}, [range])

	return (
		<div className='tickets__wrapper'>
			<Pagination page={page} count={quantityPages} color='primary' onChange={handleChangePage} />
		</div>
	)
}

export default Tickets
