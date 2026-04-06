import React, { Children } from 'react'
import Navbar from '../Component/Navbar/Navbar'

function Mainlayout({children}) {
  return (
    <div>
        <Navbar/>
        <div>{children}</div>
    </div>
  )
}

export default Mainlayout