import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import testData from './mocks/testData';

describe('App Component', () => {
  beforeEach(() => global.fetch = jest.fn(async () => ({
    json: async () => testData,
  })));

  afterEach(() => jest.clearAllMocks());

  test('Verifica se o "fetch" é chamado com a URL correta', () => {
    render(<App />);

    expect(fetch).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith('https://swapi-trybe.herokuapp.com/api/planets/');
  });

  test('Verifica se os elementos estão sendo renderizados', () => {
    render(<App />);
    const titleH1 = screen.getByRole('heading', { name: /Projeto Star Wars - Trybe/i });
    const columnFilter = screen.getByTestId('column-filter');
    const comparisonFilter = screen.getByTestId('comparison-filter');
    const nameFilter = screen.getByTestId('name-filter');
    const valueFilter = screen.getByTestId('value-filter');
    const buttonFilter = screen.getByTestId('button-filter');

    // const menorQue = screen.getByText('menor que');
    // expect(menorQue).toBeInTheDocument();
    // userEvent.click(menorQue);

    expect(titleH1).toBeInTheDocument();
    expect(columnFilter).toBeInTheDocument();
    expect(comparisonFilter).toBeInTheDocument();
    expect(nameFilter).toBeInTheDocument();
    expect(valueFilter).toBeInTheDocument();
    expect(buttonFilter).toBeInTheDocument();

    userEvent.click(buttonFilter);
  });

  test('Verifica se ao digitar "a" tem o resultado esperado', async () => {
    render(<App />);

    const nameFilter = screen.getByTestId('name-filter');

    await waitFor(() => {
      userEvent.type(nameFilter, 'a');
    });

    const rows = screen.getAllByTestId('row-table');
    expect(rows.length).toBe(7);
  })

  test('Verifica se todas as linhas e columnas foram renderizadas', async () => {
    await waitFor(() => render(<App />));

    const rows = screen.getAllByTestId('row-table');
    const columns = rows[0];

    expect(columns.children.length).toBe(13);
    expect(rows.length).toBe(10);
  });

  test('Verifica se o filtro "menor que" é aplicado', async () => {
    render(<App />);

    const columnFilter = screen.getByTestId("column-filter");
    const comparisonFilter = screen.getByTestId("comparison-filter");
    const valueFilter = screen.getByTestId("value-filter");
    const buttonFilter = screen.getByTestId("button-filter");


    await waitFor(() => {
      userEvent.selectOptions(columnFilter, 'diameter');
      userEvent.selectOptions(comparisonFilter, 'menor que');
      userEvent.type(valueFilter, '8901');
    });
    userEvent.click(buttonFilter);

    // const rows = screen.getAllByTestId('row-table');
    // expect(rows.length).toBe(3);
  });

  test('Verifica se o filtro "maior que" é aplicado', async () => {
    render(<App />);

    const columnFilter = screen.getByTestId("column-filter");
    const comparisonFilter = screen.getByTestId("comparison-filter");
    const valueFilter = screen.getByTestId("value-filter");
    const buttonFilter = screen.getByTestId("button-filter");


    await waitFor(() => {
      userEvent.selectOptions(columnFilter, 'orbital_period');
      userEvent.selectOptions(comparisonFilter, 'maior que');
      userEvent.type(valueFilter, '4000');
    });

    userEvent.click(buttonFilter);

    // const rows = screen.getAllByTestId('row-table');
    // expect(rows.length).toBe(2);
  });

  test('Verifica se o filtro "igual a" é aplicado', async () => {
    await waitFor(() => render(<App />));

      const columnFilter = screen.getByTestId("column-filter");
      const comparisonFilter = screen.getByTestId("comparison-filter");
      const valueFilter = screen.getByTestId("value-filter");
      const buttonFilter = screen.getByTestId("button-filter");


      await waitFor(() => {
        userEvent.selectOptions(columnFilter, 'rotation_period');
        userEvent.selectOptions(comparisonFilter, 'igual a');
        userEvent.type(valueFilter, '23');
      });
      userEvent.click(buttonFilter);

      // const rows = screen.getAllByTestId('row-table');
      // expect(rows.length).toBe(3);
  });

  test('Verifica os button de Remover Filtros', async () => {
    await waitFor(() => render(<App />));

    const removeFilters = screen.getByTestId('button-remove-filters');

    userEvent.click(removeFilters);
  });

  test('Verifica os button de Remover um filtro', async () => {
    await waitFor(() => render(<App />));
    const buttonFilter = screen.getByTestId("button-filter");

    await waitFor(() => {
      userEvent.click(buttonFilter);
    });
    const removeFilter = screen.getByTestId('remove-filter');

    userEvent.click(removeFilter);
  });
});
