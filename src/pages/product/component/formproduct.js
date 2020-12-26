import { Avatar, Button, Card, CardContent, Container, FormControl, Grid, InputLabel, Select } from '@material-ui/core'
import { DeleteOutline, Image, PlaylistAdd } from '@material-ui/icons'
import arrayMutators from 'final-form-arrays'
import { TextField } from 'final-form-material-ui'
import React, { useEffect, useState } from 'react'
import { Field, Form } from 'react-final-form'
import { FieldArray } from 'react-final-form-arrays'
import { productAction } from 'redux/product/action'
import { useDispatch, useSelector } from 'redux/product/product'
import { categoryAction } from '../../../redux/category/action'
import { useDispatch as categoryDispatch, useSelector as categorySelector } from '../../../redux/category/category'
import { Snackbars } from '../../component/snackbar'


export function FormProduct({edit=false,intial}){
    
    //a copy of intial so can intailise the form, if useEffect hook its too late,
    // hooks is called after render method ready
    //if upadte in function due to multiple time of rendering assign data get undefined 
    //ex.
    // preview=intial && intial.produtimg
    // intial.productimg=undefined
    // on first call it set the preview but on second call preview get undefined so maked copy variable now no sideeffect of call 
    const copyIntial={...intial,productimg:undefined}

    //disable button during submiting the form
    const [disabledButton, setDisabledButton] = useState(false)
    const [imgPreview, setImgPreview] = useState(intial && intial.productimg)
    
    //getting dispatcher to create or update the data,saga as middleware to handle server request  root/redux/product
    const productDispatch=useDispatch()
    const create=useSelector((state)=>{ return state.create})
    const update=useSelector((state)=>{ return state.update})
    
    //fetch categories 
    const categorydispatch=categoryDispatch()
    const category=categorySelector((state)=>{return state.list})
    
    //display image as its selected by user
    const reader= new FileReader()
    reader.addEventListener('load',(e)=>{setImgPreview(reader.result)})

    //dispath action to fetch category
    useEffect(() => {
       
        categorydispatch(categoryAction.getCategoryList())
    }, [intial])

    useEffect(() => {
        create.create_loading || setDisabledButton(false)
    },[create.create_loading])

    useEffect(() => {
        update.update_loading || setDisabledButton(false)
    },[update.update_loading])

    function onSumbit(values){
        setDisabledButton(true)
        productDispatch(edit? productAction.updateProduct(values):productAction.createProduct(values))    
        
    }
    
    function validate(values){
        window.my=values
        values.productimg && values.productimg.toString().search('File')!=-1 && reader.readAsDataURL(values.productimg)
    }
    return(
        <Form
            onSubmit={onSumbit}
            validate={validate}
            initialValues={copyIntial || {"attribute":[{}]}}
            mutators={{...arrayMutators}}
            render={({handleSubmit,form,submitting,values,form:{mutators:{push,pop}}})=>{return     (
                <Container>
                <br/>
                <br/>
                <form onSubmit={handleSubmit}>
                    <Card>
                    <CardContent>
                    <Field name='id' hidden component='input' />
                    <Field name='category' options={(category.list_data && [{},...category.list_data.results]) ||[{}]} >
                        {({input,meta,options})=>(
                            <FormControl required fullWidth placeholder={input.name}>
                            <InputLabel htmlFor="category-native">{input.name}</InputLabel>
                            <Select native {...input}  onChange={input.onChange}>
                                {
                                options.map((option)=>(
                                    <option value={option.id}>{option.name}</option>
                                ))
                                }
                            </Select>
                            </FormControl>
                        )}
                    </Field>
                    <Field name='name' fullWidth={true} placeholder='Name' required component={TextField} />
                    <Field name='description' multiline={true} placeholder='Description' required fullWidth={true} component={TextField} />
                    
                    <FieldArray name='attribute' >
                        {({fields})=>(
                            fields.map((name,index)=>(
                                <Grid container xs>
                                    <Grid item xs={6}>
                                        <Field 
                                            name={`${name}.name`}
                                            component={TextField}
                                            required
                                            placeholder='Name'
                                        />
                                    </Grid>
                                    <Grid item xs={5}>
                                        <Field 
                                            name={`${name}.value`}
                                            component={TextField}
                                            required
                                            placeholder='Value'
                                        />
                                    </Grid>
                                    <Grid xs={1}>
                                        <span 
                                            onClick={()=>fields.remove(index)}
                                            style={{cursor:'pointer'}}
                                        >
                                            <DeleteOutline/>
                                        </span>
                                    </Grid>
                                </Grid>
                            ))
                        )}
                    </FieldArray>
                    <PlaylistAdd onClick={()=>{push(`attribute`,undefined)}} />
                    </CardContent>
                    </Card>
                    <br/>
                    
                    <Button  variant='outlined' color={values.productimg?'#66bb6a':'#66bb6a'}  >
                        <Avatar src={imgPreview} variant='square' component='span' >
                            <Image/>
                        </Avatar>
                        <Field type='file' name='productimg'>
                            {(props)=>{
                                return <input value='' style={{opacity:'0',position:'fixed',overflow:'hidden',width:'40px'}} type='file' name={props.input.name} onChange={(e)=>(props.input.onChange(e.target.files && e.target.files[0] ))} />
                                }
                            }
                        </Field>
                    </Button>
                    <br/>
                    <br/>
                    <Button type='submit' variant='outlined' fullWidth color='primary' disabled={disabledButton}>
                        {edit?'Update Product':'Add Product'}
                    </Button>
                </form>      
                <Snackbars message={ (create.create_load_successful ?`Product ${edit?'updated':'added'} Successfully`: `Product ${edit?'updation':'addition'} fail`) } visible={create.create_load_successful} />      
                </Container>
            )}}
        />
       
    )

}