import TransactionsTable from "../components/TransactionsTable";
import TransactionChart from "../components/TransactionChart";
import { useApp } from "../context/AppContext";

const Transactions = () => {
  const { transactions, setTransactions, isAdmin } = useApp();
console.log("transactions:", transactions);
  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-orange-50/80 dark:bg-slate-800/80 shadow-md hover:shadow-lg p-4 md:p-6">
        <TransactionChart transactions={transactions} />
      </div>

      <div className="rounded-2xl bg-orange-50/80 dark:bg-slate-800/80 shadow-lg hover:shadow-xl p-6 md:p-9">
        <TransactionsTable
          transactions={transactions}
          setTransactions={setTransactions}
          isAdmin={isAdmin}
        />
      </div>
    </div>
  );
};

export default Transactions;