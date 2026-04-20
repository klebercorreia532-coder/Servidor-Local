export default {
    preset: 'ts-jest/presets/default-esm',
    testEnvironment: 'node',
    extensionsToTreatAsEsm: ['.ts'],
    transform: {
        '^.+\\.ts$': [
            'ts-jest', 
            {
            UseESM: 'true',
            },
        ],
    },
    moduleNameMapper:{
        "^(\\.{1,2}/.*)\\.js$": "$1",
},
}