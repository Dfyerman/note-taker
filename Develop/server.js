const express = require('express');
const path =  require('path');
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.static('public'));

app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/index.html'))
);

app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/notes.html'))
);

app.get('/api/notes', (req, res) =>
    res.sendFile(path.join(__dirname, 'api/notes/db.json'))
);

app.post('/api/notes', (req, res) =>
    res.sendFile(path.join(__dirname, 'api/notes/db.json'))
);  



app.listen(PORT, () =>
    console.log(`App Listening at http://localhost:${PORT}`)
);

