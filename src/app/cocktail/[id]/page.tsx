"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getCocktailById } from "@/app/lib/cocktail";
import { Cocktail } from "@/app/types/cocktail";

export default function CocktailDetail() {
  const { id } = useParams() as { id?: string };
  const [drink, setDrink] = useState<Cocktail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    (async () => {
      setLoading(true);
      const d = await getCocktailById(id);
      setDrink(d);
      setLoading(false);
    })();
  }, [id]);

  if (loading) return <p style={{ textAlign: "center", marginTop: 50 }}>Cargando...</p>;
  if (!drink) return <p style={{ textAlign: "center", marginTop: 50 }}>Cocktail no encontrado </p>;

  const ingredients = Object.entries(drink)
    .filter(([key, val]) => key.includes("strIngredient") && val)
    .map(([_, val]) => val);

  return (
    <div style={{ padding: 40, maxWidth: 800, margin: "auto", textAlign: "center" }}>
      <h1>{drink.strDrink}</h1>
      <img src={drink.strDrinkThumb} alt={drink.strDrink} width={300} style={{ borderRadius: 10, marginBottom: 20 }} />

      <p><b>Categoría:</b> {drink.strCategory}</p>
      <p><b>Alcohol:</b> {drink.strAlcoholic}</p>
      <p><b>Vaso:</b> {drink.strGlass}</p>

      <h2>Instrucciones</h2>
      <p>{drink.strInstructions}</p>

      <h2>Ingredientes</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {ingredients.map((ing, i) => <li key={i} style={{ marginBottom: 5 }}>{ing}</li>)}
      </ul>
    </div>
  );
}