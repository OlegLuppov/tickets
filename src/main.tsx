import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import './style.css'
import App from './app/App'
import store from './store/store'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<Provider store={store}>
		<App />
	</Provider>
)
