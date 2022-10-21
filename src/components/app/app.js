import { Component } from "react";

import AppFilter from "../app-filter/app-filter";
import AppInfo from "../app-info/app-info";
import EmployeesAddForm from "../employees-add-form/employees-add-form";
import EmployeesList from "../employees-list/employees-list";
import SearchPanel from "../search-panel/search-panel";

import { newID } from "../newID/newID";

import "./app.scss";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [
        {
          name: "John C.",
          salary: 800,
          increase: false,
          promotion: true,
          id: 1,
        },
        {
          name: "Alex M.",
          salary: 3000,
          increase: true,
          promotion: false,
          id: 2,
        },
        {
          name: "Carl W.",
          salary: 5000,
          increase: false,
          promotion: false,
          id: 3,
        },
      ],
      term: "",
      filter: "all",
    };
  }

  componentDidMount() {
    const raw = localStorage.getItem("data");
    this.setState({
      data: JSON.parse(raw),
    });
  }

  componentDidUpdate() {
    localStorage.setItem("data", JSON.stringify(this.state.data));
  }

  addEmploee = (name, salary) => {
    const newItem = {
      name,
      salary,
      increase: false,
      promotion: false,
      id: newID(),
    };
    this.setState(({ data }) => ({
      data: [...data, newItem],
    }));
  };

  deleteItem = (id) => {
    this.setState(({ data }) => ({
      data: data.filter((el) => el.id !== id),
    }));
  };

  onToggleProp = (id, prop) => {
    this.setState(({ data }) => ({
      data: data.map((item) =>
        item.id === id ? { ...item, [prop]: !item[prop] } : item
      ),
    }));
  };

  searchEmploees = (items, term) => {
    if (term.length === 0) {
      return items;
    }

    return items.filter((item) => {
      return item.name.indexOf(term) > -1;
    });
  };

  onUpdateSearch = (term) => {
    this.setState({ term: term });
  };

  filterPost = (items, filter) => {
    switch (filter) {
      case "promotion":
        return items.filter((item) => item.promotion);
      case "moreThen1000":
        return items.filter((item) => item.salary > 1000);
      default:
        return items;
    }
  };

  onFilterSelect = (name) => {
    this.setState({ filter: name });
  };

  render() {
    const { data, term, filter } = this.state;

    const totalIncrease = data.filter((item) => item.increase).length;
    const totalEmploees = data.length;
    const visibleData = this.filterPost(
      this.searchEmploees(data, term),
      filter
    );

    return (
      <div className="app">
        <AppInfo totalEmploees={totalEmploees} totalIncrease={totalIncrease} />
        <div className="search-panel">
          <SearchPanel term={term} onUpdateSearch={this.onUpdateSearch} />
          <AppFilter filter={filter} onFilterSelect={this.onFilterSelect} />
        </div>
        <EmployeesList
          data={visibleData}
          onDelete={this.deleteItem}
          onToggleProp={this.onToggleProp}
        />
        <EmployeesAddForm name="max" onAdd={this.addEmploee} />
      </div>
    );
  }
}

export default App;
