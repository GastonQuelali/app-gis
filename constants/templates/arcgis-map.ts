interface LayerConfig {
  title: string;
  id: string;
  url: string;
}

interface BaseMapConfig {
  year: number;
  url: string;
}

export interface ArcGISMapTemplateParams {
  latitude: number;
  longitude: number;
  zoom: number;
  capas: LayerConfig[];
  baseMaps: BaseMapConfig[];
  visibleLayers: string[];
}

export function generateArcGISHTML(params: ArcGISMapTemplateParams): string {
  const { latitude, longitude, zoom, capas, baseMaps, visibleLayers } = params;

  return `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no" />
    <link rel="stylesheet" href="https://js.arcgis.com/4.28/esri/themes/light/main.css" />
    <script src="https://js.arcgis.com/4.28/"></script>
    <style>
      html, body, #viewDiv { padding: 0; margin: 0; height: 100%; width: 100%; }
      .esri-ui-corner .esri-component { margin-bottom: 10px; }
      .esri-basemap-gallery { max-height: 500px !important; }
      .esri-basemap-gallery__item { height: 80px !important; margin-bottom: 5px !important; }
      .esri-basemap-gallery__item-thumbnail { height: 60px !important; width: auto !important; }
    </style>
  </head>
  <body>
    <div id="viewDiv"></div>
    <script>
      require([
        "esri/Map", 
        "esri/views/MapView", 
        "esri/layers/MapImageLayer",
        "esri/layers/TileLayer",
        "esri/Basemap",
        "esri/widgets/LayerList",
        "esri/widgets/BasemapGallery",
        "esri/widgets/Expand",
        "esri/widgets/Search",
        "esri/widgets/Home"
      ], (Map, MapView, MapImageLayer, TileLayer, Basemap, LayerList, BasemapGallery, Expand, Search, Home) => {

        const map = new Map();
        const layers = {};

        const capas = ${JSON.stringify(capas)};

        capas.forEach(c => {
          if(c.url) {
            const ly = new MapImageLayer({ 
              url: c.url, 
              title: c.title,
              id: c.id,
              visible: c.id === "LIMITES"
            });
            layers[c.id] = ly;
            map.add(ly);
          }
        });

        const view = new MapView({
          container: "viewDiv",
          map: map,
          center: [${longitude}, ${latitude}],
          zoom: ${zoom}
        });

        view.when(() => {
          window.updateLayers = (visibleIds) => {
            Object.keys(layers).forEach(id => {
              if (layers[id]) {
                layers[id].visible = visibleIds.includes(id);
              }
            });
          };

          window.updateLayers(${JSON.stringify(visibleLayers.length > 0 ? visibleLayers : ['LIMITES'])});
        });

        function crearBasemap(url, titulo, id) {
          const tileLayer = new TileLayer({
            url: url,
            title: titulo,
            copyright: "GRS 80 - MARGEN SIRGAS(WGS 84)"
          });
          return new Basemap({
            baseLayers: [tileLayer],
            title: titulo,
            id: id,
            thumbnailUrl: url + "/info/thumbnail"
          });
        }

        const baseMaps = ${JSON.stringify(baseMaps.map(bm => ({
          url: bm.url,
          title: bm.year.toString(),
          id: `baseMap${bm.year}`
        })))}.map(bm => crearBasemap(bm.url, bm.title, bm.id));

        const basemapGallery = new BasemapGallery({
          view: view,
          source: baseMaps
        });

        const basemapGalleryExpand = new Expand({
          view: view,
          content: basemapGallery,
          expandIcon: "basemap",
          group: "bottom-right"
        });
        
        view.ui.add(basemapGalleryExpand, "bottom-right");

        const searchWidget = new Search({ view: view });
        const searchExpand = new Expand({
          view: view,
          content: searchWidget,
          expanded: false,
          group: "top-right"
        });
        view.ui.add(searchExpand, "top-right");

        const layerList = new LayerList({ 
          view: view,
          selectionEnabled: true,
          container: document.createElement("div")
        });
        
        const layerExpand = new Expand({
          view: view,
          content: layerList,
          expandIcon: "layers",
          group: "top-right"
        });
        view.ui.add(layerExpand, "top-right");

        const homeBtn = new Home({ view: view });
        view.ui.add(homeBtn, "top-left");

      });
    </script>
  </body>
</html>`;
}