sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History"
	],
	function (Controller, History) {
		"use strict";

		return Controller.extend("ns.HTML5Module.controller.App", {
            getRouter: function () {
			return sap.ui.core.UIComponent.getRouterFor(this);
        },
    
		onNavBack: function (oEvent) {
			var oHistory, sPreviousHash;
			oHistory = History.getInstance();
			sPreviousHash = oHistory.getPreviousHash();
			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				this.getRouter().navTo("appHome", {}, true /*no history*/ );
			}
        },
        

        navToTechs: function(oEvent){
            this.getRouter().navTo("techsList");
        },

        navToNewTech: function(oEvent){
            this.getRouter().navTo("newTech");
        },

        /*
            Inputs
        */
        onValueChange: function (oEvent) {
			var oInput = oEvent.getSource();
			this._validateInput(oInput);

        },
        
        _validateInput: function (oInput) {
			var sValueState = "None";
			var bValidationError = false;
			var oString = oInput.getDOMValue();

			if (oString.length === 0) {
				bValidationError = true;
				sValueState = "Error";
			}
			oInput.setValueState(sValueState);

			return bValidationError;
        },

		});
	});
