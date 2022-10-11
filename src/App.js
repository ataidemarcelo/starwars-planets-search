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

  useEffect(() => {
    const getPlanets = async () => {
      const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets');
      const result = await response.json();
      console.log(result);
      const planetsResult = result.results.filter(
        (planet) => planet.name.toLowerCase().includes(planetName.toLowerCase()),
      );
      setPlanets(planetsResult);
      console.log(planetsResult);
    };

    getPlanets();
    console.log(selectedFilters);
  }, [planetName, hasFilters, selectedFilters]);

  const runFilters = (planet, filters) => {
    const bools = [];
    filters.forEach((filter) => {
      const { column, operator, number } = filter;
      console.log(column, operator, number);
      if (operator === 'maior que') {
        console.log('maior que');
        bools.push(Number(planet[column]) > Number(number));
        return;
      }
      if (operator === 'menor que') {
        console.log('menor que');
        bools.push(Number(planet[column]) < Number(number));
        return;
      }
      if (operator === 'igual a') {
        console.log('igual a');
        bools.push(Number(planet[column]) === Number(number));
        return;
      }
      return true;
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
          value={ selected.column }
          onChange={ ({ target }) => setSelected(
            (prevState) => ({ ...prevState, column: target.value }),
          ) }
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
        <select
          data-testid="comparison-filter"
          value={ selected.operator }
          onChange={ ({ target }) => setSelected(
            (prevState) => ({ ...prevState, operator: target.value }),
          ) }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
        <input
          type="number"
          data-testid="value-filter"
          value={ selected.number }
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
            setSelected({
              column: selected.column,
              operator: selected.operator,
              number: selected.number,
            });
          } }
        >
          FILTRAR
        </button>
      </form>

      <div>
        {selectedFilters.map((filter, index) => (
          <p key={ index }>
            {filter.column}
            {' '}
            {filter.operator}
            {' '}
            {filter.number}
          </p>
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
