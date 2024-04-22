const express = require('express');
const app = express();
const PORT = 5050

app.listen(PORT, (err) =>{
    !err ? 
    console.log(`listening on port ${PORT}`) : 
    console.error(`error listening on port ${PORT}: ${err}`);
})