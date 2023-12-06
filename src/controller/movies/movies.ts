import Movie from '../../service/movies/movies';

export const getAllMovies = async (_req: any, res: any) => {
    try {
        const service = new Movie();
        const result = await service.fetchAllMovies();

        return res.status(200).json(result);
    } catch (error) {

        return res.status(500).send(error);
    }
};

export const postNewMovie = async (req: any, res: any) => {
    try {
        const service = new Movie();
        const newMovie = req.body;

        if (newMovie === null || newMovie === undefined) {
            return res.status(400).json('Missing required inputs');
        }

        await service.addNewMovie(newMovie);

        return res.status(201).json({ status: 'CREATED' });
    } catch (error) {
        return res.status(500).send(error);
    }
};

export const searchMovie = async (req: any, res: any) => {
    try {
        const query = req.query?.q;
        const service = new Movie();
        const result = await service.queryMovie(query);

        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).send(error);
    }
};

export const updateMovieData = async (req: any, res: any) => {
    try {
        const id = req.params?.id;
        const data = req.body;
        const role = req.headers?.role;

        if (role !== 'admin') {
            return res.status(400).json('you are not authorized to perform this');
        }

        if (data === null || data === undefined) {
            return res.status(400).json('bad request');
        }

        const service = new Movie();
        await service.updateMovie(id, data);

        return res.status(200).json({ status: 'UPDATED' });
    } catch (error) {
        return res.status(500).send(error);
    }
};

export const deleteMovieData = async (req: any, res: any) => {
    try {
        const id = req.params?.id;
        const role = req.headers;

        if (role !== 'admin') {
            return res.status(400).json('you are not authorized to perform this');
        }

        const service = new Movie();
        await service.deleteMovie(id);

        return res.status(200).json({ status: 'DELETED' });
    } catch (error) {
        return res.status(500).send(error);
    }
};

