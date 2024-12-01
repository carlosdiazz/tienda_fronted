export interface PlataformaConfigInterface {
  name: string;
  img: string;
}

export const PlataformaConfig = (): PlataformaConfigInterface => {
  //TODO
  return {
    img: "/generica.png",
    name: "Tienda",
  };
};
