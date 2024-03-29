import {Component} from "react";

import './app.css';
import AppInfo from "../app-info/app-info";
import SearchPanel from "../search-panel/search-panel";
import AppFilter from "../app-filter/app-filter";
import EmployersList from "../employers-list/employers-list";
import EmployersAddForm from "../employers-add-form/employers-add-form";

class App extends Component{

    constructor(props) {
        super(props);
        this.state = {
            data: [
                {name: 'John D.', salary: 800, increase: false, rise: true, id: 1},
                {name: 'Alex M.', salary: 1000, increase: true, rise: false, id: 2},
                {name: 'Carl W.', salary: 2000, increase: false, rise: false, id: 3}
            ],
            term: '',
            filter: 'all'
        }
    }

    deleteItem = (id) => {
        this.setState(({data}) => {
            return {
                data: data.filter(item => item.id !== id)
            }
        })
    }

    onAdd = (name, salary) => {
        const curId = this.state.data[this.state.data.length - 1].id
        const newEmployer = {
            name,
            salary,
            increase: false,
            rise: false,
            id: curId + 1
        }

        this.setState(({data}) => {
            const newArray = [...data, newEmployer]

            return {
                data: newArray
            }
        })
    }

    onToggleProp = (id, prop) => {
        this.setState(({data}) => ({
            data: data.map(item => {
                if (item.id === id) return {...item, [prop]: !item[prop]}
                return  item;
            })
        }))
    }

    searchEmp = (items, term) => {
        if (term.length === 0) return items;

        return items.filter(item => {
            return item.name.indexOf(term) > -1
        })
    }

    onUpdateSearch = (term) => {
        this.setState({term});
    }

    filterPost = (data, filter) => {
        switch (filter) {
            case 'rise':
                return data.filter(item => item.rise);
            case 'moreThen1000':
                return data.filter(item => item.salary > 1000);
            default:
                return data;
        }
    }

    onFilterSelect = (filter) => {
        this.setState({filter});
    }

    render() {
        const {data, term, filter} = this.state;

        const employees = this.state.data.length;
        const increased = this.state.data.filter(item => item.increase).length;
        const visibleData = this.filterPost(this.searchEmp(data, term), filter);

        return (
            <div className='app'>
                <AppInfo num={employees} increase={increased}/>

                <div className="search-panel">
                    <SearchPanel onUpdateSearch={this.onUpdateSearch}/>
                    <AppFilter filter={filter} onFilterSelect={this.onFilterSelect}/>
                </div>

                <EmployersList
                    data={visibleData}
                    onDelete={this.deleteItem}
                    onToggleProp={this.onToggleProp}
                />
                <EmployersAddForm onAdd={this.onAdd}/>
            </div>
        );
    }
}

export default App;