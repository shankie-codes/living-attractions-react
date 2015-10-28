var React = require("react");

/* This was really useful http://stackoverflow.com/questions/21285923/reactjs-two-components-communicating */

var FilterList = React.createClass({

  propTypes: {
    // TODO: if you follow the advice below, you can change the "any" below to "object"
    // or if you want to be stricter, you can use "shape" to exactly describe the object (it's up to you how lenient you want to be with this)
    items : React.PropTypes.arrayOf(React.PropTypes.any).isRequired,
    listItemClasses : React.PropTypes.string.isRequired,
    currentFilter : React.PropTypes.string.isRequired,
    updateFilter : React.PropTypes.func.isRequired
  },

  renderItem(item, i) {
    // Work out if it's the selected filter item
    var classes = this.props.listItemClasses;

    // TODO: this if statement below shouldn't be here. I'm not going to change anything because i'm not sure
    // whether the data you've given me is complete, so don't want to make assumptions about what change is most appropriate.
    // the reason this is bad is because this component now knows specifically about months
    // and the type/shape of data you're passing in (the swapping of the item variable).
    // 
    // What I would do:
    // 
    // Normalise the items you pass to FilterList from AppView, so instead of either an array of strings or month objects like { monthClassName : "", monthName : ""}
    // you always pass in an array of objects like { value : "", className : "" }, where className is optional.
    // this keeps this component generic and allows you to have to have classes (months) or not (categories)

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