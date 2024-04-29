import './notification.scss'

function Notification({ name }: { name: string }) {
	return (
		<div className='notification__wrp'>
			<p className='notification__description'>{name}</p>
		</div>
	)
}

export default Notification
