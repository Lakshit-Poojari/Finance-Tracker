import React, { useContext } from 'react'
import { ThemeContext } from '../../Context/ThemeContext'
import "../SummaryCard/SummaryCard.css"

function SummaryCard({ title, amount }) {

  const { theme } = useContext(ThemeContext);

  return (
    <div className={`card ${theme === "dark" ? "card-dark" : "card-light"}`}>
        <h3 className='card_title container'>{title}</h3>
        <h2 className='card_amount container'>₹ {amount}</h2>
    </div>
  )
}

export default SummaryCard