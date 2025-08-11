-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('admin', 'medecin', 'personnel');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "pass" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,
    "adresse" TEXT NOT NULL,
    "role" "public"."Role" NOT NULL,
    "specialiteId" INTEGER,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Specialite" (
    "id" SERIAL NOT NULL,
    "libelle" TEXT NOT NULL,

    CONSTRAINT "Specialite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Patient" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "adresse" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Rv" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "statut" TEXT NOT NULL,
    "patientId" INTEGER NOT NULL,
    "medecinId" INTEGER NOT NULL,

    CONSTRAINT "Rv_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Prescription" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "type" TEXT NOT NULL,
    "commentaire" TEXT NOT NULL,
    "patientId" INTEGER NOT NULL,
    "medecinId" INTEGER NOT NULL,

    CONSTRAINT "Prescription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Facture" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "montant" DOUBLE PRECISION NOT NULL,
    "statut" TEXT NOT NULL,
    "prescriptionId" INTEGER NOT NULL,

    CONSTRAINT "Facture_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Payement" (
    "id" SERIAL NOT NULL,
    "montant_paye" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "factureId" INTEGER NOT NULL,

    CONSTRAINT "Payement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Chambre" (
    "id" SERIAL NOT NULL,
    "numero" TEXT NOT NULL,
    "statut" TEXT NOT NULL,

    CONSTRAINT "Chambre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Lit" (
    "id" SERIAL NOT NULL,
    "numero" TEXT NOT NULL,
    "statut" TEXT NOT NULL,
    "chambreId" INTEGER NOT NULL,

    CONSTRAINT "Lit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Hospitalisation" (
    "id" SERIAL NOT NULL,
    "date_entre" TIMESTAMP(3) NOT NULL,
    "dat_sortie" TIMESTAMP(3) NOT NULL,
    "patientId" INTEGER NOT NULL,
    "litsId" INTEGER NOT NULL,

    CONSTRAINT "Hospitalisation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Facture_prescriptionId_key" ON "public"."Facture"("prescriptionId");

-- AddForeignKey
ALTER TABLE "public"."User" ADD CONSTRAINT "User_specialiteId_fkey" FOREIGN KEY ("specialiteId") REFERENCES "public"."Specialite"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Rv" ADD CONSTRAINT "Rv_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "public"."Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Rv" ADD CONSTRAINT "Rv_medecinId_fkey" FOREIGN KEY ("medecinId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Prescription" ADD CONSTRAINT "Prescription_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "public"."Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Prescription" ADD CONSTRAINT "Prescription_medecinId_fkey" FOREIGN KEY ("medecinId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Facture" ADD CONSTRAINT "Facture_prescriptionId_fkey" FOREIGN KEY ("prescriptionId") REFERENCES "public"."Prescription"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Payement" ADD CONSTRAINT "Payement_factureId_fkey" FOREIGN KEY ("factureId") REFERENCES "public"."Facture"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Lit" ADD CONSTRAINT "Lit_chambreId_fkey" FOREIGN KEY ("chambreId") REFERENCES "public"."Chambre"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Hospitalisation" ADD CONSTRAINT "Hospitalisation_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "public"."Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Hospitalisation" ADD CONSTRAINT "Hospitalisation_litsId_fkey" FOREIGN KEY ("litsId") REFERENCES "public"."Lit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
