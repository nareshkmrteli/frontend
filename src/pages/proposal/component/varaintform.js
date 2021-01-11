import { Card, CardContent, Grid } from '@material-ui/core'
import { DeleteOutline, PlaylistAdd } from '@material-ui/icons'
import arrayMutators from 'final-form-arrays'
import { TextField } from 'final-form-material-ui'
import React from 'react'
import { Field, Form } from 'react-final-form'
import { FieldArray } from 'react-final-form-arrays'
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