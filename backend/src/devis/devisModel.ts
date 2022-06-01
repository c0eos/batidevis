import prisma from "../utils/prisma";
import { AppError } from "../utils/errors";

class Devis {
  static async getAll() {
    const devis = await prisma.devis.findMany({
      orderBy: [
        {
          dateEdition: "desc",
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
    const devis = await prisma.devis.create({
      data,
    });

    return devis;
  }

  static async update(id: string, data: any) {
    const devis = await prisma.devis.update({
      where: {
        id: parseInt(id),
      },
      data,
    });

    return devis;
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
      orderBy: [
        {
          numLigne: "asc",
        },
      ],
    });

    return lignes;
  }

  static async getAllCodes() {
    const codes = await prisma.devis.findMany({
      select: {
        code: true,
      },
    });

    return codes;
  }
}

export default Devis;
