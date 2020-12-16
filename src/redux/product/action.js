export const productAction={
    getProductList:(filters={})=>{
        return {
            type:"GET_LIST",
            filters:filters 
            //filter must an object this will append to url as query parameters
        }
    }
}