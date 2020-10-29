sap.ui.define([
    "ns/HTML5Module/controller/App.controller",
    "sap/m/MessageToast",
	"sap/m/MessageBox"
	],
	function (AppController, MessageToast, MessageBox) {
        "use strict";
        var oController;

		return AppController.extend("ns.HTML5Module.controller.NewTech", {
        /**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf tosa8.my_gym.view.App
		 */
		onInit: function () {
            oController = this;

            var number = 1100000000 + Math.floor(Math.random()*99999999);

            oController.byId("tel").setValue(number);
        },
        
        onCreate: function(){
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
						MessageToast.show("Success: New Technician Created");
						this.getView().setBusy(false);
                        aInputs.forEach(function (oInput) {
                            oInput.setValue(null);
                            oInput.setValueState("None");
                        });
                        this.navToTechs();
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

            var number = 1100000000 + Math.floor(Math.random()*99999999);
            oController.byId("tel").setValue(number);

            oController.onNavBack();
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