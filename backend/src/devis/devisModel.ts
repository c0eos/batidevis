import prisma from "../utils/prisma";
import { AppError } from "../utils/errors";

class Devis {
  static async getAll() {
    const devis = await prisma.devis.findMany({
      orderBy: [
        {
          date: "desc",
        },
      ],
    });

    return devis;
  }

  static async getOneById(id: string) {
    const devis = await prisma.devis.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    return devis;
  }

  static async create(data: any) {
    throw new AppError("Not implemented", 501, true);
  }

  static async update(id: string, data: any) {
    throw new AppError("Not implemented", 501, true);
  }

  static async delete(id: string) {
    const devis = await prisma.devis.delete({
      where: {
        id: parseInt(id),
      },
    });

    return devis;
  }

  static async getDetails(id: string) {
    const devis = await prisma.devis.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!devis) {
      throw new AppError("Devis introuvable", 401, true);
    }

    const lignes = await prisma.devisLigne.findMany({
      where: {
        codeDevis: {
          equals: devis.code,
        },
      },
    });

    return lignes;
  }
}

export default Devis;
