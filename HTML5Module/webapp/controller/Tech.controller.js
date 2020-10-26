sap.ui.define([
    "ns/HTML5Module/controller/App.controller",	
    "sap/m/MessageToast",
	"sap/m/MessageBox"
	],
	function (AppController, MessageToast, MessageBox) {
		"use strict";
	    var oController;
	    var oPreviousData;
		return AppController.extend("ns.HTML5Module.controller.Tech", {
            /**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf tosa8.my_gym.view.App
		 */
		onInit: function () {
            oPreviousData = 0;
			oController = this;
			var oRouter = this.getRouter();
			oRouter.getRoute("tech").attachMatched(this._onRouteMatched, this);
            
        },

        /*
            Routing 
        */
        _onRouteMatched: function (oEvent) {
			var oTech, oView;
			oTech = oEvent.getParameter("arguments");
			oController._readById(oTech.Idtech);
			oView = this.getView();
			oView.bindElement({
				path: "/tech(" + oTech.IdClte + ")",
				events: {
					dataRequested: function (oEvent) {
						oView.setBusy(true);
					},
					dataReceived: function (oEvent) {
						oView.setBusy(false);
					}
				}
			});
        },
                
        _onBindingChange: function (oArg) {

			// No data for the binding
			if (oPreviousData === 0) {
				oController.getRouter().getTargets().display("notFound");
			}
        },
        
        /*
        */
        _readById: function (oId) {
			var oModel = oController.getView().getModel();

			var sPath = oModel.createKey("/TecnicosSet", {
				Idtech: oId
			});

			oModel.read(sPath, {
				success: function (result) {
					oPreviousData = result;
					//this.getClientSports(sPath);
					this.loadTech(result);

				}.bind(this),
				error: function (error) {
					MessageToast.show("Error");
					oPreviousData = 0;
					//If not user, then display not found
					oController.getRouter().getTargets().display("notFound");

				}
			});

        },
        loadTech:function(result){

            var modelJSON = new sap.ui.model.json.JSONModel(result);
            this.byId("techPage").setModel(modelJSON, "Tech");
            debugger;
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