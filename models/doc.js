//Create Schema
const DocSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    body:{
        type: String,
        required: true
    },
    status:{
        type: String,
        default: 'public'
    },
    allowComments:{
        type: Boolean,
        default: true
    },
    comments:[{
        commentBody:{
            type: String
        },
        commentDate:{
            type: Date,
            default: Date.now
        },
        commentUser:{
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
    }

});

//Create collection and add schema
mongoose.model('docs', DocSchema, 'docs');