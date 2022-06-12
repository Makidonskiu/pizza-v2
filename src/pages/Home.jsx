import React, { useEffect, useRef } from 'react';
import qs from 'qs';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Categories, Sort, sortPizza, PizzaBlock, Skeleton, Pagination } from '../components/index';
import { SearchContext } from '../App';
import { setCategory, setCurrentPage, setFilters } from '../redux/Slices/filterSlice';
import { fetchPizza } from '../redux/Slices/pizzaSlice';

export const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { categoryId, sort, currentPage } = useSelector((state) => state.filter);
  const { items, status } = useSelector((state) => state.pizza);

  const { searchValue } = React.useContext(SearchContext);

  const onClickCategory = (id) => {
    dispatch(setCategory(id));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  const getPizzas = async () => {
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const sortBy = sort.sortProperty.replace('-', '');
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `search=${searchValue}` : '';

    dispatch(
      fetchPizza({
        order,
        sortBy,
        category,
        search,
        currentPage,
      }),
    );
  };

  // Если изменили параметры и был первыйц рендер то покажи url
  // useEffect(() => {
  //   if (isMounted.current) {
  //     const queryString = qs.stringify({
  //       sortProperty: sort.sortProperty,
  //       categoryId,
  //       currentPage,
  //     });

  //     navigate(`?${queryString}`);
  //   }
  //   isMounted.current = true;
  // }, [categoryId, sort.sortProperty, currentPage]);

  // // если был первый рендер, то проверяем url и сохраняем в редакс
  // useEffect(() => {
  //   if (window.location.search) {
  //     const params = qs.parse(window.location.search.substring(1));

  //     const sort = sortPizza.find((obj) => obj.sortProperty === params.sortProperty);

  //     dispatch(
  //       setFilters({
  //         ...params,
  //         sort,
  //       }),
  //     );
  //     isSearch.current = true;
  //   }
  // }, []);

  useEffect(() => {
    // ************************* При переходе на главную страницу будет скролить верх ******************
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      // почему то не рабоатет  ( !isSearch.current ) - избавляет от двойного запроса на сервер №15 урок
      getPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  const skeleton = [...new Array(11)].map((_, i) => <Skeleton key={i} />);

  const pizza = items.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />);

  return (
    <div className="content">
      <div className="container">
        <div className="content__top">
          <Categories value={categoryId} onClickCategory={onClickCategory} />
          <Sort />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        {status === 'error' ? (
          <div className="content__error-info">
            <h2>
              Произошла ошибка <span>😕</span>
            </h2>
            <p>К сожелению произошла ошибка, не удалось отобразить пиццы!!!</p>
          </div>
        ) : (
          <div className="content__items">{status === 'loading' ? skeleton : pizza}</div>
        )}
        <Pagination currentPage={currentPage} onChangePage={onChangePage} />
      </div>
    </div>
  );
};
