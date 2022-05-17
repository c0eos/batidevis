import bcrypt from "bcrypt";
import prisma from "../utils/prisma";
import { AppError } from "../utils/errors";

const saltRounds = 10;

class User {
  static async getAll() {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
      },
    });
    return users;
  }

  static async getOneByEmail(email: string) {
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

  static async getOneById(id: string) {
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

  static async create(email: string, password: string) {
    const userExists = await this.getOneByEmail(email);
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

  static async update(id: string, email: string, password: string) {
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

  static async delete(id: string) {
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

  static async login(email: string, password: string) {
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
}

export default User;
