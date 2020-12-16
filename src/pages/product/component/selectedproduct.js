import React,{useState,useEffect} from "react"
import {List,ListItem,Divider,ListItemText,ListItemAvatar,Avatar,Typography,ListItemSecondaryAction,Paper, Button, Input, TextField, Container} from '@material-ui/core'
import {EditIcon,ExpandMoreOutlined} from '@material-ui/icons'

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
                    <Avatar variant='rounded' sizes='400px' alt="Remy Sharp" src={selectedProduct.productimg} />
                    </ListItemAvatar>
                    <ListItemText
                    primary={selectedProduct.name}
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