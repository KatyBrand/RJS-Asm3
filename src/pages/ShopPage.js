import React from "react";
import CategoryList from "../components/ShopPage/CategoryList";
import { useSelector } from "react-redux";
import classes from "../components/ShopPage/ShopPage.module.css";

const ShopPage = () => {
  //Get data from store
  const productData = useSelector((state) => state.shop.products);

  return (
    <>
      {productData.length === 0 && <p>Loading..</p>}
      <div className={classes.banner}>
        <h1>SHOP</h1>
        <h5>SHOP</h5>
      </div>
      <div className={classes.cateContainer}>
        {productData && <CategoryList productData={productData} />}
      </div>
    </>
  );
};

export default ShopPage;
