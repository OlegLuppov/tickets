import { useState } from 'react'
import { TRange } from './interfaces'

function useRangePagination(args: TRange) {
	const [range, setRange] = useState<TRange>(args)

	function increaseRange(numPage: number, step: number) {
		setRange((prev) => {
			if (!prev || !numPage || !step) return prev

			return {
				start: numPage * step - step,
				limit: step,
			}
		})
	}

	return {
		range,
		setRange,
		increaseRange,
	}
}

export default useRangePagination
