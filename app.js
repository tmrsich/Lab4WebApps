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
        item_id,
        class_name, assignment_name, assignment_type, assignment_format,
        due_date, priority_rating, interest_level, relevance_level,
        description
    FROM
        Item
`

// define a route for the inventory page
app.get( "/inventory", ( req, res ) => {
    db.execute(read_inventory_sql, (error, results) => {
        if (error) {
            res.status(500).send(error); // Internal Server Error
        } else {
            res.render('inventory', {inventory : results })
        }
    });
} );

// define a route for the item detail page
const read_assignment_sql = `
    SELECT
    item_id,
    class_name, assignment_name, assignment_type, assignment_format,
    due_date, priority_rating, interest_level, relevance_level,
    description

    FROM
        Item
    WHERE
        item_id = ?
`
// define a route for the item detail page
app.get( "/inventory/details/:id", ( req, res ) => {
    db.execute(read_assignment_sql, [req.params.id], (error, results) => {
        if (error)
            res.status(500).send(error); //Internal Server Error
        else if (results.length == 0)
            res.status(404).send(`No item found with id = "${req.params.id}"` ); // NOT FOUND
        else {
            let data = results[0]; // results is still an array
            res.render('details', data);
        }
    });
});

// start the server
app.listen( port, () => {
    console.log(`App server listening on ${ port }. (Go to http://localhost:${ port })` );
} );