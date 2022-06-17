import { DevisLigne } from "@prisma/client";
import prisma from "../utils/prisma";
import { AppError } from "../utils/errors";
import { IFactureLigne } from "../utils/schemas";

class Facture {
  static async getAll() {
    const factures = await prisma.facture.findMany({
      orderBy: [
        {
          dateEdition: "desc",
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

    if (!facture) {
      throw new AppError("Facture introuvable", 401, true);
    }

    return facture;
  }

  static async create(data: any) {
    const facture = await prisma.facture.create({
      data,
    });

    return facture;
  }

  static async update(id: string, data: any) {
    const facture = await prisma.facture.update({
      where: {
        id: parseInt(id),
      },
      data,
    });

    return facture;
  }

  static async delete(id: string) {
    const facture = await prisma.facture.delete({
      where: {
        id: parseInt(id),
      },
    });

    return facture;
  }

  static async getLignes(id: string) {
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
        codeDocument: {
          equals: facture.code,
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

  static async createLignesFromDevis(id: string, data: DevisLigne[]) {
    const facture = await this.getOneById(id);

    for (const ligne of data) {
      ligne.codeDocument = facture.code as string;
      // @ts-ignore
      delete ligne.id;

      await prisma.factureLigne.upsert({
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

  static async updateLignes(id: string, data: IFactureLigne[]) {
    const facture = await prisma.facture.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    const currentLignes = await this.getLignes(id);

    const dataIds = data.map((ligne) => ligne.id);

    const deletedLignes = currentLignes.filter((ligne) => !dataIds.includes(ligne.id));

    for (const ligne of deletedLignes) {
      await prisma.factureLigne.delete({
        where: {
          id: ligne.id,
        },
      });
    }

    for (const ligne of data) {
      await prisma.factureLigne.upsert({
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

  static async getTVA(codeFacture: string | undefined) {
    // WHERE est correctement géré par prisma
    const tva = await prisma.$queryRaw`
      SELECT 
        tva,
        SUM(qte * pvEuro) as totalHT,
        SUM(qte * pvEuro * tva / 100 ) as totalTVA
      FROM factureLigne
      WHERE codeDocument = ${codeFacture}
      GROUP BY tva` as any[];

    return tva;
  }

  static async updateTotaux(codeFacture: string | undefined) {
    const tva = await this.getTVA(codeFacture);

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

    const devis = await prisma.facture.update({
      where: {
        code: codeFacture,
      },
      data: totaux,
    });

    return devis;
  }

  static async getAllCodes() {
    const codes = await prisma.facture.findMany({
      select: {
        code: true,
      },
    });

    return codes;
  }
}

export default Facture;
