import React, { useState, useContext, useEffect } from "react";
import Navbarr from "../Navbarr";
import Api from "../ProtectRoute/Api";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/contextApi";
import { useCart } from "../../context/CartContext";
const SkinWellness = () => {
  const [products, setProducts] = useState([]); // State to hold products datacon
  const [loading, setLoading] = useState(false); // State to hold loading status

  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();
  const { cart, setCart, handleAddCart } = useContext(UserContext);
  const { addItemToCart } = useCart();

  const handleAddToCart = (product) => {
    // setCart([...cart, product]);
    // navigate('/ShoppingCart')sett
    handleAddCart();
  };
  const handleBuyNow = (product) => {
    // setCart([...cart, product]);
    handleAddCart();
    navigate("/ShoppingCart");
  };

  const handleNotifyMe = (product) => {
    setNotifications([...notifications, product.name]);
    alert(`You will be notified when ${product.name} is available!`);
  };

  async function getProductsListFromBackend() {
    console.log("from product function");
    setLoading(true);
    try {
      console.log("from try");
      const response = await Api.get("/product");
      console.log("from response");

      const productsList = response.data.data; // Accessing the data from the response
      // Setting the products state with the fetched data

      if (response.status >= 200 && response.status < 300) {
        console.log(productsList);
        setProducts(productsList);
        setLoading(false);
        console.log("Products fetched successfully!");
      } else {
        console.log("Failed to fetch products");
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log("error", error);
    }
  }

  useEffect(() => {
    getProductsListFromBackend();
  }, []);
  function handleProduct(id) {
    navigate(`/skinproduct/${id}`);
  }

  return (
    <div className="bg-background text-foreground">
      <Navbarr />

      {/* Header */}
      <header className="bg-blue-100 py-10">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-extrabold text-primary">
            Elevate Your Skin Wellness
          </h1>
          <p className="text-lg text-muted-foreground mt-4">
            Discover our handpicked selection of skincare products designed to
            nourish and rejuvenate. Find the perfect fit for your skin and
            enhance your natural glow.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto p-4">
        <div className="text-center mb-4">
          <h2 className="text-3xl font-bold text-primary">
            Skin Wellness Products
          </h2>
          <p className="text-muted-foreground">
            <span
              className=" hover:underline hover:underline-offset-1 cursor-pointer hover:text-blue-300"
              onClick={() => navigate("/dashboard")}
            >
              Home
            </span>{" "}
            &gt;{" "}
            <span
              className=" cursor-pointer hover:underline hover:underline-offset-1 hover:text-blue-300"
              onClick={() => navigate("/Dashboard")}
            >
              Shop
            </span>{" "}
            &gt;
            <span
              className=" hover:underline hover:underline-offset-1 hover:text-blue-300 cursor-pointer"
              onClick={() => navigate("/")}
            >
              Skin Wellness
            </span>
          </p>
        </div>

        {loading ? (
          <div className=" loader h-10 z-20 "></div>
        ) : (
          <div className="text-center mb-4">
            <p className="text-muted-foreground">
              Showing {products.length} results
            </p>
          </div>
        )}

        {/* Products List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
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
    </div>
  );
};

export default SkinWellness;
