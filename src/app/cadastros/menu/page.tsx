'use client'

import { useState } from 'react'
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

export default function FormMenu() {

  function frmSubmit(dadosForm: IItem) {
    console.log(dadosForm)
  }

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
              
            <form className='w-[400px]'>
              <div className="flex flex-col justify-start items-start gap-2 my-2">
                <label htmlFor="categoria" className="text-medium font-semibold">Categoria:</label>
                <Select name="categoria">
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
                  name='ordem' 
                  placeholder='Ordem'
                />
              </div>
             
              <div className="flex flex-col justify-start items-start gap-2 my-2">
                <label htmlFor="nome" className="text-medium font-semibold">Nome do item:</label>
                <Input 
                  id='nome'
                  name='nome'
                />
              </div>
              
              <div className="flex flex-col justify-start items-start gap-2 my-2">
                <label htmlFor="ordem" className="text-medium font-semibold">Subtitulo:</label>
                <Input 
                  id="subtitulo" 
                  name="subtitulo" 
                />
              </div>
              
              <div className="flex flex-col justify-start items-start gap-2 my-2">
                <label htmlFor="descricao" className="text-medium font-semibold">Descrição:</label>
                <Input 
                  id="descricao" 
                  name="descricao" 
                />
              </div>
              
              <div className="flex flex-col justify-start items-start gap-2 my-2">
                <label htmlFor="preco" className="text-medium font-semibold">Preço:</label>
                <Input 
                  id="preco" 
                  name="preco" 
                />
              </div>
              
              <div className="flex flex-col justify-start items-start gap-2 my-2">
                <label htmlFor="combo" className="text-medium font-semibold">Preço no combo:</label>
                <Input 
                  id="combo" 
                  name="combo" 
                />
              </div>
              
              <div className="flex flex-col justify-start items-start gap-2 my-2">
                <label htmlFor="foto" className="text-medium font-semibold">Foto:</label>
                <Input 
                  id="foto" 
                  name="foto" 
                />
              </div>
              
              <div className="flex flex-col justify-start items-start gap-2 my-2">
                <label htmlFor="ativo" className="text-medium font-semibold">Ativo no cardápio?</label>
                <Input 
                  id="ativo" 
                  name="ativo" 
                />
              </div>
              <Button variant="default" className='mb-4 w-full'>Salvar</Button>
            </form>
              
          </div>

          <div className="flex flex-col w-1/2 justify-start items-start p-4">
            <h2 className="text-medium font-semibold align-center w-full">JÁ CADASTRADOS:</h2>
            
          </div>
        </div>

      </div>
    </div>
  )
}
