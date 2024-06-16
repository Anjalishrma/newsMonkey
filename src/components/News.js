import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import Spinnerr from './Spinnerr';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = async () => {
    props.setProgress(10);
    console.log('CDM');
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    try {
      const data = await fetch(url);
      props.setProgress(30);
      const parsedData = await data.json();
      props.setProgress(70);
      console.log(parsedData);
      setArticles(parsedData.articles || []); // Ensure articles is an array
      setTotalResults(parsedData.totalResults || 0); // Ensure totalResults is a number
      setLoading(false);
      props.setProgress(100);
    } catch (error) {
      console.error("Failed to fetch news:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;
    updateNews();
    // eslint-disable-next-line
  }, []);

  const fetchMoreData = async () => {
    const nextPage = page + 1;
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${nextPage}&pageSize=${props.pageSize}`;
    try {
      const data = await fetch(url);
      const parsedData = await data.json();
      console.log(parsedData);
      setArticles((prevArticles) => [...prevArticles, ...(parsedData.articles || [])]); // Ensure articles is concatenated properly
      setTotalResults(parsedData.totalResults || 0);
      setPage(nextPage);
    } catch (error) {
      console.error("Failed to fetch more news:", error);
    }
  };

  console.log('render');
  return (
    <div>
      <h1 className='text-center my-5 pt-5'>
        NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines
      </h1>
      {loading && <Spinnerr />}
      <InfiniteScroll
        dataLength={articles ? articles.length : 0} // Ensure dataLength is always a number
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinnerr />}
      >
        <div className='container'>
          <div className='row'>
            {articles.map((element, index) => (
              <div className='col-md-4 p-2' key={`${element.url}-${index}`}>
                <NewsItem
                  title={element.title ? element.title : ''}
                  description={element.description ? element.description : ''}
                  imgaeUrl={element.urlToImage ? element.urlToImage : 'https://c.ndtvimg.com/2024-05/pra3im7_bibhav-kumar-_625x300_16_May_24.jpeg'}
                  newsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source.name}
                />
              </div>
            ))}
          </div>
        </div>
      </InfiniteScroll>
    </div>
  );
};

News.defaultProps = {
  country: 'in',
  pageSize: 9,
  category: 'general',
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  apiKey: PropTypes.string.isRequired,
  setProgress: PropTypes.func.isRequired,
};

export default News;
