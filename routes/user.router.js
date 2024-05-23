const userController = require('../controllers/user.controller.js');

const routeHandler = (req, res) => {
    url = req.url.split('/');
    if (url[1] == 'users' && req.method == 'POST'){
        userController.createUser(req, res);
    }
    else if (url[1] == 'users' && (url[2] == '' || !(url[2])) && req.method == 'GET'){
        userController.getUser(req, res);
    }
    else if (url[1] == 'users' && url[2] != '' && url[2] && req.method == 'GET'){
        userController.getUserById(req, res, url[2]);
    }
    else if (url[1] == 'users' && url[2] != '' && url[2] && req.method == 'DELETE'){
        userController.deleteUser(req, res, url[2]);
    }
    else if (url[1] == 'users' && url[2] != '' && url[2] && req.method == 'PUT'){
        userController.putUser(req, res, url[2]);
    }
    else{
        res.writeHead(404);
        res.end(JSON.stringify({message: 'Route not found'}));
    }
};
module.exports = routeHandler;