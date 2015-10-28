var React = require("react");
var Attractions = require("./AttractionList.js");
var FilterList = require("./FilterList.js");
var AttractionData = require('../AttractionData');

function contains(haystack, needle) {
  return haystack.toLowerCase().indexOf(needle.toLowerCase()) !== -1;
}


var AppView = React.createClass({

  getInitialState() {
    return {
      months : AttractionData.months,
      attractorCategories : AttractionData.attractorCategories,
      attractions : AttractionData.attractions,
      monthFilter : AttractionData.months[0].monthName,
      categoryFilter : "All"
    };
  },

  handleMonthFilterUpdate(filterValue){
    this.setState({
      monthFilter : filterValue
    });
  },

  handleCategoryFilterUpdate(filterValue){
    this.setState({
      categoryFilter : filterValue
    });
  },

  clearFilters(){
    this.setState({
      monthFilter : "All",
      categoryFilter : "All"
    });
  },

  getFilteredItems() {
    return this.state.attractions.filter(function(attraction) {

      // Check if at least one of the months in the .attractors array matches the filter
      // and at least one of the caetgories in the .attrators array matches the filter

      return attraction.attractors.some(function(attractor){
        var monthMatch = (
          this.state.monthFilter === "All" ||
          attractor.month === null ||
          contains(attractor.month, this.state.monthFilter)
        );

        var categoryMatch = (
          this.state.categoryFilter === "All" ||
          attractor.category === null ||
          contains(attractor.category, this.state.categoryFilter)
        );

        return (monthMatch && categoryMatch);
      }, this);

    }, this);
  },

  render() {
    var displayedItems = this.getFilteredItems();

    return (
      <div>
        <div className="living-attractions-filters">
          <button className="clear-filters" onClick={this.clearFilters}>Clear filters</button>
          <div className="collapsing-menu-wrapper is-closed">
            <FilterList 
              items={this.state.attractorCategories} 
              wrapperClasses="attraction-type-select collapsing-menu" 
              currentFilter={this.state.categoryFilter} 
              updateFilter={this.handleCategoryFilterUpdate} 
            />
          </div>
          <FilterList 
            items={this.state.months} 
            wrapperClasses="living-attractions-months-nav" 
            listItemClasses="living-attractions-month-item"
            currentFilter={this.state.monthFilter} 
            updateFilter={this.handleMonthFilterUpdate} 
          />
        </div>
        <Attractions
          items={displayedItems}
          readMoreText={AttractionData.strings.readmore}
          nothingFoundText={AttractionData.strings.nothingfound}
        />
      </div>
    );
  }
});


module.exports = AppView;