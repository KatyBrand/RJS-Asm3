import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CategoryProductList from "./CategoryProductList";
import classes from "./ShopPage.module.css";

const CategoryList = ({ productData }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "SHOW_ALL_PROD" });
  }, []);
  //Products filtered base on category
  const filteredProducts = useSelector((state) => state.shop.filteredProducts);

  const sortProducts = (category) => {
    dispatch({ type: "FILTER", category: category });
  };
  const showAllProducts = () => {
    dispatch({ type: "SHOW_ALL_PROD" });
  };

  return (
    <>
      <div className={classes.categoryList}>
        <h3>Categories</h3>
        <ul>
          <h6 className={classes.title} id={classes.iphone}>
            APPLE
          </h6>
          <li onClick={() => showAllProducts()}>All</li>
          <h6 className={classes.title}>IPHONE AND MAC</h6>
          <li onClick={() => sortProducts("iphone")}>IPhone</li>
          <li onClick={() => sortProducts("ipad")}>IPad</li>
          <li onClick={() => sortProducts("macbook")}>Macbook</li>
          <h6 className={classes.title}>WIRELESS</h6>
          <li onClick={() => sortProducts("airpod")}>Airpod</li>
          <li onClick={() => sortProducts("watch")}>Watch</li>
          <h6 className={classes.title}>OTHERS</h6>
          <li onClick={() => sortProducts("mouse")}>Mouse</li>
          <li onClick={() => sortProducts("keyboard")}>Keyboard</li>
          <li onClick={() => sortProducts("other")}>Others</li>
        </ul>
      </div>
      <CategoryProductList data={filteredProducts ?? productData} />
    </>
  );
};
export default React.memo(CategoryList);
