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
    fetchImage(searchRequest, page, toggleLoader)
      .then(newData => setData( prevData => [...prevData, ...newData.hits]))
      .then(setStatus('resolved'))
      .catch(error => {
        setStatus('rejected');
        setError(error);
      });
  }, [searchRequest, page]);

  const toggleLoader = () => {
    setLoaderState(!loaderState);
  };

  const handleSearchSubmit = searchRequest => {
    setSearchRequest(searchRequest);
    setPage(1);
  };

  const handleLoadMoreButton = () => {
    toggleLoader();
    setPage(page + 1);
  };

  return (
    <div className={css.App}>
      <Searchbar
        onSubmit={handleSearchSubmit}
        toggleLoader={toggleLoader}
      />
      {status === 'rejected' && <div className={css.errorMessage}>{error}</div>}
      <ImageGallery data={data} toggleLoader={toggleLoader} />
      {loaderState && <Loader />}
      {searchRequest !== '' && status === 'resolved' && (
        <Button handleButton={handleLoadMoreButton} />
      )}
    </div>
  );
};
