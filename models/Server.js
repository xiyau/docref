const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const ServerSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    fqdn:{
        type: String,
        required: true
    },
    ip:{
        type: String,
        required: true
    },
    status:{
        type: String,
        default: 'online'
    },
    changeLog:[{
        changeName:{
            type: String
        },
        changetDate:{
            type: Date,
            default: Date.now
        },
        changeUser:{
            type: Schema.Types.ObjectId,
            ref:'users'
        }
    }],
    user:{
        type: Schema.Types.ObjectId,
        ref:'users'
    },
    date:{
        type: Date,
        default: Date.now
    },
    location: {
        type: String
    },
    //services: [{
    //    serviceName: String
    //}],
    loginCredentials: String,
    description: String,
    issues: [{
        name: String,
        status: String,
        Action: String,
        Date: {
            type: Date,
            default: Date.now
        }
    }]

});

//Create collection and add schema
mongoose.model('servers', ServerSchema, 'servers');