function getTransfersName(stops?: number) {
	let transfers: string
	if (!stops || stops <= 0) {
		transfers = 'без пересадок'
		return transfers.toUpperCase()
	}

	const stopsToArr = `${stops}`.split('')
	if (+stopsToArr[stopsToArr.length - 1] === 1) {
		transfers = `${stops} пересадка`
		return transfers.toUpperCase()
	}

	if (+stopsToArr[stopsToArr.length - 1] > 1 && +stopsToArr[stopsToArr.length - 1] < 5) {
		transfers = `${stops} пересадки`
		return transfers.toUpperCase()
	}

	if (+stopsToArr[stopsToArr.length - 1] > 4) {
		transfers = `${stops} пересадок`
		return transfers.toUpperCase()
	}
}

export default getTransfersName
