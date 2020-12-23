import { Button, Container } from "@material-ui/core"
import { Alert } from "@material-ui/lab"
import React, { useEffect, useState } from "react"
import { inventoryAction } from '../../redux/inventory/action'
import { useDispatch as i_useDispatch, useSelector as i_useSelector } from '../../redux/inventory/inventory'
import { Snackbars } from '../component/snackbar'
import { ProductSelect } from "../product/productselect"
import { VaraintForm } from './component/varaintform'

export function CreateInventory(props){
    const [variants, setVariants] = useState({variant:[{}]}) //intial value of variant 
    const [selectedProduct, setselectedProduct] = useState(null)
    const [makeSubmitAsPageRefresh, setMakeSubmitAsPageRefresh] = useState(0)
    const inventoryDispatch=i_useDispatch() //this dispatch is related with custom inventory context
    
    useEffect(() => {
        makeSubmitAsPageRefresh && makeSubmit() && setMakeSubmitAsPageRefresh(0)
    }, [makeSubmitAsPageRefresh])
    
    const setsubmit=React.createRef()

    const inventory=i_useSelector((s)=>{
        return{
            create_loading:s.create.create_loading,
            create_load_successful:s.create.create_load_successful,
            create_data:s.create.create_data
        }
    })

    async function submit(){
        await setsubmit.current.click()
        makeSubmit()
        setMakeSubmitAsPageRefresh(1)
    }
    
    function makeSubmit(){
            selectedProduct && variants.variant[0].rate && inventoryDispatch(
            inventoryAction.createInventory({
                'product':selectedProduct.selectedProduct.id,
                ...variants
            }) 
        )    
        return 1
    }

    return(
        <>
        <br/>
        <Container>
            <Alert severity='info' variant='outlined'  fullWidth>
                Select a product to add in inventory
            </Alert>
        </Container>
        <ProductSelect  selectedProduct={selectedProduct} setSelectedProduct={setselectedProduct} />
        <br/>
        <Container>
        {
            selectedProduct &&
            <> 
            <VaraintForm variants={variants} setsubmit={setsubmit} setvariants={setVariants} />
            <br/>
            {
            <Button variant='outlined' disabled={inventory.create_loading} onClick={submit} color='primary' fullWidth dense type='submit'>
                Add Inventory
            </Button>
            }
            </>
        } 
        {   
            inventory.create_load_successful &&
            <Snackbars message='Inventory Added successfuly'/>
        }         
        </Container>

        
        </>
    )
}