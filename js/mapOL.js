(function() {

var iconStyle = new ol.style.Style({
  image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
    anchor: [0.5, 46],
    anchorXUnits: 'fraction',
    anchorYUnits: 'pixels',
    opacity: 0.75,
    src: '../img/car_trans.png'
  }))
});



var image0 = new ol.style.Circle({
  radius: 4,
  //fill: null,
  fill: new ol.style.Fill({
    //color: 'red'
    color: 'rgba(255,0,0,0.2)'
  }),
  stroke: new ol.style.Stroke({color: 'red', width: 0})
});

var image = new ol.style.Icon({
  //anchor: [0.5, 0.5],
  //anchorXUnits: 'pixels',
  //anchorYUnits: 'pixels',
  //origin: [0, 0],
  scale: 0.4,
  //size: [50,50],
  src: '../img/car_trans.png'
});


var styles = {
  'Point': [new ol.style.Style({
    image: image
  })],

  'PointKyros': [new ol.style.Style({
    image: image
  })],

  'LineString': [new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: 'green',
      width: 1
    })
  })],
  'MultiLineString': [new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: 'green',
      width: 1
    })
  })],
  'MultiPoint': [new ol.style.Style({
    image: image
  })],
  'MultiPolygon': [new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: 'red',
      width: 1
    }),
    fill: new ol.style.Fill({
      color: 'rgba(255, 255, 0, 0.1)'
    })
  })],
  'Polygon': [new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: 'blue',
      lineDash: [4],
      width: 3
    }),
    fill: new ol.style.Fill({
      color: 'rgba(0, 0, 255, 0.1)'
    })
  })],
  'GeometryCollection': [new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: 'magenta',
      width: 2
    }),
    fill: new ol.style.Fill({
      color: 'magenta'
    }),
    image: new ol.style.Circle({
      radius: 10,
      fill: null,
      stroke: new ol.style.Stroke({
        color: 'magenta'
      })
    })
  })],
  'Circle': [new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: 'red',
      width: 2
    }),
    fill: new ol.style.Fill({
      color: 'rgba(255,0,0,0.2)'
    })
  })]
};

/*
var gmap = new google.maps.Map(document.getElementById('gmap'), {
  disableDefaultUI: true,
  keyboardShortcuts: false,
  draggable: false,
  disableDoubleClickZoom: true,
  scrollwheel: false,
  streetViewControl: false
});
*/

var styleFunction = function(feature, resolution) {
  return styles[feature.getGeometry().getType()];
};

