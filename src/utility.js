
export function toMultipart(obj){
    this.obj=obj;
    this.counter=0;
    this.formdata=new FormData();
    this.replacer=(key,value)=>{
        if(value===undefined || value===null )
            return value
            
        if(value.toString().search('FileList')!==-1){
            let files=[]
            for(var i=0;i<value.length;i++){
                files.push(value[i])
            }
            return files
        }else if(value.toString().search('File')!==-1){
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

export function Url(url){
    this.url=url;
    this.path=''
    this.search={}
    this.hash=null
    {
        const h=this.url.split('#')
            if(h.length>1){
                this.hash=h[1]
                this.url=h[0]
            }
        const a=this.url.split('?')
        this.path=a[0]
        if(a.length >1){
            let b=a[1].split('&')
            b.forEach(e => {
                if(e!=''){
                    const [c,d]=e.split('=')
                    this.search[c]=d
                }
            });
        }
    }
    this.add=(key,value)=>{

        this.search[key]=value
        return this
    }
    this.remove=(key)=>{
        delete this.search[key]
        return this
    }
    this.addHash=(hash)=>{
        this.hash=hash
    }
    this.removeHash=()=>{
        this.hash=null
    }
    this.url=()=>{
        var s=''
        for(let i in this.search){
            s+=i+'='+this.search[i]+'&'
        }
        s=s.slice(0,-1)
        if(this.hash)
            s+=this.hash
        return this.path+'?'+s
        
    }
    this.getQueryParams=()=>{
        var s=''
        for(let i in this.search){
            s+=i+'='+this.search[i]+'&'
        }
        s=s.slice(0,-1)
        if(this.hash)
            s+=this.hash
        return '?'+s
        
    }
}