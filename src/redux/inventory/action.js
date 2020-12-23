export const inventoryAction={

    getInventoryList:(filters={})=>{
        return {
            type:"GET_LIST",
            filters:filters 
            //filter must an object this will append to url as query parameters
        }
    },
    createInventory:(inventory)=>{
        return {
            type:"CREATE_INVENTORY",
            inventory:inventory
            
            //filter must an object this will append to url as query parameters
        }
    },
    deleteInventory:(id)=>{
        return {
            type: 'DELETE_INVENTORY',
            id:id
        }
    }
}