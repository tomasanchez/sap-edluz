sap.ui.define([
    "ns/HTML5Module/controller/App.controller",
    "sap/m/MessageToast",
	"sap/m/MessageBox"   
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
			this.getRouter().navTo("complaIn",{
				Idcustomer : oId
			});
        },
        
        onNewCustomer: function(event) {
            if(!this._Dialog) {
                this._Dialog = sap.ui.xmlfragment("ns.HTML5Module.view.CreatePerson", this);
                var i18nModel = new sap.ui.model.resource.ResourceModel({
                    bundleUrl: "i18n/i18n.properties"
                });
                this._Dialog.setModel(i18nModel, "i18n");
            }
            this._Dialog.open();
            sap.ui.getCore().byId("creator").setTitle("New Customer");
            var number = 1100000000 + Math.floor(Math.random()*99999999);

            sap.ui.getCore().byId("tel").setValue(number);
        },
        
        onCancel: function(oEvent) {
            this._Dialog.close();
        },

        onSave: function(oEvent) {

            var oModel = oController.getView().getModel(),
                aInputs = this._getInputsPersonalData(this),
                bValidationError = false;

			aInputs.forEach(function (oInput) {
				bValidationError = oController._validateInput(oInput) || bValidationError;
            }, oController);
            
           if (!bValidationError) {

                var oEntity = oController._createTech(aInputs)

				oController.getView().setBusy(true);

                
				oModel.create("/ClientesSet", oEntity, {
					success: function (resultado) {
						MessageToast.show("Success: New Customer with ID-#" + oEntity.Idcustomer + " has been Created");
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

        },

        _createCustomer: function (aInputs) {
			return {
				Idcustomer: Math.floor(Math.random() * 32767),
				Name: aInputs[0].getDOMValue(),
                Lastname: aInputs[1].getDOMValue(),
                Tel: aInputs[2].getDOMValue(),
                Province: aInputs[3].getDOMValue(),
                City: aInputs[4].getDOMValue(),
                Street: aInputs[5].getDOMValue(),
                Zip: aInputs[6].getDOMValue()
			};
		}

		
		});
    });