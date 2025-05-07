import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col w-full h-screen">
      <div className="flex flex-row justify-center items-center w-full border-b-[1px] h-10 border-black shadow-2xl">Header</div>
      <div className="flex flex-row gap-2">
        <div className="flex flex-col justify-start items-center w-40 max-h-full p-4">MENU</div>
        <div className="flex-1 p-4">CONTEUDO</div>
      </div>
    </div>
  );
}
