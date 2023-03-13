const url = "https://data.latelier.co/training/tennis_stats/headtohead.json";

const players = async () => {
  const response = await fetch(url)
  return response.json()
};

module.exports = { players };
