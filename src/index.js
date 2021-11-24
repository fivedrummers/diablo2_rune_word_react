import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import './styles.css'

import RuneWord from './runeWordApp'

const rootElement = document.getElementById('root')
ReactDOM.render(
  <StrictMode>
    <RuneWord />
  </StrictMode>,
  rootElement
)
