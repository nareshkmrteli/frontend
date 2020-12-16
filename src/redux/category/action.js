export const categoryAction={

    getCategoryList:(filters={})=>{
        return {
            type:"GET_LIST",
            filters:filters 
            //filter must an object this will append to url as query parameters
        }
    },
    getProductList:(filters={})=>{
        return {
            type:"GET_PRODUCT_LIST",
            product_filters:filters 
            //filter must an object this will append to url as query parameters
        }
    }
}