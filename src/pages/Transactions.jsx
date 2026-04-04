import React from 'react'
import { generateTransactions } from '../data/generateTransactions'
import TransactionsTable from "../components/TransactionsTable";
const Transactions = () => {
  const { transactions } = generateTransactions();
  return (
    <div>
      <TransactionsTable data={transactions} />
    </div>
  )
}

export default Transactions

