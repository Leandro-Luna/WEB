const express = require('express');
const app = express();
const morgan=require('morgan');

app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2) 

//Middleware
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//Routes
app.use(require('./routes/investmentRoutes'));

// Start the server only if not in a testing environment
if (process.env.NODE_ENV !== 'test') {
    app.listen(app.get('port'), () => {
      console.log(`Server listening on port ${app.get('port')}`);
    });
  }

module.exports = app