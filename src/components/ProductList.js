import React, { useEffect, useState } from "react";
import classes from "./Banner.module.css";
import ProductItems from "./ProductItems";
import Loading from "./Loading";
import { useSelector } from "react-redux";

const ProductList = () => {
  //Get data from Redux
  const productData = useSelector((state) => state.shop.products);

  return (
    <div className={classes.productList}>
      <div className={classes.headingContainer} id={classes.trend}>
        <div className={classes.text}>Made the hard way</div>
        <h2 className={classes.heading}>Top trending products</h2>
      </div>
      <div className={classes.productContainer}>
        {productData.length !== 0 &&
          productData.map((prod) => {
            return (
              <ProductItems
                page="home"
                key={Math.random()}
                id={prod.id}
                img1={prod.img1}
                name={prod.name}
                price={prod.price}
                category={prod.category}
                shortDesc={prod.short_desc}
                longDesc={prod.long_desc}
              />
            );
          })}
      </div>
    </div>
  );
};
export default React.memo(ProductList);
