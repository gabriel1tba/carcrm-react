/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress } from '@material-ui/core';

import Header from '../../components/Header';

import { index } from '../../store/actions/transactions';

const Transactions = () => {
  const dispatch = useDispatch();
  const transactions = useSelector(
    (state) => state.transactionsReducer.transactions
  );

  const [isLoading, setLoading] = useState(true);
  const [isLoadMore, setLoadMore] = useState(false);
  const [query, setQuery] = useState({ page: 1 });

  const handleLoadMore = () => {
    if (transactions.current_page < transactions.last_page) {
      setLoadMore(true);
    }
  };

  const handleScroll = (event) => {
    const { scrollTop, scrollHeight, clientHeight } =
      event.srcElement.documentElement;
    let scroll = scrollHeight - (clientHeight + scrollTop);
    if (scroll < process.env.REACT_APP_SCROLL_HEIGHT) {
      if (!isLoadMore && handleLoadMore());
    }
  };

  const handleIndex = (loadMore) => {
    dispatch(index(query, loadMore)).then((res) => {
      setLoading(false);
      setLoadMore(false);
    });
  };

  useEffect(() => {
    document.addEventListener('scroll', handleScroll);
    return () => document.removeEventListener('scroll', handleScroll);
  });

  useEffect(() => {
    handleIndex(isLoadMore);
  }, [query]);

  useEffect(() => {
    if (isLoadMore) {
      setQuery({
        ...query,
        page: query.page + 1,
      });
    }
  }, [isLoadMore]);

  return (
    <>
      <Header title="Transações" />

      <div className="container mt-4 pt-3">
        {isLoading ? (
          <div className="d-flex justify-content-center mt-5 pt-5">
            {' '}
            <CircularProgress />{' '}
          </div>
        ) : (
          <>
            <div className="mb-4">
              <h3 className="font-weight-normal">Transações</h3>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Transactions;