var scaleLineControl = new ol.control.ScaleLine();

    var map = new ol.Map({
        target: 'olmap',
        /*
        controls: ol.control.defaults({
    attributionOptions:  ({
      collapsible: true

    })
  }).extend([
    scaleLineControl
  ]),*/
        //renderer: 'webgl',
        layers: [
            new ol.layer.Group({
                'title': 'Base maps',
                layers: [
                    new ol.layer.Tile({
                        title: 'OSM',
                        type: 'base',
                        visible: false,
                        source: new ol.source.OSM()
                    }),
                    
                    new ol.layer.Tile({
                        title: 'Mapbox Satellite',
                        type: 'base',
                        visible: false,
                        source: new ol.source.MapQuest({layer: 'sat'})
                    }),

                    

                    new ol.layer.Tile({
                        title: 'Bing Satellite',
                        type: 'base',
                        visible: false,
                        preload: Infinity,
                        source: new ol.source.BingMaps({
                            key: 'Ak-dzM4wZjSqTlzveKz5u0d4IQ4bRzVI309GxmkgSVr1ewS6iPSrOvOKhA-CJlm3',
                            imagerySet: 'AerialWithLabels'
                        })
                    }),

                    new ol.layer.Tile({
                        title: 'Bing Road',
                        type: 'base',
                        visible: true,
                        preload: Infinity,
                        source: new ol.source.BingMaps({
                            key: 'Ak-dzM4wZjSqTlzveKz5u0d4IQ4bRzVI309GxmkgSVr1ewS6iPSrOvOKhA-CJlm3',
                            imagerySet: 'Road'
                        })
                    }),
                       
                    new ol.layer.Tile({
                        title: 'Mapquest Road',
                        type: 'base',
                        visible: false,
                        style: 'Road',
                        source: new ol.source.MapQuest({layer: 'osm'})
                    }),
                    
                    new ol.layer.Tile({
                        title: 'Mapquest Aereal',
                        type: 'base',
                        visible: false,
                        style: 'Aerial',
                        visible: false,
                        source: new ol.source.MapQuest({layer: 'sat'})
                    }),

                    new ol.layer.Tile({
                        title: 'Mapquest Hibrid',
                        type: 'base',
                        visible: false,
                        style: 'AerialWithLabels',
                        visible: false,
                        source: new ol.source.MapQuest({layer: 'hyb'})
                    }),


                    new ol.layer.Tile({
                        title: 'KyrosMap',
                        type: 'base',
                        visible: false,
                        source: new ol.source.XYZ({
                            url: 'http://api.tiles.mapbox.com/v4/carlrue.lackpjbi/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiY2FybHJ1ZSIsImEiOiJZV1FERi1JIn0.K_IUlvW51jT19DxdY5hJJQ'
                        })
                    }),

                    new ol.layer.Tile({
                        title: 'Nokia Here',
                        type: 'base',
                        visible: false,
                        source: new ol.source.XYZ({
                            url: 'http://maptile.lbs.ovi.com/maptiler/v2/maptile/newest/hybrid.day/{$z}/{$x}/{$y}/256/png8?lg=RUS&token=fee2f2a877fd4a429f17207a57658582&appId=nokiaMaps'
                        })
                    })


                   
                    
                ]
            }),

            new ol.layer.Group({
                title: 'Stamen',
                layers: [
                    new ol.layer.Tile({
                        title: 'Water color',
                        type: 'base',
                        visible: false,
                        source: new ol.source.Stamen({
                            layer: 'watercolor'
                        })
                    }),
                    new ol.layer.Tile({
                        title: 'Toner',
                        type: 'base',
                        visible: false,
                        source: new ol.source.XYZ({
                            url: 'http://tile.stamen.com/toner/{z}/{x}/{y}.jpg',
                            crossOrigin: 'null'
                        })
                    })

                   /* new ol.layer.Tile({
                        title: 'Toner',
                        source: new ol.source.OSM({
                        attributions: [
                            new ol.Attribution({
                                html: 'All maps &copy; ' +'<a href="http://www.openseamap.org/">OpenSeaMap</a>'
                            }),
                            ol.source.OSM.ATTRIBUTION
                        ],
                        crossOrigin: null,
                        url: 'http://tiles.openseamap.org/seamark/{z}/{x}/{y}.png'
                        })
                    })*/


                ]
            }),

            new ol.layer.Group({
                title: 'Weather',
                layers: [
                    

                    new ol.layer.Tile({
                        title: 'Clouds',
                        visible: false,
                        source: new ol.source.XYZ({                            
                        url: 'http://{s}.tile.openweathermap.org/map/clouds/{z}/{x}/{y}.png”'
                        })

                    }),

                    new ol.layer.Tile({
                        title: 'Precipitation',
                        visible: false,
                        source: new ol.source.XYZ({                            
                        url: 'http://{s}.tile.openweathermap.org/map/precipitation/{z}/{x}/{y}.png”'
                        })

                    }),

                    new ol.layer.Tile({
                        title: 'Wind',
                        visible: false,
                        source: new ol.source.XYZ({                            
                        url: 'http://{s}.tile.openweathermap.org/map/wind/{z}/{x}/{y}.png”'
                        })

                    }),

                    new ol.layer.Tile({
                        title: 'Temperature',
                        visible: false,
                        source: new ol.source.XYZ({                            
                        url: 'http://{s}.tile.openweathermap.org/map/temp/{z}/{x}/{y}.png”'
                        })

                    }),
                ]
            }),
            new ol.layer.Group({
                title: 'Overlays',
                layers: [
                    new ol.layer.Tile({
                        title: 'Countries',
                        visible: false,
                        source: new ol.source.TileWMS({
                            url: 'http://demo.opengeo.org/geoserver/wms',
                            params: {'LAYERS': 'ne:ne_10m_admin_1_states_provinces_lines_shp'},
                            serverType: 'geoserver'
                            
                        })
                    }),
                    new ol.layer.Vector({
                        title: 'Tracking',
                        source : new ol.source.GeoJSON({
                            projection : 'EPSG:900913',
                            url : '../php/kyros_geojson.php'
                            }),
                        style: styleFunction,
                        visible: true
                    }),
                    new ol.layer.Vector({
                        title: 'Provincias',
                        source : new ol.source.GeoJSON({
                            projection : 'EPSG:900913',
                            url : '../esp_adm2.geojson'
                            }),
                        style: styleFunction,
                        visible: false
                    }),

                   


                    
                    /*new ol.layer.Vector({
                        title: 'Runkeeper',
                        source : new ol.source.GeoJSON({
                            projection : 'EPSG:900913',
                            //url : 'http://carlrue.cartodb.com/api/v2/sql?format=GeoJSON&q=SELECT%20*%20FROM%20Runkeeper%20&api_key=7bab444d7b809f85afd0b489e2467d412c62a47c'
                            url : 'http://carlrue.cartodb.com/api/v2/sql?format=GeoJSON&q=SELECT%20*%20FROM%20Runkeeper%20LIMIT%2040000&api_key=7bab444d7b809f85afd0b489e2467d412c62a47c'
                            }),
                        style: styleFunction,
                        visible: false
                    }),*/

                    
                    /*
                    new ol.layer.Heatmap({
                        title: 'Runkeeper Heatmap',
                        source : new ol.source.GeoJSON({
                            projection : 'EPSG:900913',
                            //url : 'http://carlrue.cartodb.com/api/v2/sql?format=GeoJSON&q=SELECT%20*%20FROM%20Runkeeper%20&api_key=7bab444d7b809f85afd0b489e2467d412c62a47c'
                            url : 'http://carlrue.cartodb.com/api/v2/sql?format=GeoJSON&q=SELECT%20*%20FROM%20Runkeeper%20LIMIT%2040000&api_key=7bab444d7b809f85afd0b489e2467d412c62a47c'
                            }),
                        //style: styleFunction,
                        radius: 4,
                        visible: false
                    }),
                    */
                    


                    /*
                    new ol.layer.Vector({
                        title: 'Edificio',
                        source : new ol.source.GeoJSON({
                            projection : 'EPSG:900913',
                            url : '../build.geojson'
                            }),
                        style: styleFunction,
                        visible: false
                    })*/

                ]
            }),


        ],
        view: new ol.View({
            center: ol.proj.transform([-3.0, 42.69], 'EPSG:4326', 'EPSG:900913'),
            //center: ol.proj.transform([13.42857, 52.49480], 'EPSG:4326', 'EPSG:900913'),
            zoom: 6

        })
    });

    var layerSwitcher = new ol.control.LayerSwitcher({
        tipLabel: 'Légende' // Optional label for button
    });
    map.addControl(layerSwitcher);

    map.addControl(new ol.control.FullScreen());

