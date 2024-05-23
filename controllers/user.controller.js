const db = require('../db');
let countID = 1;
class UserController {
    async createUser(req, res){
        let body = '';
        req.on('data', (data) => {
            body += data;
        });
        req.on('end', () => {
            const parsedBody = JSON.parse(body);
            const userName = parsedBody['name'];
            const userAge = parsedBody['age'];
            if (userName && userAge) {
                db.set(countID, {name: userName, age: userAge})
                res.writeHead(201);
                res.end(JSON.stringify({id: countID, name: userName, age: userAge}));
                countID++;
            }
            else {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({message: "Enter name and age"}));
            }
        });
        
    }
    async getUser(req, res){
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(Object.fromEntries(db.entries())));
    }
    async getUserById(req, res, id){
        const user = db.get(id);
        if (user) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(user));
        }
        else {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({message: "User not found"}));
        };
    }
    async deleteUser(req, res, id){
        const user = db.delete(id);
        if (user) {
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(`Пользователь с id ${id} был удален`));
        }
        else {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({message: "User not found"}));
        };
    }
    async putUser(req, res, id){
        let body = '';
        req.on('data', (data) => {
            body += data;
        });
        req.on('end', () => {
            const parsedBody = JSON.parse(body);
            const userName = parsedBody['name'];
            const userAge = parsedBody['age'];
            const user = db.set(id, {name: userName, age: userAge});
            if (userName && userAge && user) {
                res.writeHead(201);
                res.end(JSON.stringify({id, name: userName, age: userAge}));
            }
            else {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({message: "Enter name and age"}));
            }
        });
    }
}
module.exports = new UserController();
