import { Router as expressRouter, Router } from 'express';
import { getAllMovies, postNewMovie, updateMovieData, searchMovie, deleteMovieData } from '../controller';
import { endPoints } from '../constant';

const router = expressRouter();

export default class Routes {
    public static initialize(): Router {
        router.get(endPoints.ALL_MOVIES, getAllMovies);
        router.get(endPoints.GET_SEARCHED_MOVIE, searchMovie);
        router.post(endPoints.ALL_MOVIES, postNewMovie);
        router.put(endPoints.UPDATE_DELETE_MOVIE, updateMovieData);
        router.delete(endPoints.UPDATE_DELETE_MOVIE, deleteMovieData);

        return router;
    }
}