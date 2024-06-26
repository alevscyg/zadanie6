const db = require('../db');
let countID = 1;
class UserController {
    
    createUser = async(req, res) => {
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
                res.writeHead(201, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({id: countID, name: userName, age: userAge}));
                countID++;
            }
            else {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({message: "Enter name and age"}));
            }
        });
        
    }

    getUser = async(req, res) => {
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(Object.fromEntries(db.entries())));
    }

    getUserById = async(req, res, id) => {
        const user = await db.get(Number(id));
        if (user) {
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(user));
        }
        else {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({message: "User not found"}));
        };
    }

    deleteUser = async(req, res, id) => {
        if (db.delete(Number(id))) {
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(`Пользователь с id ${id} был удален`));
        }
        else {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({message: "User not found"}));
        };
    }

    putUser = async(req, res, id) =>{
        if(!(await db.get(Number(id)))) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({message: "User not found"}));
        }
        let body = '';
        req.on('data', (data) => {
            body += data;
        });
        req.on('end', () => {
            const parsedBody = JSON.parse(body);
            const userName = parsedBody['name'];
            const userAge = parsedBody['age'];
            const idNum = Number(id)
            const user = db.set(idNum, {name: userName, age: userAge});
            if (userName && userAge && user) {
                res.writeHead(201, { 'Content-Type': 'application/json' });
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
