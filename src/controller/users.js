import {userRepository} from '../models/users.js';
import bcrypt from 'bcryptjs';

export const registerController = async (req,res) => {
    try {
        const { username, email, password } = req.body;
        //check if email has been used
        const existedUser = await userRepository
          .search()
          .where('email')
          .equals(email)
          .return.all();
        if (existedUser[0]) {
          return res.status(400).send({ info: 'This email has been used' });
        }
    
        //regiser new user
        //using bcrypt to generate salt and hash the password
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
    
        await userRepository.createAndSave({
          username,
          email,
          password: hash,
        });
        res.status(200).send({ info: 'Register succeeded', user: username });
      } catch (error) {
        res.status(500).send(error);
      }
}

export const loginController = async (req,res) => {
    try {
        const { email, password } = req.body;
    
        //check if email exists
        const existedUser = await userRepository
          .search()
          .where('email')
          .equals(email)
          .return.all();

        //check if passowrd is correct
        const validPassword = await bcrypt.compare(
          password,
          existedUser[0].password
        );

        if (!validPassword || !existedUser[0]) {
          return res.status(401).send({ info: 'Invalid email or password' });
        }

        console.log(existedUser)
    
        res
          .status(200)
          .send({ info: 'login succeeded', user: existedUser[0].username });
      } catch (error) {
        res.status(500).send(error);
      }
}