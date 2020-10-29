sap.ui.define([
    "ns/HTML5Module/controller/App.controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageToast",
	"sap/m/MessageBox"
	],
	function (AppController, Filter, FilterOperator, MessageToast, MessageBox) {
		"use strict";
        var oController;

		return AppController.extend("ns.HTML5Module.controller.Techs", {
            /**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf tosa8.my_gym.view.App
		 */
		onInit: function () {
            oController = this;
        },
        
        onListItemPressed : function(oEvent){
			var oItem, oCtx, oId;
			oItem = oEvent.getSource();
			oCtx = oItem.getBindingContext();
			oId = oCtx.getProperty("Idtech");
			this.getRouter().navTo("tech",{
				Idtech : oId
			});
		},

        onSearch: function (oEvent) {
			// add filter for search
			var aFilters = [];
			var sQuery = oEvent.getSource().getValue();
			if (sQuery && sQuery.length > 0) {
				var filter = new Filter("Name", FilterOperator.Contains, sQuery);
				aFilters.push(filter);
			}

			// update list binding
			var oList = this.byId("idList");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilters, "Name");
        },
        
        onSelectionChange: function (oEvent) {
			var oList = oEvent.getSource();
			var oLabel = this.byId("idFilterLabel");
			var oInfoToolbar = this.byId("idInfoToolbar");

			// With the 'getSelectedContexts' function you can access the context paths
			// of all list items that have been selected, regardless of any current
			// filter on the aggregation binding.
			var aContexts = oList.getSelectedContexts(true);

			// update UI
			var bSelected = (aContexts && aContexts.length > 0);
			var sText = (bSelected) ? aContexts.length + " selected" : null;
			oInfoToolbar.setVisible(bSelected);
			oLabel.setText(sText);
        },
        
        onNewTech: function(event) {

            if(!this._Dialog) {
                this._Dialog = sap.ui.xmlfragment("ns.HTML5Module.view.CreatePerson", this);
                var i18nModel = new sap.ui.model.resource.ResourceModel({
                    bundleUrl: "i18n/i18n.properties"
                });
                this._Dialog.setModel(i18nModel, "i18n");
            }
            this._Dialog.open();
            sap.ui.getCore().byId("creator").setTitle("New Technician");
            var number = 1100000000 + Math.floor(Math.random()*99999999);

            sap.ui.getCore().byId("tel").setValue(number);
        },

        onSave: function(){
            var oModel = oController.getView().getModel();

            var aInputs = oController._getInputsPersonalData(),
                bValidationError = false;

			aInputs.forEach(function (oInput) {
				bValidationError = oController._validateInput(oInput) || bValidationError;
			}, oController);

			if (!bValidationError) {

                var oEntity = oController._createTech(aInputs)

				oController.getView().setBusy(true);

                
				oModel.create("/TecnicosSet", oEntity, {
					success: function (resultado) {
						MessageToast.show("Success: New Technician with ID-#" + oEntity.Idtech + " has been Created");
						this.getView().setBusy(false);
                        aInputs.forEach(function (oInput) {
                            oInput.setValue(null);
                            oInput.setValueState("None");
                        });
                        this._Dialog.close();
					}.bind(this),
					error: function (error) {
						MessageToast.show("Error: Something went wrong");
						oController.getView().setBusy(false);
					}
				});
                
			
			} else {
				MessageBox.alert("Oops! An error has occurred, verify fields.");
			}
        },

        onCancel: function(){

            oController._getInputsPersonalData().forEach(function (oInput) {
                oInput.setValue(null);
                oInput.setValueState("None");
            });

            oController._Dialog.close();
        },


        /*
            Private functions
        */
        
        _createTech: function (aInputs) {
			return {
				Idtech: Math.floor(Math.random() * 32767),
				Name: aInputs[0].getDOMValue(),
                Lastname: aInputs[1].getDOMValue(),
                Tel: aInputs[2].getDOMValue(),
                Province: aInputs[3].getDOMValue(),
                City: aInputs[4].getDOMValue(),
                Street: aInputs[5].getDOMValue(),
                Zip: aInputs[6].getDOMValue()
			};
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