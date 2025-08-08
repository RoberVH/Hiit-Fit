import Image from "next/image";

export default function Home() {
  return (
    <div className=" h-screen font-sans flex flex-col space-y-4 items-center justify-center  w-full"
        >
      <main className="flex flex-col items-center justify-center space-y-4">
        <h1 className="text-5xl font-bold text-center">Gestor de Rutinas HIIT</h1>
        <Image
          src="/hit-fit-2.png"
          alt="HIIT Fit"
          width={120}
          height={110}
          className="object-contain"
        />
      </main>

    </div>
  );
}
