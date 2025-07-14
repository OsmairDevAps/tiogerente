'use client'

import Header from "@/components/header";
import Menu from "@/components/menu";
import Modal from 'react-modal'
import { Button } from "@/components/ui/button";
import { useFuncionario } from "@/hooks/useFuncionario";
import { IFuncionario } from "@/utils/interface";
import { useEffect, useState } from "react";
import AdicionarFuncionario from "./adicionar";
import { customStylesModal } from "@/utils/modal";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

export default function Funcionario() {
  const [funcionarios, setFuncionarios] = useState<IFuncionario[]>([])
  const [isModalAddOpen, setIsModalAddOpen] = useState(false)
  const funcionarioDatabase = useFuncionario()

  async function listarFuncionarios() {
    const response = await funcionarioDatabase.listar()
    if (response) setFuncionarios(response)
  }

  function AlteraItem(funcionario: IFuncionario) {
    alert('Alterar '+ funcionario.ativo)
  }

  function ExcluiItem(id: number) {
    alert('Excluido '+ id)
  }

  useEffect(()=> {
    listarFuncionarios()
  },[])

  return (
    <div className="flex flex-col w-full">
      <Header />
    
      <div className="flex flex-row gap-2">
        <div className="flex flex-col justify-start items-center w-48 p-4">
          <Menu />
        </div>
    
        <div className="flex flex-row gap-2 w-full">

          <div className="flex flex-col w-full justify-start items-start p-4">
            <div className='flex flex-row justify-between items-center bg-slate-200 w-full p-2 mb-4'>
              <h2 className="text-medium font-semibold">JÁ CADASTRADOS:</h2>
              <Button variant='default' onClick={()=>setIsModalAddOpen(true)}>
                + Cadastrar Novo
              </Button>
            </div>
            <table className="w-full">
              <thead>
                <tr className='border-b-[1px] border-gray-900'>
                  <th className='w-32 text-left'>CPF</th>
                  <th className='w-32 text-left'>NOME</th>
                  <th className='w-32 text-left'>DT. NASC.</th>
                  <th className='w-32 text-left'>FUNÇÃO</th>
                  <th className='w-20 text-center'>ATIVO</th>
                  <th className='w-10'></th>
                  <th className='w-10'></th>
                </tr>
              </thead>
              <tbody>
                {funcionarios.map(item => (
                <tr key={item.id} className='border-b-[1px] border-gray-300 h-10'>
                  <td className='w-32'>{item.cpf}</td>
                  <td className='w-32'>{item.nome}</td>
                  <td className='w-32'>{item.data_nascimento}</td>
                  <td className='w-32'>{item.funcao}</td>
                  <td className='w-20 text-center'>{item.ativo ? 'Sim' : 'Não'}</td>
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
          isOpen={isModalAddOpen}
        >
          <AdicionarFuncionario 
            listaAtualizar={listarFuncionarios}
            onClosePage={setIsModalAddOpen}
          />
        </Modal>

        {/* <Modal 
          style={customStylesModal} 
          ariaHideApp={false} 
          isOpen={isOpenEdit}
        >
          <EditarMenu 
            listaAtualizar={listarCardapio}
            onClosePage={setIsOpenEdit}
            item={produto!}
          />
        </Modal> */}

      </div>
    </div>
  )
}