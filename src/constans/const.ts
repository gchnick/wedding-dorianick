import daiwyImage from "@/assets/daiwy.webp";
import yoraimaImage from "@/assets/yoraima.webp";
import yordalisImage from "@/assets/yordalis.webp";

export const weddingDateStringWithDay = "Viernes, 30 de enero de 2026"
export const weddingDateString = "30 de enero de 2026"
export const weddingDate = new Date('2026-01-30T20:00:00Z');


// Bridal Party
export const Girls = [
  { name: "Yoraima Rámirez", role: "Amiga del novio", photo: yoraimaImage },
  { name: "Yordalis Benavides", role: "Amiga del novio", photo: yordalisImage },
  { name: "Nayan Macheref", role: "Amiga de la novia" },
];

export const Boys = [
  { name: "Luis Barco", role: "Amigo de la novia" },
  { name: "Andrés Velázquez", role: "Amigo de la novia" },
  { name: "Daiwy Rangel", role: "Amigo del novio", photo: daiwyImage },
];