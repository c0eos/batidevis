import prisma from "../utils/prisma";
import { AppError } from "../utils/errors";

class Acompte {
  static async getAll() {
    const acomptes = await prisma.acompte.findMany({
      orderBy: {
        dateEdition: "desc",
      },
    });

    return acomptes;
  }

  static async getOneById(id: string) {
    const acompte = await prisma.acompte.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    return acompte;
  }

  static async create(data: any) {
    const acompte = await prisma.acompte.create({
      data,
    });

    return acompte;
  }

  static async update(id: string, data: any) {
    const acompte = await prisma.acompte.update({
      where: {
        id: parseInt(id),
      },
      data,
    });

    return acompte;
  }

  static async delete(id: string) {
    const acompte = await prisma.acompte.delete({
      where: {
        id: parseInt(id),
      },
    });

    return acompte;
  }
}

export default Acompte;
