export function toMultipart(obj){
    this.obj=obj;
    this.counter=0;
    this.formdata=new FormData();
    this.replacer=(key,value)=>{
        if(value==undefined)
            return value
            
        if(value.toString().search('FileList')!=-1){
            let files=[]
            for(var i=0;i<value.length;i++){
                files.push(value[i])
            }
            return files
        }else if(value.toString().search('File')!=-1){
            const file_id='file_id_'+this.counter++;
            this.formdata.append(file_id,value)
            return file_id
        }
        return value
    }
    this.run=()=>{
        const json=JSON.stringify(this.obj,this.replacer)
        this.formdata.append('json',json)
        return this.formdata
    }
}