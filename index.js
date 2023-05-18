const express = require('express');
const app = express();
const port = 3000

app.get('/', function(request, response){
    response.sendFile("D:\\Projects\\license_thesis\\geolocation-api\\index.html");
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})