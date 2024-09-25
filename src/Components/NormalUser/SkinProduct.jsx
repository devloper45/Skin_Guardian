import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Api from "../ProtectRoute/Api";
import Navbarr from "../Navbarr";
export default function Product() {
  const { id } = useParams(); // Accessing the product ID from the URL
  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await Api.get(`/product/${id}`);
        console.log(response);
        setProduct(response.data);
      } catch (error) {
        console.log("Failed to fetch product details", error);
      }
    }

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbarr />
      <header></header>
      <div className="flex flex-col md:flex-row p-6 bg-background">
        <div className="md:w-1/2">
          <img
            src="https://placehold.co/600x600?text=Smoothie+Image"
            alt="Ginger + Greens Smoothie"
            className="w-full h-auto rounded-lg"
          />
        </div>
        <div className="md:w-1/2 md:pl-6">
          <h2 className="text-2xl font-bold text-foreground">
            Skin Glow Smoothie
          </h2>
          <p className="text-muted-foreground">
            Inspired by: a wake-me-up shot of green juice
          </p>
          <div className="flex items-center my-2">
            <span className="text-yellow-500">★★★★☆</span>
            <span className="text-muted-foreground ml-2">(884 ratings)</span>
          </div>
          <p className="text-muted-foreground mb-4">
            The fiery zing of ginger. The velvety texture of bananas, avocado,
            and flax seeds. A hint of sweetness from dates. A squeeze of lemon.
            And, of course, nutrient-dense, bright green spinach. It’s green …
          </p>
          <a href="#" className="text-primary underline">
            Read full description
          </a>
          <div className="mt-6">
            <button className="bg-secondary text-secondary-foreground hover:bg-secondary/80 py-2 px-4 rounded-lg">
              ADD TO BOX - $8.49
            </button>
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-foreground">
              All ingredients
            </h3>
            <details className="text-muted-foreground">
              <summary className="cursor-pointer">View ingredients</summary>
              <ul className="list-disc list-inside">
                <li>Ginger</li>
                <li>Banana</li>
                <li>Avocado</li>
                <li>Flax seeds</li>
                <li>Dates</li>
                <li>Lemon</li>
                <li>Spinach</li>
              </ul>
            </details>
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-foreground">
              Nutrition Facts
            </h3>
            <details className="text-muted-foreground">
              <summary className="cursor-pointer">View nutrition facts</summary>
              <p>Calories: 250</p>
              <p>Protein: 5g</p>
              <p>Fat: 10g</p>
              <p>Carbohydrates: 40g</p>
            </details>
          </div>
        </div>
      </div>
    </>
  );
}
