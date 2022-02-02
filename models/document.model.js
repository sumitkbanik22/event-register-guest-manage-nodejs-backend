const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DocumentSchema = new Schema({

    eventId : {
        type: Schema.Types.ObjectId,
        required: true
    },
    fileName : {
        type: String,
        required: true
    },
    eventOwner : {
        type: Object,
        required: true
    }

});

const Document = mongoose.model('Document', DocumentSchema);

exports.Document = Document;