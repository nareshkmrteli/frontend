import React, { useState } from 'react'

export function ShowImage({file}){
    const [src, setSrc] = useState('')
    const reader= new FileReader()
    
          reader.addEventListener('load',()=>{
            setSrc(reader.result)
        })
        reader.readAsDataURL(file)
  
    
    if(file.toString().search('File')==-1)
        return ''
    
    return (
        <img style={{width:'100%'}} src={src} />
    )

}