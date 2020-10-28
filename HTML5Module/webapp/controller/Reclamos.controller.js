sap.ui.define([
    "ns/HTML5Module/controller/App.controller",
    "sap/m/MessageToast"
	],
	function (AppController, MessageToast) {
		"use strict";
        var oController;
		return AppController.extend("ns.HTML5Module.controller.Home", {
            /**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf tosa8.my_gym.view.App
		 */
		onInit: function () {

            oController = this;
            oController.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oController.oRouter.attachRouteMatched(oController._onRouteMatched, oController);
            
        },

        _onRouteMatched: function (oEvent) {

            var nCustomer = oEvent.getParameter("arguments").Idcustomer;
            if (nCustomer){
                var oModel = this.getView().getModel();
                var sPath = "/ClientesSet('" + nCustomer + "')";
                oModel.read(sPath, {
                    success: function (resultado) {
                        oController._setCabecera(resultado);
                    },
                    error: function (error) {
                        var mensaje = "Error info customer" + nCustomer;
                        MessageToast.show(mensaje);
                    }
                });

                oModel = this.getView().getModel();
                sPath = "/ClientesSet('" + nCustomer + "')/ReclamosSet";
                oModel.read(sPath, {
                    success: function (resultado) {
                        var modeloJSON = new sPath.ui.model.json.JSONModel(resultado.results);
                        oController.getView().byId("_ClaimDetail").setModel(modeloJSON,"ClaimDetail");
                    },
                    error: function (error) {
                        var mensaje = "Details couldn't be obtained: " + nCustomer;
                        MessageToast.show(mensaje);
                    }
                });
            }
        },

        _setCabecera: function (result) {
            var texto = "N° Customer: " + result.Idcustomer;
            oController.getView().byId("_title1").setText(texto);
            oController.getView().byId("_title2").setText(texto);

            texto = result.Name;
            oController.getView().byId("_name").setText(texto);
            texto = result.Lastname;
            oController.getView().byId("_lastname").setText(texto);
            texto = result.City;
            oController.getView().byId("_city").setText(texto);
            texto = result.Tel;
            oController.getView().byId("_phone").setText(texto);
        }
        

		
		});
    });