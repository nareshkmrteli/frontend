import { Avatar, Container, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, TextField, Typography } from '@material-ui/core';
import { ExpandMoreOutlined } from '@material-ui/icons';
import React from "react";

export  function SelectedProduct({selectedProduct,onClick}){
    function onclick(e){
        onClick && onClick(selectedProduct)
    }
    return(
        <Container>      
            {
            selectedProduct && typeof(selectedProduct)=='object' &&
            <List disablePadding dense style={{border:'#c3c3c3 1px solid',borderRadius:"5px",marginTop:"10px"}}>
                <ListItem alignItems="flex-start" id={selectedProduct.id} onClick={onclick} >
                    <ListItemAvatar>
                    <Avatar variant='rounded' sizes='400px' alt="Remy Sharp" src={selectedProduct.productimg || selectedProduct.product_img} />
                    </ListItemAvatar>
                    <ListItemText
                    primary={selectedProduct.name || selectedProduct.product_name}
                    secondary={
                        <Typography
                            component="span"
                            variant="body2"
                            color="textPrimary"
                        >
                        {selectedProduct.description}
                        </Typography>
                    }
                    />
                    {
                    <ListItemSecondaryAction>
                            <ExpandMoreOutlined/>
                    </ListItemSecondaryAction>
                    }
                </ListItem>
            </List>
            }
            {
            selectedProduct && typeof(selectedProduct)=='string' &&
            <TextField 
                value={selectedProduct}
                name='seletedProduct'
                placeholder='Product Id'
                id={selectedProduct.id} 
                onClick={onclick}
            />

            }
        </Container>
    );
}