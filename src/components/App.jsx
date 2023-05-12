import { useState, useEffect } from 'react';
import Searchbar from './Searchbar/Searchbar';
import fetchImage from './Utils/API';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from 'components/Loader/Loader';

import css from './App.module.css';

export const App = () => {
  const [searchRequest, setSearchRequest] = useState('');
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const [loaderState, setLoaderState] = useState(false);

  useEffect(() => {
    setData([]);
  }, [searchRequest]);

  useEffect(() => {
    if (searchRequest === '') {
      return;
    }
    const stopLoader = () => {
      setLoaderState(false);
    };

    fetchImage(searchRequest, page)
      .then(newData => setData(prevData => [...prevData, ...newData.hits]))
      .then(setStatus('resolved'))
      .then(stopLoader)
      .catch(error => {
        setStatus('rejected');
        setError(error);
        stopLoader();
      });
  }, [searchRequest, page]);

  const handleSearchSubmit = searchRequest => {
    setLoaderState(true)
    setSearchRequest(searchRequest);
    setPage(1);
  };

  const handleLoadMoreButton = () => {
    setLoaderState(true);
    setPage(page + 1);
  };

  return (
    <div className={css.App}>
      <Searchbar onSubmit={handleSearchSubmit}  />
      {status === 'rejected' && <div className={css.errorMessage}>{error}</div>}
      <ImageGallery data={data}  />
      {loaderState && <Loader />}
      {searchRequest !== '' && status === 'resolved' && !loaderState &&(
        <Button handleButton={handleLoadMoreButton} />
      )}
    </div>
  );
};
