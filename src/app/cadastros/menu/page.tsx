'use client'

import { useState, useEffect } from 'react'
import { useForm } from "react-hook-form";
import { FiTrash2 } from 'react-icons/fi'
import { zodResolver } from '@hookform/resolvers/zod'
import z from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Header from "@/components/header";
import Menu from "@/components/menu";
import { IItem } from '@/utils/interface';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useCardapio } from '@/hooks/useCardapio';
import { Switch } from '@/components/ui/switch';

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
  const { handleSubmit, register, reset, formState: { errors } } = useForm<TItem>()
  const [cardapio, setCardapio] = useState<IItem[]>([])
  const cardapioDatabase = useCardapio()

  async function listarCardapio() {
    const response = await cardapioDatabase.listar()
    if (response) {
      setCardapio(response)
    }
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

  async function frmSubmit(dadosForm: TItem) {
    const valuesForm = {
      categoria: dadosForm.categoria,
      ordem: dadosForm.ordem,
      nome: dadosForm.nome,
      subtitulo: dadosForm.subtitulo,
      descricao: dadosForm.descricao,
      valor_individual: dadosForm.valor_individual,
      valor_combo: dadosForm.valor_combo,
      foto: dadosForm.foto,
      ativo: dadosForm.ativo,
    }
    try {
      await cardapioDatabase.criar(valuesForm)
      await listarCardapio()
      console.log(valuesForm)
      alert('Item incluido com sucesso.')
      // reset()
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
          <div className="w-1/2 p-4">
            <h2 className="text-medium font-semibold align-center w-full">CADASTRO DE ITEM DO CARDÁPIO</h2>

            <form onSubmit={handleSubmit(frmSubmit)} className='w-[400px]'>
              <div className="flex flex-col justify-start items-start gap-2 my-2">
                <label htmlFor="categoria" className="text-medium font-semibold">Categoria:</label>
                <select
                  className='file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive'
                  {...register('categoria')}
                >
                  <option value="crepes">CREPES</option>
                  <option value="bebidas">BEBIDAS</option>
                  <option value="vinhos">VINHOS</option>
                  <option value="especiais">PRATOS ESPECIAIS</option>
                </select>
              </div>

              <div className="flex flex-col justify-start items-start gap-2 my-2">
                <label htmlFor="ordem" className="text-medium font-semibold">Ordem:</label>
                <Input
                  id='ordem'
                  placeholder='Ordem'
                  {...register('ordem')}
                />
              </div>

              <div className="flex flex-col justify-start items-start gap-2 my-2">
                <label htmlFor="nome" className="text-medium font-semibold">Nome do item:</label>
                <Input
                  id='nome'
                  {...register('nome')}
                />
              </div>

              <div className="flex flex-col justify-start items-start gap-2 my-2">
                <label htmlFor="ordem" className="text-medium font-semibold">Subtitulo:</label>
                <Input
                  id="subtitulo"
                  {...register('subtitulo')}
                />
              </div>

              <div className="flex flex-col justify-start items-start gap-2 my-2">
                <label htmlFor="descricao" className="text-medium font-semibold">Descrição:</label>
                <Input
                  id="descricao"
                  {...register('descricao')}
                />
              </div>

              <div className="flex flex-col justify-start items-start gap-2 my-2">
                <label htmlFor="valor_individual" className="text-medium font-semibold">Preço:</label>
                <Input
                  id="valor_individual"
                  {...register('valor_individual')}
                />
              </div>

              <div className="flex flex-col justify-start items-start gap-2 my-2">
                <label htmlFor="valor_combo" className="text-medium font-semibold">Preço no combo:</label>
                <Input
                  id="valor_combo"
                  {...register('valor_combo')}
                />
              </div>

              <div className="flex flex-col justify-start items-start gap-2 my-2">
                <label htmlFor="foto" className="text-medium font-semibold">Foto:</label>
                <Input
                  id="foto"
                  {...register('foto')}
                />
              </div>

              <div className="flex flex-col justify-start items-start gap-2 my-2">
                <label htmlFor="ativo" className="text-medium font-semibold">Ativo no cardápio?</label>
                <Switch
                  id="airplane-mode"
                  {...register('ativo')}
                />
              </div>
              <Button variant="default" className='mb-4 w-full'>Salvar</Button>
            </form>

          </div>

          <div className="flex flex-col w-1/2 justify-start items-start p-4">
            <h2 className="text-medium font-semibold align-center w-full mb-4">JÁ CADASTRADOS:</h2>
            <div className="flex flex-row justify-start items-start gap-2 w-full border-b-[1px] border-gray-300">
              <span className='font-semibold w-32'>CATEGORIA</span>
              <span className='font-semibold flex-1'>ITEM</span>
              <span className='w-6'></span>
            </div>
            {cardapio.map(item => (
              <div key={item.id} className="flex flex-row justify-start items-center gap-2 w-full h-10">
                <span className='w-32'>{item.categoria}</span>
                <span className='flex-1'>{item.nome}</span>
                <button onClick={() => ExcluiItem(item.id)} className='w-6'><FiTrash2 size={20} /></button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
