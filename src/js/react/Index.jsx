import React from 'react'
import ReactDOM from 'react-dom/client'

const App = () => (
	<>
		<h1>В кімнату заходить React</h1>
	</>
);

// Об'єкт для виводу
const root = document.querySelector('#root') ? document.querySelector('#root') : document.querySelector('.wrapper');

// Main rendering
ReactDOM.createRoot(root).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
)