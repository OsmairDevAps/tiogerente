'use client'

import Image from 'next/image'
import logo from '@/assets/logotipo.png'
import { FiLogOut } from 'react-icons/fi'

export default function Header() {
  return (
    <div className="flex flex-row justify-between items-center w-full px-4 border-b-[1px] h-20 border-gray-300 shadow-md bg-black">
      <Image src={logo} width={70} alt='Tio do Crepe' />
      <span className='text-white'>TIO GERENTE</span>
      <button className='cursor-pointer' onClick={() => {}}><FiLogOut size={24} color='#FFFFFF' /></button>
    </div>
  )
}