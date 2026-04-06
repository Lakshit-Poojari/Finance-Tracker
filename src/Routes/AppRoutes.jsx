import React from 'react'
import { Routes, Route } from "react-router-dom";
import Transaction from '../Component/Transaction/Transactions';
import Dashboard from '../Component/Dashboard/Dashboard';

function AppRoutes() {
  return (
    <Routes>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="transaction" element={<Transaction/>}/>
    </Routes>
  )
}

export default AppRoutes