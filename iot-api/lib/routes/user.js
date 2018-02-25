const User = require('../../models/user').User;

exports.login = function(req, res) {
  var params = req.body;

  var reqUser = {
    username: params.username,
    password: params.password
  };

  if (!reqUser.username || !reqUser.password) 
    return res.status(422).json("Not all fields have been entered");

  // find the user
  User.find({ username: reqUser.username }, function(err, user) {
    if (err || !user.length){
      return res.status(500).json("There is no account with the given username.");        
    }else if(user[0].password !== reqUser.password){
      return res.status(401).json("Password entered is incorrect.");        
    }

    return res.status(200).json({
          name: user[0].name, username: user[0].username, image: user[0].imageURL    
    });
  });
};


exports.create = function(req, res) {
  var params = req.body;
  //verificar se os parametros sao validos, e se jä existe um user com esse nome
  var newUser = User({
    name: params.name,
    username: params.username,
    password: params.password,
    imageURL: "http://blog.opovo.com.br/portugalsempassaporte/wp-content/uploads/sites/42/2013/07/Scolari.jpg"
  });

  // save the user
  newUser.save(function(err) {
    if (err){
      console.log(err);
      return res.status(500).json({'msg': err});        
    } 

    console.log('User created!');
    return res.status(201).json({
          name: newUser.name, username: newUser.username, image: newUser.imageURL, created: true    
    });
  });
};

