'use client'

import Header from "@/components/header";
import Menu from "@/components/menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFuncionario } from "@/hooks/useFuncionario";
import { IFuncionario } from "@/utils/interface";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FiTrash2 } from "react-icons/fi";

type TFuncionario = {
  nome: string;
  data_nascimento: string;
  cpf: string;
  telefone: string;
  endereco: string;
  bairro: string;
  cidade: string;
  uf: string;
  cep: string;
  funcao: string;
  chavepix: string;
  salario: number;
}

export default function Funcionario() {
  const { register, handleSubmit, reset } = useForm<TFuncionario>()
  const [funcionarios, setFuncionarios] = useState<IFuncionario[]>([])
  const funcionarioDatabase = useFuncionario()

  async function listarFuncionarios() {
    const response = await funcionarioDatabase.listar()
    if (response) setFuncionarios(response)
  }

  async function onSubmitForm(dadosForm: TFuncionario) {
    try {
      await funcionarioDatabase.criar(dadosForm)
      alert('Funcionario cadastrado com sucesso!')
      listarFuncionarios()
      reset()
    } catch (error) {
      console.log(error)
    }
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
          <div className="w-1/2 p-4">
            <h2 className="text-medium font-semibold align-center w-full">CADASTRO DE FUNCIONÁRIOS</h2>

            <form onSubmit={handleSubmit(onSubmitForm)}>
              <div className="flex flex-col justify-start items-start gap-2 my-2">
                  <label htmlFor="nome" className="text-medium font-semibold">Nome:</label>
                  <Input
                    id='nome'
                    placeholder='Nome'
                    {...register('nome')}
                  />
              </div>

              <div className="flex flex-col justify-start items-start gap-2 my-2">
                  <label htmlFor="data_nascimento" className="text-medium font-semibold">Data de nascimento:</label>
                  <Input
                    id='data_nascimento'
                    placeholder='dd/mm/aaaa'
                    {...register('data_nascimento')}
                  />
              </div>

              <div className="flex flex-col justify-start items-start gap-2 my-2">
                  <label htmlFor="cpf" className="text-medium font-semibold">CPF:</label>
                  <Input
                    id='cpf'
                    placeholder='CPF'
                    {...register('cpf')}
                  />
              </div>

              <div className="flex flex-col justify-start items-start gap-2 my-2">
                  <label htmlFor="telefone" className="text-medium font-semibold">Telefone:</label>
                  <Input
                    id='telefone'
                    placeholder='Telefone'
                    {...register('telefone')}
                  />
              </div>

              <div className="flex flex-col justify-start items-start gap-2 my-2">
                  <label htmlFor="endereco" className="text-medium font-semibold">Endereço:</label>
                  <Input
                    id='endereco'
                    placeholder='Endereço'
                    {...register('endereco')}
                  />
              </div>

              <div className="flex flex-col justify-start items-start gap-2 my-2">
                  <label htmlFor="bairro" className="text-medium font-semibold">Bairro:</label>
                  <Input
                    id='bairro'
                    placeholder='Bairro'
                    {...register('bairro')}
                  />
              </div>

              <div className="flex flex-col justify-start items-start gap-2 my-2">
                  <label htmlFor="uf" className="text-medium font-semibold">UF:</label>
                  <Input
                    id='uf'
                    placeholder='UF'
                    {...register('uf')}
                  />
              </div>

              <div className="flex flex-col justify-start items-start gap-2 my-2">
                  <label htmlFor="cep" className="text-medium font-semibold">CEP:</label>
                  <Input
                    id='cep'
                    placeholder='CEP'
                    {...register('cep')}
                  />
              </div>

              <div className="flex flex-col justify-start items-start gap-2 my-2">
                  <label htmlFor="funcao" className="text-medium font-semibold">Função:</label>
                  <Input
                    id='funcao'
                    placeholder='Função'
                    {...register('funcao')}
                  />
              </div>

              <div className="flex flex-col justify-start items-start gap-2 my-2">
                  <label htmlFor="chavepix" className="text-medium font-semibold">Chave PIX:</label>
                  <Input
                    id='chavepix'
                    placeholder='Chave PIX'
                    {...register('chavepix')}
                  />
              </div>

              <div className="flex flex-col justify-start items-start gap-2 my-2">
                  <label htmlFor="salario" className="text-medium font-semibold">Salário:</label>
                  <Input
                    id='salario'
                    placeholder='Salário'
                    {...register('salario')}
                  />
              </div>

              <Button variant="default" className='mb-4 w-full'>Salvar</Button>
            </form>
          </div>

          <div className="flex flex-col w-1/2 justify-start items-start p-4">
            <h2 className="text-medium font-semibold align-center w-full mb-4">JÁ CADASTRADOS:</h2>
            <div className="flex flex-row justify-start items-start gap-2 w-full border-b-[1px] border-gray-300">
              <span className='font-semibold w-32'>CPF</span>
              <span className='font-semibold flex-1'>NOME</span>
              <span className='w-6'></span>
            </div>
            {funcionarios.map(item => (
              <div key={item.id} className="flex flex-row justify-start items-center gap-2 w-full h-10">
                <span className='w-32'>{item.cpf}</span>
                <span className='flex-1'>{item.nome}</span>
                <button onClick={() => ExcluiItem(item.id)} className='w-6'>Excluir</button>
              </div>
            ))}
          </div>
         </div>

        </div>
      </div>
  )
}