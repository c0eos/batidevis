import prisma from "../utils/prisma";
import { AppError } from "../utils/errors";

class Client {
  static async getAll() {
    const clients = await prisma.client.findMany();

    return clients;
  }

  static async getOneById(id: string) {
    const client = await prisma.client.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    return client;
  }

  static async create(data: any) {
    const client = await prisma.client.create({
      data,
    });

    return client;
  }

  static async update(id: string, data: any) {
    const client = await prisma.client.update({
      where: {
        id: parseInt(id),
      },
      data,
    });

    return client;
  }

  static async delete(id: string) {
    const client = await prisma.client.delete({
      where: {
        id: parseInt(id),
      },
    });

    return client;
  }
}

export default Client;