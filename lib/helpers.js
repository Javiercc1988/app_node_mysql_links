const helpers = {};
const bcrypt = require("bcryptjs");
const pool = require("../database");



helpers.encryptPassword = async(password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
};

helpers.matchPassword = async(password, savePassword) => {
    try{
        return await bcrypt.compare(password, savePassword);
    }catch (e){
        console.log(e);
    };
};


helpers.existeUsuario = async(username) => {
    const result = await pool.query("SELECT * FROM users WHERE username = ?", [username])
    console.log(result)

    let existe = false;

    if(result.length > 0) {
        existe = true
    } else {
        existe = false
    }
    return existe
};



module.exports = helpers;