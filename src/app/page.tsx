"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCocktailByName, getRandomCocktail } from "@/app/lib/cocktail";
import CocktailCard from "@/app/components/CocktailCard/CocktailCard";
import { Cocktail } from "@/app/types/cocktail";

export default function Home() {
  const [cocktails, setCocktails] = useState<Cocktail[]>([]);
  const [search, setSearch] = useState("margarita");
  const router = useRouter();

  const searchCocktails = async () => {
    const data = await getCocktailByName(search);
    setCocktails(data || []);
  };

  const handleRandom = async () => {
    const random = await getRandomCocktail();
    router.push(`/cocktail/${random.idDrink}`);
  };

  useEffect(() => {
    searchCocktails();
  }, []);

  return (
    <main style={{ padding: 40, textAlign: "center" }}>
      <h1>Cocktails</h1>

      <div style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Buscar cocktail..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={searchCocktails}>Buscar</button>
      </div>

      <button onClick={handleRandom}>Dime algo bonito</button>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, 250px)",
        gap: 20,
        justifyContent: "center"
      }}>
        {cocktails.map(c => <CocktailCard key={c.idDrink} cocktail={c} />)}
      </div>
    </main>
  );
}