import { useEffect, useState } from "react";
import Api from "../Components/ProtectRoute/Api";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function FeatureProducts() {
  const [products, setProducts] = useState([]); // State to hold products data

  const { addItemToCart } = useCart();

  const handleBuyNow = () => {
    navigate("/ShoppingCart");
  };
  async function getProductsListFromBackend() {
    console.log("from product function");
    try {
      console.log("from try");
      const response = await Api.get("/product");
      console.log("from response");

      const productsList = response.data.data; // Accessing the data from the response
      setProducts(productsList); // Setting the products state with the fetched data

      if (response.status >= 200 && response.status < 300) {
        console.log("Products fetched successfully!");
      } else {
        console.log("Failed to fetch products");
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  const navigate = useNavigate();

  function handleProduct(id) {
    navigate(`/skinproduct/${id}`);
  }

  // const handleBuyNow = () => {
  //   navigate("/ShoppingCart");
  // };

  useEffect(() => {
    getProductsListFromBackend();
  }, []);
  return (
    <div className=" mx-11">
      <div className="grid mx-11 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-card cursor-pointer rounded-lg shadow-md p-4"
          >
            <div onClick={() => handleProduct(product.id)}>
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-48 object-contain rounded-lg mb-2"
              />
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p className="text-muted-foreground">
                Rs. {product.price.toLocaleString()}
              </p>
            </div>

            <div className="flex justify-between mt-2">
              <button
                className="bg-primary text-white hover:bg-primary/80 p-2 rounded"
                onClick={() => {
                  addItemToCart(product);
                  handleBuyNow(product);
                }}
              >
                Buy Now
              </button>
              <button
                className="bg-primary  text-white hover:bg-primary/80 p-2 rounded"
                onClick={() => addItemToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
