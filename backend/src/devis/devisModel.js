const prisma = require("../utils/prisma");
const { AppError } = require("../utils/errors");

class Devis {
  static async getAll() {
    const devis = await prisma.devis.findMany({
      orderBy: [
        {
          Date: "desc",
        },
      ],
    });

    return devis;
  }

  static async getOneById(id) {
    const devis = await prisma.devis.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    return devis;
  }

  static async create(data) {
    throw new AppError("Not implemented", 501, true);
  }

  static async update(id, data) {
    throw new AppError("Not implemented", 501, true);
  }

  static async delete(id) {
    const devis = await prisma.devis.delete({
      where: {
        id: parseInt(id),
      },
    });

    return devis;
  }

  static async getDetails(id) {
    const devis = await prisma.devis.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    const lignes = await prisma.devisLigne.findMany({
      where: {
        Code: {
          equals: devis.Code,
        },
      },
    });

    return lignes;
  }
}

module.exports = Devis;
