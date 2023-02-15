// Initializes the database along with some sample data
const db = require("./db_connection");

// Delete existing table, if any
const drop_itemtable_sql = "DROP TABLE IF EXISTS Item"
db.execute(drop_itemtable_sql);

// Creates the table
const create_itemtable_sql = `
    CREATE TABLE Item (
        item_id INT NOT NULL AUTO_INCREMENT,
        class_name VARCHAR(45) NOT NULL,
        assignment_name VARCHAR(45) NOT NULL,
        assignment_type VARCHAR(45) NOT NULL,
        assignment_format VARCHAR(45) NOT NULL,
        due_date DATE NOT NULL,
        priority_rating TINYINT NOT NULL,
        interest_level TINYINT,
        relevance_level TINYINT,
        description VARCHAR(100) NULL,
        PRIMARY KEY (item_id)
    );
`
db.execute(create_itemtable_sql);

// Adds some sample items
const insert_itemtable_sql = `
    INSERT INTO Item
        (item_id, class_name, assignment_name, assignment_type, assignment_format, due_date, priority_rating, interest_level, relevance_level, description)
    VALUES
        (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
`
db.execute(insert_itemtable_sql, ["1", "Web Apps", "Lab 1", "Lab", "Practical", "2023-01-06", "5", "8", "3", "Finish details table and styles"]);
db.execute(insert_itemtable_sql, ["2", "Theory of Knowledge", "Extended Essay", "Essay", "Research", "2024-06-09", "1", "5", "8", "Find sources and complete annotated bibliography"]);
db.execute(insert_itemtable_sql, ["3", "AP Calculus AB", "Optimization Test Retake", "Test", "Written", "2023-01-08", "10", "2", "2", "Study optimization and related rates (extra attention to formulas)"]);

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