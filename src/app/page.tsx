import Header from "@/components/header";
import Menu from "@/components/menu";

export default function Home() {
  return (
    <div className="flex flex-col justify-between w-full h-full bg-amber-300">
      <Header />

      <div className="flex flex-row">
        <div className="flex flex-col justify-start items-center max-h-full p-4">
          <Menu />
        </div>
        <div className="flex-1 p-4">CONTEUDO</div>
      </div>
    </div>
  );
}
