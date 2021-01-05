import React, { useState } from 'react'
/*
    show image from File instance
*/
export function ShowImage({file}){  
    const [src, setSrc] = useState('')

    if(file.toString().search('File')==-1)
        return ''
    const reader= new FileReader()
    
    reader.addEventListener('load',()=>{
        setSrc(reader.result)
    })
    reader.readAsDataURL(file)
    return (
        <img style={{width:'100%'}} src={src} />
    )

}