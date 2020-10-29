sap.ui.define([
    "ns/HTML5Module/controller/App.controller",
    "sap/ui/model/json/JSONModel",
	"sap/ui/Device",
	"sap/m/MessageToast"
	],
	function( AppController, JSONModel, Device, MessageToast) {
        "use strict";
		return AppController.extend("ns.HTML5Module.controller.Home", {
            /**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf tosa8.my_gym.view.App
		 */
		onInit: function () {
            var oModel = new JSONModel(this._getMonths());
            this.getView().setModel(oModel);
            
            // set the device model
			var oDeviceModel = new JSONModel(Device);
			oDeviceModel.setDefaultBindingMode("OneWay");
            this.getView().setModel(oDeviceModel, "device");
            
            oModel.attachRequestCompleted(function(oEvent) {
				for (var i = 0; i <= 50; i++) {
					var vConsumption = oModel.getProperty("/Months/" + i + "/Consumption");
					var vTests = oModel.getProperty("/Months/" + i + "/Tests");
					var vAverage = (vConsumption / vTests);
					oModel.setProperty("/Months/" + i + "/Consuption", vAverage);
				}
            });
            
        },

        press: function (oEvent) {
			MessageToast.show("The interactive line chart is pressed.");
		},

		selectionChanged: function (oEvent) {
			var oPoint = oEvent.getParameter("point");
			MessageToast.show("The selection changed: " + oPoint.getLabel() + " " + ((oPoint.getSelected()) ? "selected" : "deselected"));
		},

        _getMonths: function(){
            return {
                Months:[
                    {
                        Name: "January",
                        Tag: "Jan",
                        Id: 1,
                        Consumption: 1200,
                        Tests: 1,
                    },
                    {
                        Name: "February",
                        Tag: "Feb",
                        Id: 2,
                        Consumption: 1130,
                        Tests: 1,
                    },
                    {
                        Name: "March",
                        Tag: "March",
                        Id: 3,
                        Consumption: 1049,
                        Tests: 1
                    },
                    {
                        Name: "April",
                        Tag: "April",
                        Id: 4,
                        Consumption: 879,
                        Tests: 1
                    },
                    {
                        Name: "May",
                        Tag: "May",
                        Id: 5,
                        Consumption: 897,
                        Tests: 1
                    },
                    {
                        Name: "June",
                        Tag: "June",
                        Id: 6,
                        Consumption: 932,
                        Tests: 1
                    },
                    {
                        Name: "July",
                        Tag: "July",
                        Id: 7,
                        Consumption: 1123,
                        Tests: 1
                    },
                    {
                        Name: "August",
                        Tag: "Aug",
                        Id: 8,
                        Consumption: 1240,
                        Tests: 1
                    },
                    {
                        Name: "September",
                        Tag: "Sep",
                        Id: 3,
                        Consumption: 1049,
                        Tests: 1
                    },
                    {
                        Name: "October",
                        Tag: "Oct",
                        Id: 10,
                        Consumption: 920,
                        Tests: 1,
                    },
                    {
                        Name: "November",
                        Tag: "Nov",
                        Id: 11,
                        Consumption: 876,
                        Tests: 1,
                    },
                    {
                        Name: "October",
                        Tag: "Oct",
                        Id: 12,
                        Consumption: 980,
                        Tests: 1,
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