const db = require('../db/connection');
require('dotenv').config();
const users = db.get('users');
const bcrypt = require('bcryptjs');

async function createAdminUser() {
    const user = await users.findOne({role: 'admin'});
    console.log(user);
    try {
        if (!user) {
            await users.insert({
                username: 'smo',
                password: await bcrypt.hash(process.env.DEFUALT_ADMIN_PASSWORD, 12),
                role: 'admin',
                active: true
            });
            console.log('Admin user is created!');
        } else {
            console.log('Admin user already exists!');
        }
    } catch(error) {
        console.error(error);
    } finally {
        db.close();
    }
};
createAdminUser();
