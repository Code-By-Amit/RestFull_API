const mongoose = require('mongoose')

 function connectToDB(url){
    mongoose.connect(url)
    .then(()=>{ console.log('🟢 Sucessfully Connected to MongoDB')})
    .catch((err)=>{ console.log('🔴 Failed to Connect to MongoDB. Error: ',err) })
}

module.exports =connectToDB