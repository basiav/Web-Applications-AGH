const mongoose = require('mongoose');
require('dotenv/config');

mongoose.Promise = global.Promise;

const connectionParams={
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
}

mongoose.connect(process.env.DB_CONNECTION, connectionParams)
    .then( () => {
        console.log('Has connected to the restaurant database.')
    })
    .catch( (err) => {
        console.error(`Error: while connecting to the database. \n${err}`);
    })

// mongoose.set('useCreateIndex', true);
// mongoose.set('useFindAndModify', false);

module.exports = {
    mongoose
};