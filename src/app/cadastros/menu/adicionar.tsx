import { useCardapio } from "@/hooks/useCardapio";
import { useForm } from "react-hook-form";
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';

type Props = {
  onClosePage: (isOpen: boolean) => void;
  listaAtualizar: ()=>void;
}
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

export default function AdicionarMenu( { onClosePage, listaAtualizar }: Props ) {
  const { handleSubmit, register, reset, formState: { errors } } = useForm<TItem>()
  const cardapioDatabase = useCardapio()

  function ClosePage() {
    onClosePage(false)
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
      listaAtualizar()
      console.log(valuesForm)
      alert('Item incluido com sucesso.')
      // reset()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="w-full">
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
            <option value="CREPES">CREPES</option>
            <option value="BEBIDAS">BEBIDAS</option>
            <option value="VINHOS">VINHOS</option>
            <option value="ESPECIAIS">PRATOS ESPECIAIS</option>
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
        <div className='flex flex-row justify-between items-center gap-2'>
          <Button variant="default" className='mb-4 w-1/2 hover:cursor-pointer'>Salvar</Button>
          <Button variant="destructive" className='mb-4 w-1/2 hover:cursor-pointer' onClick={ClosePage}>Fechar</Button>
        </div>
      </form>

    </div>
  )
}