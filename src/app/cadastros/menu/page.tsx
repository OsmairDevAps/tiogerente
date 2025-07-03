'use client'

import { useState, useEffect } from 'react'
import Modal from 'react-modal'
import { FiEdit2, FiTrash2 } from 'react-icons/fi'
import Header from "@/components/header";
import Menu from "@/components/menu";
import { IItem } from '@/utils/interface';
import { Button } from '@/components/ui/button';
import { useCardapio } from '@/hooks/useCardapio';
import { customStylesModal } from '@/utils/modal';
import AdicionarMenu from './adicionar';
import EditarMenu from './editar';

type TItem = {
  categoria: string;
  ordem: number;
  nome: string;
  subtitulo: string;
  descricao: string;
  valor_individual: number;
  valor_combo: number;
  foto: string;
  ativo: boolean;
}

export default function FormMenu() {
  const [cardapio, setCardapio] = useState<IItem[]>([])
  const [produto, setProduto] = useState<IItem>()
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenEdit, setIsOpenEdit] = useState(false)
  const cardapioDatabase = useCardapio()

  async function listarCardapio() {
    const response = await cardapioDatabase.listar()
    if (response) {
      setCardapio(response)
    }
  }

  function AlteraItem(item: IItem) {
    setProduto(item)
    setIsOpenEdit(true)
  }

  async function ExcluiItem(id: number) {
    try {
      await cardapioDatabase.excluir(id)
      await listarCardapio()
      alert('Item excluído com sucesso.')
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    listarCardapio()
  }, [])

  return (
    <div className="flex flex-col w-full">
      <Header />

      <div className="flex flex-row gap-2">
        <div className="flex flex-col justify-start items-center w-48 p-4">
          <Menu />
        </div>

        <div className="flex flex-row gap-2 w-full">

          <div className="flex flex-col w-full justify-start items-start p-4">
            <div className='flex flex-row justify-end bg-slate-200 w-full p-2'>
              <Button variant='default' onClick={()=>setIsOpen(true)}>
                + Cadastrar Novo
              </Button>
            </div>
            <h2 className="text-medium font-semibold align-center w-full mb-4">JÁ CADASTRADOS:</h2>
            <table className="w-full">
              <thead>
                <tr className='border-b-[1px] border-gray-900'>
                  <th className='w-32 text-left'>CATEGORIA</th>
                  <th className='w-32 text-left'>ITEM</th>
                  <th className='W-28 text-center'>VALOR</th>
                  <th className='w-10'></th>
                  <th className='w-10'></th>
                </tr>
              </thead>
              <tbody>
                {cardapio.map(item => (
                <tr key={item.id} className='border-b-[1px] border-gray-300 h-10'>
                  <td className='w-32'>{item.categoria}</td>
                  <td className='w-32'>{item.nome}</td>
                  <td className='w-28 text-center'>{item.valor_individual}</td>
                  <td className='w-10'>
                    <button onClick={() => AlteraItem(item)} className='w-10 hover:cursor-pointer'>
                      <FiEdit2 size={20} />
                    </button>
                  </td>
                  <td className='w-10'>
                    <button onClick={() => ExcluiItem(item.id)} className='w-10'>
                      <FiTrash2 size={20} />
                    </button>
                  </td>
                </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <Modal 
          style={customStylesModal} 
          ariaHideApp={false} 
          isOpen={isOpen}
        >
          <AdicionarMenu 
            listaAtualizar={listarCardapio}
            onClosePage={setIsOpen}
          />
        </Modal>

        <Modal 
          style={customStylesModal} 
          ariaHideApp={false} 
          isOpen={isOpenEdit}
        >
          <EditarMenu 
            listaAtualizar={listarCardapio}
            onClosePage={setIsOpenEdit}
            item={produto!}
          />
        </Modal>
      </div>
    </div>
  )
}
