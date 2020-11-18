import React, { useState, useEffect } from "react";
import { StoreProvider } from "../util/context";
import { useCategories } from "../queries/categories";
import HTTP from "../queries/http";

const AppProvider = ({ location, children }) => {
  const [cart, setCart] = useState([]);
	const { status, data, error, isFetching } = useCategories()
	console.log(data)
	console.log(status)
	console.log(error)
	console.log(isFetching)

  const categories = data ? data.productCategories.nodes : [];

  useEffect(() => {
    async function getData() {
      try {
        const { data } = await HTTP.get("/cart");
        setCart(data);
      } catch (error) {
        console.error(error);
      }
    }
    getData();
  }, []);

  const addCart = async (id, quantity) => {
    try {
      const { data } = await HTTP.post("/cart/add-item", {
        id,
        quantity,
      });
      setCart(data);
    } catch (error) {
      console.error(error);
    }
  };

  const updateCart = async (key, quantity) => {
    try {
      const { data } = await HTTP.post("/cart/update-item", {
        key,
        quantity,
      });
      setCart(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <StoreProvider value={{ categories, cart, addCart, updateCart }}>
      {children}
    </StoreProvider>
  );
};

export default AppProvider;
