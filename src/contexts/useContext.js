import { createContext, useContext, useState } from "react";

const ProductContext = createContext();

const useProductContext = () => useContext(ProductContext);

export default useProductContext;

export function ProductProvider({ children }) {
  const [addedProductIds, setAddedProductIds] = useState([]);
  const [wishListProductIds, setWishListProductIds] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  //Adds ids to addedProductIds array
  function addToCart(value) {
    setAddedProductIds((prevValues) => [...prevValues, value]);
  }

  function addToWishlist(value) {
    setWishListProductIds((prevValues) => [...prevValues, value]);
  }

  function deleteFromWishList(value) {
    setWishListProductIds((prevValues) =>
      prevValues.filter((id) => id != value)
    );
  }

  function deleteFromCart(value) {
    setAddedProductIds((prevValues) => prevValues.filter((id) => id != value));
  }

  function searchProduct(value) {
    setSearchInput(value);
  }

  // It passes id to addToCart Function. Ultimately adds id to addedProductIds
  function increaseQuantity(productId) {
    addToCart(productId);
  }

  //DeleteFrom Cart will filter out all and gives 0. As decrease by 1 Finds index of id, which gives 1st id. Then slice (0, index) ie index non inclusive then slice(index + 1 ) ie after index which is inclusive. returns array removing 1 id a time

  function decreaseQuantity(productId) {
    const index = addedProductIds.indexOf(productId);

    setAddedProductIds((prev) => [
      ...prev.slice(0, index),
      ...prev.slice(index + 1),
    ]);
  }

  //Gives number of times same id appears
  function getProductQuantity(productId) {
    return addedProductIds.filter((id) => id === productId).length;
  }

  return (
    <ProductContext.Provider
      value={{
        addedProductIds,
        addToCart,
        wishListProductIds,
        addToWishlist,
        deleteFromWishList,
        deleteFromCart,
        searchInput,
        searchProduct,
        increaseQuantity,
        getProductQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
