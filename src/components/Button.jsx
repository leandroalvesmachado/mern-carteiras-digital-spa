
/* eslint-disable react/prop-types */
export default function Button({type, text, icon}) {
  if (!icon) icon = "";

  return (
    <button
      type={type}
      className="px-4 py-2 rounded w-full font-bold text-white text-2xl bg-gradient-to-r from-sky-500 to-indigo-500 
      flex items-center justify-center gap-2"
    >
      {icon} {text}
    </button>
  )
}
