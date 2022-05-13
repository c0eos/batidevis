const prisma = require("../utils/prisma");
const { AppError } = require("../utils/errors");

class Client {
  static async getAll() {
    const clients = await prisma.client.findMany();

    return clients;
  }

  static async getOneById(id) {
    const client = await prisma.client.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!client) {
      throw new AppError("Client introuvable", 404, true);
    }

    return client;
  }

  static async create(data) {
    const client = await prisma.client.create({
      data,
    });

    return client;
  }

  static async update(id, data) {
    const client = await prisma.client.update({
      where: {
        id: parseInt(id),
      },
      data,
    });

    return client;
  }

  static async delete(id) {
    const client = await prisma.client.delete({
      where: {
        id: parseInt(id),
      },
    });

    return client;
  }
}

module.exports = Client;
