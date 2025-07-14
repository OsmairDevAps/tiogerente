export default function mascarar(tipo: string, valor: string) {
  if(tipo==='DN') { 
    const dia = valor.substring(0,2)
    const mes = valor.substring(2,4)
    const ano = valor.substring(4,8)
    return dia + '/' + mes + '/' + ano
  }
}