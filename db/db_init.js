// Initializes the database along with some sample data
const db = require("./db_connection");

// Delete existing table, if any
const drop_itemtable_sql = "DROP TABLE IF EXISTS Item"
db.execute(drop_itemtable_sql);

// Creates the table
const create_itemtable_sql = `
    CREATE TABLE Item (
        item_id INT NOT NULL AUTO_INCREMENT,
        assignment_name VARCHAR(45) NOT NULL,
        class_name VARCHAR(45) NOT NULL,
        due_date DATE NOT NULL,
        priority_rating TINYINT NOT NULL,
        description VARCHAR(45) NULL,
        PRIMARY KEY (item_id)
    );
`
db.execute(create_itemtable_sql);

// Adds some sample items
const insert_itemtable_sql = `
    INSERT INTO Item
        (item_id, assignment_name, class_name, due_date, priority_rating, description)
    VALUES
        (?, ?, ?, ?, ?, ?);
`
db.execute(insert_itemtable_sql, ["1", "Web Apps", "Lab 1", "2023-01-06", "5", "Finish details table and styles"]);
db.execute(insert_itemtable_sql, ["2", "Theory of Knowledge", "Extended Essay", "2024-06-09", "1", "Find sources and complete annotated bibliography"]);
db.execute(insert_itemtable_sql, ["3", "AP Calculus AB", "Optimization Test Retake", "2023-01-08", "10", "Study optimization and related rates (extra attention to formulas)"]);

// Reads the sample items inserted
const read_itemtable_sql = "SELECT * FROM Item";

db.execute(read_itemtable_sql,
    (error, results) => {
        if (error)
            throw error;

        console.log("Table 'Item' initialized with:")
        console.log(results);
    }
);
db.end();