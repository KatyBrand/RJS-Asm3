import React, { useState } from "react";
import Banner from "../components/Banner";
import Categories from "../components/Categories";
import ProductList from "../components/ProductList";
import Information from "../components/Information";
import Popup from "../components/Popup";

import { useSelector } from "react-redux";

const Homepage = () => {
  const productData = useSelector((state) => state.shop.products);

  //Use Redux to store isShowPopUp state + data
  const isPopUp = useSelector((state) => state.productModal.showPopUp);
  const productShown = useSelector((state) => state.productModal.productShown);

  return (
    <>
      <Banner />
      <Categories />
      <ProductList productData={productData} />
      <Information />
      {isPopUp && <Popup product={productShown} />}
    </>
  );
};
export default Homepage;
