const axios = require('axios')
const MIN_PERCENT = 5;

exports.getProductToSuggestion = async () => {
  const productList = await axios.get(`${process.env.DOMAIN}:${process.env.PRODUCT_PORT}`)
  const result = productList.filter(product => {
    return (product.remain * 100 / product.quantity) <= MIN_PERCENT
  })

  return result;
}
