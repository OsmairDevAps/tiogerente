import { supabase } from "@/database/supabase";
import { IItem } from "@/utils/interface";

export function useCardapio() {
  async function criar(data: Omit<IItem, 'id'>) {
    try {
      const insertedRow = await supabase
      .from('cardapios')
      .insert({
        categoria: data.categoria,
        ordem: Number(data.ordem),
        nome: data.nome,
        subtitulo: data.subtitulo,
        descricao:data.descricao,
        valor_individual: Number(data.valor_individual),
        valor_combo: Number(data.valor_combo),
        foto: data.foto,
        ativo: true
      })
      return { insertedRow }
    } catch (error) {
      throw error
    }
  }

  async function atualizar(data: IItem) {
    try {
      await supabase
      .from('cardapios')
      .update({
        categoria: data.categoria,
        ordem: Number(data.ordem),
        nome: data.nome,
        subtitulo: data.subtitulo,
        descricao:data.descricao,
        valor_individual: Number(data.valor_individual),
        valor_combo: Number(data.valor_combo),
        foto: data.foto,
        ativo: Boolean(data.ativo)
      })
      .eq('id', data.id)
    } catch (error) {
      throw error
    }
  }

  async function excluir(id: number) {
    try {
      await supabase
      .from('cardapios')
      .delete()
      .eq('id', id)
    } catch (error) {
      throw error
    }
  }

  async function listar() {
    try {
      const { data } = await supabase 
        .from('cardapios')
        .select('*')
        .order('nome', {ascending: true})
      return data
    } catch (error) {
      console.log(error)
    }
  }

  return { criar, atualizar, excluir, listar }
}