import User from "../model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sequelize from "../config/database.js";
import "dotenv/config";

const err500 = "Internal Server Error";

const UserController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.findAll({
        where: { u_role: 0 },
      });
      res.status(200).json(users);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  getUserById: async (req, res) => {
    const u_id = req.params.u_id;

    try {
      const user = await User.findByPk(u_id);
      if (!user) {
        return res.status(404).json({ error: "Utilizador não encontrado" });
      }
      res.status(200).json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },



  getUserByName: async (req, res) => {
    try {
      const { u_nome } = req.params;

      if (u_nome) {
        const user = await User.findOne({
          where: { u_nome },
        });

        if (!user) {
          return res.status(404).json({ error: "Utilizador não encontrado" });
        }

        res.status(200).json(user);
      } else {
        const allUsers = await User.findAll();

        res.status(200).json(allUsers);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  createUser: async (req, res) => {
    try {
      const { u_nome, u_password, u_email } = req.body;

      if (!u_nome || !u_password || !u_email) {
        return res
          .status(400)
          .json({ error: "Todos os campos são necessários" });
      }

      const existingUser = await User.findOne({
        where: { u_email },
      });

      if (existingUser) {
        return res
          .status(400)
          .json({ error: "Este e-mail já se encontra em uso" });
      }

      const hashPass = await bcrypt.hash(u_password, 10);
      const newUser = await User.create({
        u_nome,
        u_password: hashPass,
        u_email,
      });

      const u_id = newUser.u_id;

      const token = jwt.sign({ u_id: u_id }, process.env.jwtKEY);

      res.status(201).json({ newUser, token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  updateUserById: async (req, res) => {
    const u_id = req.params.u_id;
    try {
      if (req.body.u_password) {
        req.body.u_password = await bcrypt.hash(req.body.u_password, 10);
      }

      const [rowsUpdated] = await User.update(req.body, {
        where: { u_id: u_id },
        returning: true, // This should return the updated rows
      });

      if (rowsUpdated === 0) {
        return res.status(404).json({ error: "Utilizador não encontrado" });
      }

      const updatedUser = await User.findByPk(u_id); // Retrieve the updated user

      res.status(200).json(updatedUser);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  deleteUser: async (req, res) => {
    const u_id = req.params.u_id;
    try {
      const deletedRows = await User.destroy({
        where: { u_id: u_id },
      });
      if (deletedRows === 0) {
        return res.status(404).json({ error: "Utilizador não encontrado" });
      }
      res.status(200).json({ message: "Utilizador removido com sucesso" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },
  loginUser: async (req, res) => {
    try {
      const { u_email, u_password } = req.body;

      if (!u_email || !u_password) {
        return res.status(400).json({
          error: "Email and Password are required",
        });
      }

      const user = await User.findOne({ where: { u_email } });

      if (!user) {
        return res.status(401).json({ error: "Invalid Email or Password" });
      }

      const validPass = await bcrypt.compare(u_password, user.u_password);

      if (!validPass) {
        return res.status(401).json({ error: "Invalid Email or Password" });
      }

      const token = jwt.sign({ u_id: user.u_id }, process.env.jwtKEY, {
        expiresIn: "1d", // Token ważny przez 1 dzień
      });

      res.status(200).json({ user, token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  registerUser: async (req, res) => {
    try {
      const { u_nome, u_email, u_password, u_role } = req.body;

      if (!u_nome || !u_email || !u_password || !u_role) {
        return res.status(400).json({
          error: "Name, Email, Password, and Role are required",
        });
      }

      const existingUser = await User.findOne({ where: { u_email } });

      if (existingUser) {
        return res.status(400).json({ error: "Email already in use" });
      }

      const hashedPassword = await bcrypt.hash(u_password, 10);

      const newUser = await User.create({
        u_nome,
        u_email,
        u_password: hashedPassword,
        u_role,
      });

      const token = jwt.sign({ u_id: newUser.u_id }, process.env.jwtKEY, {
        expiresIn: "1d", // Token ważny przez 1 dzień
      });

      res.status(201).json({ user: newUser, token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },
};

export default UserController;
