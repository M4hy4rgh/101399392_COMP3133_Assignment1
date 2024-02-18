const {User} = require("../models/index.js");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt"); // Import bcrypt
require('dotenv').config();

const UserResolvers = {
    Query: {
        
        async login(_, { username, password }) {
            const user = await User.findOne({ username: username });
            if (!user) {
                return new Error("User not found");
            }
            const valid = await bcrypt.compare(password, user.password);
            if (!valid) {
                return new Error("Incorrect password");
            }
            const token = jwt.sign({ id: user._id }, process.env.REACT_APP_JWT_SECRET);
            return { token, user };
        }
    },
    Mutation: {
        async signup(_, { user }) {
            const saltRounds = 10; // Number of salt rounds, higher is more secure
            const plainPassword = user.password; // Replace with the actual user's password          
            
             // Hash the password
            salt = bcrypt.genSaltSync(saltRounds)
            hashedPassword = bcrypt.hashSync(plainPassword, salt)
            
            const newUser = new User({
                username: user.username,
                email: user.email,
                password: hashedPassword,
            });

            try {
                await newUser.save();
                return newUser;
            } catch (ex) {
                return ex;
            }
        },
    },
};


module.exports = UserResolvers;
