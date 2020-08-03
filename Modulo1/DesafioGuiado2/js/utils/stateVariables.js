export function StateVariables() {
  let tabCountries = null;
  let tabFavorites = null;
  let allCountries = [];
  let favoriteCountries = [];
  let countCountries = 0;
  let countFavorites = 0;
  let totalPopulationList = 0;
  let totalPopulationFavorites = 0;
  let numberFormat = null;

  this.setTabCountries = (value) => (tabCountries = value);
  this.getTabCountries = () => tabCountries;

  this.setTabFavorites = (value) => {
    this.tabFavorites = value;
  };
  this.getTabFavorites = () => tabFavorites;

  this.setAllCountries = (value) => {
    allCountries = value;
  };
  this.getAllCountries = () => allCountries;

  this.setFavoriteCountries = (value) => {
    favoriteCountries = value;
  };
  this.getFavoriteCountries = () => favoriteCountries;

  this.setCountCountries = (value) => {
    countCountries = value;
  };
  this.getCountCountries = () => countCountries;

  this.setCountFavorites = (value) => {
    countFavorites = value;
  };
  this.getCountFavorites = () => countFavorites;

  this.setTotalPopulationList = (value) => {
    totalPopulationList = value;
  };
  this.getTotalPopulationList = () => totalPopulationList;

  this.setTotalPopulationFavorites = (value) => {
    totalPopulationFavorites = value;
  };
  this.getTotalPopulationFavorites = () => totalPopulationFavorites;

  this.setNumberFormat = (value) => {
    numberFormat = value;
  };
  this.getNumberFormat = () => numberFormat;
}
