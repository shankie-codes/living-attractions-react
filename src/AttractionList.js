var React = require("react");
var AttractionData = JSON.parse(AttractionDataJSON);

var AttractionList = React.createClass({

  renderItem(item) {
    return (
    <li key={item.postId}>
      <div className="featured-living-attraction-item">
        <img src={item.featuredImage} className="featured-living-attraction-item-img" />
        <div className="featured-living-attraction-item-text">
          <h2 className="content-title">{item.title}</h2>
          <p>{item.exceprt}</p>
          <a href={item.permalink} className="button">{AttractionData.strings.readmore}</a>  
        </div>
      </div>
    </li> );
  },

  render() {

    //Check to make sure that we got some items
    if(this.props.items.length === 0){
      return(
        <span>{AttractionData.strings.nothingfound}</span>
      );
    }
    else{
      return (
        <div className="living-attractions-wrapper">
          <ul className="living-attractions-list">
            {this.props.items.map(this.renderItem)}
          </ul>
        </div>
      );
    }
  }

});

module.exports = AttractionList;