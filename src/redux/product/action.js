export const productAction={
    getProductList:(filters={})=>{
        return {
            type:"GET_LIST",
            filters:filters 
            //filter must an object this will append to url as query parameters
        }
    },
    createProduct:(product)=>{
        return {
            type:"CREATE_PRODUCT",
            product:product
            
            //filter must an object this will append to url as query parameters
        }
    },
    deleteProduct:(id)=>{
        return {
            type: 'DELETE_PRODUCT',
            id:id
        }
    }
}