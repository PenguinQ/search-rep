/** @jsxImportSource @emotion/react */
import React, { useCallback, useEffect, useReducer } from 'react';
import axios from 'axios';
import { css, Global } from '@emotion/react';

import Textfield from './components/Textfield';
import EmptyState from './components/EmptyState';
import Lists, { ErrorType } from './components/Lists';
import Pagination from './components/Pagination';

import { ACTIONS, initialState, reducer } from './reducer';
import { App, Container, ListContainer } from './styles';

const throttle = (callback: (e: string) => void, timeout = 250) => {
  let wait = false;

  return (...args: [string]) => {
    if (!wait) {
      callback(...args);
      wait = true;

      setTimeout(() => {
        wait = false;
      }, timeout);
    }
  };
};

export default () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const perPage = 10;

  const getData = async (value: string, pageNumber?: number) => {
    try {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true });

      const queryPage = pageNumber ? pageNumber : state.page;
      const query = await axios.get(
        `https://api.github.com/search/repositories?q=${value}&page=${queryPage}&per_page=${perPage}`
      );

      dispatch({
        type: ACTIONS.SET_DATA,
        payload: {
          error: null,
          page: queryPage,
          results: query.data,
          loading: false
        }
      });
    } catch (error) {
      const errors = error as ErrorType;

      dispatch({
        type: ACTIONS.SET_ERROR,
        payload: {
          error: errors,
          results: null,
          loading: false
        }
      });
    }
  };

  const throttleSearch = useCallback(
    throttle((value) => getData(value, 1)),
    []
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: ACTIONS.SET_INPUT_VALUE, payload: e.target.value });
    throttleSearch(e.target.value);
  };

  const handlePaginate = (pageNumber: number) => {
    dispatch({ type: ACTIONS.SET_PAGE, payload: pageNumber });
  };

  useEffect(() => {
    if (state.inputValue) {
      getData(state.inputValue, state.page);
    }
  }, [state.page]);

  return (
    <div css={App}>
      <Global
        styles={css`
          @import url("https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;600&display=swap");

          html {
            box-sizing: border-box;
          }

          *,
          *::before,
          *::after {
            box-sizing: inherit;
          }

          body {
            font-family: "Nunito Sans", sans-serif;
            font-size: 14px;
            line-height: 18px;
            text-rendering: optimizeLegibility;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
        `}
      />

      <h1>Search Repositories</h1>
      <div css={Container}>
        <Textfield
          type="text"
          placeholder="Type here"
          value={state.inputValue}
          onChange={handleChange}
        />
        <div css={ListContainer}>
          {!state.inputValue && (
            <EmptyState title="Hello! 😃" subtitle="Type to start searching" />
          )}
          {state.inputValue && (
            <>
              <Lists
                data={state.results}
                error={state.error}
                loading={state.loading}
              />
              {!state.error && !state.loading && state.results ? (
                <Pagination
                  page={state.page}
                  perPage={perPage}
                  total={state.results?.total_count}
                  paginate={handlePaginate}
                />
              ) : null}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
