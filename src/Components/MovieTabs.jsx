import React from "react";

class MovieTabs extends React.Component {
  componentWillReceiveProps(nextProps, nextState) {
    console.log("MovieTabs WillReceiveProps");
    console.log("nextProps sort_by", nextProps.sort_by);
    console.log("prevProps sort_by", this.props.sort_by);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.sort_by !== this.props.sort_by) {
      return true;
    }
    return false;
  }

  render() {
    const { sort_by, updateSortBy } = this.props;

    const handleClick = value => {
      return () => {
        updateSortBy(value);
      };
    };

    const getClassByValue = value => {
      return `nav-link ${sort_by === value ? "active" : ""}`;
    };

    console.log("MovieTabs render");

    return (
      <ul className="tabs nav nav-pills">
        <li className="nav-item">
          <div
            className={getClassByValue("popularity.desc")}
            onClick={handleClick("popularity.desc")}
          >
            Popular desc
          </div>
        </li>
        <li className="nav-item">
          <div className={getClassByValue("revenue.desc")} onClick={handleClick("revenue.desc")}>
            Revenue desc
          </div>
        </li>
        <li className="nav-item">
          <div
            className={getClassByValue("vote_average.desc")}
            onClick={handleClick("vote_average.desc")}
          >
            Vote average desc
          </div>
        </li>
      </ul>
    );
  }
}

export default MovieTabs;
