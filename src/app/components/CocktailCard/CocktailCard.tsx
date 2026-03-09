"use client";

import Link from "next/link";
import { Cocktail } from "@/app/types/cocktail";
import styles from "./CocktailCard.module.css";

const CocktailCard = ({ cocktail }: { cocktail: Cocktail }) => (
  <Link href={`/cocktail/${cocktail.idDrink}`}>
    <div className={styles.card}>
      <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
      <h3>{cocktail.strDrink}</h3>
    </div>
  </Link>
);

export default CocktailCard;