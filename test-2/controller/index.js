const { guest, admin } = require("../models");
const {
    hashPass,
    compare
} = require('../helpers/bcrypt')
const {
  signJWT,
  verifyJWT
} = require('../helpers/jwt')

class controller {
  static async getData(req, res, next) {
    try {
      let { page } = req.query;
      if (!page) page = 1;
      const limit = 10;
      const offset = (page - 1) * limit;
      const data = await guest.findAndCountAll({
        limit,
        offset,
        attributes: ["name", "note"],
      });
      res.status(200).json(data);
    } catch (e) {
      next(e);
    }
  }
  static async getDataAdmin(req, res, next) {
    try {
      let { page } = req.query;
      if (!page) page = 1;
      const limit = 10;
      const offset = (page - 1) * limit;
      const data = await guest.findAndCountAll({ limit, offset });
      res.status(200).json(data);
    } catch (error) {
      console.log(error)
      next(error);
    }
  }
  static async register(req, res, next) {
    try {
      const { email, password, phoneNumber, address, username } = req.body;
      const result = await admin.create({
        email,
        password,
        phoneNumber,
        address,
        username,
      });
      res.status(201).json({ id: result.id, email: result.email });
    } catch (error) {
      next(error);
    }
  }
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw { name: "wrong email/password" };
      }
      let emailSearch = await admin.findOne({ where: { email } });
      if (!emailSearch) {
        throw { name: "email/password not valid" };
      }
      let comaparePass = compare(password, emailSearch.password);
      if (!comaparePass) {
        throw { name: "wrong email/password" };
      }
      let access_token = signJWT({
        id: emailSearch.id
      });
      res.status(200).json({ access_token });
    } catch (error) {
      console.log(error)
      next(error);
    }
  }
  static async create(req, res, next) {
    try {
      const { name, note, address, phone } = req.body;
      const data = await guest.create({ name, note, address, phone });
      res.status(201).json(data);

    } catch (error) {
      next(error);
    }
  }
  static async edit(req, res, next) {
    try {
      const { id } = req.params;
      const { name, note, address, phone } = req.body;
      const oldData = await guest.findByPk(id);
      if (!oldData) {
        throw { name: "Data Not Found" };
      }

      const dataUpdate = await oldData.update(
        { name, note, address, phone }
      );
      res.status(200).json(dataUpdate);
    } catch (error) {
      next(error);
    }
  }
  static async dataById(req, res, next) {
    try {
      const { id } = req.params;
      const data = await guest.findByPk(id);
      if (!data) {
        throw { name: "Data Not Found" };
      }
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
  static async delete(req, res, next) {
    try {
        const { id } = req.params;
        const data = await guest.findByPk(id);
        if (!data) {
          throw { name: "Data Not Found" };
        }
        await data.destroy()
        res.status(200).json({msg:"Success Delete"});
      } catch (error) {
        next(error);
      }
  }
}

module.exports = controller;
