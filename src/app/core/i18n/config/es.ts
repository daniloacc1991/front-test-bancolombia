import { Locale } from "~core/models";

export const locale: Locale = {
  lang: 'es',
  data: {
    MENU: {
      LIST: 'LISTADO DE MONEDAS',
      CONVERT: 'REALIZAR CAMBIO',
    },
    CONVERT: {
      INPUTS: {
        MOUNT: 'Monto a Convertir',
        CRYPTOCURRENCY: 'Moneda / Criptomoneda',
        MOUNT_CONVERT: 'Monto Convertido'
      },
      BUTTONS: {
        CONVERT: 'Convertir'
      }
    },
    LIST: {
      HEADERS: {
        NAME: 'Nombre',
        PRICE: 'Precio',
        CRYPTOCURRENCY: 'Criptomoneda',
        CONVERT: 'Convertir',
      }
    }
  }
};
