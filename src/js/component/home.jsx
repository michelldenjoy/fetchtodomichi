import React from 'react'
import ReactDOM from 'react-dom/client'
import TodoList from './TodoList'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(


  <React.StrictMode>

    <div className='vh-100 d-flex align-items-center'>
      <TodoList />
    </div>

  </React.StrictMode>,
)
