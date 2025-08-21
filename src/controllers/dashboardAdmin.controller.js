// import { prisma } from "../config/db.js";

// // nbre de patient par sexe
// const patientsParSexe = await prisma.patient.groupBy({
//   by: ["sexe"],
//   _count: { id: true },
// });

// //nbre de patient par tranche d'âge
// const allPatients = await prisma.patient.findMany({
//   select: { dateNaissance: true },
// });
// const today = new Date();
// const tranches = { "0-18": 0, "19-35": 0, "36-60": 0, "61+": 0 };
// allPatients.forEach((p) => {
//   const age = today.getFullYear() - p.dateNaissance.getFullYear();

//   const m = today.getMonth() - p.dateNaissance.getMonth();
//   if (m < 0 || (m === 0 && today.getDate() < p.dateNaissance.getDate())) {
//     age--;
//   }
//   if (age <= 18) tranches["0-18"]++;
//   else if (age <= 35) tranches["19-35"]++;
//   else if (age <= 60) tranches["36-60"]++;
//   else tranches["61+"]++;
// });
import { prisma } from "../config/db.js";

/* -------------------- Patients -------------------- */
// export const statsPatients = async () => {
//   const allPatients = await prisma.patient.findMany({
//     select: { dateNaissance: true, sexe: true, dateCreation: true }
//   });

//   const today = new Date();
//   const tranches = { "0-18": 0, "19-35": 0, "36-60": 0, "61+": 0 };
//   const sexeCount = { homme: 0, femme: 0 };
//   let totalToday = 0;
//   let totalThisWeek = 0;
//   let totalThisMonth = 0;

//   allPatients.forEach(p => {
//     // Calcul âge exact
//     let age = today.getFullYear() - p.dateNaissance.getFullYear();
//     const m = today.getMonth() - p.dateNaissance.getMonth();
//     if (m < 0 || (m === 0 && today.getDate() < p.dateNaissance.getDate())) age--;

//     if (age <= 18) tranches["0-18"]++;
//     else if (age <= 35) tranches["19-35"]++;
//     else if (age <= 60) tranches["36-60"]++;
//     else tranches["61+"]++;

//     // Sexe
//     if (p.sexe === "homme") sexeCount.homme++;
//     else if (p.sexe === "femme") sexeCount.femme++;

//     // Fréquentation
//     const created = new Date(p.dateCreation);
//     if (
//       created.getFullYear() === today.getFullYear() &&
//       created.getMonth() === today.getMonth() &&
//       created.getDate() === today.getDate()
//     ) totalToday++;

//     const weekStart = new Date(today);
//     weekStart.setDate(today.getDate() - today.getDay()); // lundi de la semaine
//     if (created >= weekStart) totalThisWeek++;

//     if (created.getMonth() === today.getMonth() && created.getFullYear() === today.getFullYear())
//       totalThisMonth++;
//   });
//   console.log("patients" ,allPatients);
  

//   return {
//     tranches,
//     sexeCount,
//     totalPatientsToday: totalToday,
//     totalPatientsThisWeek: totalThisWeek,
//     totalPatientsThisMonth: totalThisMonth
//   };
// };

export const statsPatients = async (c) => {
  const allPatients = await prisma.patient.findMany({
    select: { dateNaissance: true, sexe: true },
  });

  console.log("patients", allPatients);

  const today = new Date();
  const tranches = { "0-18": 0, "19-35": 0, "36-60": 0, "61+": 0 };
  const sexeCount = { homme: 0, femme: 0 };

  allPatients.forEach((p) => {
    let age = today.getFullYear() - p.dateNaissance.getFullYear();
    const m = today.getMonth() - p.dateNaissance.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < p.dateNaissance.getDate())) {
      age--;
    }

    if (age <= 18) tranches["0-18"]++;
    else if (age <= 35) tranches["19-35"]++;
    else if (age <= 60) tranches["36-60"]++;
    else tranches["61+"]++;

    if (p.sexe === "homme") sexeCount.homme++;
    if (p.sexe === "femme") sexeCount.femme++;
  });

  return c.json({
    totalPatients: allPatients.length,
    tranches,
    sexeCount,
  });
};

// export const statsPatients = async (c) => {
//   try {
//     const patients = await prisma.patient.groupBy({
//       by: ['sexe'],
//       _count: { sexe: true },
//     });

//     // Transformer en {hommes: X, femmes: Y}
//     const stats = patients.reduce(
//       (acc, p) => {
//         if (p.sexe.toLowerCase() === "homme") acc.hommes = p._count.sexe;
//         if (p.sexe.toLowerCase() === "femme") acc.femmes = p._count.sexe;
//         return acc;
//       },
//       { hommes: 0, femmes: 0 }
//     );

//     return c.json(stats);
//   } catch (error) {
//     return c.json({ error: error.message }, 500);
//   }
// };

/* -------------------- Rendez-vous -------------------- */
export const statsRendezVous = async () => {
  const rvs = await prisma.rv.findMany({ select: { statut: true } });
  let realises = 0, annules = 0;

  rvs.forEach(r => {
    if (r.statut.toLowerCase() === "realise") realises++;
    else if (r.statut.toLowerCase() === "annule") annules++;
  });

  return { rendezVousRealises: realises, rendezVousAnnules: annules };
};

/* -------------------- Lits / Chambres -------------------- */
export const statsLits = async () => {
  const lits = await prisma.lit.findMany({
    select: { statut: true, chambre: { select: { numero: true } } }
  });

  let total = lits.length;
  let occupe = lits.filter(l => l.statut.toLowerCase() === "occupe").length;

  return { totalLits: total, litsOccupe: occupe, tauxOccupation: occupe / total };
};

/* -------------------- Finances -------------------- */
export const statsFinances = async () => {
  const factures = await prisma.facture.findMany({ select: { montant: true, statut: true } });
  let total = 0, payes = 0, impayes = 0;

  factures.forEach(f => {
    total += f.montant;
    if (f.statut.toLowerCase() === "paye") payes += f.montant;
    else impayes += f.montant;
  });

  return { chiffreAffairesTotal: total, paiementsRecus: payes, impayes };
};

/* -------------------- Médecins -------------------- */
export const statsMedecins = async () => {
  const medecins = await prisma.user.findMany({
    where: { role: "medecin" },
    select: { prenom: true, nom: true, rvsMedecin: { select: { id: true } } }
  });

  return medecins.map(m => ({
    nom: `${m.prenom} ${m.nom}`,
    consultations: m.rvsMedecin.length
  }));
};
