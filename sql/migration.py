import pandas as pd
import sqlite3

db_in = sqlite3.connect("Entrep.sqlite")
db_out = sqlite3.connect("../backend/Entrep.db")
cur = db_out.cursor()


def clients():
    df = pd.read_sql("SELECT * FROM Client", db_in)
    df.drop(
        [
            "CompteAcompte",
            "ModeReg",
            "CalculEuro",
            "Domiciliation",
            "CodeBanque",
            "Guichet",
            "CompteBanque",
            "CleRIB",
            "TvaIntracom",
            "PlafondEncours",
            "Note",
            "NumParamDev",
            "NbExemplaireDev",
            "NumParamFac",
            "NbExemplaireFac",
            "NumParamCde",
            "NbExemplaireCde",
            "NumParamBl",
            "NbExemplaireBl",
            "CompteRG",
            "DocExternes",
            "CompteBloque",
        ],
        inplace=True,
        axis=1,
    )

    df["DateDernMAJ"] = pd.to_datetime(df["DateDernMAJ"])
    df["Info"] = df["Info"] + "\n" + df["SuiteInfo"]

    df.drop(
        [
            "SuiteInfo",
        ],
        inplace=True,
        axis=1,
    )

    df.columns = [
        "Code",
        "Nom",
        "Civilite",
        "Interlocuteur",
        "Adresse",
        "Adresse2",
        "codePostal",
        "Ville",
        "Pays",
        "Telephone",
        "Portable",
        "Fax",
        "EMail",
        "Compte",
        "Info",
        "CA",
        "Solde",
        "Updated",
    ]

    print(df.head(20))

    cur.execute("DELETE FROM Client")
    db_out.commit()
    df.to_sql("Client", db_out, if_exists="append", index=False)


def devis():
    df = pd.read_sql("SELECT * FROM Devis", db_in)
    df.drop(
        [
            "Civilite",
            "Nom",
            "Interloc",
            "Adr",
            "AdrSuite",
            "CP",
            "Ville",
            "Tel",
            "Portable",
            "Fax",
            "EMail",
            "DateTrav",
            "CodeTvaElement",
            "LettreEntete",
            "LettreEnteteCom",
            "Note",
            "LettrePied",
            "LettrePiedCom",
            "CalculEuro",
            "Actua",
            "CalculEscompte",
            "MtEscompte",
            "PcEscompte",
            "ModReg",
            "Effectif",
            "Locked",
            "DossierEuro",
            "TransCde",
            "TransBl",
            "TransAchat",
            "Polices",
            "TVAEnc",
        ],
        inplace=True,
        axis=1,
    )

    df["Date"] = pd.to_datetime(df["Date"])
    df["Info"] = df["Info"] + "\n" + df["InfoSuite"]

    df.drop(
        [
            "InfoSuite",
        ],
        inplace=True,
        axis=1,
    )

    df.columns = [
        "Code",
        "Etat",
        "Date",
        "CodeClient",
        "Sujet",
        "adresseTravaux",
        "adresseTravaux2",
        "cpTravaux",
        "VilleTravaux",
        "Info",
        "TotalDeb",
        "TotalPR",
        "TotalPV",
        "TotalHT",
        "TotalHTNet",
        "FlagEscompte",
        "HTNetFin",
        "TotalTVA",
        "TVAReelle",
        "TotalTTC",
        "Acompte",
        "NetAPayer",
        "Variante",
        "Taux1",
        "Taux2",
        "Taux3",
        "Taux4",
        "Taux5",
        "HT0",
        "HT1",
        "HT2",
        "HT3",
        "HT4",
        "HT5",
        "HTNet0",
        "HTNet1",
        "HTNet2",
        "HTNet3",
        "HTNet4",
        "HTNet5",
        "TVA0",
        "TVA1",
        "TVA2",
        "TVA3",
        "TVA4",
        "TVA5",
        "Temps",
        "transFacture",
        "FlagAcompte",
    ]

    print(df.head(20))
    print(df.columns)

    cur.execute("DELETE FROM Devis")
    db_out.commit()
    df.to_sql("Devis", db_out, if_exists="append", index=False)


