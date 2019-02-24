// @TODO: DELETE ON PROD !!!!!!!!!
const express = require('express'),
    app = express(),
    path = require('path'),
    PORT = 5000,
    RELATIVE_ENTRY_PATH = '/dist/index.html';

app.listen(PORT, () => console.log('Server started at port:', PORT))
app.use(express.static('dist'))
app.get('*', (_req, res) => {
    res.sendFile(path.resolve(__dirname + RELATIVE_ENTRY_PATH));
});