var element = document.getElementById('popup');

var popup = new ol.Overlay({
  element: element,
  positioning: 'bottom-center',
  stopEvent: false
});
map.addOverlay(popup);

map.on('click', function(evt) {
  var feature = map.forEachFeatureAtPixel(evt.pixel,
      function(feature, layer) {
        return feature;
      });
  if (feature) {
    var geometry = feature.getGeometry();
    var coord = geometry.getCoordinates();
    popup.setPosition(coord);
    $(element).popover({
      'placement': 'top',
      'html': true,
      'content': feature.get('name')
    });
    $(element).popover('show');
  } else {
    $(element).popover('destroy');
  }
});

    //map.addControl(new ol.control.ScaleLine);
    //map.addControl(new ol.control.OverviewMap);

    var jpl_wms = new ol.layer.Tile({
                        title: 'OSM',
                        type: 'base',
                        visible: true,
                        source: new ol.source.OSM()
                    });

    var options = {layers: [jpl_wms]};
    map.addControl(new ol.control.OverviewMap(options));

    map.addControl(new ol.control.ZoomSlider());

    /*
    var ol3d = new olcs.OLCesium({map: olmap});
var scene = ol3d.getCesiumScene();
var terrainProvider = new Cesium.CesiumTerrainProvider({
    url : '//cesiumjs.org/stk-terrain/tilesets/world/tiles'
});
scene.terrainProvider = terrainProvider;
ol3d.setEnabled(true);*/

    //zoomslider = new ol.control.ZoomSlider();
    //map.addControl(zoomslider);


})();
