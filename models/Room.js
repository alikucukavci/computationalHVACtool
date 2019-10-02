const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = new Schema({
    name: String,
    number: Number,
    area: Number,
    volume: Number,
    width: Number,
    height: Number,
    depth: Number,
    posX: Number,
    posY: Number,
    posZ: Number,
    airflow: Number,
    AHU: Number,
});

const Room = mongoose.model('Room', roomSchema);
module.exports = Room;
