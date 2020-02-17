let json = (req,res,error,data,numberOfResult)=>{
    if(error){
        return res.json({
            error:error
        })
    }
    else {
        if(numberOfResult){
            return res.json({
                error:null,
                data:data,
                numberOfResult:numberOfResult
            })
        }
        return res.json({
            error: null, 
            data: (data)
        })
    }

}
module.exports= {
    json
}