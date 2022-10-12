import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [planets, setPlanets] = useState([]);
  const [planetName, setPlanetName] = useState('');
  const [selected, setSelected] = useState({
    column: 'population',
    operator: 'maior que',
    number: 0,
  });
  const [hasFilters, setHasFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);

  const [columnsOptions, setColumnsOptions] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);

  const [comparisonsOptions, setComparisonsOptions] = useState([
    'maior que',
    'menor que',
    'igual a',
  ]);

  useEffect(() => {
    const getPlanets = async () => {
      const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
      const result = await response.json();
      // console.log(result);
      const planetsResult = result.results.filter(
        (planet) => planet.name.toLowerCase().includes(planetName.toLowerCase()),
      );
      setPlanets(planetsResult);
    };

    getPlanets();
    // console.log(selectedFilters);
  }, [planetName, hasFilters, selectedFilters]);

  const runFilters = (planet, filters) => {
    const bools = [];
    // console.log(filters);
    filters.forEach((filter) => {
      const { column, operator, number } = filter;
      // console.log({ column, operator, number });
      if (operator === 'maior que') {
        bools.push(Number(planet[column]) > Number(number));
        return;
      }
      if (operator === 'menor que') {
        bools.push(Number(planet[column]) < Number(number));
        return;
      }
      bools.push(Number(planet[column]) === Number(number));
      return null;
    });
    return bools.every((el) => el);
  };

  return (
    <>
      <div>
        <h1>Projeto Star Wars - Trybe</h1>
        <input
          type="text"
          data-testid="name-filter"
          value={ planetName }
          onChange={ ({ target }) => setPlanetName(target.value) }
        />
      </div>

      <form>
        <select
          data-testid="column-filter"
          onChange={ ({ target }) => setSelected(
            (prevState) => ({ ...prevState, column: target.value }),
          ) }
        >
          {columnsOptions.map((column) => (
            <option key={ column } value={ column }>{ column }</option>
          ))}
        </select>
        <select
          data-testid="comparison-filter"
          onChange={ ({ target }) => setSelected(
            (prevState) => ({ ...prevState, operator: target.value }),
          ) }
        >
          {comparisonsOptions.map((comparison) => (
            <option key={ comparison } value={ comparison }>{ comparison }</option>
          ))}
        </select>
        <input
          type="number"
          value={ selected.number }
          data-testid="value-filter"
          onChange={ ({ target }) => setSelected(
            (prevState) => ({ ...prevState, number: target.value }),
          ) }
        />
        <button
          type="button"
          data-testid="button-filter"
          onClick={ () => {
            setHasFilters(true);
            setSelectedFilters(
              (prevState) => ([...prevState, selected]),
            );
            const newsColumnsOptions = columnsOptions.filter(
              (column) => column !== selected.column,
            );
            setColumnsOptions(newsColumnsOptions);
            const newComparisonsOptions = comparisonsOptions.filter(
              (comparison) => comparison !== selected.operator,
            );
            setComparisonsOptions(newComparisonsOptions);
            setSelected({
              column: newsColumnsOptions[0],
              operator: newComparisonsOptions[0],
              number: selected.number,
            });
            // console.log('clicou btn', selected);
          } }
        >
          FILTRAR
        </button>
        <button
          type="button"
          data-testid="button-remove-filters"
          onClick={ () => setSelectedFilters([]) }
        >
          REMOVER FILTROS
        </button>
      </form>

      <div>
        {selectedFilters.map((filter) => (
          <div
            data-testid="filter"
            key={ filter.column }
          >
            <span>
              {filter.column}
              {' '}
              {filter.operator}
              {' '}
              {filter.number}
            </span>
            <button
              data-testid="remove-filter"
              onClick={ () => {
                const newSelectedFilters = selectedFilters.filter(
                  (item) => (item.column !== filter.column),
                );
                setSelectedFilters(newSelectedFilters);
                const newsColumnsOptions = [filter.column, ...columnsOptions];
                setColumnsOptions(newsColumnsOptions);
                const newComparisonsOptions = [filter.operator, ...comparisonsOptions];
                setComparisonsOptions(newComparisonsOptions);
              } }
              type="button"
            >
              X
            </button>
          </div>
        ))}
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {planets
            .filter((planet) => (hasFilters ? runFilters(
              planet, selectedFilters,
            ) : true))
            .map((planet) => (
              <tr
                key={ planet.name }
                data-testid="row-table"
              >
                <td>
                  { planet.name }
                </td>
                <td>{ planet.rotation_period }</td>
                <td>{ planet.orbital_period }</td>
                <td>{ planet.diameter }</td>
                <td>{ planet.climate }</td>
                <td>{ planet.gravity }</td>
                <td>{ planet.terrain }</td>
                <td>{ planet.surface_water }</td>
                <td>{ planet.population }</td>
                <td>
                  {planet.films.map((url) => (
                    <span key={ url }>
                      <a href={ url }>{url }</a>
                    </span>
                  ))}
                </td>
                <td>{ planet.created }</td>
                <td>{ planet.edited }</td>
                <td>
                  <a href={ planet.url }>{ planet.url }</a>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}

export default App;
