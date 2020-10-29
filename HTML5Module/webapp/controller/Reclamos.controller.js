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
            var oRouter = this.getRouter();
            oRouter.getRoute("complaint").attachMatched(this._onRouteMatched, this);
            
        },

        _onRouteMatched: function (oEvent) {
           /* if (nCustomer){
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
                }); */
                
            // Getting customer ID
            var oCustomer = oEvent.getParameter("arguments");
            // reading oData
			oController._readById(oCustomer.Idcustomer);
			var oView = this.getView();
			oView.bindElement({
				path: "/complaint(" + oCustomer.Idcustomer + ")",
				events: {
					dataRequested: function (oEvent) {
						oView.setBusy(true);
					},
					dataReceived: function (oEvent) {
						oView.setBusy(false);
					}
				}
            });
            /*    var oModel = this.getView().getModel(),
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
            } */
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
        },

        _setComplaint: function(oResult){
            var modelJSON = new sap.ui.model.json.JSONModel(oResult.results);
            this.byId("_ClaimDetail").setModel(modelJSON, "ClaimDetail");
        },

        _setContent: function (result){
            oController.byId("idcomplaint").setValue(result.Idcomplaint);
            oController.byId("type").setValue(result.Type);
            oController.byId("date").setValue(result.Dateopen);
            oController.byId("status").setValue(result.Status);
            oController.byId("urgency").setValue(result.Urgency);
            
        },

         _readById: function (oId) {
			var oModel = oController.getView().getModel();

			var sPath = oModel.createKey("/ClientesSet", {
				Idcustomer: oId
			});

			oModel.read(sPath, {
				success: function (result) {
                oController._setCabecera(result);
            //    oController._setContent(result);
                this._getComplaint(sPath);
                

				}.bind(this),
				error: function (error) {
					MessageToast.show("Error");
					//If not user, then display not found
					oController.getRouter().getTargets().display("notFound");

				}
			});

        },

        loadModel: function (result){
            oController._setCabecera(result);
            oController._setContent(result);
        },

        _getComplaint: function(sPath){
            var oModel = this.getView().getModel();

			oModel.read(sPath + "/Reclamos", {
				success: function (result) {
					this._setComplaint(result);
				}.bind(this),
				error: function (error) {
				}
			});
        }

        
        

		
		});
    });