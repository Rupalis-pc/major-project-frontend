import { createContext, useContext, useState } from "react";

const ProductContext = createContext();

const useProductContext = () => useContext(ProductContext);

export default useProductContext;

export function ProductProvider({ children }) {
  const [addedProduct, setAddedProduct] = useState([]);

  return (
    <ProductContext.Provider value={{ addedProduct, setAddedProduct }}>
      {children}
    </ProductContext.Provider>
  );
}
