var React = require("react");
var Attractions = require("./AttractionList.js");
var FilterList = require("./FilterList.js");
var AttractionData = require('../AttractionData');


var AppView = React.createClass({

  getInitialState: function() {
    return {
      months : AttractionData.months,
      attractorCategories : AttractionData.attractorCategories,
      attractions : AttractionData.attractions,
      monthFilter : AttractionData.months[0].monthName,
      categoryFilter : "All"
    };
  },

  handleMonthFilterUpdate : function(filterValue){
    this.setState({
      monthFilter : filterValue
    });
  },

  handleCategoryFilterUpdate : function(filterValue){
    this.setState({
      categoryFilter : filterValue
    });
  },

  clearFilters : function(){
    this.setState({
      monthFilter : "All",
      "categoryFilter" : "All"
    });
  },

  render : function() {

    // Filter the items based on the... errr... filters
    var displayedItems = this.state.attractions.filter(function(attraction) {

      // Check if at least one of the months in the .attractors array matches the filter
      // and at least one of the caetgories in the .attrators array matches the filter

      var match = attraction.attractors.some(function(attractor){
        // Check if both the months filter *and* the categories filter match
        
        // If the month filter is 'All' or we don't have a month, then override the monthMatch and always return '1'
        if(this.state.monthFilter == "All" || attractor.month === null){
          var monthMatch = 1;
        }
        else{
          // Check if the current month === the filter
          var monthMatch = attractor.month.toLowerCase().indexOf(this.state.monthFilter.toLowerCase());
        }

        // If the category filter is 'All' or there's no category on the attractor, then override the monthMatch and always return '1'
        if(this.state.categoryFilter == "All" || attractor.category === null) {
          var categoryMatch = 1;
        }
        else{
          // Check if the current category === the filter
          var categoryMatch = attractor.category.toLowerCase().indexOf(this.state.categoryFilter.toLowerCase());
        }

        return (monthMatch !== -1 && categoryMatch !== -1);
      }, this);

      return (match === true);
    }.bind(this));


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
        <Attractions items={displayedItems} currentMonth={this.state.monthFilter}/>
      </div>
    );
  }
});


module.exports = AppView;