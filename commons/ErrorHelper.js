let error = (ec,detail,req)=>{
    return {
        ec: ec,
        ms: !!req.__ ? req.__(ec) : ec,
        detail: detail
    }
}
module.exports = {
    error
}