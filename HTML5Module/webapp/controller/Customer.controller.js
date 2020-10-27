sap.ui.define([
    "ns/HTML5Module/controller/App.controller"
	],
	function (AppController) {
        "use strict";
        //var oController;

		return AppController.extend("ns.HTML5Module.controller.Customer", {
        
		onInit: function () {

        
         },

         onListItemPressed : function(oEvent){
			var oItem, oCtx, oId;
			oItem = oEvent.getSource();
			oCtx = oItem.getBindingContext();
			oId = oCtx.getProperty("Idcustomer");
			this.getRouter().navTo("complaint",{
				Idcustomer : oId
			});
        }
        

		
		});
    });