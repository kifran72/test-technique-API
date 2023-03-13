const { players } = require("../../utils/players");
const _ = require("lodash");

const { medianCalc } = require("../../utils/medianCalc");

const getPlayers = async (req, res, next) => {
  try {
    const result = await players();

    res.json(_.sortBy(result.players, "data.rank"));
  } catch (error) {
    next(error);
  }
};

const getPlayerByID = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await players();
    res.json(_.find(data.players, { id }));
  } catch (error) {
    next(error);
  }
};
const getStats = async (req, res, next) => {
  try {
    const data = await players();

    // Pays qui a le plus gagné
    const countryWins = {};
    const IMC = {};
    const allHeight = [];

    _.each(data.players, (player) => {
      const {
        id,
        data: { points, height, weight },
        country: { code },
      } = player;
      if (countryWins[code]) {
        countryWins[code] += points;
      } else {
        countryWins[code] = points;
      }
      IMC[id] = (weight / 1000 / (height / 100)) ^ 2;
      allHeight.push(height);
    });
    const countryWithTheMostWins = _.maxBy(
      Object.entries(countryWins),
      (country) => country[1]
    )[0];

    const Median = medianCalc(allHeight);

    // poid / taille m2
    // IMC moyen
    // médian de la taille des joueurs
    res.json({
      BestWins: countryWithTheMostWins,
      IMC,
      Median,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPlayers,
  getPlayerByID,
  getStats,
};
