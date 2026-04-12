export const MAP_CONFIG = {
  INITIAL_REGION: {
    latitude: -17.3895,
    longitude: -66.1568,
    zoom: 15,
  },
};

export const ARCGIS_CONFIG = {
  SERVER: "http://192.168.105.219:6080",
  BASE_URL: "http://192.168.105.219:6080/arcgis/rest/services",

  LAYERS: {
    PREDIOS: "catastro/predios_cba/FeatureServer/0",
    MANZANAS: "catastro/manzana/MapServer",
    VIAS: "planificacion/vias/MapServer",
    USO_SUELO: "planificacion/usoSuelodb/MapServer",
    LIMITES: "planificacion/limites/MapServer",
  },

  BASE_MAPS: {
    1964: "imagenes/imagen1964_500/MapServer",
    1994: "imagenes/CBA_1994_500/MapServer",
    2000: "imagenes/imagen2000_500/MapServer",
    2004: "imagenes/imagen_2004500/MapServer",
    2007: "imagenes/imagen2007_500/MapServer",
    2008: "imagenes/CBBA_2008_500/MapServer",
    2009: "imagenes/imagen2009_500/MapServer",
    2010: "imagenes/imagen2010_500/MapServer",
    2011: "imagenes/imagen2011_500/MapServer",
    2012: "imagenes/imagen2012_500/MapServer",
    2013: "imagenes/imagen2013_500/MapServer",
    2014: "imagenes/imagen2014_500/MapServer",
    2015: "imagenes/imagen2015_500/MapServer",
    2016: "imagenes/CBBA_2016_500/MapServer",
    2017: "imagenes/imagen2017_500/MapServer",
    2018: "imagenes/CBA_2018500/MapServer",
    2019: "imagenes/imagen2019_500/MapServer",
    2022: "imagenes/imagen2022/MapServer",
    2023: "imagenes/imagen_2023_500/MapServer",
  },
};

export const getLayerUrl = (layerKey: keyof typeof ARCGIS_CONFIG.LAYERS): string => {
  return `${ARCGIS_CONFIG.SERVER}/arcgis/rest/services/${ARCGIS_CONFIG.LAYERS[layerKey]}`;
};

export const getBaseMapUrl = (year: keyof typeof ARCGIS_CONFIG.BASE_MAPS): string => {
  return `${ARCGIS_CONFIG.SERVER}/arcgis/rest/services/${ARCGIS_CONFIG.BASE_MAPS[year]}`;
};

export const getPrediosCountUrl = (): string => {
  return `${ARCGIS_CONFIG.SERVER}/arcgis/rest/services/catastro/predios_cba/FeatureServer/0/query?where=1=1&returnCountOnly=true&f=json`;
};

export const getManzanaCountUrl = (): string => {
  return `${ARCGIS_CONFIG.SERVER}/arcgis/rest/services/catastro/manzana/MapServer/0/query?where=1=1&returnCountOnly=true&f=json`;
};

export const getManzanaUrl = getManzanaCountUrl;
export const getManzanaSCountUrl = getManzanaCountUrl;