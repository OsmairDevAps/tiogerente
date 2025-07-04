import { useCardapio } from "@/hooks/useCardapio";
import { useForm, Controller } from "react-hook-form";
import { NumericFormat } from 'react-number-format'
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { IItem } from "@/utils/interface";
import { useEffect } from "react";

type Props = {
  onClosePage: (isOpen: boolean) => void;
  listaAtualizar: ()=>void;
  item: IItem;
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

export default function EditarMenu( { onClosePage, listaAtualizar, item }: Props ) {
  const { handleSubmit, register, reset, control, formState: { errors } } = useForm<TItem>()
  const cardapioDatabase = useCardapio()

  function ClosePage() {
    onClosePage(false)
  }

  async function frmSubmit(dadosForm: TItem) {
    try {
      await cardapioDatabase.atualizar({
        id: item.id,
        categoria: dadosForm.categoria,
        ordem: dadosForm.ordem,
        nome: dadosForm.nome,
        subtitulo: dadosForm.subtitulo,
        descricao: dadosForm.descricao,
        valor_individual: dadosForm.valor_individual,
        valor_combo: dadosForm.valor_combo,
        foto: 'sem foto',
        ativo: dadosForm.ativo,
      })
      listaAtualizar()
      alert('Item atualizado com sucesso.')
      // reset()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (item) {
      reset({
        categoria: item?.categoria,
        ordem: item?.ordem,
        nome: item?.nome,
        subtitulo: item?.subtitulo,
        descricao: item?.descricao,
        valor_individual: item?.valor_individual,
        valor_combo: item?.valor_combo,
        foto: item?.foto,
        ativo: item.ativo,
      })
    }
  }, [item])

  return (
    <div className="w-full">
      <h2 className="text-medium font-semibold align-center w-full">ALTERAÇÃO DE ITEM DO CARDÁPIO</h2>

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
          <Controller
            name="valor_individual"
            control={control}
            defaultValue={0}
            render={({ field }) => (
            <NumericFormat
              value={field.value}
              onValueChange={(values) => field.onChange(values.floatValue)}
              thousandSeparator="."
              decimalSeparator=","
              decimalScale={2}
              fixedDecimalScale
              allowNegative={false}
              customInput={Input}
              placeholder="0,00"
            />
            )}
          />
        </div>

        <div className="flex flex-col justify-start items-start gap-2 my-2">
          <label htmlFor="valor_combo" className="text-medium font-semibold">Preço no combo:</label>
          <Controller
            name="valor_combo"
            control={control}
            defaultValue={0}
            render={({ field }) => (
              <NumericFormat
                value={field.value}
                onValueChange={(values) => field.onChange(values.floatValue)}
                thousandSeparator="."
                decimalSeparator=","
                decimalScale={2}
                fixedDecimalScale
                allowNegative={false}
                customInput={Input}
                placeholder="0,00"
              />
            )}
          />
        </div>

        <div className="flex flex-col justify-start items-start gap-2 my-2">
          <label htmlFor="ativo" className="text-medium font-semibold">Ativo no cardápio?</label>
          <Controller 
            name="ativo"
            control={control}
            defaultValue={false}
            render={({field}) => (
              <Switch
                id="ativo"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
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