import { Button, Card, CardContent, Container, FormControl, Grid, InputLabel, Select } from '@material-ui/core'
import { DeleteOutline, PlaylistAdd } from '@material-ui/icons'
import arrayMutators from 'final-form-arrays'
import { TextField } from 'final-form-material-ui'
import React, { useState } from 'react'
import { Field, Form } from 'react-final-form'
import { FieldArray } from 'react-final-form-arrays'
import { productAction } from 'redux/product/action'
import { useDispatch } from 'redux/product/product'

export function FormProduct(props){
    const [disabledButton, setDisabledButton] = useState(false)
    const productDispatch=useDispatch()
    
    function onSumbit(values){
        //setDisabledButton(true)
        productDispatch(productAction.createProduct(values))
        
    }
    
    function validate(values){
                            
    }
    return(
        <Form
            onSubmit={onSumbit}
            validate={validate}
            initialValues={{"attribute":[{"name":"sdfsdf","value":"dfsd"}],"category":"1","name":"dsfsdf","description":"sdfsd"}}
            mutators={{...arrayMutators}}
            render={({handleSubmit,form,submitting,values,form:{mutators:{push,pop}}})=>{return     (
                <Container>
                <form onSubmit={handleSubmit}>
                    <Card>
                    <CardContent>
                    <Field type='file' name='productimg'>
                        {(props)=>{
                            return <input type='file' name={props.input.name} onChange={(e)=>(props.input.onChange(e.target.files))} />
                        }

                        }
                    </Field>
                    <Field name='category' options={[{key:'',value:''},{key:1,value:'hi'},{key:2,value:'bye'}]} >
                        {({input,meta,options})=>(
                            <FormControl required fullWidth placeholder={input.name}>
                            <InputLabel htmlFor="category-native">{input.name}</InputLabel>
                            <Select native {...input}  onChange={input.onChange}>
                                {
                                options.map((option)=>(
                                    <option value={option.key}>{option.value}</option>
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
                    <Button type='submit' variant='outlined' fullWidth color='primary' disabled={disabledButton}>
                        Add Product
                    </Button>
                </form>              
                </Container>
            )}}
        />
       
    )

}