import moment from 'moment'
import 'moment/dist/locale/ru'

// Convert date 10.10.2018 to 10 окт 2018, пт
function converDate(date: string) {
	if (!date) return
	let dateFormat: any = []
	const dateToArr = date.split('.')
	dateFormat.push(dateToArr[1])
	dateFormat.push(dateToArr[0])
	dateFormat.push(dateToArr[2])
	dateFormat = new Date(dateFormat.join('.'))
	dateFormat = moment(dateFormat).locale('ru').format('DD MMM YYYY, dd')

	return dateFormat
}

export default converDate
