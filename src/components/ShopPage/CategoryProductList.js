import React from "react";
import classes from "./ShopPage.module.css";
import ProductItems from "../ProductItems";
import Loading from "../Loading";
import Pagination from "./Pagination";

const CategoryProductList = ({ data }) => {
  const productData = data;

  return (
    <>
      <div className={classes.categoryProdContainer}>
        <div>
          <input placeholder="Enter Search Term" />
        </div>
        <div className={classes.sortButton}>
          {/* <select value={sortOrder} onChange={handleSort}> */}
          <select>
            <option value="default">Default Sorting</option>
            <option value="name">Name</option>
            <option value="price">Price</option>
          </select>
        </div>
        <div className={classes.productList}>
          <div className={classes.productContainer} key={Math.random()}>
            {/* {isLoading && <Loading />} */}
            {productData.length !== 0 &&
              productData.map((prod) => {
                return (
                  <ProductItems
                    page="category"
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
      </div>
      <Pagination pageNum={data.length} />
    </>
  );
};
export default CategoryProductList;
