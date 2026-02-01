import e from 'express';
import mongoose from 'mongoose';

const diarySchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    text:{
        type: String,
        required: true
    },
    mood:{
        type: String,
        enum:["😊", "😌", "😔", "😡", "✨"], 
        default:'neutral',
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

const Diary = mongoose.model('Diary',diarySchema);
export default Diary;