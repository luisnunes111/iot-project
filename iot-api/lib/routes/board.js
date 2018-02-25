const Board = require('../../models/board').Board;
const User = require('../../models/user').User;

//guardar no doc dous users e no doc das boards
exports.create = function(req, res) {
    var params = req.body;
    
    if (!params.username || !params.boardId) 
        return res.status(422).json("Not all fields have been entered");

    //get the user
    User.findOne({ username: params.username }, function(err, user) {
        if (err || !user)
            return res.status(401).json("There is no user with the given username.");  
        
        console.log(user);

        var board = Board({
            name: params.name,
            division: params.division,
            boardId: parseInt(params.boardId),
            parameters:{
                temperatureMin: "15",
                temperatureMax: "30",
                humidityMin: "10",
                humidityMax: "40" ,
                luminosityMin: "10" ,
                luminosityMax: "70",
                refreshRate: 30,
                lightState: 1,
                airState: 0 
            }
        });
        board.users.push(user._id);

        // save the board
        board.save(function(err, result) {
            if (err)
                return res.status(500).json("The board already has this user associated.");        
            
            console.log('board created!');            
            user.boards.push(result._id);

            user.save(function (err, result) {
                if (err)
                    return res.status(500).json("An board with the given ID already exists.");        
                              
                console.log('user updated!');
                return res.status(201).json();
            });
  
        });  

    });
};
//converter as referencias para json

exports.list = function(req, res) {

    if (!req.query.username) 
        return res.status(401).json("You must be authenticated.");

    // get a user by username
    User.findOne({ username: req.query.username }).populate('boards').exec(function (err, user) {
        if (err)
            return res.status(401).json("There is no user with the given username.");            

        // show the user boards
        console.log('boards list!');
        console.log(JSON.stringify(user.boards));
        res.status(200).json({ data: user.boards});
    });
};

exports.detail = function(req, res) {

    if (!req.query.username) 
        return res.status(401).json("You must be authenticated.");

    if (!req.params.id) 
        return res.status(422).json("No board id provided");
       
    // get a user by username
    Board.findOne({ boardId: req.params.id }).exec(function (err, board) {
        if (err)
            return res.status(401).json("There is no board with the given id.");            

        res.status(200).json({ data: board});
    });
};



//guardar a leitura recebida a board correspondente
exports.insert_read = function(received_read, board_id) {
    Board.findOne({ boardId: board_id }, function(err, board) {
        if (err || !board){
            console.log(err+', '+board);
            return;
        }

        board.reads.push(received_read);
        board.save(function (err, result) {
            if (err)
                console.log(err);
            
            console.log('read saved!');
        });  
    });       
};
