PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);
INSERT INTO User VALUES(1,'demo@demo.com','$2b$10$hpokvt2faMZy9FgUHaA.I.xnFE3BXE.qATSLqEcECUr5ngKeCSWAu');
INSERT INTO User VALUES(2,'demo2@demo.com','$2b$10$XrAO3cpo6Iu4EyJ5Xja7o.8nCORZ37pR8fsiqhYYdCOdtzYCJ9R5S');
CREATE TABLE IF NOT EXISTS "Client" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "civilite" TEXT,
    "interlocuteur" TEXT,
    "adresse" TEXT,
    "adresseSuite" TEXT,
    "codePostal" TEXT,
    "ville" TEXT,
    "telephone" TEXT,
    "portable" TEXT,
    "email" TEXT,
    "info" TEXT,
    "dateEdition" DATETIME NOT NULL,
    "dateCreation" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO Client VALUES(1,'PREMIER','Premier Client','M.','Pierre','55 Rue du Faubourg Saint-Honoré','','75008','PARIS','03 00 00 00 00','','','',1655480185695,1655480185695);
INSERT INTO Client VALUES(2,'DEUXIÈME','Deuxième Client','Mme','Paulette','30 Bd Marius Vivier Merle','','69003','LYON','02 00 00 00 00','07 00 00 00 00','','',1655480272554,1655480272554);
INSERT INTO Client VALUES(3,'ENTREPRISE','Entreprise','SCI','M. Jacques Dutronc','Place des Buisses','','59000','LILLE','09 00 00 00 00','','jacques@entreprise.com','Interlocuteur est indisponible les lundis.',1655480474422,1655480474422);
CREATE TABLE IF NOT EXISTS "Devis" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT NOT NULL,
    "dateEdition" DATETIME NOT NULL,
    "codeClient" TEXT NOT NULL,
    "interlocuteur" TEXT,
    "sujet" TEXT,
    "adresse" TEXT,
    "adresseSuite" TEXT,
    "codePostal" TEXT,
    "ville" TEXT,
    "info" TEXT,
    "totalDeb" REAL NOT NULL DEFAULT 0.0,
    "totalPR" REAL NOT NULL DEFAULT 0.0,
    "totalPV" REAL NOT NULL DEFAULT 0.0,
    "totalHT" REAL NOT NULL DEFAULT 0.0,
    "totalHTNet" REAL NOT NULL DEFAULT 0.0,
    "flagEscompte" BOOLEAN NOT NULL DEFAULT false,
    "HTNetFin" REAL NOT NULL DEFAULT 0.0,
    "totalTVA" REAL NOT NULL DEFAULT 0.0,
    "TVAReelle" REAL NOT NULL DEFAULT 0.0,
    "totalTTC" REAL NOT NULL DEFAULT 0.0,
    "acompte" REAL NOT NULL DEFAULT 0.0,
    "netAPayer" REAL NOT NULL DEFAULT 0.0,
    "transFacture" BOOLEAN NOT NULL DEFAULT false,
    "flagAcompte" BOOLEAN NOT NULL DEFAULT false,
    "dateCreation" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Devis_codeClient_fkey" FOREIGN KEY ("codeClient") REFERENCES "Client" ("code") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO Devis VALUES(1,'D2022-001',1655565744165,'PREMIER','Pierre','Pose d''un parquet','55 Rue du Faubourg Saint-Honoré','','75008','PARIS','',0.0,0.0,0.0,1634.240000000000009,0.0,0,0.0,169.41999999999998748,0.0,1803.6600000000000818,0.0,0.0,0,0,1655480541445);
