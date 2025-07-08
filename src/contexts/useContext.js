import { createContext, useContext, useState } from "react";

const ProductContext = createContext();

const useProductContext = () => useContext(ProductContext);

export default useProductContext;

export function ProductProvider({ children }) {
  const [addedProductIds, setAddedProductIds] = useState([]);
  const [wishListProductIds, setWishListProductIds] = useState([]);

  function addToCart(value) {
    setAddedProductIds((prevValues) => [...prevValues, value]);
  }

  function addToWishlist(value) {
    setWishListProductIds((prevValues) => [...prevValues, value]);
  }

  return (
    <ProductContext.Provider
      value={{ addedProductIds, addToCart, wishListProductIds, addToWishlist }}
    >
      {children}
    </ProductContext.Provider>
  );
}
