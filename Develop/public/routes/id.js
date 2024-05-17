const id = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const {
    readFromFile,
    readAndAppend,
    WriteToFile,
} = require('helpers/fsUtils');
const uuid = require('../../../../01-Activities/21-Ins_Modular-Routing/02_Modularized/helpers/uuid');

id.get('/', (req, res) => {
    readFromFile('./api/notes/db.json').then((data) => res.json(JSON.parse(data)));
});

id.get('/:uuid', (req, res) => {
    const idUUID = req.params.uuid;
    readFromFile('./api/notes/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
        const result = json.filter((ids) => ids.uuid === idUUID);
        return result.length > 0
        ? res.JSON(result)
        : res.JSON('No note with that ID');
    });
});


module.exports = id;