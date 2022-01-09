const Suggestion = require('../models/SuggestionModel')

exports.getSuggestion = async (req, res, next) => {
  try {
    const suggestions = await Suggestion.getProductToSuggestion();
    return res.status(200).send(suggestions)
  } catch (err) {
    return res.status(500).json({ status: 'server error', message: err })
  }
}

