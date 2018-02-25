const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const sortReadsDesc = (a, b) => {
//     return b.receivedAt - a.receivedAt;
// };

const LocationSchema = new Schema({
    latitude: {type: String, defaut: null},
    longitude: {type: String, defaut: null},
    name: {type: String, defaut: null},
});

const ParameterSchema = new Schema({
    temperatureMin: String,
    temperatureMax: String,
    humidityMin: String,
    humidityMax: String,
    luminosityMin: String,
    luminosityMax: String,
    refreshRate: Number,
    lightState: Number,
    airState: Number,
  });

const ReadSchema = new Schema({
    temperature: String,
    humidity: String,
    luminosity: String,
    led_state: String,
    battery: String,
    date: { type: Date, default: Date.now }
});

const BoardSchema = new Schema({
  name: { type: String, default: "Zolertia" },
  division: { type: String, default: "Home" },
  boardId: Number,
  users: [{ type: Schema.ObjectId, ref: 'User' }],
  imageURL: {type: String, default: ""},
  lastRead: { type: Date, default: null },
  location: {LocationSchema},
  parameters: { type: ParameterSchema, default: ParameterSchema },
  reads: [ReadSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: null }
});


BoardSchema.method('update', function(updates, callback) {
    Object.assign(this, updates, { updatedAt: new Date() });
    this.parent().save(callback);
});


const Board = mongoose.model('Board', BoardSchema);

module.exports.Board = Board;