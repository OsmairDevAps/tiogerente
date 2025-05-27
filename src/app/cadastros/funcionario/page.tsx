import Header from "@/components/header";
import Menu from "@/components/menu";

export default function Funcionario() {
  return (
    <div className="flex flex-col w-full">
      <Header />
    
      <div className="flex flex-row gap-2">
        <div className="flex flex-col justify-start items-center w-48 p-4">
          <Menu />
        </div>
    
        <div className="flex flex-row gap-2 w-full">
          <div className="w-1/2 p-4">
            <h2 className="text-medium font-semibold align-center w-full">CADASTRO DE FUNCIONÁRIOS</h2>
          </div>
        </div>
        </div>
      </div>
  )
}