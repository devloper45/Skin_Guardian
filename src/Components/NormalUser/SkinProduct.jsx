import React, { useEffect, useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Api from "../ProtectRoute/Api";
import Navbarr from "../Navbarr";
import FeatureProducts from "../../utils/FeatureProducts";
import { UserContext } from "../../context/contextApi";

export default function Product() {
  const { id } = useParams(); // Accessing the product ID from the URL
  const [productData, setProduct] = useState(null);
  const navigate = useNavigate();
  const { cart, setCart, handleAddCart } = useContext(UserContext);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await Api.get(`/product/${id}`);
        const data = response.data.data;
        console.log("Fetched product data:", data);
        setProduct(data);
      } catch (error) {
        console.log("Failed to fetch product details", error);
      }
    }

    fetchProduct();
  }, [id]);

  if (!productData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbarr />
      <header></header>
      <p className=" m-3 text-muted-foreground">
        <span
          className=" hover:underline hover:underline-offset-1 cursor-pointer hover:text-blue-300"
          onClick={() => navigate("/dashboard")}
        >
          Home
        </span>{" "}
        &gt;{" "}
        <span
          className=" cursor-pointer hover:underline hover:underline-offset-1 hover:text-blue-300"
          onClick={() => navigate("/SkinProducts")}
        >
          Shop
        </span>{" "}
        &gt;
        <span className=" hover:underline hover:underline-offset-1 hover:text-blue-300 cursor-pointer mx-1">
          {productData.name}
        </span>
      </p>
      <div className="flex flex-col mt-2 md:flex-row p-6 bg-background">
        <div className="md:w-1/2  m-3 h-[500px]">
          <img
            src={productData.imageUrl}
            alt={productData.name}
            className="w-full h-[500px] rounded-lg"
          />
        </div>

        <div className="md:w-1/2  m-3 md:pl-6">
          <h2 className="text-2xl font-bold text-foreground">
            {productData.name}
          </h2>
          <p className="text-muted-foreground">{productData.category}</p>
          <div className="flex items-center my-2">
            <span className="text-yellow-500">★★★★☆</span>
            <span className="text-muted-foreground ml-2">(4 ratings)</span>
          </div>
          <p className="text-muted-foreground mb-4">
            {productData.description}
          </p>
          <a href="#" className="text-primary underline">
            Read full description
          </a>

          <div className="mt-4">
            <h3 className="text-lg font-semibold text-foreground">
              Skin Condition
            </h3>
            <ul className="list-disc list-inside text-muted-foreground">
              {productData.skinCondition.map((condition, index) => (
                <li key={index}>{condition}</li>
              ))}
            </ul>
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-foreground">Stock</h3>
            <p className="text-muted-foreground">
              Available Stock: {productData.stock}
            </p>
          </div>
          <div className="mt-6">
            <button
              className="btn !w-full text-secondary-foreground hover:bg-secondary/80 py-2 px-4 rounded-lg "
              onClick={handleAddCart}
            >
              ADD TO BOX - {productData.price} Pkr
            </button>
          </div>
          {/* <div className="mt-4">
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
          </div> */}
        </div>
      </div>
      <div>
        <div className=" flex justify-center items-center ">
          <h2 className="text-2xl my-5 font-bold text-foreground">
            You may like
          </h2>
        </div>
      </div>
      <FeatureProducts />
    </>
  );
}
