const Inventory = require('../models/InventoryModel')


function acceptBuyInNextMonth (product, inventory){
  if(product === null){
    product = new Product();
  }
  if(inventory === null){
    inventory = new Inventory();
  }
  return true;

}

var Product = (function() {
  var products = {};
  function Product() {};

  function count(obj) {
    return Object.keys(obj).length;
  }

  var _static = {
    getProduct: function(type) {
      if (typeof products[type] == 'undefined') {
        products[type] = new Product;
      }
      return products[type];
    },
  };

  return _static;

})();

var Inventory = (function() {
  var inventory;
  function Inventory() {};

  var _static = {
    getInventory: function(id) {
      if (typeof inventory == 'undefined') {
        inventory = Inventory.findById(id);
      }
      return inventory;
    },
  };

  return _static;

})();
