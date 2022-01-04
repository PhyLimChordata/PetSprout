// CommonJS
const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    version: '1.0.0',
    title: 'PetSprout Documentation',
    description: 'Documentation for the PetSprout endpoints.',
  },
  host: 'localhost:5000',
  schemes: ['http'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/achievementRoute.js',
                        './routes/habitRoute.js',
                        './routes/petsRoute.js',
                        './routes/settingRoute.js',
                        './routes/userRoute.js'];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

// CommonJS
swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require('./server.js'); // Your project's root file
});