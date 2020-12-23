export function toMultipart(obj){
    this.obj=obj;
    this.counter=0;
    this.formdata=new FormData();
    this.replacer=(key,value)=>{
        if(value.toString().search('FileList')!=-1){
            for(var i=0;i<value.length;i++){
                const file_id='file_id_'+this.counter++;
                this.formdata.append(file_id,value[i])
                return file_id
            }
        }
        return value
    }
    this.run=()=>{
        const json=JSON.stringify(this.obj,this.replacer)
        this.formdata.append('json',json)
        return this.formdata
    }
}