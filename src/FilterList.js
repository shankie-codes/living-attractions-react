var React = require("react");

/* This was really useful http://stackoverflow.com/questions/21285923/reactjs-two-components-communicating */

var FilterList = React.createClass({

  propTypes: {
    items : React.PropTypes.arrayOf(React.PropTypes.any).isRequired,
    listItemClasses : React.PropTypes.string.isRequired,
    currentFilter : React.PropTypes.string.isRequired,
    updateFilter : React.PropTypes.func.isRequired
  },

  renderItem(item, i) {
    // Work out if it's the selected filter item
    var classes = this.props.listItemClasses;

    // Add on the month name if applicable
    if(item.monthClassName){
      classes += " " + item.monthClassName.toLowerCase();

      // Now write the monthname to the item so that it can be used in the same way as the category name
      item = item.monthName;
    } 

    if(item == this.props.currentFilter){
      classes += " is-selected selected"
    }
    
    return (

    <li key={i} className={classes} onClick={this.handleClick.bind(this, item)}>
      {item}
    </li> 
    );
  },

  handleClick(item, event) {
    this.props.updateFilter(item);
  },

  render() {
    return (
      <nav className={this.props.wrapperClasses}>
        <ul>
          {this.props.items.map(this.renderItem)}
        </ul>
      </nav>
    );
  }

});

module.exports = FilterList;