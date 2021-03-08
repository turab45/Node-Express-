
const db = require('../util/database');

module.exports = class User {
    constructor(id, name, email, password) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }

    save() {
        return db.execute('insert into user(name,email,password) values(?,?,?)', [this.name, this.email, this.password]);
    }


    static fetchById = (id) => {
        return db.execute('select * from user where id=?', [id]);
    }

    static update = (user) => {
        return db.execute('update user set name=?, email=? where id=?', [user.name, user.email, user.id]);
    }
    static fetchAll = () => {
        return db.execute('select * from user');
    }
}