import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFuncionario } from "@/hooks/useFuncionario";
import { IFuncionario } from "@/utils/interface";
import { Switch } from "@/components/ui/switch"
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type TFuncionario = {
  nome: string;
  data_nascimento: string;
  cpf: string;
  telefone: string;
  funcao: string;
  pin: string;
  ativo: boolean;
}

type Props = {
  listaAtualizar: () => void;
  onClosePage: (isOpen: boolean) => void;
}

export default function AdicionarFuncionario({ listaAtualizar, onClosePage }: Props) {
  const { register, handleSubmit, reset } = useForm<TFuncionario>()
  const [funcionarios, setFuncionarios] = useState<IFuncionario[]>([])
  const funcionarioDatabase = useFuncionario()

  async function onSubmitForm(dadosForm: TFuncionario) {
    try {
      await funcionarioDatabase.criar(dadosForm)
      alert('Funcionario cadastrado com sucesso!')
      listaAtualizar()
      reset()
    } catch (error) {
      console.log(error)
    }
  }

  function Close() {
    onClosePage(false)
  }

  return (
    <div className="w-full">
      <div className="flex flex-row justify-between items-center">
        <h2 className="text-medium font-semibold align-center w-full">CADASTRO DE FUNCIONÁRIOS</h2>
        <Button variant="destructive" onClick={Close}>x</Button>
      </div>

      <form onSubmit={handleSubmit(onSubmitForm)} className='w-[500px]'>
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
            <label htmlFor="funcao" className="text-medium font-semibold">Função:</label>
            <Input
              id='funcao'
              placeholder='Função'
              {...register('funcao')}
            />
        </div>

        <div className="flex flex-col justify-start items-start gap-2 my-2">
            <label htmlFor="pin" className="text-medium font-semibold">PIN de acesso:</label>
            <Input
              id='pin'
              placeholder='PIN'
              {...register('pin')}
            />
        </div>

        <div className="flex flex-col justify-start items-start gap-2 mt-2 mb-8">
            <label htmlFor="salario" className="text-medium font-semibold">Funcionário Ativo?</label>
            <div className="flex items-center space-x-2">
              <Switch id="ativo" {...register('ativo')} />
            </div>
        </div>

        <Button variant="default" className='mb-4 w-full'>Salvar</Button>
      </form>

    </div>
  )
}