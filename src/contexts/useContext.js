import { createContext, useContext, useEffect, useState } from "react";

const ProductContext = createContext();

const useProductContext = () => useContext(ProductContext);

export default useProductContext;

export function ProductProvider({ children }) {
  const [addedProductIds, setAddedProductIds] = useState([]);
  const [wishListProductIds, setWishListProductIds] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [address, setAddress] = useState([]);
  const [placedOrders, setPlacedOrders] = useState([]);

  // Fetch wishlist from backend on mount
  useEffect(() => {
    fetch("http://localhost:4000/wishlist")
      .then((res) => res.json())
      .then((data) => {
        const ids = data.map((item) => item.productId); // extract only IDs
        setWishListProductIds(ids);
      });
  }, []);

  // Fetch cart from backend on mount
  useEffect(() => {
    fetch("http://localhost:4000/cart")
      .then((res) => res.json())
      .then((data) => {
        const ids = data.map((item) => item.productId); // extract only IDs
        setAddedProductIds(ids);
      });
  }, []);

  //Adds ids to addedProductIds array
  function addToCart(value) {
    fetch("http://localhost:4000/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId: value }),
    })
      .then((res) => res.json())
      .then(() => {
        setAddedProductIds((prevValues) => [...prevValues, value]);
      })
      .catch((err) => console.error("Failed to add product to Cart", err));
  }

  function addToWishlist(value) {
    fetch("http://localhost:4000/wishlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId: value }),
    })
      .then((res) => res.json())
      .then(() => setWishListProductIds((prev) => [...prev, value]))
      .catch((error) => console.error("Add to wishlist failed", error));
  }

  function deleteFromWishList(value) {
    fetch(`http://localhost:4000/wishlist/${value}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() =>
        setWishListProductIds((prev) => prev.filter((id) => id !== value))
      )
      .catch((error) => console.error("Remove from wishlist failed", error));
  }

  function deleteFromCart(value) {
    fetch("http://localhost:4000/cart", {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() =>
        setAddedProductIds((prevValues) =>
          prevValues.filter((id) => id != value)
        )
      )
      .catch((error) => console.error("Remove from cart failed", error));
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

  function clearCart() {
    setAddedProductIds([]);
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
        address,
        setAddress,
        placedOrders,
        setPlacedOrders,
        clearCart,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
