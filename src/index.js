const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello  Eng.Ahmed');
});
// main router is /
app.get('/about',(req,res)=>{
    res.send('This is the about page');
});
app.listen(port, () => {
  console.log(`mawid is running on http://localhost:${port}`);
});
