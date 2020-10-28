sap.ui.define([
    "ns/HTML5Module/controller/App.controller",
    "sap/m/MessageToast"
	],
	function (AppController, MessageToast) {
        "use strict";
        var oController;

		return AppController.extend("ns.HTML5Module.controller.Customer", {
        
		onInit: function () {

            oController = this;
        
         },

         onListItemPressed : function(oEvent){
			var oItem, oCtx, oId;
			oItem = oEvent.getSource();
			oCtx = oItem.getBindingContext();
			oId = oCtx.getProperty("Idcustomer");
			this.getRouter().navTo("complaint",{
				Idcustomer : oId
			});
        },
        
        onNewCustomer: function(event) {
            if(!this._Dialog) {
                this._Dialog = sap.ui.xmlfragment("ns.HTML5Module.view.CreateCustomer", this);
                var i18nModel = new sap.ui.model.resource.ResourceModel({
                    bundleUrl: "i18n/i18n.properties"
                });
                this._Dialog.setModel(i18nModel, "i18n");
            }
            this._Dialog.open();
        },
        
        onCancel: function(oEvent) {
            this._Dialog.close();
        },

        onSave: function(oEvent) {
            var idCustomer = sap.ui.getCore().byId("_idCustomer").getValue();
            var nameC = sap.ui.getCore().byId("_idName").getValue();
            var lastC = sap.ui.getCore().byId("_idLastN").getValue();
            var provinceC = sap.ui.getCore().byId("_idProvince").getValue();
            var cityC = sap.ui.getCore().byId("_idCity").getValue();
            var streetC = sap.ui.getCore().byId("_idStreet").getValue();
            var zipC = sap.ui.getCore().byId("_idZip").getValue();
            var phoneC = sap.ui.getCore().byId("_idPhone").getValue();

            if (!idCustomer) {
                MessageToast.show("* required fields");
            }else {
                var oEntidad = {
                    Idcustomer: Math.floor(Math.random()*32767),
                    Name: nameC,
                    Lastname: lastC,
                    Province: provinceC,
                    City: cityC,
                    Street: streetC,
                    Zip: zipC,
                    Tel: phoneC
                };
                

                this.getView().setBusy(true);
                
                this.getView().getModel().create("/ClientesSet", oEntidad, {
                    success: function(resultado) {
                        this.getView().setBusy(false);
                        MessageToast.show("Success: Customer " + oEntidad.Idcustomer + " created");
                        this._Dialog.close();
                    }.bind(this),
                    error: function(error) {
                        MessageToast.show("Error");
                        this.getView().setBusy(false);
                    }.bind(this)
                });
            }
        },

        refreshTable: function(oEvent) {
            this.refresh();
        },

        refresh: function() {
            var oModel = this.getView().getModel();

            oModel.read("ClientesSet", {
                success: function (resultado) {
                    MessageToast.show("Success");
                    this.loadModel(resultado.results);
                }.bind(this),
                error: function(error) {
                    MessageToast.show("Error");
                }
            });
        },

        loadModel: function(arrayResultado) {
            var nuevoResultado = [];
            arrayResultado.forEach(function (item) {
                nuevoResultado.push(item);
            }.bind(this));

            var modeloJSON = new sap.ui.model.json.JSONModel(nuevoResultado);
            oController.getView().setModel(modeloJSON, "/ClientesSet");

        }

		
		});
    });