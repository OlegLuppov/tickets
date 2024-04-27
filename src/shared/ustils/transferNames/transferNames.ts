function getTransfersName(stops?: number): string {
	let transfers: string = 'без пересадок'
	if (!stops || stops <= 0) {
		return transfers
	}

	const stopsToArr = `${stops}`.split('')
	if (+stopsToArr[stopsToArr.length - 1] === 1) {
		transfers = `${stops} пересадка`
		return transfers
	}

	if (+stopsToArr[stopsToArr.length - 1] > 1 && +stopsToArr[stopsToArr.length - 1] < 5) {
		transfers = `${stops} пересадки`
		return transfers
	}

	if (+stopsToArr[stopsToArr.length - 1] > 4) {
		transfers = `${stops} пересадок`
		return transfers
	}

	return transfers
}

export function сapitalizeFirstLetter(stop?: number) {
	const string = 'Без пересадок'
	if (!stop || stop === 0) {
		return string
	}
	let firstLetter: string[] | string = getTransfersName(stop).split('')
	firstLetter[2] = firstLetter[2].toUpperCase()
	firstLetter = firstLetter.join('')
	return firstLetter
}

export default getTransfersName
