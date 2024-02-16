import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import Image from "../components/DetailPage/Image";
import classes from "../components/DetailPage.module.css";
import AddToCart from "../components/DetailPage/AddToCart";
import ProductItems from "../components/ProductItems";
import Loading from "../components/Loading";

const DetailPage = () => {
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [imgSrc, setImg] = useState(null);
  const params = useParams();
  const products = useSelector((state) => state.shop.products);

  useEffect(() => {
    //GET data from redux
    if (products.length !== 0) {
      const productArr = products.filter(
        (prod) => prod.id === params.productID
      );
      const relatedProd = products.filter(
        (prod) =>
          prod.category === productArr[0].category &&
          prod.id !== productArr[0].id
      );
      setProduct(productArr[0]);
      setRelatedProduct(relatedProd);
    } else {
      //No redux, GET data from Local Storage => For No error when RELOADING page
      const productsLS = JSON.parse(localStorage.getItem("productArray"));
      const productArr = productsLS.filter(
        (prod) => prod.id === params.productID
      );
      const relatedProd = productsLS.filter(
        (prod) =>
          prod.category === productArr[0].category &&
          prod.id !== productArr[0].id
      );
      setProduct(productArr[0]);
      setRelatedProduct(relatedProd);
    }
    // Smooth scrolling
    window.scrollTo({
      top: "100px",
      behavior: "smooth",
    });
  }, [params]);

  const priceNum = Number(product.price).toLocaleString("id-ID");
  //Long Desc
  //Break description into lines
  const breakLine = (product) => {
    const longDesc = product.long_desc.split("\n");
    return longDesc;
  };
  return (
    <>
      {product && (
        <div className={classes.detailpage}>
          <div className={classes.detailContainer}>
            <div className={classes.imgContainer}>
              <img
                src={product.img1}
                alt="product-img"
                onClick={() => {
                  setImg(product.img1);
                }}
              />
              <img
                src={product.img2}
                alt="product-img"
                onClick={() => {
                  setImg(product.img2);
                }}
              />
              <img
                src={product.img3}
                alt="product-img"
                onClick={() => {
                  setImg(product.img3);
                }}
              />
              <img
                src={product.img4}
                alt="product-img"
                onClick={() => {
                  setImg(product.img4);
                }}
              />
            </div>
            <div>
              {!imgSrc && <img src={product.img1} alt="product-img" />}
              {imgSrc && <Image src={imgSrc} />}
            </div>
            <div>
              <h1>{product.name}</h1>
              <h2>{priceNum} VND</h2>
              <p>{product.short_desc}</p>
              <h6>
                CATEGORY:
                <span
                  style={{
                    display: "inline-block",
                    color: "grey",
                    marginLeft: "8px",
                    marginBottom: "16px",
                  }}
                >
                  {product.category}s
                </span>
              </h6>
              <AddToCart product={product} />
            </div>
          </div>
          <div className={classes.description}>
            <button style={{ cursor: "default" }}>DESCRIPTION</button>
            <h3>PRODUCT DESCRIPTION</h3>
            <div>
              {product.long_desc &&
                breakLine(product).map((des, i) => <p key={i}>{des}</p>)}
            </div>
            <div className={classes.relatedProd}>
              <h3>RELATED PRODUCTS</h3>
              {relatedProduct.length === 0 && (
                <div
                  style={{
                    textAlign: "center",
                    marginTop: "48px",
                    color: "purple",
                    fontSize: "18px",
                    fontWeight: "450",
                  }}
                >
                  No related products found! The product above is one of a kind!
                  😍
                </div>
              )}
              <div className={classes.prodContainer}>
                {relatedProduct.length > 0 &&
                  relatedProduct.map((prod) => {
                    return (
                      <ProductItems
                        id={prod.id}
                        img1={prod.img1}
                        name={prod.name}
                        price={prod.price}
                        page="category"
                        key={Math.random()}
                      />
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default DetailPage;
