/**
 * Created by bdraper on 4/27/2015.
 */
var allLayers;

require([
    "esri/geometry/Extent",
    "esri/layers/WMSLayerInfo",
    "esri/layers/FeatureLayer",
    'dojo/domReady!'
], function(
    Extent,
    WMSLayerInfo,
    FeatureLayer
) {

    allLayers = [
        {
            "groupHeading": "dynamic map services",
            "showGroupHeading": false,
            "includeInLayerList": true,
            "layers": {
                "HUC 4 from Forest Service" : {
                    "url": "http://apps.fs.fed.us/arcx/rest/services/EDW_FEATURE/EDW_Watersheds_01/MapServer",
                    "visibleLayers": [1],
                    "options": {
                        "id": "huc4",
                        "opacity": 1.0,
                        "visible": true
                    },
                    "wimOptions": {
                        "type": "layer",
                        "layerType": "agisDynamic",
                        "includeInLayerList": true,
                        "hasOpacitySlider": true,
                        "layerDefinition": [{
                            "id": "1",
                            "exp": "HUC_4 IN ('0512','0509','0514','0709','0713','0706','0708','0714','1030','0801','0802','0803','0806','0807','0808','0809')"
                        }],
                        "includeLegend": true
                    }
                }
            },

        },
        {
            "groupHeading": "feature layers",
            "showGroupHeading": false,
            "includeInLayerList": true,
            "layers": {
                "ACE Diversions": {
                    "url" : "http://commons.wim.usgs.gov/arcgis/rest/services/Miss2015/sitesOfInterest/MapServer/1",
                    "options": {
                        "id": "aceDiversions",
                        "opacity": 1.0,
                        "outFields": ["*"],
                        "visible": true
                    },
                    "wimOptions": {
                        "type": "layer",
                        "layerType": "agisFeature",
                        "includeInLayerList": true,
                        "hasOpacitySlider": true,
                        "hasZoomto": true,
                        "includeLegend" : true
                    }
                },
                "NWIS Sites of interest": {
                    "url" : "http://commons.wim.usgs.gov/arcgis/rest/services/Miss2015/sitesOfInterest/MapServer/0",
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
                        "hasOpacitySlider": true,
                        "hasZoomto": true,
                        "includeLegend" : true
                    }
                }
            }
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





