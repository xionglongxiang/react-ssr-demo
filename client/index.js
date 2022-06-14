import React from 'react'
import * as ReactDOM from 'react-dom/client'
import App from '../src/App'
import { BrowserRouter } from 'react-router-dom'

const Page = <BrowserRouter>{App}</BrowserRouter>

ReactDOM.hydrateRoot(document.getElementById('root'), Page)
