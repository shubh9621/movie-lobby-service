import {  getMockRes, getMockReq } from '@jest-mock/express';
import { ALL_MOVIES } from '../../../spec/data';
import Movie from '../../service/movies/movies';
import { getAllMovies, postNewMovie, searchMovie, updateMovieData } from './movies';

describe('Movies controller tests', () => {
    let fetchAllMoviesSpy: any, addNewMovieSpy: any, queryMovieSpy: any, updateMovieSpy: any;

    beforeAll(() => {
        fetchAllMoviesSpy = jest.spyOn(Movie.prototype, 'fetchAllMovies');
        addNewMovieSpy = jest.spyOn(Movie.prototype, 'addNewMovie');
        queryMovieSpy = jest.spyOn(Movie.prototype, 'queryMovie');
        updateMovieSpy = jest.spyOn(Movie.prototype, 'updateMovie');
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });

    test('should get all movies', (done) => {
        const { res } = getMockRes();

        fetchAllMoviesSpy.mockImplementation(async () => Promise.resolve(ALL_MOVIES));
        
        getAllMovies({ params: {}, header: {}, query: {}}, res).then(() => {
            expect(res.status).toHaveBeenCalledTimes(1);
            expect(res.json).toHaveBeenCalledWith(ALL_MOVIES);
            expect(res.status).toHaveBeenCalledWith(200);
            done();
        });
    });

    test('should get no movies', (done) => {
        const { res } = getMockRes();

        fetchAllMoviesSpy.mockImplementation(async () => Promise.resolve([]));
        
        getAllMovies({ params: {}, header: {}, query: {}}, res).then(() => {
            expect(res.status).toHaveBeenCalledTimes(1);
            expect(res.json).toHaveBeenCalledWith([]);
            expect(res.status).toHaveBeenCalledWith(200);
            done();
        });
    });

    test('should catch an error when there is failure', (done) => {
        const { res } = getMockRes();

        fetchAllMoviesSpy.mockImplementation(async () => Promise.reject(new Error('Something went wrong')));
        
        getAllMovies({ params: {}, header: {}, query: {}}, res).then(() => {
            expect(res.status).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(500);
            done();
        });
    });

    test('should be able to add new movie', (done) => {
        const { res } = getMockRes();
        const req = getMockReq({ body: { title: 'new movie', rating: 4, genre: 'horror', link: 'some fishy link' } });

        addNewMovieSpy.mockImplementation(async () => Promise.resolve());
        
        postNewMovie(req, res).then(() => {
            expect(res.status).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(201);
            done();
        });
    });

    test('should return an error when request body is null', (done) => {
        const { res } = getMockRes();
        const req = getMockReq({ body: null });
        
        postNewMovie(req, res).then(() => {
            expect(res.status).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(400);
            done();
        });
    });

    test('should return an error when there is an error from the service', (done) => {
        const { res } = getMockRes();
        const req = getMockReq({ body: { title: 'new movie', rating: 4, genre: 'horror', link: 'some fishy link' } });

        addNewMovieSpy.mockImplementation(async () => Promise.reject(new Error('Something went wrong')));
        
        postNewMovie(req, res).then(() => {
            expect(res.status).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(500);
            done();
        });
    });

    test('should be able to search a movie', (done) => {
        const { res } = getMockRes();
        // eslint-disable-next-line quotes
        const req = getMockReq({ query: { q : "{ 'title': 'some title' , 'genre': 'fishy grenre' }"}});

        queryMovieSpy.mockImplementation(async () => Promise.resolve(ALL_MOVIES[0]));
        
        searchMovie(req, res).then(() => {
            expect(res.status).toHaveBeenCalledTimes(1);
            expect(res.json).toHaveBeenCalledWith(ALL_MOVIES[0]);
            expect(res.status).toHaveBeenCalledWith(200);
            done();
        });
    });

    test('should be able to catch an error while searching movie', (done) => {
        const { res } = getMockRes();
        // eslint-disable-next-line quotes
        const req = getMockReq({ query: { q : "{ 'title': 'some title' , 'genre': 'fishy grenre' }"}});

        queryMovieSpy.mockImplementation(async () => Promise.reject(new Error('something went wrong')));
        
        searchMovie(req, res).then(() => {
            expect(res.status).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(500);
            done();
        });
    });

    test('should be able update movie data', (done) => {
        const { res } = getMockRes();
        const req = getMockReq({ body: { 'title': 'change title' } , params: { id: 'best id' }, headers: { role: 'admin'}});

        updateMovieSpy.mockImplementation(async () => Promise.resolve());
        
        updateMovieData(req, res).then(() => {
            expect(res.status).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(200);
            done();
        });
    });

    test('should be able to catch an error when request body is empty', (done) => {
        const { res } = getMockRes();
        const req = getMockReq({ body: null });
        
        updateMovieData(req, res).then(() => {
            expect(res.status).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(400);
            done();
        });
    });
});