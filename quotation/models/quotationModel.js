const mongoose = require('mongoose')
module.exports = function Quotation(oldQuotation) {
  this.products = oldQuotation.products || {};
  this.addProductToQuotation = function(item, id) {
    var productItem = this.products[id];
    if (!productItem) {
      productItem = this.products[id] = {product: item};
    }
  }
  this.removeProductFromQuotation = function(item, id) {
    delete this.products[id];
  }
}

