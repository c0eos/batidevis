import prisma from "../utils/prisma";
import { AppError } from "../utils/errors";

class Facture {
  static async getAll() {
    const factures = await prisma.facture.findMany({
      orderBy: [
        {
          date: "desc",
        },
      ],
    });

    return factures;
  }

  static async getOneById(id: string) {
    const facture = await prisma.facture.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    return facture;
  }

  static async create(data: any) {
    throw new AppError("Not implemented", 501, true);
  }

  static async update(id: string, data: any) {
    throw new AppError("Not implemented", 501, true);
  }

  static async delete(id: string) {
    const facture = await prisma.facture.delete({
      where: {
        id: parseInt(id),
      },
    });

    return facture;
  }

  static async getDetails(id: string) {
    const facture = await prisma.facture.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!facture) {
      throw new AppError("Facture introuvable", 401, true);
    }

    const lignes = await prisma.factureLigne.findMany({
      where: {
        codeFacture: {
          equals: facture.code,
        },
      },
    });

    return lignes;
  }
}

export default Facture;
