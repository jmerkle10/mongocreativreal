var express = require('express');
var router = express.Router();


var mongoose = require('mongoose'); 

mongoose.connect('mongodb://localhost/taskDB', { useMongoClient: true }); 

var taskSchema = mongoose.Schema({ 
Task: String
});

var Task = mongoose.model('Task', taskSchema); 

var db = mongoose.connection; 
db.on('error', console.error.bind(console, 'connection error:')); 
db.once('open', function() { 
console.log('Connected');
});

router.post('/comment', function(req, res, next) {
var newtask = new Task(req.body); 
console.log(newtask); 
newtask.save(function(err, post) { 
  if (err) return console.error(err);
  console.log(post);
  res.sendStatus(200);
});
});


router.get('/comment', function(req, res, next) {
console.log("In the GET route");
Task.find(function(err,taskList) { 
  if (err) return console.error(err); 
  else {
    console.log(taskList); 
   res.json(taskList);  
    
  }
})
});


router.delete('/comment', function(req,res) {
console.log("deleting");
Task.find();
Task.remove(function(err,taskList){
if (err) return console.error(err);
else {
//req.comment.remove(commentList );
console.log(taskList);
}
})
});




module.exports = router;
