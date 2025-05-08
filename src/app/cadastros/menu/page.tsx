'use client'

import { useState, useEffect } from 'react'
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import z from "zod";
import { Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, } from "@/components/ui/select";
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
  descricao:string;
  preco: number;
  combo: number;
  foto: string;
  ativo: boolean;
}

export default function FormMenu() {
  const { handleSubmit, register, reset, formState:{errors} } = useForm<TItem>()
  const [cardapio, setCardapio] = useState<IItem[]>([])
  const cardapioDatabase = useCardapio()

  async function listarCardapio() {
    const response = await cardapioDatabase.listar()
    if (response) {
      setCardapio(response)
    }
  }

  async function frmSubmit(dadosForm: TItem) {
    try {
      await cardapioDatabase.criar(dadosForm)
      listarCardapio
      console.log(dadosForm)      
      alert('Item incluido com sucesso.')
      // reset()
    } catch (error) {
      console.log(error)      
    }
  }

  useEffect(()=> {
    listarCardapio()
  },[])

  return (
    <div className="flex flex-col w-full h-screen">
      <Header />

      <div className="flex flex-row gap-2 overflow-auto">
        <div className="flex flex-col justify-start items-center w-40 p-4">
          <Menu />
        </div>
        
        <div className="flex flex-row gap-2 w-full">
          <div className="w-1/2 p-4">
            <h2 className="text-medium font-semibold align-center w-full">CADASTRO DE ITEM DO CARDÁPIO</h2>
              
            <form onSubmit={handleSubmit(frmSubmit)} className='w-[400px]'>
              <div className="flex flex-col justify-start items-start gap-2 my-2">
                <label htmlFor="categoria" className="text-medium font-semibold">Categoria:</label>
                <Select {...register('categoria')}>
                  <SelectTrigger className="w-full h-10">
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="crepes">CREPES</SelectItem>
                    <SelectItem value="bebidas">BEBIDAS</SelectItem>
                    <SelectItem value="vinhos">VINHOS</SelectItem>
                    <SelectItem value="especiais">PRATOS ESPECIAIS</SelectItem>
                  </SelectContent>
                </Select>
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
                <label htmlFor="preco" className="text-medium font-semibold">Preço:</label>
                <Input 
                  id="preco" 
                  {...register('preco')} 
                />
              </div>
              
              <div className="flex flex-col justify-start items-start gap-2 my-2">
                <label htmlFor="combo" className="text-medium font-semibold">Preço no combo:</label>
                <Input 
                  id="combo" 
                  {...register('combo')}
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
            <h2 className="text-medium font-semibold align-center w-full">JÁ CADASTRADOS:</h2>
            {cardapio.map(item => (
              <div key={item.id} className="flex flex-row justify-start items-start gap-2">
                <span>{item.categoria}</span>
                <span>{item.nome}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
