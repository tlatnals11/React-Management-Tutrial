const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: conf.port,
  database: conf.database  
});
connection.connect();

const multer = require('multer');
const upload = multer({dest: './upload'})

app.get('/api/customers', (req, res) => {
  connection.query(
    "SELECT * FROM product",
    (err, rows, fields) => {
      res.send(rows);
    }
  );
});





// app.get('/api/customers/basket', (req, res) => {
//     connection.query(
//       "SELECT * FROM product WHERE isDeleted = 0",
//       (err, rows, fields) => {
//         res.send(rows);
//       }
//     );
// });

app.get('/api/customers/list', (req, res) => {
  connection.query(
    "SELECT *FROM product group by p_name HAVING isAdded = 1 and isDeleted = 0 ORDER BY sum(soft+fresh) desc",
    (err, rows, fields) => {
      res.send(rows);
    }
  );
});




app.get('/api/customers/basket', (req, res) => {
  connection.query(
    "SELECT * FROM product WHERE isBarcoded = 1",
    (err, rows, fields) => {
      res.send(rows);
    }
  );
});

app.get('/api/customers/recommend', (req, res) => {
  connection.query(
    "select * from product where isAdded = 0 and p_class in(select p_class from product where isAdded = 1);",
    (err, rows, fields) => {
      res.send(rows);
    }
  );
});

app.get('/api/customers/Navi', (req, res) => {
  connection.query(
    "SELECT * FROM product_class",
    (err, rows, fields) => {
      res.send(rows);
    }
  );
});



app.use('/image', express.static('./upload'));

app.post('/api/customers', upload.single('image'),(req,res)=>{
  let sql = 'INSERT INTO product VALUES (null, ?, null, ?, null, null, null, null, null, ?, 0)';
  let p_name = req.body.p_name;
  let image = 'http://localhost:5000/image/' + req.file.filename;
  let price = req.body.price;

  let params = [image, p_name, price];

  connection.query(sql, params,
    (err, rows, fields) => {
      res.send(rows);
    }
    );

});

app.delete('/api/customers/:id', (req, res)=> {
  let sql = 'UPDATE product SET isDeleted = 1, isAdded = 0, isBarcoded = 0 WHERE barcode = ?';
  let params = [req.params.id];
  connection.query(sql, params,
      (err, rows, fields) => {
        res.send(rows);
      }
    )
});



app.post('/api/customers/:id', (req, res)=> {
  let sql = 'UPDATE product SET isAdded = 1, isDeleted = 0, isBarcoded = 0 WHERE barcode = ?';
  let params = [req.params.id];
  connection.query(sql, params,
      (err, rows, fields) => {
        res.send(rows);
      }
    )
});

app.put('/api/customers/:id', (req, res)=> {
  let sql = 'UPDATE product SET isBarcoded = 1, isDeleted = 1 WHERE barcode = ?';
  let params = [req.params.id];
  connection.query(sql, params,
      (err, rows, fields) => {
        res.send(rows);
      }
    )
});



app.listen(port, () => console.log(`Listening on port ${port}`));