import PokemonList from "@/components/PokemonList";
import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col gap-12">
      <PokemonList />
    </div>
  );
}
