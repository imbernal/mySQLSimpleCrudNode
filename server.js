const express = require("express");
const app = express();
const mysql = require("mysql");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static("static"));

var connection = mysql.createConnection({
  host: 'sql9.freemysqlhosting.net',
  user: 'sql9163700',
  password: 'Cqd4JGkmBE',
  port:'3306',
  databasename: 'sql9163700'
});

connection.connect(function(err){
if(!err) {
    console.log("Database is connected ... nn");
} else {
    console.log("Error connecting database ... nn");
}
});


// connection.query("CREATE TABLE sql9163700.simplecrud (id int NOT NULL AUTO_INCREMENT,Description varchar(255) NOT NULL,Status varchar(255),PRIMARY KEY (id))" , function(err, rows){
//   if(err)
//     console.log(err);
// });



app.get('/tasks' , function(req,res){

  connection.query("SELECT * FROM sql9163700.simplecrud" , function(err,rows,fields){

    if(!err){
      res.send(rows);
    }else{
      console.log(err);
    }
  });


});

app.post("/save" , function(req,res){
  var task = {
    Description: req.body.description,
    Status: req.body.status
  }

  if (req.body.id == ""){
    connection.query("INSERT INTO sql9163700.simplecrud set ? " , task , function(err,rows){

      if(err)
        console.log("Error");
      else {
        console.log(rows);
      }
    });
  }else{
      connection.query("UPDATE sql9163700.simplecrud SET ?  WHERE id = ?", [task , req.body.id] , function(err,rows){
        if(err)
          console.log("Error " + err);
      });


  }

  res.send().status(200);
});


app.get("/delete/:id" , function(req, res){

  connection.query("DELETE from sql9163700.simplecrud WHERE id= ?" , req.params.id , function(err , rows){

    if(err)
      console.log("ERROR " + err);
  });
  console.log(req.params.id);
  res.send().status(200);
});

app.listen(2998);
