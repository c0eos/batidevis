/* eslint-disable no-await-in-loop */
import prisma from "../utils/prisma";
import { AppError } from "../utils/errors";
import { IDevisLigne } from "../utils/schemas";

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

  static async getLignes(id: string) {
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

  static async updateLignes(id: string, data: IDevisLigne[]) {
    const devis = await prisma.devis.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    const currentLignes = await this.getLignes(id);

    const dataIds = data.map((ligne) => ligne.id);

    const deletedLignes = currentLignes.filter((ligne) => !dataIds.includes(ligne.id));

    for (const ligne of deletedLignes) {
      await prisma.devisLigne.delete({
        where: {
          id: ligne.id,
        },
      });
    }

    for (const ligne of data) {
      await prisma.devisLigne.upsert({
        where: {
          // nouvelles lignes n'ont pas d'id, donc on met -1
          id: ligne.id || -1,
        },
        update: ligne,
        create: ligne,
      });
    }

    const newLignes = await this.getLignes(id);

    return newLignes;
  }

  static async getTVA(codeDevis: string | undefined) {
    // WHERE est correctement géré par prisma
    const tva = await prisma.$queryRaw`
      SELECT 
        tva,
        SUM(qte * pvEuro) as totalHT,
        SUM(qte * pvEuro * tva / 100 ) as totalTVA
      FROM devisLigne
      WHERE codeDevis = ${codeDevis}
      GROUP BY tva` as any[];

    return tva;
  }

  static async updateTotaux(codeDevis: string | undefined) {
    const tva = await this.getTVA(codeDevis);

    const totaux = {
      totalHT: 0,
      totalTTC: 0,
      totalTVA: 0,
    };

    for (const row of tva) {
      totaux.totalHT += row.totalHT;
      totaux.totalTVA += row.totalHT * row.tva / 100;
      totaux.totalTTC += row.totalHT + row.totalHT * row.tva / 100;
    }

    totaux.totalHT = Math.round(totaux.totalHT * 100) / 100;
    totaux.totalTVA = Math.round(totaux.totalTVA * 100) / 100;
    totaux.totalTTC = Math.round(totaux.totalTTC * 100) / 100;

    const devis = await prisma.devis.update({
      where: {
        code: codeDevis,
      },
      data: totaux,
    });

    return devis;
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
