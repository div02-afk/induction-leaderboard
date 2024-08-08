const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;
app.use(cors());
app.use(express.json());


app.post('/', (req, res) => {
    console.log(req.body);
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});