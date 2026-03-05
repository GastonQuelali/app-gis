export const MAP_CONFIG = {
  ARCGIS_SERVER_URL:
    "https://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer",
  INITIAL_REGION: {
    latitude: -17.3895,
    longitude: -66.1568,
    zoom: 15,
  },
  BASE_MAPS: [
    { id: 'baseMap2019', name: '2019', url: 'http://192.168.105.219:6080/arcgis/rest/services/baseMap2019/MapServer' },
    { id: 'baseMap2018', name: '2018', url: 'http://192.168.105.219:6080/arcgis/rest/services/baseMap2018/MapServer' },
    { id: 'baseMap06102017', name: 'Oct 2017', url: 'http://192.168.105.219:6080/arcgis/rest/services/baseMap06102017/MapServer' },
    { id: 'baseMap2017', name: '2017', url: 'http://192.168.105.219:6080/arcgis/rest/services/baseMap2017/MapServer' },
    { id: 'baseMap2015', name: '2015', url: 'http://192.168.105.219:6080/arcgis/rest/services/baseMap2015/MapServer' },
    { id: 'baseMap2007', name: '2007', url: 'http://192.168.105.219:6080/arcgis/rest/services/baseMap2007/MapServer' },
  ],
  SERVICES: {
    PREDIOS:
      "http://192.168.105.219:6080/arcgis/rest/services/catastro/predios_cba/MapServer",
    MANZANAS:
      "http://192.168.105.219:6080/arcgis/rest/services/catastro/manzanasdb/MapServer",
    VIAS: "http://192.168.105.219:6080/arcgis/rest/services/planificacion/vias/MapServer",
    USO_SUELO:
      "http://192.168.105.219:6080/arcgis/rest/services/planificacion/usoSuelodb/MapServer",
    LIMITES:
      "http://192.168.105.219:6080/arcgis/rest/services/planificacion/limites2022/MapServer",
    IMAGEN_2022:
      "http://192.168.105.219:6080/arcgis/rest/services/imagenes/imagen2022/MapServer",
    GEOMETRY_SERVER:
      "http://192.168.105.219:6080/arcgis/rest/services/Utilities/Geometry/GeometryServer",
  },
};
