var express = require('express');
var router = express.Router();
var connection = require('../config/connection');

/* GET home page. */
router.get('/', function(req, res, next) {

  connection.query('SELECT * FROM users',function (err,rows) {

    if(err) throw err;
    console.log(rows)
    res.render('index', {users:rows});
      
  })

});

router.post('/addUser',function (req,res) {

    const userdata = {

        fname:req.body.fname,
        lname:req.body.lname,
        email:req.body.email,
        prof:req.body.prof
    }

    //console.log(userdata);
    //res.send("data Inserted")

    connection.query('INSERT INTO users SET ?',userdata,function (err,result) {

        if(err) throw err;
        res.redirect('/');
        
    });
    
});

router.get('/deleteUser/:id',function (req,res) {

    var userid = req.params.id;
    //console.log(userid);
    //res.send("ID recieved");
    connection.query('DELETE FROM users WHERE id = ?',[userid],function (err,rows) {

        if(err) throw err;
        res.redirect('/');

    })


});

router.get('/editUser/:id',function (req,res) {

    var userid = req.params.id;
    connection.query('SELECT * FROM users WHERE id = ?',[userid],function (err,rows) {

        if (err) throw  err;
        res.render('editUser',{users:rows});

    });


});

router.post('/updateUser/:id',function (req,res) {

    var userid=req.params.id;

    var fname=req.body.fname;
    var lname=req.body.lname;
    var email=req.body.email;
    var prof=req.body.prof;

    connection.query('UPDATE users SET fname=?,lname=?,email=?,prof=? WHERE id=?',[fname,lname,email,prof,userid],function (err,result) {

        if (err) throw err;
        res.redirect('/');

    })
})

module.exports = router;
