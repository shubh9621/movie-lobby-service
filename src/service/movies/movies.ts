import { MovieModel } from '../../model';

export default class Movie {
    public async fetchAllMovies(): Promise<any> {
        try {
            const allMovies = await MovieModel.find();

            return allMovies;
        } catch (error) {
            console.error(error);

            throw error;
        }
    }

    public async addNewMovie(movie: { title: any; rating: any; genre: any; link: any; }): Promise<any> {
        try{
            const { title, rating, genre, link } = movie;
            const newMovie = new MovieModel({
                title,
                rating,
                genre,
                link,
            });

            await newMovie.save();
        } catch(error) {
            console.error(error);

            throw error;
        }
    }

    public async queryMovie(query = ''): Promise<any> {
        try {
            const prasedQuery = JSON.parse(query);
            const { title, genre } = prasedQuery;
            const movie = await MovieModel.find({ $or : [{ title }, { genre }]});

            return movie;
        } catch (error) {
            console.error(error);

            throw error;
        }
    }

    public async updateMovie(id: string, data: {title: string, rating: number, genre: string ,link: string }): Promise<any> {
        try {
            const { title, rating, genre, link } = data;

            await MovieModel.findByIdAndUpdate(id, { title, rating, genre, link});
        } catch (error) {
            console.error(error);

            throw error;
        }
    }

    public async deleteMovie(id: string): Promise<any> {
        try {
            await MovieModel.findByIdAndDelete(id);
        } catch (error) {
            console.error(error);

            throw error;
        }
    }
}