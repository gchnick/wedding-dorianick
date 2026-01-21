import andresVelazquez from "@/assets/andres-velazquez.webp";
import daiwyImage from "@/assets/daiwy.webp";
import luisBarco from "@/assets/luis-barco.webp";
import mariaLaya from "@/assets/maria-gabriela-laya.webp";
import yoraimaImage from "@/assets/yoraima.webp";
import yordalisImage from "@/assets/yordalis.webp";

export const weddingDateStringWithDay = "Viernes, 30 de enero de 2026";
export const weddingDateString = "30 de enero de 2026";
export const weddingDate = new Date("2026-01-30T20:00:00Z");

// Bridal Party
export const Girls = [
  { name: "Yoraima Rámirez", role: "Amiga del novio", photo: yoraimaImage },
  { name: "Yordalis Benavides", role: "Amiga del novio", photo: yordalisImage },
  { name: "María Gabriela Laya", role: "Amiga de la novia", photo: mariaLaya },
];

export const Boys = [
  { name: "Luis Barco", role: "Amigo de la novia", photo: luisBarco },
  {
    name: "Andrés Velázquez",
    role: "Amigo de la novia",
    photo: andresVelazquez,
  },
  { name: "Daiwy Rangel", role: "Amigo del novio", photo: daiwyImage },
];
