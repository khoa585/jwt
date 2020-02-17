let {UsersDB,UsersField} = require('./../../databases/users');
let login = async (data)=>{
    let resultLogin = await UsersDB.findOne({
        where:{
            [UsersField.UserName]:data.username,
            [UsersField.Password]:data.password
        },
        attributes: { exclude: [UsersField.Password,UsersField.NotesAdmin]},
        raw:true
    })
    return resultLogin ;
}
module.exports = {
    login
}
