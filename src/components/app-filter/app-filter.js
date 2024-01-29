import './app-filter.css'

const AppFilter = ({filter, onFilterSelect}) => {
    const buttonData = [
        {name: 'all', label: 'Все сотрудники'},
        {name: 'rise', label: 'На повышение'},
        {name: 'moreThen1000', label: 'З/П больше 1000$'},
    ];

    const buttons = buttonData.map(({name, label}) => {
        const active = filter === name;
        const clazz = active ? 'btn-light' : 'btn-outline-light';

        return (
            <button
                className={`btn ${clazz}`}
                type='button' key={name}
                onClick={() => onFilterSelect(name)}
            >
                {label}
            </button>
        )
    })

    return (
        <div className='btn-group'>
            {buttons}
        </div>
    );
};

export default AppFilter;