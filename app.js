//set up the server
const express = require( "express" );
const logger = require("morgan");
const app = express();
const port = 8080;
const db = require('./db/db_connection');

// define middleware that logs all incoming requests
app.use(logger("dev"));

// define middleware that serves static resources in the public directory
app.use(express.static(__dirname + '/public'));

// define a route for the default home page
app.get( "/", ( req, res ) => {
    res.sendFile( __dirname + "/views/homepage.html" );
} );


const read_inventory_sql = `
    SELECT 
        class_name, assignment_name, due_date, priority_rating
    FROM
        Item
`
// define a route for the inventory page
app.get( "/inventory", ( req, res ) => {
    db.execute(read_inventory_sql, (error, results) => {
        if (error)
            res.status(500).send(error); //Internal Server Error
        else
            res.send(results);
    });
});

// define a route for the item detail page
const read_assignment_sql = `
    SELECT 
        *
    FROM
        Item
    WHERE
        item_id = ?
`
app.get( "/inventory/details/:id", ( req, res, next ) => {
    db.execute(read_assignment_sql, [req.params.id], (error, results) => {
        if (error)
            res.status(500).send(error); //Internal Server Error
        else if (results.length == 0)
            res.status(404).send(`No item found with id = "${req.params.id}"`); // Not found error
        else
            res.send(results[0]); // results is still an array
    });
});




// start the server
app.listen( port, () => {
    console.log(`App server listening on ${ port }. (Go to http://localhost:${ port })` );
} );