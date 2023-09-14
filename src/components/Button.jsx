import { useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
export default function Button({type, text, icon, transaction}) {
  const navigate = useNavigate();
  if (!icon) icon = "";

  return (
    <button
      type={type}
      className="px-4 py-2 rounded w-full font-bold text-white text-2xl bg-gradient-to-r from-sky-500 to-indigo-500 
      flex items-center justify-center gap-2"
      onClick={() => transaction && navigate(`/transaction/${transaction}`) }
    >
      {icon} {text}
    </button>
  )
}
