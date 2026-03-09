import { api } from "./axios";
import { Cocktails, Cocktail } from "@/app/types/cocktail";

export const getCocktailByName = async (name: string): Promise<Cocktail[]> => {
  const response = await api.get<Cocktails>(`/search.php?s=${name}`);
  return response.data.drinks ?? [];
};


export const getCocktailById = async (id: string): Promise<Cocktail | null> => {
  const response = await api.get<Cocktails>(`/lookup.php?i=${id}`);
  if (!response.data.drinks) return null;
  return response.data.drinks[0];
};

export const getRandomCocktail = async (): Promise<Cocktail> => {
  const response = await api.get<Cocktails>("/random.php");
  return response.data.drinks[0];
};