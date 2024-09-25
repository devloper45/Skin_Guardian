import React, { useState, useEffect } from "react";
import Navbarr from "../Navbarr";
import Api from "../ProtectRoute/Api";
import { useNavigate } from "react-router-dom";

const SkinWellness = () => {
  const [products, setProducts] = useState([]); // State to hold products data
  const [cart, setCart] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
  };

  const handleNotifyMe = (product) => {
    setNotifications([...notifications, product.name]);
    alert(`You will be notified when ${product.name} is available!`);
  };

  async function getProductsListFromBackend() {
    console.log("from product function");
    try {
      console.log("from try");
      const response = await Api.get("/product");
      console.log("from response");

      const productsList = response.data.data; // Accessing the data from the response
      console.log(productsList);
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
            Home &gt; Shop &gt; Skin Wellness
          </p>
        </div>

        <div className="text-center mb-4">
          <p className="text-muted-foreground">
            Showing {products.length} results
          </p>
        </div>

        {/* Products List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-card cursor-pointer rounded-lg shadow-md p-4"
              onClick={() => handleProduct(product.id)}
            >
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-48 object-cover rounded-lg mb-2"
              />
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p className="text-muted-foreground">
                Rs. {product.price.toLocaleString()}
              </p>
              <div className="flex justify-between mt-2">
                <button
                  className="bg-primary text-white hover:bg-primary/80 p-2 rounded"
                  onClick={() => handleAddToCart(product)}
                >
                  Buy Now
                </button>
                <button
                  className="bg-secondary text-secondary-foreground hover:bg-secondary/80 p-2 rounded"
                  onClick={() => handleAddToCart(product)}
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

// import React, { useState } from "react";
// import Navbarr from "../Navbarr";

// const SkinWellness = () => {
//   const [cart, setCart] = useState([]);
//   const [notifications, setNotifications] = useState([]);

//   const products = [
//     {
//       id: 1,
//       name: "White Jasmine Facial Masque",
//       price: 8400,
//       image: "https://placehold.co/300x300?text=White+Jasmine+Facial+Masque",
//     },
//     {
//       id: 2,
//       name: "Neroli Orange Dry Skin Relief",
//       price: 3120,
//       image: "https://placehold.co/300x300?text=Neroli+Orange+Dry+Skin+Relief",
//     },
//     {
//       id: 3,
//       name: "White Rice Overnight Sleeping",
//       price: 1080,
//       image: "https://placehold.co/300x300?text=White+Rice+Overnight+Sleeping",
//     },
//     {
//       id: 4,
//       name: "Skin Sleep Tamarind Seed Plum",
//       price: 1080,
//       image: "https://placehold.co/300x300?text=Skin+Sleep+Tamarind+Seed+Plum",
//     },
//   ];

//   const handleAddToCart = (product) => {
//     setCart([...cart, product]);
//   };

//   const handleNotifyMe = (product) => {
//     setNotifications([...notifications, product.name]);
//     alert(`You will be notified when ${product.name} is available!`);
//   };
//   async function picToBackend(imageFile) {
//     try {
//       const token=localStorage.getItem("userID")
//       const formData = new FormData();
//       formData.append("image", imageFile);

//       const response = await Api.post("/user/image", formData);

//       if (response.ok) {
//         setErrorMessage("");
//         alert("Image uploaded successfully!");
//       } else {
//         setErrorMessage("Failed to upload image.");
//       }
//     } catch (error) {
//       setErrorMessage("An error occurred while uploading.");
//     }
//   }

//   return (
//     <div className="bg-background text-foreground">
//       <Navbarr />

//       {/* Header */}
//       <header className="bg-blue-100 py-10">
//         <div className="container mx-auto text-center">
//           <h1 className="text-4xl font-extrabold text-primary">Elevate Your Skin Wellness</h1>
//           <p className="text-lg text-muted-foreground mt-4">
//             Discover our handpicked selection of skincare products designed to nourish and rejuvenate.
//             Find the perfect fit for your skin and enhance your natural glow.
//           </p>
//         </div>
//       </header>

//       {/* Main Content */}
//       <div className="container mx-auto p-4">
//         <div className="text-center mb-4">
//           <h2 className="text-3xl font-bold text-primary">Skin Wellness Products</h2>
//           <p className="text-muted-foreground">Home &gt; Shop &gt; Skin Wellness</p>
//         </div>

//         <div className="text-center mb-4">
//           <p className="text-muted-foreground">Showing {products.length} results</p>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//           {products.map((product) => (
//             <div key={product.id} className="bg-card rounded-lg shadow-md p-4">
//               <img
//                 src={product.image}
//                 alt={product.name}
//                 className="w-full h-48 object-cover rounded-lg mb-2"
//               />
//               <h2 className="text-lg font-semibold">{product.name}</h2>
//               <p className="text-muted-foreground">Rs. {product.price.toLocaleString()}</p>
//               <div className="flex justify-between mt-2">
//                 <button
//                   className="bg-primary text-primary-foreground hover:bg-primary/80 p-2 rounded"
//                   onClick={() => handleAddToCart(product)}
//                 >
//                   Buy Now
//                 </button>
//                 <button
//                   className="bg-secondary text-secondary-foreground hover:bg-secondary/80 p-2 rounded"
//                   onClick={() => handleAddToCart(product)}
//                 >
//                   Add to Cart
//                 </button>
//                 {/* Notify me functionality */}
//                 {/* <button
//                   className="bg-secondary text-secondary-foreground hover:bg-secondary/80 p-2 rounded"
//                   onClick={() => handleNotifyMe(product)}
//                 >
//                   Notify Me
//                 </button> */}
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Sorting */}
//         <div className="mt-4 text-right">
//           <select className="bg-input border border-border rounded p-2">
//             <option>Default Sorting</option>
//             <option>Price: Low to High</option>
//             <option>Price: High to Low</option>
//           </select>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SkinWellness;
