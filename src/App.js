import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    const getPlanets = async () => {
      const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets');
      const result = await response.json();
      const planetsResult = result.results;
      setPlanets(planetsResult);
    };

    getPlanets();
  }, []);

  return (
    <>
      <div>
        <h1>Projeto Star Wars - Trybe</h1>
        <input type="text" />
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
          {planets.map((planet) => (
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
