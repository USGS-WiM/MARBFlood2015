/**
 * Created by bdraper on 4/27/2015.
 */
var allLayers;

require([
    'esri/Color',
    'esri/geometry/Extent',
    'esri/layers/WMSLayerInfo',
    'esri/layers/FeatureLayer',
    'esri/symbols/SimpleFillSymbol',
    'esri/symbols/SimpleLineSymbol',
    'dojo/domReady!'
], function(
    Color,
    Extent,
    WMSLayerInfo,
    FeatureLayer,
    SimpleFillSymbol,
    SimpleLineSymbol
) {

    allLayers = [
        {
            "groupHeading": "feature layers",
            "showGroupHeading": false,
            "includeInLayerList": true,
            "layers": {
                "USGS Streamflow Gages": {
                    "url" : "http://commons.wim.usgs.gov/arcgis/rest/services/Miss2015/sitesOfInterest/MapServer/3",
                    "options": {
                        "id": "nwisStreamflowSites",
                        "opacity": 1.0,
                        "outFields": ["*"],
                        "visible": true
                    },
                    "wimOptions": {
                        "type": "layer",
                        "layerType": "agisFeature",
                        "includeInLayerList": true,
                        "includeLegend" : true,
                        "selectionSymbol": new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
                            new SimpleLineSymbol(SimpleLineSymbol.STYLE_DASHDOT,
                                new Color([255, 0, 0]), 2), new Color([255, 255, 0, 0.5]))
                    }
                },
                "US Army Corps of Engineers Diversions": {
                    "url" : "http://commons.wim.usgs.gov/arcgis/rest/services/Miss2015/sitesOfInterest/MapServer/2",
                    "options": {
                        "id": "usaceDiversions",
                        "opacity": 1.0,
                        "outFields": ["*"],
                        "visible": true
                    },
                    "wimOptions": {
                        "type": "layer",
                        "layerType": "agisFeature",
                        "includeInLayerList": true,
                        "includeLegend" : true
                    }
                },
                "USGS Continuous Water Quality Monitoring Sites": {
                    "url" : "http://commons.wim.usgs.gov/arcgis/rest/services/Miss2015/sitesOfInterest/MapServer/1",
                    "options": {
                        "id": "nwisSites",
                        "opacity": 1.0,
                        "outFields": ["*"],
                        "visible": true
                    },
                    "wimOptions": {
                        "type": "layer",
                        "layerType": "agisFeature",
                        "includeInLayerList": true,
                        "includeLegend" : true,
                        "selectionSymbol": new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
                            new SimpleLineSymbol(SimpleLineSymbol.STYLE_DASHDOT,
                                new Color([255, 0, 0]), 2), new Color([255, 255, 0, 0.5]))
                    }
                },
                "USGS super gages": {
                    "url" : "http://commons.wim.usgs.gov/arcgis/rest/services/Miss2015/sitesOfInterest/MapServer/0",
                    "options": {
                        "id": "nwisSuperSites",
                        "opacity": 1.0,
                        "outFields": ["*"],
                        "visible": true
                    },
                    "wimOptions": {
                        "type": "layer",
                        "layerType": "agisFeature",
                        "includeInLayerList": true,
                        "includeLegend" : true,
                        "selectionSymbol": new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
                            new SimpleLineSymbol(SimpleLineSymbol.STYLE_DASHDOT,
                                new Color([255, 0, 0]), 2), new Color([255, 255, 0, 0.5]))
                    }
                }
            }
        },
        {
            "groupHeading": "dynamic map services",
            "showGroupHeading": false,
            "includeInLayerList": true,
            "layers": {
                "Hydrologic Unit Code, 2-digit" : {
                    "url": "http://services.nationalmap.gov/arcgis/rest/services/selectable_polygons/MapServer",//"url": "http://apps.fs.fed.us/arcx/rest/services/EDW_FEATURE/EDW_Watersheds_01/MapServer",
                    "visibleLayers": [12],
                    "options": {
                        "id": "huc2",
                        "opacity": 1.0,
                        "visible": true
                    },
                    "wimOptions": {
                        "type": "layer",
                        "layerType": "agisDynamic",
                        "includeInLayerList": true,
                        "layerDefinition": [{
                            "id": "12",
                            "exp": "HUC2 IN ('05','06','07','08','10','11')"
                        }],
                        "includeLegend": true
                    }
                }
            },

        }

        /*,
        {
            "groupHeading": "extra may not need",
            "showGroupHeading": false,
            "includeInLayerList": false,
            "layers": {
                "HUC 4 (From NHD)" : {
                    "url": "http://services.nationalmap.gov/arcgis/rest/services/nhd/MapServer",
                    "visibleLayers": [2],
                    "options": {
                        "id": "huc4",
                        "opacity": 0.7,
                        "visible": false
                    },
                    "wimOptions": {
                        "type": "layer",
                        "layerType": "agisDynamic",
                        "includeInLayerList": false,
                        "hasOpacitySlider": true,
                        "layerDefinition": [{"id":"2","exp":"HUC_4 IN ('0512','0509','0514','0709','0713','0706','0708','0714','1030','0806','0807','0808','0809')"}],
                        "includeLegend" : true
                    }
                }
            },

        }*/
    ]

});





