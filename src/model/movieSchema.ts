import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        rating: Number,
        genre: String,
        link: String
    }
);

const MovieModel = mongoose.model('movies', movieSchema);

export {
    MovieModel
};

