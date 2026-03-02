export const MAP_CONFIG = {
  ARCGIS_SERVER_URL:
    "https://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer",
  INITIAL_REGION: {
    latitude: -17.3895,
    longitude: -66.1568,
    zoom: 15,
  },
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
