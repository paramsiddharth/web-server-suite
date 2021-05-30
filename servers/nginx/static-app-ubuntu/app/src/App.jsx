import React, { useState } from 'react'
import logo from './logo.svg'
import './App.css'

function App() {
  const [name, setName] = useState('')

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello {name == '' ? 'World' : name}!</p>
        <p>
          <input
            className='input'
            placeholder='Your name'
            value={name}
            onChange={e => setName(e.target.value)}
            />
        </p>
        <p>
          Made with ❤ by{' '}
          <a
            className="App-link"
            href="https://www.paramsid.com"
            target="_blank"
          >
            Param
          </a>.
        </p>
      </header>
    </div>
  )
}

export default App