INSERT INTO Devis VALUES(2,'D2022-002',1655480698240,'ENTREPRISE','M. Jacques Dutronc','Rénovations','Place des Buisses','','59000','LILLE','Isolation thermique',0.0,0.0,0.0,2550.0,0.0,0,0.0,178.49999999999999999,0.0,2728.4999999999999999,0.0,0.0,1,0,1655480644423);
CREATE TABLE IF NOT EXISTS "Facture" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT NOT NULL,
    "dateEdition" DATETIME NOT NULL,
    "codeClient" TEXT NOT NULL,
    "interlocuteur" TEXT,
    "sujet" TEXT,
    "adresse" TEXT,
    "adresseSuite" TEXT,
    "codePostal" TEXT,
    "ville" TEXT,
    "info" TEXT,
    "totalDeb" REAL NOT NULL DEFAULT 0.0,
    "totalPR" REAL NOT NULL DEFAULT 0.0,
    "totalPV" REAL NOT NULL DEFAULT 0.0,
    "totalHT" REAL NOT NULL DEFAULT 0.0,
    "totalHTNet" REAL NOT NULL DEFAULT 0.0,
    "flagEscompte" BOOLEAN NOT NULL DEFAULT false,
    "HTNetFin" REAL NOT NULL DEFAULT 0.0,
    "totalTVA" REAL NOT NULL DEFAULT 0.0,
    "TVAReelle" REAL NOT NULL DEFAULT 0.0,
    "totalTTC" REAL NOT NULL DEFAULT 0.0,
    "acompte" REAL NOT NULL DEFAULT 0.0,
    "netAPayer" REAL NOT NULL DEFAULT 0.0,
    "codeDevis" TEXT NOT NULL,
    "flagAcompte" BOOLEAN NOT NULL DEFAULT false,
    "dateCreation" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Facture_codeClient_fkey" FOREIGN KEY ("codeClient") REFERENCES "Client" ("code") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Facture_codeDevis_fkey" FOREIGN KEY ("codeDevis") REFERENCES "Devis" ("code") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO Facture VALUES(1,'F2022-001',1655555719403,'ENTREPRISE','M. Jacques Dutronc','Rénovations','Place des Buisses','','59000','LILLE','Isolation thermique',0.0,0.0,0.0,3150.0,0.0,0,0.0,220.49999999999999999,0.0,3370.4999999999999999,0.0,0.0,'D2022-002',0,1655480698191);
CREATE TABLE IF NOT EXISTS "DevisLigne" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "codeDocument" TEXT NOT NULL,
    "numLigne" INTEGER NOT NULL,
    "numBuf" INTEGER NOT NULL,
    "idSousTotal" INTEGER,
    "nivTr" INTEGER NOT NULL DEFAULT 0,
    "nivOuv" INTEGER NOT NULL DEFAULT 0,
    "type" TEXT,
    "numerotation" INTEGER,
    "codeElement" TEXT,
    "libelle" TEXT,
    "deb" REAL NOT NULL DEFAULT 0.0,
    "fgF" REAL NOT NULL DEFAULT 0.0,
    "fgMo" REAL NOT NULL DEFAULT 0.0,
    "fgMat" REAL NOT NULL DEFAULT 0.0,
    "fg" REAL NOT NULL DEFAULT 0.0,
    "pr" REAL NOT NULL DEFAULT 0.0,
    "ben" REAL NOT NULL DEFAULT 0.0,
    "coef" REAL NOT NULL DEFAULT 0.0,
    "pv" REAL NOT NULL DEFAULT 0.0,
    "pvEuro" REAL NOT NULL DEFAULT 0.0,
    "pvNet" REAL NOT NULL DEFAULT 0.0,
    "pvNetEuro" REAL NOT NULL DEFAULT 0.0,
    "qte" REAL NOT NULL DEFAULT 0.0,
    "tva" INTEGER NOT NULL DEFAULT 0,
    "compte" TEXT,
    "unite" TEXT,
    "temps" REAL NOT NULL DEFAULT 0.0,
    "nonEdit" INTEGER NOT NULL DEFAULT 0,
    "variante" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "DevisLigne_codeDocument_fkey" FOREIGN KEY ("codeDocument") REFERENCES "Devis" ("code") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO DevisLigne VALUES(1,'D2022-001',0,0,NULL,0,0,NULL,NULL,NULL,'Pose d''un parquet',0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,20.989999999999998437,0.0,0.0,75.0,10,NULL,'m2',0.0,0,0);
