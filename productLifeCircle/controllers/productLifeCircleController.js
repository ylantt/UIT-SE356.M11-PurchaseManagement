exports.acceptBuyInNextMonth = async (req,res,next) => {
  if(product === null){
    product = await axios.get(`/${process.env.PRODUCT_PORT}/${req.params.productId}`)
  }
  if(inventory === null){
    inventory = await axios.get(`/${process.env.INVENTORY_PORT}/${req.params.inventoryId}`)
  }
  //logic
  return true;
}


