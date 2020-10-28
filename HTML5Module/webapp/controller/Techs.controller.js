sap.ui.define([
    "ns/HTML5Module/controller/App.controller",
    "sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	],
	function (AppController, Filter, FilterOperator) {
		"use strict";

		return AppController.extend("ns.HTML5Module.controller.Techs", {
            /**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf tosa8.my_gym.view.App
		 */
		onInit: function () {

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