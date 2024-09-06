import { createContext, useState } from "react";

export const ProductContext = createContext(null)

function Product({children}){
    const [productDetails,setProductDetails] = useState(null)
    console.log(productDetails,'context');
    return (
        <ProductContext.Provider value={{productDetails,setProductDetails}}>
            {children}
        </ProductContext.Provider>
    )
}
export default Product