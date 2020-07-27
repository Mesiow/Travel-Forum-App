if(process.env.NODE_ENV !== "production"){
    require("dotenv").config();
}

module.exports = {
    mongoDBAtlas_password: process.env.mongoDBAtlas_password
}