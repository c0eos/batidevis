const bcrypt = require("bcrypt");
const prisma = require("../utils/prisma");
const { AppError } = require("../utils/errors");

const saltRounds = 10;

class User {
  static async register(email, password) {
    const userExists = await this.findByEmail(email);
    if (userExists) {
      throw new AppError("Email déjà utilisé", 400, true);
    }

    const hash = await bcrypt.hash(password, saltRounds);

    const user = await prisma.user.create({
      data: {
        email,
        password: hash,
      },
      select: {
        id: true,
        email: true,
      },
    });

    return user;
  }

  static async login(email, password) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (user && bcrypt.compareSync(password, user.password)) {
      return user;
    }
    throw new AppError("Email ou mot de passe incorrect", 400, true);
  }

  static async getAll() {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
      },
    });
    return users;
  }

  static async findByEmail(email) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        email: true,
      },
    });
    return user;
  }

  static async findById(id) {
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(id),
      },
      select: {
        id: true,
        email: true,
      },
    });
    return user;
  }

  static async update(id, email, password) {
    const hash = await bcrypt.hash(password, saltRounds);
    const user = await prisma.user.update({
      where: {
        id: parseInt(id),
      },
      data: {
        email,
        password: hash,
      },
      select: {
        id: true,
        email: true,
      },
    });
    return user;
  }

  static async delete(id) {
    const user = await prisma.user.delete({
      where: {
        id: parseInt(id),
      },
      select: {
        id: true,
        email: true,
      },
    });
    return user;
  }
}

module.exports = User;