def devis_ligne():
    df = pd.read_sql("SELECT * FROM DevisLigne", db_in)
    df.drop(
        [
            "LibelleCom",
            "IdTranche",
            "Info",
            "FormuleMetre",
            "ResultatMetre",
            "FourSsTrait",
            "SautLigne",
            "SautPage",
            "FicImage",
        ],
        inplace=True,
        axis=1,
    )

    df.columns = [
        "codeDevis",
        "NumLigne",
        "NumBuf",
        "IdSousTotal",
        "NivTr",
        "NivOuv",
        "Type",
        "Numerotation",
        "CodeElement",
        "Libelle",
        "Deb",
        "FgF",
        "FgMo",
        "FgMat",
        "Fg",
        "Pr",
        "Ben",
        "Coef",
        "Pv",
        "PvEuro",
        "PvNet",
        "PvNetEuro",
        "Qte",
        "Tva",
        "Compte",
        "Unite",
        "Temps",
        "NonEdit",
        "Variante",
    ]

    print(df.head(20))
    print(df.columns)

    cur.execute("DELETE FROM DevisLigne")
    db_out.commit()
    df.to_sql("DevisLigne", db_out, if_exists="append", index=False)


def factures():
    df = pd.read_sql("SELECT * FROM Facture", db_in)
    df.drop(
        [
            "Avoir",
            "Civilite",
            "Nom",
            "Interloc",
            "Adr",
            "AdrSuite",
            "CP",
            "Ville",
            "Tel",
            "Portable",
            "Fax",
            "EMail",
            "DateTrav",
            "CodeTvaElement",
            "LettreEntete",
            "LettreEnteteCom",
            "Note",
            "LettrePied",
            "LettrePiedCom",
            "CalculEuro",
            "Actua",
            "CalculEscompte",
            "MtEscompte",
            "PcEscompte",
            "Variante",
            "RG",
            "ModReg",
            "EcheanceCreeDansFinanc",
            "FacPrec",
            "FacSuiv",
            "TransCompta",
            "Locked",
            "DossierEuro",
            "TVAEnc",
            "Polices",
            "DevOrigType",
            "PieceEdit",
            "IdentDGI",
            "PostePhysiqCreat",
            "UtilDroitCreat",
        ],
        inplace=True,
        axis=1,
    )

    df["Date"] = pd.to_datetime(df["Date"])
    df["DateRG"] = pd.to_datetime(df["DateRG"])
    df["DateCreat"] = pd.to_datetime(df["DateCreat"])
    df["Info"] = df["Info"] + "\n" + df["InfoSuite"]

    df.drop(["InfoSuite"], inplace=True, axis=1)

    df.columns = [
        "Code",
        "Date",
        "CodeClient",
        "Sujet",
        "adresseTravaux",
        "adresseTravaux2",
        "CPTravaux",
        "VilleTravaux",
        "Info",
        "TotalDeb",
        "TotalPR",
        "TotalPV",
        "TotalHT",
        "TotalHTNet",
        "FlagEscompte",
        "HtNetFin",
        "TotalTVA",
        "TVAReelle",
        "TotalTTC",
        "Acompte",
        "NetAPayer",
        "Taux1",
        "Taux2",
        "Taux3",
        "Taux4",
        "Taux5",
        "HT0",
        "HT1",
        "HT2",
        "HT3",
        "HT4",
        "HT5",
        "HTNet0",
        "HTNet1",
        "HTNet2",
        "HTNet3",
        "HTNet4",
        "HTNet5",
        "TVA0",
        "TVA1",
        "TVA2",
        "TVA3",
        "TVA4",
        "TVA5",
        "DateRG",
        "Temps",
        "codeDevis",
        "NumOrdre",
        "FlagAcompte",
        "DateCreation",
    ]

    print(df.head(20))
    print(df.columns)

    cur.execute("DELETE FROM Facture")
    db_out.commit()
    df.to_sql("Facture", db_out, if_exists="append", index=False)


