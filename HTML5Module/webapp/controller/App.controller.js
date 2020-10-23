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
        }

		});
	});
