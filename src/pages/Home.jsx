import { Link, useNavigate } from "react-router-dom";
import { GoSignOut } from "react-icons/go";
import logo from "../assets/logo.png";
import Button from "../components/Button";
import { BiPlusCircle, BiMinusCircle } from "react-icons/bi";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { userLogged } from "../services/user";
import { findAllTransaction } from "../services/transaction";
import dayjs from "dayjs";
import ErrorInput from "../components/ErrorInput";

export default function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);
  const [apiErrors, setApiErrors] = useState("");

  function validateToken() {
    const token = Cookies.get("token");
    if (!token) navigate("/signin");
  }

  async function getUserLogged() {
    try {
      const response = await userLogged();
      setUser(response.data);
    } catch (error) {
      setApiErrors(error.message);
      console.log(error);
    }
  }

  async function getAllTransactions() {
    try {
      const response = await findAllTransaction();
      setTransactions(response.data);
      calculateBalance(response.data);
    } catch (error) {
      setApiErrors(error.message);
      console.log(error);
    }
  }

  function calculateBalance(transactions) {
    let total = 0;
    transactions.forEach(transaction => {
      transaction.type === "input"
        ? total += Number(transaction.value)
        : total -= Number(transaction.value) 
    });

    setBalance(total);
  }

  useEffect(() => {
    validateToken();
    getUserLogged();
    getAllTransactions();
  }, []);

  return (
    <main className="flex flex-col items-center justify-center bg-zinc-900 rounded p-8 w-[60rem] h-[35rem] text-2xl">
      {apiErrors && (
        <ErrorInput text={apiErrors} />
      )}
      <header className="flex items-center justify-between w-full pb-4">
        <img src={logo} alt="Logo DIO" className="w-32" />
        <div className="flex items-center gap-4 text-white text-2xl">
          <h1>Olá, {user.name}</h1>
          <Link to="/signin">
            <GoSignOut />
          </Link>
        </div>
      </header>
      <section className="bg-zinc-300 p-4 w-full h-full rounded flex items-center justify-center">
        {transactions.length ? (
          <ul className="w-full h-full flex flex-col justify-between">
            <div className="h-[17rem] overflow-auto p-3">
              {transactions.map((transaction, index) => (
                <li
                  className="flex justify-between items-start w-full"
                  key={index}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-base text-zinc-500">
                      {dayjs(transaction.createdAt).format("DD/MM")}
                    </span>
                    {transaction.description}
                  </span>
                  <span className={`${transaction.type === "input" ? "text-green-700" : "text-red-700"}`}>
                    R$ {transaction.value}
                  </span>
                </li>
              ))}
            </div>
            <li className="flex justify-between items-start w-full px-3">
              <span>Balance</span> 
              <span className={`${balance > 0 ? "text-green-700" : "text-red-700"}`}>
                R$ {balance}
              </span>
            </li>
          </ul>
        ) : (
          <p>There is no check-in or check-out</p>
        )}
      </section>
      <footer className="w-full pt-2 flex gap-2 text-white text-lg font-bold">
        <Button type="button" text="New Input" icon={<BiPlusCircle />} transaction="input" />
        <Button type="button" text="New Output" icon={<BiMinusCircle />} transaction="output" />
      </footer>
    </main>
  )
}
