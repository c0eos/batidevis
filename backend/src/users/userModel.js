const bcrypt = require("bcrypt");
const prisma = require("../utils/prisma");

const saltRounds = 10;

class User {
  static async register(email, password) {
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
    return null;
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

  static async getAll() {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
      },
    });
    return users;
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
}

module.exports = User;
