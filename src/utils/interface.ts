export interface IItem {
  id: number;
  categoria: string;
  ordem: number;
  nome: string;
  subtitulo: string;
  descricao:string;
  valor_individual: number;
  valor_combo: number;
  foto: string;
  ativo: boolean;
}