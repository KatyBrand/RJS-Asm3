//Func to fetch data on first render
export const fetchData = async () => {
  const url =
    "https://firebasestorage.googleapis.com/v0/b/funix-subtitle.appspot.com/o/Boutique_products.json?alt=media&token=dc67a5ea-e3e0-479e-9eaf-5e01bcd09c74";
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Error loading products");
  } else {
    const resData = await response.json();
    //Only show first 8 products
    const data = resData.slice(0, 8);
    return data;
  }
};
