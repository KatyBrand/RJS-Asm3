import React from "react";
import { useSelector } from "react-redux";
import Banner from "../components/HomePage/Banner";
import Categories from "../components/HomePage/Categories";
import ProductList from "../components/HomePage/ProductList";
import Information from "../components/HomePage/Information";
import Popup from "../components/HomePage/Popup";

const Homepage = () => {
  //Get state from Redux
  const productData = useSelector((state) => state.shop.products);
  const isPopUp = useSelector((state) => state.productModal.showPopUp);
  const productShown = useSelector((state) => state.productModal.productShown);

  return (
    <>
      <Banner />
      <Categories />
      <ProductList productData={productData} />
      <Information />
      {isPopUp && <Popup prod={productShown} />}
    </>
  );
};
export default Homepage;