def factures_ligne():
    df = pd.read_sql("SELECT * FROM FactureLigne", db_in)
    df.drop(
        [
            "IdTranche",
            "LibelleCom",
            "Info",
            "FormuleMetre",
            "ResultatMetre",
            "FourSsTrait",
            "SautLigne",
            "SautPage",
            "FicImage",
        ],
        inplace=True,
        axis=1,
    )

    df.columns = [
        "codeFacture",
        "NumLigne",
        "NumBuf",
        "IdSousTotal",
        "NivTr",
        "NivOuv",
        "Type",
        "Numerotation",
        "CodeElement",
        "Libelle",
        "Deb",
        "FgF",
        "FgMo",
        "FgMat",
        "Fg",
        "Pr",
        "Ben",
        "Coef",
        "Pv",
        "PvEuro",
        "PvNet",
        "PvNetEuro",
        "Qte",
        "Tva",
        "Compte",
        "Unite",
        "Temps",
        "NonEdit",
        "Variante",
        "Avt",
        "QteOrigine",
        "PvOrigine",
    ]

    print(df.head(20))
    print(df.columns)

    cur.execute("DELETE FROM FactureLigne")
    db_out.commit()
    df.to_sql("FactureLigne", db_out, if_exists="append", index=False)


def acomptes():
    df = pd.read_sql("SELECT * FROM Acompte", db_in)
    df.drop(
        [
            "Civilite",
            "Nom",
            "Interloc",
            "Adr",
            "AdrSuite",
            "CP",
            "Ville",
            "Tel",
            "Portable",
            "Fax",
            "EMail",
            "ModReg",
            "Note",
            "TransCompta",
            "TVAEnc",
            "CalculEuro",
            "IdentDGI",
            "PostePhysiqCreat",
            "UtilDroitCreat",
        ],
        inplace=True,
        axis=1,
    )

    df["Date"] = pd.to_datetime(df["Date"])
    df["DateCreat"] = pd.to_datetime(df["DateCreat"])

    def map_acompte(row):
        codes = pd.read_sql(
            'SELECT TypeDoc, CodeDoc FROM AcompteDocAsso WHERE CodeAcompte = "%s"'
            % row[0],
            db_in,
        )
        codeDevis, codeFacture = None, None

        for code in codes.values:
            if code[0] == "DEVCLI":
                codeDevis = code[1]
            elif code[0] == "FACCLI":
                codeFacture = code[1]

        print(row[0], codeDevis, codeFacture)

        return pd.Series([codeDevis, codeFacture])

    df[["codeDevis", "codeFacture"]] = df.apply(map_acompte, axis=1)
    # dt = df.apply(map_acompte, axis=1)
    # print(dt.head(20))

    df.columns = [
        "CodeAcompte",
        "Date",
        "CodeClient",
        "Sujet",
        "TotalHT",
        "TotalTVA",
        "TotalTTC",
        "Taux1",
        "Taux2",
        "Taux3",
        "Taux4",
        "Taux5",
        "HT0",
        "HT1",
        "HT2",
        "HT3",
        "HT4",
        "HT5",
        "TVA0",
        "TVA1",
        "TVA2",
        "TVA3",
        "TVA4",
        "TVA5",
        "DateCreation",
        "codeDevis",
        "codeFacture",
    ]

    print(df.head(20))
    print(df.columns)

    cur.execute("DELETE FROM Acompte")
    db_out.commit()
    df.to_sql("Acompte", db_out, if_exists="append", index=False)


if __name__ == "__main__":
    clients()
    devis()
    devis_ligne()
    factures()
    factures_ligne()
    acomptes()