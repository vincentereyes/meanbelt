var express = require('express');
// Create an Express App
var app = express();

var mongoose = require('mongoose');
// Require body-parser (to receive post data from clients)
mongoose.connect('mongodb://localhost/beltexam');
mongoose.Promise = global.Promise;

var PetSchema = new mongoose.Schema({
    name:  { type: String, required: [true, "Name required"], minlength: [3, "Name is minimum of 3 characters"], unique: [true, "pet exists!"]},
    type:  { type: String, required: [true, "Type required"], minlength: [3, "Type is minimum of 3 characters"]},
    desc:  { type: String, required: [true, "Description required"], minlength: [3, "Description is minimum of 3 characters"]},
    likes: { type: Number, default: 0},
    skill1: { type: String, default : ""},
    skill2: { type: String, default : ""},
    skill3: { type: String, default : ""}
}, {timestamps: true });

mongoose.model('Pet', PetSchema); // We are setting this Schema in our Models as 'User'
var Pet = mongoose.model('Pet');


var bodyParser = require('body-parser');
// Integrate body-parser with our App
app.use(bodyParser.json());
// Require path
var path = require('path');
// Setting our Static Folder Directory
app.use(express.static(path.join(__dirname, './static')));

app.use(express.static(path.join(__dirname, '/beltApp/dist')));


app.post('/pet', function(req, res) {
    // This is where we will retrieve the users from the database and include them in the view page we will be rendering.
    console.log(req.body)
    var pet = new Pet();
    pet.name = req.body.name;
    pet.type = req.body.type;
    pet.desc = req.body.desc;
    pet.skill1 = req.body.skill1;
    pet.skill2 = req.body.skill2;
    pet.skill3 = req.body.skill3;
    pet.save(function(err) {
    if (err) {
    		if(err.name == "ValidationError"){
    			console.log(pet.errors)
    			res.json({message: "Error", error: pet.errors})
    		} else {
    			console.log(err)
    			res.json({message: "Unique Error", error: err})
    		}
    	} else {
    		res.json({message: "success"});
    	}	
    })    
})

app.get('/pets', function(req, res) {
	 Pet.find({}, function(err, pets) {
    	if (err) {
    		console.log("error")
            res.json({message: "Error", error: err})
    	} else {
    		res.json({message: "success", data: pets});
    	}
    })
})

app.get('/pets/:id', function(req, res) {
    // This is where we will retrieve the users from the database and include them in the view page we will be rendering.
    Pet.findOne({_id: req.params.id}, function(err, pet){
		if (err) {
    		console.log("error")
            res.json({message: "Error", error: err})
    	} else {
    		res.json({message: "success", data: pet});
    	}
	})   
})

app.put('/pets/like/:id', function(req, res) {
    // This is where we will retrieve the users from the database and include them in the view page we will be rendering.
    Pet.findOne({_id: req.params.id}, function(err, pet){
    	pet.likes += 1
    	pet.save(function(err) {
    		if (err) {
    		console.log("error")
            res.json({message: "Error", error: pet.errors})
    		} else {
    		res.json({message: "success"});
    	}	
    })    
	})   
})

app.delete("/pets/:id", function(req, res) {
    Pet.remove({_id: req.params.id}, function(err){
        if (err){
            console.log(err)
        }else {
            res.json({message: "success"});
        }
    })
})

app.put('/pets/:id', function(req, res) {
	console.log(req.body)
    // This is where we will retrieve the users from the database and include them in the view page we will be rendering.
    Pet.findOne({_id: req.params.id}, function(err, pet){
    	pet.name = req.body.name;
    	pet.type = req.body.type;
    	pet.desc = req.body.desc;
    	pet.skill1 = req.body.skill1;
    	pet.skill2 = req.body.skill2;
    	pet.skill3 = req.body.skill3;
    	pet.save(function(err) {
    	if (err) {
    	console.log(err.name)
    		if(err.name == "ValidationError"){
    			res.json({message: "Error", error: pet.errors})
    		} else {
    			res.json({message: "Unique Error", error: err})
    		}
    	} else {
    		res.json({message: "success"});
    	}	
    })    
	})   
})



app.listen(8000, function() {
    console.log("listening on port 8000");
})