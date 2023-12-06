/* eslint-disable no-undef */
/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    coveragePathIgnorePatterns: [
        '/node_modules/'
    ],
    'globals': {
        'ts-jest': {
            'babelConfig': false
        }
    }
};