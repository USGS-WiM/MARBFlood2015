function addCommas(e){e+="";for(var t=e.split("."),a=t[0],i=t.length>1?"."+t[1]:"",o=/(\d+)(\d{3})/;o.test(a);)a=a.replace(o,"$1,$2");return a+i}function camelize(e){return e.replace(/(?:^\w|[A-Z]|\b\w)/g,function(e,t){return 0==t?e.toLowerCase():e.toUpperCase()}).replace(/\s+/g,"")}var allLayers;require(["esri/geometry/Extent","esri/layers/WMSLayerInfo","esri/layers/FeatureLayer","dojo/domReady!"],function(e,t,a){allLayers=[{groupHeading:"dynamic map services",showGroupHeading:!1,includeInLayerList:!0,layers:{"HUC 4 from Forest Service":{url:"http://apps.fs.fed.us/arcx/rest/services/EDW_FEATURE/EDW_Watersheds_01/MapServer",visibleLayers:[1],options:{id:"huc4",opacity:1,visible:!0},wimOptions:{type:"layer",layerType:"agisDynamic",includeInLayerList:!0,hasOpacitySlider:!0,layerDefinition:[{id:"1",exp:"HUC_4 IN ('0512','0509','0514','0709','0713','0706','0708','0714','1030','0801','0802','0803','0806','0807','0808','0809')"}],includeLegend:!0}}}},{groupHeading:"feature layers",showGroupHeading:!1,includeInLayerList:!0,layers:{"ACE Diversions":{url:"http://commons.wim.usgs.gov/arcgis/rest/services/Miss2015/sitesOfInterest/MapServer/1",options:{id:"aceDiversions",opacity:1,outFields:["*"],visible:!0},wimOptions:{type:"layer",layerType:"agisFeature",includeInLayerList:!0,hasOpacitySlider:!0,hasZoomto:!0,includeLegend:!0}},"NWIS Sites of interest":{url:"http://commons.wim.usgs.gov/arcgis/rest/services/Miss2015/sitesOfInterest/MapServer/0",options:{id:"nwisSites",opacity:1,outFields:["*"],visible:!0},wimOptions:{type:"layer",layerType:"agisFeature",includeInLayerList:!0,hasOpacitySlider:!0,hasZoomto:!0,includeLegend:!0}}}}]});var map,allLayers,maxLegendHeight,maxLegendDivHeight,dragInfoWindows=!0,defaultMapCenter=[-95.6,38.6];require(["esri/arcgis/utils","esri/map","esri/dijit/HomeButton","esri/dijit/LocateButton","esri/layers/ArcGISTiledMapServiceLayer","esri/dijit/Geocoder","esri/dijit/PopupTemplate","esri/graphic","esri/geometry/Extent","esri/geometry/Multipoint","esri/geometry/Point","esri/SpatialReference","esri/symbols/PictureMarkerSymbol","esri/geometry/webMercatorUtils","dojo/dnd/Moveable","dojo/query","dojo/dom","dojo/dom-class","dojo/on","dojo/domReady!"],function(e,t,a,i,o,s,n,l,r,c,p,d,g,u,m,y,h,f,v){function b(){1===h.byId("chkExtent").checked?M.activeGeocoder.searchExtent=map.extent:M.activeGeocoder.searchExtent=null}function w(){b();var e=M.find();e.then(function(e){L(e)}),$("#geosearchModal").modal("hide")}function x(e){S();var t=e.graphic?e.graphic:e.result.feature;t.setSymbol(H)}function L(e){if(e=e.results,e.length>0){S();for(var t=0;t<e.length;t++);var a=new p(e[0].feature.geometry);map.centerAndZoom(a,17)}}function S(){map.infoWindow.hide(),map.graphics.clear()}function z(e,t,a,i,o){return new g({angle:0,xoffset:t,yoffset:a,type:"esriPMS",url:e,contentType:"image/png",width:i,height:o})}if(!jQuery.support.cors&&window.XDomainRequest){var k=/^https?:\/\//i,T=/^get|post$/i,D=new RegExp("^"+location.protocol,"i"),O=/\/xml/i;jQuery.ajaxTransport("text html xml json",function(e,t,a){if(e.crossDomain&&e.async&&T.test(e.type)&&k.test(t.url)&&D.test(t.url)){var i=null,o=(t.dataType||"").toLowerCase();return{send:function(a,s){i=new XDomainRequest,/^\d+$/.test(t.timeout)&&(i.timeout=t.timeout),i.ontimeout=function(){s(500,"timeout")},i.onload=function(){var e="Content-Length: "+i.responseText.length+"\r\nContent-Type: "+i.contentType,t={code:200,message:"success"},a={text:i.responseText};try{if("json"===o)try{a.json=JSON.parse(i.responseText)}catch(n){t.code=500,t.message="parseerror"}else if("xml"===o||"text"!==o&&O.test(i.contentType)){var l=new ActiveXObject("Microsoft.XMLDOM");l.async=!0;try{l.loadXML(i.responseText)}catch(n){l=void 0}if(!l||!l.documentElement||l.getElementsByTagName("parsererror").length)throw t.code=500,t.message="parseerror","Invalid XML: "+i.responseText;a.xml=l}}catch(r){throw r}finally{s(t.code,t.message,a,e)}},i.onerror=function(){s(500,"error",{text:i.responseText})},i.open(e.type,e.url),i.send()},abort:function(){i&&i.abort()}}}})}jQuery.support.cors=!0,map=t("mapDiv",{basemap:"topo",extent:new r(-11855313.614264622,3059969.795996928,-7946629.735874887,5606240.082232042,new d({wkid:3857}))});var C=new a({map:map},"homeButton");C.startup();var I=new i({map:map},"locateButton");I.startup(),$(window).resize(function(){$("#legendCollapse").hasClass("in")?(maxLegendHeight=.9*$("#mapDiv").height(),$("#legendElement").css("height",maxLegendHeight),$("#legendElement").css("max-height",maxLegendHeight),maxLegendDivHeight=$("#legendElement").height()-parseInt($("#legendHeading").css("height").replace("px","")),$("#legendDiv").css("max-height",maxLegendDivHeight)):$("#legendElement").css("height","initial")}),v(map,"load",function(){var e=map.getScale().toFixed(0);$("#scale")[0].innerHTML=addCommas(e);var t=u.webMercatorToGeographic(map.extent.getCenter());if($("#latitude").html(t.y.toFixed(3)),$("#longitude").html(t.x.toFixed(3)),1==dragInfoWindows){var a=y(".title",map.infoWindow.domNode)[0],i=new m(map.infoWindow.domNode,{handle:a});v(i,"FirstMove",function(){var e=y(".outerPointer",map.infoWindow.domNode)[0];f.add(e,"hidden");var e=y(".pointer",map.infoWindow.domNode)[0];f.add(e,"hidden")}.bind(this))}}),v(map,"zoom-end",function(){var e=map.getScale().toFixed(0);$("#scale")[0].innerHTML=addCommas(e)}),v(map,"mouse-move",function(e){if($("#mapCenterLabel").css("display","none"),null!=e.mapPoint){var t=u.webMercatorToGeographic(e.mapPoint);$("#latitude").html(t.y.toFixed(3)),$("#longitude").html(t.x.toFixed(3))}}),v(map,"pan-end",function(){$("#mapCenterLabel").css("display","inline");var e=u.webMercatorToGeographic(map.extent.getCenter());$("#latitude").html(e.y.toFixed(3)),$("#longitude").html(e.x.toFixed(3))});var j=new o("http://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer");v(h.byId("btnStreets"),"click",function(){map.setBasemap("streets"),map.removeLayer(j)}),v(h.byId("btnSatellite"),"click",function(){map.setBasemap("satellite"),map.removeLayer(j)}),v(h.byId("btnHybrid"),"click",function(){map.setBasemap("hybrid"),map.removeLayer(j)}),v(h.byId("btnTerrain"),"click",function(){map.setBasemap("terrain"),map.removeLayer(j)}),v(h.byId("btnGray"),"click",function(){map.setBasemap("gray"),map.removeLayer(j)}),v(h.byId("btnNatGeo"),"click",function(){map.setBasemap("national-geographic"),map.removeLayer(j)}),v(h.byId("btnOSM"),"click",function(){map.setBasemap("osm"),map.removeLayer(j)}),v(h.byId("btnTopo"),"click",function(){map.setBasemap("topo"),map.removeLayer(j)}),v(h.byId("btnNatlMap"),"click",function(){map.addLayer(j)}),v(map,"click",function(e){});var M=new s({value:"",maxLocations:25,autoComplete:!0,arcgisGeocoder:!0,autoNavigate:!1,map:map},"geosearch");M.startup(),M.on("select",x),M.on("findResults",L),M.on("clear",S),v(M.inputNode,"keydown",function(e){13==e.keyCode&&b()});var H=z("../images/purple-pin.png",0,12,13,24);map.on("load",function(){map.infoWindow.set("highlight",!1),map.infoWindow.set("titleInBody",!1)}),map.on("layer-add",function(e){var t=e.layer.id;"nwisSites"==t&&map.getLayer(t).on("click",function(e){console.log(e.graphic.attributes.Name);var t=e.graphic,a=t.attributes,i="http://waterservices.usgs.gov/nwis/iv/?format=json&sites="+a.Name+"&parameterCd=00060,00065,00010,00095,63680,99133",o="";$.ajax({dataType:"json",type:"GET",url:i,headers:{Accept:"*/*"},success:function(a){var i=a;$.each(i.value.timeSeries,function(e,t){var a=t.variable.variableCode[0].value,i="",s=t.variable.unit.unitAbbreviation,n="";if(t.values[0].value.length>0){var n=t.values[0].value[0].value;switch(a){case"00060":i="Discharge";break;case"00065":i="Gage height";break;case"00010":i="Temperature, water";break;case"00095":i="Specific cond at 25C";break;case"63680":i="Turbidity, Form Neph";break;case"99133":i="NO3+NO2,water,insitu"}var l="<label>"+i+": <span style='font-weight: normal'>"+n+", "+s+"</span></label><br/>";o+=l}});var s=new esri.InfoTemplate("<span class=''>Site No: ${Name}</span>","<div id='rtInfo'>"+o+"</div>");t.setInfoTemplate(s),map.infoWindow.setFeatures([t]),map.infoWindow.show(e.mapPoint),map.infoWindow.resize(290,400)},error:function(e){console.log("Error processing the JSON. The error is:"+e)}})})}),v(h.byId("btnGeosearch"),"click",w),$(document).ready(function(){function e(){$("#geosearchModal").modal("show")}function t(){$("#aboutModal").modal("show")}$("#geosearchNav").click(function(){e()}),$("#aboutNav").click(function(){t()}),$("#html").niceScroll(),$("#sidebar").niceScroll(),$("#sidebar").scroll(function(){$("#sidebar").getNiceScroll().resize()}),$("#legendDiv").niceScroll(),maxLegendHeight=.9*$("#mapDiv").height(),$("#legendElement").css("max-height",maxLegendHeight),$("#legendCollapse").on("shown.bs.collapse",function(){maxLegendHeight=.9*$("#mapDiv").height(),$("#legendElement").css("max-height",maxLegendHeight),maxLegendDivHeight=$("#legendElement").height()-parseInt($("#legendHeading").css("height").replace("px","")),$("#legendDiv").css("max-height",maxLegendDivHeight)}),$("#legendCollapse").on("hide.bs.collapse",function(){$("#legendElement").css("height","initial")})}),require(["esri/dijit/Legend","esri/tasks/locator","esri/tasks/query","esri/tasks/QueryTask","esri/graphicsUtils","esri/geometry/Point","esri/geometry/Extent","esri/layers/ArcGISDynamicMapServiceLayer","esri/layers/FeatureLayer","esri/SpatialReference","esri/layers/WMSLayer","esri/layers/WMSLayerInfo","dijit/form/CheckBox","dijit/form/RadioButton","dojo/query","dojo/dom","dojo/dom-class","dojo/dom-construct","dojo/dom-style","dojo/on"],function(e,t,a,i,o,s,n,l,r,c,p,d,g,u,m,y,h,f,v,b){function w(e,t,a,i,o,n,l){if(map.addLayer(a),L.push([o,camelize(i),a]),o){if(!$("#"+camelize(o)).length){var r=$('<div id="'+camelize(o+" Root")+'" class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default active" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-check-square-o"></i>&nbsp;&nbsp;'+o+"</button> </div>");r.click(function(e){r.find("i.glyphspan").toggleClass("fa-check-square-o fa-square-o"),$.each(L,function(e,t){var a=map.getLayer(t[2].id);if(t[0]==o)if($("#"+t[1]).find("i.glyphspan").hasClass("fa-dot-circle-o")&&r.find("i.glyphspan").hasClass("fa-check-square-o")){console.log("adding layer: ",t[1]),map.addLayer(t[2]);var a=map.getLayer(t[2].id);a.setVisibility(!0)}else r.find("i.glyphspan").hasClass("fa-square-o")&&(console.log("removing layer: ",t[1]),map.removeLayer(t[2]))})});var p=$('<div id="'+camelize(o)+'" class="btn-group-vertical" data-toggle="buttons"></div>');$("#toggle").append(p)}if(a.visible)var d=$('<div id="'+camelize(i)+'" class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <label class="btn btn-default"  style="font-weight: bold;text-align: left"> <input type="radio" name="'+camelize(o)+'" autocomplete="off"><i class="glyphspan fa fa-dot-circle-o '+camelize(o)+'"></i>&nbsp;&nbsp;'+i+"</label> </div>");else var d=$('<div id="'+camelize(i)+'" class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <label class="btn btn-default"  style="font-weight: bold;text-align: left"> <input type="radio" name="'+camelize(o)+'" autocomplete="off"><i class="glyphspan fa fa-circle-o '+camelize(o)+'"></i>&nbsp;&nbsp;'+i+"</label> </div>");$("#"+camelize(o)).append(d),d.click(function(e){if($(this).find("i.glyphspan").hasClass("fa-circle-o")){$(this).find("i.glyphspan").toggleClass("fa-dot-circle-o fa-circle-o");var t=$(this)[0].id;$.each(L,function(e,a){if(a[0]==o)if(a[1]==t&&$("#"+camelize(o+" Root")).find("i.glyphspan").hasClass("fa-check-square-o")){console.log("adding layer: ",a[1]),map.addLayer(a[2]);var i=map.getLayer(a[2].id);i.setVisibility(!0)}else a[1]==t&&$("#"+camelize(o+" Root")).find("i.glyphspan").hasClass("fa-square-o")?console.log("groud heading not checked"):(console.log("removing layer: ",a[1]),map.removeLayer(a[2]),$("#"+a[1]).find("i.glyphspan").hasClass("fa-dot-circle-o")&&$("#"+a[1]).find("i.glyphspan").toggleClass("fa-dot-circle-o fa-circle-o"))})}})}else{if(a.visible&&void 0!==l.hasOpacitySlider&&1==l.hasOpacitySlider&&void 0!==l.hasZoomto&&1==l.hasZoomto)var d=$('<div class="btn-group-vertical lyrTogDiv" style="cursor: pointer;" data-toggle="buttons"> <button id="'+a.id+'"type="button" class="btn btn-default active" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-check-square-o"></i>&nbsp;&nbsp;'+i+'<span id="opacity'+camelize(i)+'" class="glyphspan glyphicon glyphicon-adjust pull-right opacity"></span><span class="glyphicon glyphicon-search pull-right zoomto"></span></button></div>');else if(a.visible||void 0===l.hasOpacitySlider||1!=l.hasOpacitySlider||void 0===l.hasZoomto||1!=l.hasZoomto)if(a.visible&&void 0!==l.hasOpacitySlider&&1==l.hasOpacitySlider)var d=$('<div class="btn-group-vertical lyrTogDiv" style="cursor: pointer;" data-toggle="buttons"> <button id="'+a.id+'"type="button" class="btn btn-default active" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-check-square-o"></i>&nbsp;&nbsp;'+i+'<span id="opacity'+camelize(i)+'" class="glyphspan glyphicon glyphicon-adjust pull-right"></button></div>');else if(a.visible||void 0===l.hasOpacitySlider||1!=l.hasOpacitySlider)if(a.visible&&0==l.hasOpacitySlider&&void 0!==l.hasZoomto&&1==l.hasZoomto)var d=$('<div class="btn-group-vertical lyrTogDiv" style="cursor: pointer;" data-toggle="buttons"> <button id="'+a.id+'"type="button" class="btn btn-default active" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-check-square-o"></i>&nbsp;&nbsp;'+i+'<span class="glyphicon glyphicon-search pull-right zoomto"></span></button></span></div>');else if(a.visible||0!=l.hasOpacitySlider||void 0===l.hasZoomto||1!=l.hasZoomto)if(a.visible)var d=$('<div class="btn-group-vertical lyrTogDiv" style="cursor: pointer;" data-toggle="buttons"> <button id="'+a.id+'"type="button" class="btn btn-default active" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-check-square-o"></i>&nbsp;&nbsp;'+i+"</button></span></div>");else var d=$('<div class="btn-group-vertical lyrTogDiv" style="cursor: pointer;" data-toggle="buttons"> <button id="'+a.id+'"type="button" class="btn btn-default" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-square-o"></i>&nbsp;&nbsp;'+i+"</button> </div>");else var d=$('<div class="btn-group-vertical lyrTogDiv" style="cursor: pointer;" data-toggle="buttons"> <button id="'+a.id+'"type="button" class="btn btn-default" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-square-o"></i>&nbsp;&nbsp;'+i+'<span class="glyphicon glyphicon-search pull-right zoomto"></span></button></span></div>');else var d=$('<div class="btn-group-vertical lyrTogDiv" style="cursor: pointer;" data-toggle="buttons"> <button id="'+a.id+'"type="button" class="btn btn-default" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-square-o"></i>&nbsp;&nbsp;'+i+'<span id="opacity'+camelize(i)+'" class="glyphspan glyphicon glyphicon-adjust pull-right"></button></div>');else var d=$('<div class="btn-group-vertical lyrTogDiv" style="cursor: pointer;" data-toggle="buttons"> <button id="'+a.id+'"type="button" class="btn btn-default" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-square-o"></i>&nbsp;&nbsp;'+i+'<span id="opacity'+camelize(i)+'" class="glyphspan glyphicon glyphicon-adjust pull-right opacity"></span><span class="glyphicon glyphicon-search pull-right zoomto"></span></button></div>');d.click(function(e){$(this).find("i.glyphspan").toggleClass("fa-check-square-o fa-square-o"),$(this).find("button").button("toggle"),e.preventDefault(),e.stopPropagation(),$("#"+camelize(i)).toggle(),a.visible?a.setVisibility(!1):a.setVisibility(!0)})}if(t){var g=camelize(e);if(!$("#"+g).length){var u=$('<div id="'+g+'"><div class="alert alert-info" role="alert"><strong>'+e+"</strong></div></div>");$("#toggle").append(u)}o?($("#"+g).append(r),$("#"+g).append(p)):($("#"+g).append(d),$("#opacity"+camelize(i)).length>0&&$("#opacity"+camelize(i)).hover(function(){$(".opacitySlider").remove();var e=map.getLayer(n.id).opacity,t=$('<div class="opacitySlider"><label id="opacityValue">Opacity: '+e+'</label><label class="opacityClose pull-right">X</label><input id="slider" type="range"></div>');$("body").append(t),$("#slider")[0].value=100*e,$(".opacitySlider").css("left",event.clientX-180),$(".opacitySlider").css("top",event.clientY-50),$(".opacitySlider").mouseleave(function(){$(".opacitySlider").remove()}),$(".opacityClose").click(function(){$(".opacitySlider").remove()}),$("#slider").change(function(e){var t=$("#slider")[0].value/100;console.log("o: "+t),$("#opacityValue").html("Opacity: "+t),map.getLayer(n.id).setOpacity(t)})}),$(".zoomto").hover(function(e){$(".zoomDialog").remove();var t=this.parentNode.id,a=$('<div class="zoomDialog"><label class="zoomClose pull-right">X</label><br><div class="list-group"><a href="#" id="zoomscale" class="list-group-item lgi-zoom zoomscale">Zoom to scale</a> <a id="zoomcenter" href="#" class="list-group-item lgi-zoom zoomcenter">Zoom to center</a><a id="zoomextent" href="#" class="list-group-item lgi-zoom zoomextent">Zoom to extent</a></div></div>');$("body").append(a),$(".zoomDialog").css("left",event.clientX-80),$(".zoomDialog").css("top",event.clientY-5),$(".zoomDialog").mouseleave(function(){$(".zoomDialog").remove()}),$(".zoomClose").click(function(){$(".zoomDialog").remove()}),$("#zoomscale").click(function(e){var a=map.getLayer(t).minScale;map.setScale(a)}),$("#zoomcenter").click(function(e){var t=new s(defaultMapCenter,new c({wkid:4326}));map.centerAt(t)}),$("#zoomextent").click(function(e){var a=map.getLayer(t).fullExtent;map.setExtent(a)})}))}else $("#toggle").append(d)}var x=[],L=[];$.each(allLayers,function(e,t){console.log("processing: ",t.groupHeading),$.each(t.layers,function(e,a){var i="";if(a.wimOptions.exclusiveGroupName&&(i=a.wimOptions.exclusiveGroupName),"agisFeature"===a.wimOptions.layerType){var o=new r(a.url,a.options);a.wimOptions&&1==a.wimOptions.includeLegend&&x.push({layer:o,title:e}),w(t.groupHeading,t.showGroupHeading,o,e,i,a.options,a.wimOptions)}else if("agisWMS"===a.wimOptions.layerType){var o=new p(a.url,{resourceInfo:a.options.resourceInfo,visibleLayers:a.options.visibleLayers},a.options);a.wimOptions&&1==a.wimOptions.includeLegend&&x.push({layer:o,title:e}),w(t.groupHeading,t.showGroupHeading,o,e,i,a.options,a.wimOptions)}else if("agisDynamic"===a.wimOptions.layerType){var o=new l(a.url,a.options);if(a.wimOptions&&1==a.wimOptions.includeLegend&&x.push({layer:o,title:e}),a.visibleLayers&&o.setVisibleLayers(a.visibleLayers),a.wimOptions.layerDefinition){for(var s=[],n=0;n<a.wimOptions.layerDefinition.length;n++)s[a.wimOptions.layerDefinition[n].id]=a.wimOptions.layerDefinition[n].exp;o.setLayerDefinitions(s),o.refresh()}w(t.groupHeading,t.showGroupHeading,o,e,i,a.options,a.wimOptions)}})});var S=new e({map:map,layerInfos:x},"legendDiv");S.startup()})}),$(document).ready(function(){});