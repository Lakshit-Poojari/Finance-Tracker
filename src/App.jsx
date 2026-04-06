import { useState } from 'react'
import './App.css'
import Mainlayout from './Mainlayout/Mainlayout'
import AppRoutes from './Routes/AppRoutes'
import { TransactionProvider } from './Context/TransactionContext'
import { ThemeProvider } from './Context/ThemeContext'

function App() {

  return (
    <>
    <ThemeProvider>
      <TransactionProvider>
        <Mainlayout>
          <AppRoutes/>
        </Mainlayout>
      </TransactionProvider>
    </ThemeProvider>

    </>
  )
}

export default App
