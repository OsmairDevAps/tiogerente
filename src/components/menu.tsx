import Link from "next/link";

export default function Menu() {
  return (
    <div className="flex flex-col justify-start items-start w-full h-screen overflow-auto">
        <div className="w-full hover:bg-green-50 p-2"><Link href='/'>Home</Link></div>
        <div className="w-full hover:bg-green-50 p-2"><Link href='/cadastros/menu'>Cardápio</Link></div>
    </div>
  )
}