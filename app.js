//set up the server
const express = require( "express" );
const logger = require("morgan");
const app = express();
const port = 8080;
const db = require('./db/db_connection');

// Configure Express to use EJS
app.set( "views",  __dirname + "/views");
app.set( "view engine", "ejs" );

// define middleware that logs all incoming requests
app.use(logger("dev"));

// define middleware that serves static resources in the public directory
app.use(express.static(__dirname + '/public'));

// define a route for the default home page
app.get( "/", ( req, res ) => {
    res.render("homepage");
} );

const read_inventory_sql = `
    SELECT 
        class_name, assignment_name, due_date, priority_rating
    FROM
        Item
`

// define a route for the inventory page
app.get("/inventory", ( req, res ) => {
    res.render("inventory");
} );

// define a route for the details page
app.get( "/inventory/details", ( req, res ) => {
    res.render("details");
} );

// start the server
app.listen( port, () => {
    console.log(`App server listening on ${ port }. (Go to http://localhost:${ port })` );
} );