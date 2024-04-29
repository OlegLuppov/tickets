import { Button, ToggleButton, ToggleButtonGroup } from '@mui/material'
import Checkbox from '@mui/joy/Checkbox'
import './ticketsFilterPanel.scss'
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { сapitalizeFirstLetter } from '../../shared/ustils/transferNames/transferNames'
import { v4 } from 'uuid'
import { changeFilterQuantityStops } from '../../features/ticketsSlice'

const toggleButtonStyle = {
	color: '#2396f1',
	padding: '12px 20px',
	fontSize: '12px',
	'&:hover': {
		backgroundColor: '#F1FCFF',
		border: '1px solid #2396f1',
		borderRight: '1px solid #2396f1',
	},
	'&.Mui-selected:focus': {
		backgroundColor: '#2396f1',
		color: '#fff',
	},
	'&.Mui-selected': {
		backgroundColor: '#2396f1',
		color: '#fff',
	},
}

const checkboxesStyle = {
	'& svg': { transform: 'scale(0.6)', fill: '#2396f1' },
	'& label': { fontSize: '13px', fontWeight: '500', color: '#4E5557' },
}

function TicketsFiltersPanel() {
	const [alignment, setAlignment] = useState('RUB')
	const filtersStops = useAppSelector((state) => state.tickets.filters.quantityStops)
	const dispatch = useAppDispatch()

	function handleChangeCurrency(_e: React.MouseEvent<HTMLElement>, newAlignment: string) {
		setAlignment(newAlignment)
	}

	function handleChangeCheckboxStops(event: React.ChangeEvent<HTMLInputElement>) {
		dispatch(changeFilterQuantityStops({ id: event.target.id, checked: event.target.checked }))
	}

	function handleClickBtnStops(event: React.MouseEvent<HTMLButtonElement>) {
		dispatch(changeFilterQuantityStops({ id: event.currentTarget.dataset.id! }))
	}

	return (
		<div className='tickets__filter-panel'>
			<div className='tickets__filter tickets__filter--currency'>
				<h2 className='tickets__filter-title'>ВАЛЮТА</h2>
				<ToggleButtonGroup
					value={alignment}
					exclusive
					onChange={handleChangeCurrency}
					aria-label='Platform'
				>
					<ToggleButton sx={toggleButtonStyle} value='RUB'>
						RUB
					</ToggleButton>
					<ToggleButton sx={toggleButtonStyle} value='USD'>
						USD
					</ToggleButton>
					<ToggleButton sx={toggleButtonStyle} value='EUR'>
						EUR
					</ToggleButton>
				</ToggleButtonGroup>
			</div>
			<div className='tickets__filter tickets__filter--quantity-stops'>
				<h2 className='tickets__filter-title tickets__filter-title--quantity-stops'>
					КОЛИЧЕСТВО ПЕРЕСАДОК
				</h2>
				{filtersStops && filtersStops.length ? (
					<ul className='tickets__filter-cbx-list'>
						{filtersStops.map((filter) => (
							<li className='tickets__filter-cbx-item' key={v4()}>
								<Checkbox
									onChange={handleChangeCheckboxStops}
									id={filter.id}
									checked={filter.checked}
									size='md'
									variant='outlined'
									color='primary'
									label={`${!filter.isAll ? сapitalizeFirstLetter(filter.stops) : 'Все'}`}
									sx={checkboxesStyle}
								/>
								{!filter.isAll && (
									<Button
										data-id={filter.id}
										onClick={handleClickBtnStops}
										className='tickets__filter-btn-stops tickets__filter-btn-stops--disable'
										sx={{ padding: 0 }}
									>
										ТОЛЬКО
									</Button>
								)}
							</li>
						))}
					</ul>
				) : null}
			</div>
		</div>
	)
}

export default TicketsFiltersPanel