INSERT INTO DevisLigne VALUES(2,'D2022-001',1,0,NULL,0,0,NULL,NULL,NULL,'Forfait nettoyage',0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,59.99000000000000199,0.0,0.0,1.0,20,NULL,'U',0.0,0,0);
INSERT INTO DevisLigne VALUES(3,'D2022-002',0,0,NULL,0,0,NULL,NULL,NULL,'Isolation des combles',0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,17.0,0.0,0.0,150.0,7,NULL,'m2',0.0,0,0);
CREATE TABLE IF NOT EXISTS "FactureLigne" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "codeDocument" TEXT NOT NULL,
    "numLigne" INTEGER NOT NULL,
    "numBuf" INTEGER NOT NULL,
    "idSousTotal" INTEGER,
    "nivTr" INTEGER NOT NULL DEFAULT 0,
    "nivOuv" INTEGER NOT NULL DEFAULT 0,
    "type" TEXT,
    "numerotation" INTEGER,
    "codeElement" TEXT,
    "libelle" TEXT,
    "deb" REAL NOT NULL DEFAULT 0.0,
    "fgF" REAL NOT NULL DEFAULT 0.0,
    "fgMo" REAL NOT NULL DEFAULT 0.0,
    "fgMat" REAL NOT NULL DEFAULT 0.0,
    "fg" REAL NOT NULL DEFAULT 0.0,
    "pr" REAL NOT NULL DEFAULT 0.0,
    "ben" REAL NOT NULL DEFAULT 0.0,
    "coef" REAL NOT NULL DEFAULT 0.0,
    "pv" REAL NOT NULL DEFAULT 0.0,
    "pvEuro" REAL NOT NULL DEFAULT 0.0,
    "pvNet" REAL NOT NULL DEFAULT 0.0,
    "pvNetEuro" REAL NOT NULL DEFAULT 0.0,
    "qte" REAL NOT NULL DEFAULT 0.0,
    "tva" INTEGER NOT NULL DEFAULT 0,
    "compte" TEXT,
    "unite" TEXT,
    "temps" REAL NOT NULL DEFAULT 0.0,
    "nonEdit" INTEGER NOT NULL DEFAULT 0,
    "variante" INTEGER NOT NULL DEFAULT 0,
    "avt" REAL NOT NULL DEFAULT 100.0,
    "qteOrigine" REAL NOT NULL DEFAULT 0.0,
    "pvOrigine" REAL NOT NULL DEFAULT 0.0,
    CONSTRAINT "FactureLigne_codeDocument_fkey" FOREIGN KEY ("codeDocument") REFERENCES "Facture" ("code") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO FactureLigne VALUES(1,'F2022-001',0,0,NULL,0,0,NULL,NULL,NULL,'Isolation des combles',0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,21.0,0.0,0.0,150.0,7,NULL,'m2',0.0,0,0,100.0,0.0,0.0);
CREATE TABLE IF NOT EXISTS "Acompte" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT NOT NULL,
    "dateEdition" DATETIME NOT NULL,
    "codeClient" TEXT NOT NULL,
    "sujet" TEXT,
    "totalHT" REAL NOT NULL DEFAULT 0.0,
    "totalTVA" REAL NOT NULL DEFAULT 0.0,
    "totalTTC" REAL NOT NULL DEFAULT 0.0,
    "dateCreation" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "codeDevis" TEXT,
    "codeFacture" TEXT,
    CONSTRAINT "Acompte_codeClient_fkey" FOREIGN KEY ("codeClient") REFERENCES "Client" ("code") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Acompte_codeDevis_fkey" FOREIGN KEY ("codeDevis") REFERENCES "Devis" ("code") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Acompte_codeFacture_fkey" FOREIGN KEY ("codeFacture") REFERENCES "Facture" ("code") ON DELETE SET NULL ON UPDATE CASCADE
);
CREATE TABLE IF NOT EXISTS "TVA" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "taux" REAL NOT NULL DEFAULT 0.0
);
DELETE FROM sqlite_sequence;
INSERT INTO sqlite_sequence VALUES('User',3);
INSERT INTO sqlite_sequence VALUES('Client',4);
INSERT INTO sqlite_sequence VALUES('Devis',4);
INSERT INTO sqlite_sequence VALUES('DevisLigne',8);
INSERT INTO sqlite_sequence VALUES('Facture',6);
INSERT INTO sqlite_sequence VALUES('FactureLigne',8);
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "Client_code_key" ON "Client"("code");
CREATE UNIQUE INDEX "Devis_code_key" ON "Devis"("code");
CREATE UNIQUE INDEX "Facture_code_key" ON "Facture"("code");
CREATE UNIQUE INDEX "Acompte_code_key" ON "Acompte"("code");
COMMIT;
