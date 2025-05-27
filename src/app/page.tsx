import Header from "@/components/header";
import Menu from "@/components/menu";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <Header />

      <div className="flex flex-row gap-2">
        <div className="flex flex-col justify-start items-center w-44 max-h-full p-4">
          <Menu />
        </div>
        <div className="flex-1 p-4">CONTEUDO</div>
      </div>
    </div>
  );
}
