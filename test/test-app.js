//set up the server
const express = require( "express" );
const logger = require("morgan");
const app = express();
const port = 8080;
const db = require('../db/db_connection');

// Configure Express to use EJS
app.set( "views",  __dirname + "/views");
app.set( "view engine", "ejs" );

// define middleware that logs all incoming requests
app.use(logger("dev"));

// define middleware that serves static resources in the public directory
app.use(express.static(__dirname + '/public'));

// define a route for the default home page
app.get( "/", ( req, res ) => {
    res.render("details");
} );

// define a route for the inventory page
app.get( "/inventory", ( req, res ) => {
    res.render("details");
} );

// define a route for the item detail page
const read_assignment_sql = `
    SELECT 
        *
    FROM
        Item
`
app.get( "/inventory/details/", ( req, res ) => {
    db.execute(read_assignment_sql, (error, results) => {
        if (error)
            res.status(500).send(error); //Internal Server Error
        else {
            res.render('details', {data : results});
        }
    });
});


// start the server
app.listen( port, () => {
    console.log(`App server listening on ${ port }. (Go to http://localhost:${ port })` );
} );