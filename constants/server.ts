const SERVER_HOST = "192.168.105.219";
const SERVER_PORT = 6080;

export const ARCGIS_BASE_URL = `http://${SERVER_HOST}:${SERVER_PORT}/arcgis/rest/services`;
export const SERVER_BASE_URL = `http://${SERVER_HOST}:${SERVER_PORT}`;

export const SERVER_CONFIG = {
  HOST: SERVER_HOST,
  PORT: SERVER_PORT,

  get BASE_URL(): string {
    return SERVER_BASE_URL;
  },

  get ARCGIS_BASE_URL(): string {
    return ARCGIS_BASE_URL;
  },
};