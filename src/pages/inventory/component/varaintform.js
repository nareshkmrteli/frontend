import { Button, Card, CardContent, Container, Grid,Paper} from '@material-ui/core'
import {TextField} from 'final-form-material-ui'
import { ConfirmationNumber } from '@material-ui/icons'
import React from 'react'
import {Form,Field} from 'react-final-form'
import arrayMutators from 'final-form-arrays'
import { FieldArray } from 'react-final-form-arrays'
import {PlaylistAdd,DeleteOutline} from '@material-ui/icons';
export function VaraintForm({variants,setvariants,setsubmit}){
    
    function onSubmit(values){
        console.log(values)
        setvariants(values)
    }
    function validate(values){
    }

    return(
        <>
            <Form
                onSubmit={onSubmit}
                validate={validate}
                initialValues={variants}
                mutators={{
                    ...arrayMutators
                  }}
                render={({handleSubmit,form: {mutators: { push, pop }},form,submitting,values})=>(
                    <form id='jh7sdf98fd87sd98f798sdf87'  onSubmit={handleSubmit}>
                        <FieldArray name='variant'>
                        {({fields})=>(
                            fields.map((name,index)=>(
                            <Card key={index}>
                            <CardContent>
                            <Grid container alignItems='flex-start' spacing={2}>
                            <Grid item xs={6}>
                            <Field name={`${name}.rate`} fullWidth={true} label='Rate' required type='number'  component={TextField} />
                            </Grid>
                            <Grid item xs={6} >
                            <Field name={`${name}.qty`} fullWidth={true} label='quantitty' required type='number' component={TextField} />
                            </Grid>
                            </Grid>
                            <FieldArray name={`${name}.attributes`}>
                            {({ fields }) =>(
                                fields.map((name, index) => (
                                    <>
                                    <Grid container alignItems="flex-start" spacing={2}>
                                    <Grid item xs={6}>
                                    <Field
                                    required
                                    name={`${name}.key`}
                                    component={TextField}
                                    placeholder="Title"
                                    />
                                    </Grid>
                                    <Grid item xs={5}>
                                    <Field
                                    required
                                    name={`${name}.value`}
                                    component={TextField}
                                    placeholder="Content"
                                    />
                                    </Grid>
                                    <Grid item xs={1}>
                                    <span
                                    onClick={() => fields.remove(index)}
                                    style={{ cursor: 'pointer' }}
                                    >
                                    <DeleteOutline/>
                                    </span>
                                    </Grid>
                                    </Grid>
                                    
                                    </>
                                ))
                            )}
                            </FieldArray>
                            <PlaylistAdd onClick={()=>push(`${name}.attributes`,undefined)} />
                            </CardContent>
                            </Card>
                            ))
                        )
                        }
                       
                        </FieldArray> 
                        <button type='submit' ref={setsubmit} hidden>
                            submit
                        </button> 
                    </form>
                )}
            />

        </>
    )
}