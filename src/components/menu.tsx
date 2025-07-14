import Link from "next/link";
import { FiHome, FiLogOut, FiSave } from "react-icons/fi";

export default function Menu() {
  return (
    <div className="flex flex-col justify-between w-full h-full bg-amber-300">
      <div className="flex flex-col gap-4">
        <div className="w-full hover:bg-green-50 p-2 items-center font-semibold bg-slate-200 rounded">
          <Link href='/' className="flex flex-row gap-2"><FiHome size={20} color="#000000" />HOME</Link>
        </div>
        <div className="p-2 bg-slate-200 w-full rounded">
          <h2 className=" font-semibold flex flex-row gap-2 items-center">
            <FiSave size={20} color="#000000" />
            CADASTROS
          </h2>
          <div className="w-full hover:bg-green-50 py-1 px-6"><Link href='/cadastros/menu'>Cardápio</Link></div>
          <div className="w-full hover:bg-green-50 py-1 px-6"><Link href='/cadastros/funcionario'>Funcionários</Link></div>
        </div>
      </div>

      <div className="w-full hover:bg-green-50 p-2 bg-slate-200 rounded">
        <Link href='/' className="flex flex-row gap-2 items-center">
          <FiLogOut size={20} color="#000000" />
          Sair
        </Link>
      </div>
    </div>
  )
}