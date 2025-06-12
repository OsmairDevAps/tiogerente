import { supabase } from "@/database/supabase";
import { IFuncionario } from "@/utils/interface";

export function useFuncionario() {
  async function criar(data: Omit<IFuncionario, 'id'>) {
    try {
      const insertedRow = await supabase
        .from('funcionarios')
        .insert({
          nome: data.nome,
          data_nascimento: data.data_nascimento,
          cpf: data.cpf,
          telefone: data.telefone,
          endereco: data.endereco,
          bairro: data.bairro,
          cidade: data.cidade,
          uf: data.uf,
          cep: data.cep,
          funcao: data.funcao,
          chavepix: data.chavepix,
          salario: Number(data.salario)
        })
        return { insertedRow }
    } catch (error) {
      throw error
    }
  }

  async function atualizar(data: IFuncionario) {
    try {
      await supabase
      .from('funcionarios')
      .update({
        nome: data.nome,
        data_nascimento: data.data_nascimento,
        cpf: data.cpf,
        telefone: data.telefone,
        endereco: data.endereco,
        bairro: data.bairro,
        cidade: data.cidade,
        uf: data.uf,
        cep: data.cep,
        funcao: data.funcao,
        chavepix: data.chavepix,
        salario: Number(data.salario)
      }).eq('id', data.id)
    } catch (error) {
      throw error
    }
  }

  async function excluir(id: number) {
    try {
      await supabase
      .from('funcionarios')
      .delete()
      .eq('id', id)
    } catch (error) {
      throw error
    }
  }

  async function listar() {
    try {
      const { data } = await supabase 
        .from('funcionarios')
        .select('*')
        .order('nome', {ascending: true})
      return data
    } catch (error) {
      console.log(error)
    }
  }

  return { criar, atualizar, excluir, listar }  
}