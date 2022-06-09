import React, { useEffect, useRef, useState } from 'react';
import qs from 'qs';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { Categories, Sort, sortPizza, PizzaBlock, Skeleton, Pagination } from '../components/index';
import { SearchContext } from '../App';
import { setCategory, setCurrentPage, setFilters } from '../redux/Slices/filterSlice';

export const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);
  
  const { categoryId, sort, currentPage } = useSelector((state) => state.filter);

  const { searchValue } = React.useContext(SearchContext);
  const [pizzas, setPizzas] = useState([]);
  const [isLoaded, setIsLoaded] = useState(true);

  const onClickCategory = (id) => {
    dispatch(setCategory(id));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  const fetchPizzas = () => {
    setIsLoaded(true);

    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const sortBy = sort.sortProperty.replace('-', '');
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `search=${searchValue}` : '';

    axios
      .get(
        `https://628a9ad77886bbbb37a9e118.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}&${search}`,
      )
      .then((res) => {
        setPizzas(res.data);
        setIsLoaded(false);
      });
  };

  //Если изменили параметры и был первыйц рендер то покажи url
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, currentPage]);


  // если был первый рендер, то проверяем url и сохраняем в редакс
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = sortPizza.find((obj) => obj.sortProperty === params.sortProperty);

      dispatch(
        setFilters({
          ...params,
          sort,
        }),
      );
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    // ************************* При переходе на главную страницу будет скролить верх ******************
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      // почему то не рабоатет  ( !isSearch.current ) - избавляет от двойного запроса на сервер №15 урок
      fetchPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  const skeleton = [...new Array(11)].map((_, i) => <Skeleton key={i} />);

  const pizza = pizzas.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />);

  return (
    <div className="content">
      <div className="container">
        <div className="content__top">
          <Categories value={categoryId} onClickCategory={onClickCategory} />
          <Sort />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">{isLoaded ? skeleton : pizza}</div>
        <Pagination currentPage={currentPage} onChangePage={onChangePage} />
      </div>
    </div>
  );
};
