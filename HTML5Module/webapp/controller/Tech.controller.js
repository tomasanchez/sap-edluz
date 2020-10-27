sap.ui.define([
    "ns/HTML5Module/controller/App.controller",	
    "sap/m/MessageToast",
	"sap/m/MessageBox"
	],
	function (AppController, MessageToast, MessageBox) {
		"use strict";
	    var oController;
        var oPreviousData;
        var aInputs = [];
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
            aInputs = oController._getInputs();
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
				path: "/tech(" + oTech.Idtech + ")",
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
            Getters
        */
        _getInputs: function(){
            return [
					oController.byId("name"),
                    oController.byId("lastname"),
                    oController.byId("tel"),
					oController.byId("province"),
					oController.byId("city"),
					oController.byId("street"),
                    oController.byId("zip")
                ];
        },

        _readById: function (oId) {
			var oModel = oController.getView().getModel();

			var sPath = oModel.createKey("/TecnicosSet", {
				Idtech: oId
			});

			oModel.read(sPath, {
				success: function (result) {
					oPreviousData = result;
                    this.loadTech(result);
                    this._getComplaints(sPath);
                    this._getMetrics(sPath);

				}.bind(this),
				error: function (error) {
					MessageToast.show("Error");
					oPreviousData = 0;
					//If not user, then display not found
					oController.getRouter().getTargets().display("notFound");

				}
			});

        },
                _getComplaints: function(sPath){
            var oModel = this.getView().getModel();

			oModel.read(sPath + "/Reclamos", {
				success: function (result) {
					this._setComplaints(result);
				}.bind(this),
				error: function (error) {
				}
			});
        },
        _getMetrics: function(sPath){
            var oModel = this.getView().getModel();

			oModel.read(sPath + "/Medidor", {
				success: function (result) {
					this._setMetrics(result);
				}.bind(this),
				error: function (error) {
				}
			});
        },

        /*
            Loaders 
        */
        loadTech:function(result){

            oController._setHeader(result);
            oController._setForm(result);
        },


        /*
            Setters 
        */
        _setHeader:function(oTech){
            var oExtendedHeader = oController.byId("_eHeader"),
                oSnappedHeader = oController.byId("_sHeader");
            
            /* Extended Header */
            oExtendedHeader.setText("Tech No. #" + oTech.Idtech);
                 /* Object Status - Header */
            oController.byId("_name").setText(oTech.Name + " " + oTech.Lastname);
            oController.byId("_address").setText(oTech.Street + ", " + oTech.City + ", " + oTech.Province);
            oController.byId("_phone").setText(oTech.Tel);

            /* Snapped Header */
            oSnappedHeader.setText(oTech.Lastname + ", " + oTech.Name + " - No. #" + oTech.Idtech);

        },

        _setForm: function(oTech){
            oController.byId("name").setValue(oTech.Name);
            oController.byId("lastname").setValue(oTech.Lastname);
            oController.byId("tel").setValue(oTech.Tel);
            oController.byId("street").setValue(oTech.Street);
            oController.byId("city").setValue(oTech.City);
            oController.byId("zip").setValue(oTech.Zip);
            oController.byId("province").setValue(oTech.Province);
        },

        _setComplaints: function(oResult){
            var modelJSON = new sap.ui.model.json.JSONModel(oResult.results);
			this.byId("complaintsList").setModel(modelJSON, "Complaints");
        },

        _setMetrics: function(oResult){
            var modelJSON = new sap.ui.model.json.JSONModel(oResult.results);
			this.byId("metersList").setModel(modelJSON, "Metrics");
        },

        /*  
            Buttons
        */
		handleEditPress: function (oEvent) {

			//Enabling Editing
			oController._enableEdits(true);
			oController._toggleButtonsAndView(true);

		},

		handleCancelPress: function () {
			//Restore the data
			oController._setForm(oPreviousData);
			oController._toggleButtonsAndView(false);
			oController._enableEdits(false);
		},

		handleSavePress: function () {

            var oTech = oController._createTech(aInputs);

			oPreviousData = oTech;

            oController._updateTech(oTech);
			oController._toggleButtonsAndView(false);
			oController._enableEdits(false);

        },

		_enableEdits: function (active) {
            aInputs.forEach(function(oInput){
                oInput.setEditable(active);
            });
		},

		_toggleButtonsAndView: function (bEdit) {

			// Show the appropriate action buttons
			oController.byId("edit").setVisible(!bEdit);
			oController.byId("save").setVisible(bEdit);
			oController.byId("cancel").setVisible(bEdit);
		},
        
        _createTech: function (aInputs) {
			return {
				Idtech: oPreviousData.Idtech,
				Name: aInputs[0].getDOMValue(),
                Lastname: aInputs[1].getDOMValue(),
                Tel: aInputs[2].getDOMValue(),
                Province: aInputs[3].getDOMValue(),
                City: aInputs[4].getDOMValue(),
                Street: aInputs[5].getDOMValue(),
                Zip: aInputs[6].getDOMValue()
			};
        },
        
        _updateTech: function (oTech) {

			var oModelDefault = this.getView().getModel();

			//Create Key
			var sPath = oModelDefault.createKey("/TecnicosSet", {
				Idtech: oTech.Idtech
			});


			oController.getView().setBusy(true);

			oModelDefault.update(sPath, oTech, {
				success: function (resultado) {
                    oController.getView().setBusy(false);
                    oController._setHeader(oTech);
					MessageToast.show("Success! Tech Updated");
				}.bind(this),
				error: function (error) {
					MessageToast.show("Error: something went wrong");
					oController.getView().setBusy(false);
				}
			});
		},

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