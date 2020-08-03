export default class ClassVariables {
  constructor() {
    let _tabCountries = null;
    let _tabFavorites = null;
    let _allCountries = [];
    let _favoriteCountries = [];
    let _countCountries = 0;
    let _countFavorites = 0;
    let _totalPopulationList = 0;
    let _totalPopulationFavorites = 0;
    let _numberFormat = null;

    this.setTabCountries = (value) => (_tabCountries = value);
    this.getTabCountries = () => _tabCountries;

    this.setTabFavorites = (value) => (_tabFavorites = value);
    this.getTabFavorites = () => _tabFavorites;

    this.setAllCountries = (value) => (_allCountries = value);
    this.getAllCountries = () => _allCountries;

    this.setFavoriteCountries = (value) => (_favoriteCountries = value);
    this.getFavoriteCountries = () => _favoriteCountries;

    this.setCountCountries = (value) => (_countCountries = value);
    this.getCountCountries = () => _countCountries;

    this.setCountFavorites = (value) => (_countFavorites = value);
    this.getCountFavorites = () => _countFavorites;

    this.setTotalPopulationList = (value) => (_totalPopulationList = value);
    this.getTotalPopulationList = () => _totalPopulationList;

    this.setTotalPopulationFavorites = (value) =>
      (_totalPopulationFavorites = value);
    this.getTotalPopulationFavorites = () => _totalPopulationFavorites;

    this.setNumberFormat = (value) => (_numberFormat = value);
    this.getNumberFormat = () => _numberFormat;
  }
}
