import { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { GlobalStyles } from './utils/GlobalStyles';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { LoadMoreBtn } from './Button/Button';
import styled from 'styled-components';
import { Oval } from 'react-loader-spinner';
import axios from 'axios';
import { Errormessage } from './ErrorMessage/ErrorMessage';

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '30743258-d8407cc281d6c3ad648c29387';

export const App = () => {
  const [images, setImages] = useState([]);
  const [searchQuery, setsearchQuery] = useState(null);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    const addImages = loadedImg => {
      setImages(prevState => {
        if (prevState.length === 0) {
          return loadedImg;
        }
        return [...prevState, ...loadedImg];
      });
    };

    if (!searchQuery) {
      return;
    }

    axios
      .get(
        `${BASE_URL}?q=${searchQuery}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
      )
      .then(response => {
        if (response.data.hits.length === 0) {
          setError(
            'There are no images matching your request! Try another keyring'
          );
          setStatus('rejected');
        } else {
          if (
            response.data.hits.length === response.data.total ||
            response.data.hits.length < 12
          ) {
            setStatus('idle');
          } else {
            setStatus('resolved');
          }

          const loadedImg = response.data.hits.map(hit => {
            return {
              id: hit.id,
              tags: hit.tags,
              largeImage: hit.largeImageURL,
              smallImage: hit.webformatURL,
            };
          });

          addImages(loadedImg);
        }
      })
      .catch(error => {
        setError(error.message);
        setStatus('rejected');
      });
  }, [page, searchQuery]);

  const onFormSubmit = userSearchQuery => {
    if (userSearchQuery.trim() === '') {
      setError('Please enter keyword');
      setImages([]);
      setStatus('rejected');
      return;
    }

    setsearchQuery(userSearchQuery);
    setPage(1);
    setImages([]);
  };

  const hendleBtnClick = () => {
    setPage(prevState => {
      return prevState + 1;
    });
  };

  return (
    <>
      <SApp>
        <Searchbar onFormSubmit={onFormSubmit} />
        {status === 'rejected' && <Errormessage text={error} />}
        {images.length !== 0 && <ImageGallery images={images} />}
        {status === 'pending' && (
          <Oval
            height={80}
            width={80}
            color="#4fa94d"
            wrapperStyle={{
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
            visible={this.state.loaderVisible}
            ariaLabel="oval-loading"
            secondaryColor="#4fa94d"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        )}
        {status === 'resolved' && <LoadMoreBtn onBtnClick={hendleBtnClick} />}
        <GlobalStyles />
      </SApp>
    </>
  );
};

export const SApp = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 16px;
  padding-bottom: 24px;
`;
