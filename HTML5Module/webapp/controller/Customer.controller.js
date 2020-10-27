sap.ui.define([
    "ns/HTML5Module/controller/App.controller",
    "sap/m/MessageToast"
	],
	function (AppController, MessageToast) {
        "use strict";
        //var oController;

		return AppController.extend("ns.HTML5Module.controller.Customer", {
        
		onInit: function () {

        //     oController = this;

        // },

        // refreshTable: function(oEvent){
        //     this.refresh();
        // },

        // refresh: function() {

        //     var oModel = this.getView().getModel();

        //     oModel.read("/ClientesSet", {
        //         success: function (resultado){
        //             MessageToast.show("Exito");
        //             this.loadModel(resultado.results);
        //         }.bind(this),
        //         error: function (error) {
        //             MessageToast.show("Error");
        //         }
        //     });
        // },

        // loadModel: function (arrayResultado) {
        //     var nuevoResultado = [];
        //     arrayResultado.forEach(function (item) {
        //         nuevoResultado.push(item);
        //     }.bind(this));

        //     var modeloJSON = new sap.ui.model.json.JSONModel(nuevoResultado);
        //     oController.getView().setModel(modeloJSON, "/ClientesSet");
        // }

        

		
		});
    });