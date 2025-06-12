import { string } from "zod";

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
export interface IFuncionario {
  id: number;
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