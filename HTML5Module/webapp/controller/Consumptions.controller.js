sap.ui.define([
    "sap/ui/vbm/AnalyticMap",
    "ns/HTML5Module/controller/App.controller",
    "sap/ui/model/json/JSONModel",
	"sap/ui/Device",
	"sap/m/MessageToast"
	],
	function(AnalyticMap, AppController, JSONModel, Device, MessageToast) {
        "use strict";
        AnalyticMap.("https://infra.datos.gob.ar/catalog/modernizacion/dataset/7/distribution/7.2/download/provincias.json")
		return AppController.extend("ns.HTML5Module.controller.Home", {
            /**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf tosa8.my_gym.view.App
		 */
		onInit: function () {
            var oModel = new JSONModel(this._getMap());
            this.getView().setModel(oModel, "Map");
            
            // set the device model
			var oDeviceModel = new JSONModel(Device);
			oDeviceModel.setDefaultBindingMode("OneWay");
            this.getView().setModel(oDeviceModel, "device");
            
            oModel.attachRequestCompleted(function(oEvent) {
				for (var i = 0; i <= 50; i++) {
					var birth2013 = oModel.getProperty("/Regions/" + i + "/birth2013");
					var birth2006 = oModel.getProperty("/Regions/" + i + "/birth2006");
					var birthRate = ((birth2006 - birth2013) / birth2013) * 100;
					if (birthRate >= 15) {
						oModel.setProperty("/Regions/" + i + "/color", "rgb(27,126,172)");
					} else if (birthRate >= 10) {
						oModel.setProperty("/Regions/" + i + "/color", "rgb(39,163,221)");
					} else if (birthRate >= 5) {
						oModel.setProperty("/Regions/" + i + "/color", "rgb(92,186,229)");
					} else if (birthRate >= 1) {
						oModel.setProperty("/Regions/" + i + "/color", "rgb(132,202,236)");
					} else {
						oModel.setProperty("/Regions/" + i + "/color", "rgb(171,219,242)");
					}
				}
            });
            
            this.byId("vbi").setVisualFrame({
				"minLon": -130,
				"maxLon": -62,
				"minLat": 15,
				"maxLat": 58,
				"minLOD": 4
			});
		},


        _getMap: function(){
            return {
		"Regions":
			[
		        {
		            "county": "CABA",
		            "code": "AR-C",
		            "birth2013": "15.1",
		            "birth2006": "17.09"
		        },
		        {
		            "county": "Buenos Aires",
		            "code": "AR-B",
		            "birth2013": "11.64",
		            "birth2006": "13.19"
		        },
		        {
		            "county": "Catamarca",
		            "code": "AR-K",
		            "birth2013": "12.71",
		            "birth2006": "13.73"
		        },
		        {
		            "county": "Chaco",
		            "code": "AR-H",
		            "birth2013": "8.83",
		            "birth2006": "10.66"
		        },
		        {
		            "county": "Chubut",
		            "code": "AR-U",
		            "birth2013": "10.26",
		            "birth2006": "12.15"
		        },
		        {
		            "county": "Cordoba",
		            "code": "AR-X",
		            "birth2013": "9.83",
		            "birth2006": "10.42"
		        },
		        {
		            "county": "Corrientes",
		            "code": "AR-W",
		            "birth2013": "12.41",
		            "birth2006": "13.7"
		        },
		        {
		            "county": "DistrictofColumbia",
		            "code": "AR-E",
		            "birth2013": "13.32",
		            "birth2006": "16"
		        },
		        {
		            "county": "Florida",
		            "code": "AR-P",
		            "birth2013": "13.55",
		            "birth2006": "13.79"
		        },
		        {
		            "county": "Georgia",
		            "code": "AR-Y",
		            "birth2013": "12.71",
		            "birth2006": "14.13"
		        },
		        {
		            "county": "Idaho",
		            "code": "AR-L",
		            "birth2013": "10.46",
		            "birth2006": "11.58"
		        },
		        {
		            "county": "Illinois",
		            "code": "AR-F",
		            "birth2013": "11.75",
		            "birth2006": "13.29"
		        },
		        {
		            "county": "Indiana",
		            "code": "AR-M",
		            "birth2013": "10.99",
		            "birth2006": "13.24"
		        },
		        {
		            "county": "Iowa",
		            "code": "AR-N",
		            "birth2013": "11.06",
		            "birth2006": "11.57"
		        },
		        {
		            "county": "Kansas",
		            "code": "AR-Q",
		            "birth2013": "10.81",
		            "birth2006": "11.8"
		        },
		        {
		            "county": "Kentucky",
		            "code": "AR-R",
		            "birth2013": "12.63",
		            "birth2006": "15.1"
		        },
		        {
		            "county": "Louisiana",
		            "code": "AR-A",
		            "birth2013": "15.1",
		            "birth2006": "16.36"
		        },
		        {
		            "county": "Maine",
		            "code": "AR-J",
		            "birth2013": "9.32",
		            "birth2006": "11.09"
		        },
		        {
		            "county": "Maryland",
		            "code": "AR-D",
		            "birth2013": "11.88",
		            "birth2006": "13.52"
		        },
		        {
		            "county": "MassachARetts",
		            "code": "AR-Z",
		            "birth2013": "10.01",
		            "birth2006": "11.29"
		        },
		        {
		            "county": "Michigan",
		            "code": "AR-S",
		            "birth2013": "11.65",
		            "birth2006": "12.52"
		        },
		        {
		            "county": "Minnesota",
		            "code": "AR-G",
		            "birth2013": "9.85",
		            "birth2006": "10.51"
		        },
		        {
		            "county": "Mississippi",
		            "code": "AR-V",
		            "birth2013": "16.57",
		            "birth2006": "18.77"
		        },
		        {
		            "county": "Missouri",
		            "code": "AR-T",
		            "birth2013": "11.33",
		            "birth2006": "12.8"
		        }
		    ],
			"Legend":
				[
					{
						"text": "No change",
						"color": "rgb(171,219,242)"
					},
					{
						"text": "1% - 4%",
						"color": "rgb(132,202,236)"
					},
					{
						"text": "5% - 9%",
						"color": "rgb(92,186,229)"
					},
					{
						"text": "10% - 14%",
						"color": "rgb(39,163,221)"
					},
					{
						"text": "15% or more decline",
						"color": "rgb(27,126,172)"
					}
				]
	}
        }
		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf tosa8.my_gym.view.App
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf tosa8.my_gym.view.App
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf tosa8.my_gym.view.App
		 */
		//	onExit: function() {
		//
		//	}
		});
    });