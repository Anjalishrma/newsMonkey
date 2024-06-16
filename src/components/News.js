import React, {useEffect, useInsertionEffect, useState } from 'react'  
import NewsItem from './NewsItem'
import Spinnerr from './Spinnerr';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props)=> {

const [articles, setArticles ] =  useState([])
const [loading, setLoading ] =  useState(true)
const [page, setPage] =  useState(1)
const [totalResults, setTotalResults] =  useState(0)
 
const capitalizeFirstLetter =(string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
 

  const updateNews = async () =>{
     props.setProgress(10);
    console.log("CDM");
    let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;  
    setLoading(true)
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);
    console.log(parsedData);
    setArticles(parsedData.articles)
    setLoading(false)
    setTotalResults(parsedData.totalResults)  
    props.setProgress(100);
  }

  useEffect(() => {
    document.title=`${capitalizeFirstLetter(props.category)} - NewsMonkey`;
    updateNews()
    // eslint-disable-next-line
  },[])
 

//   const handlePrevClick = async () => {
//     console.log("Previous"); 
//     setPage(page-1)
//   updateNews()
//   };

//   const handleNextClick = async () => {
//     console.log("Next");   
//   setPage(page+1)
//   updateNews()
// }

const fetchMoreData = async () => { 
  setPage((page+1), async () => {
  const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`; 
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
    setLoading(false) 
  // setTimeout(() => {
  //   this.setState({
  //     articles:articles.concat(Array.from({ length: 20 }))
  //   });
  // }, 1500);
  })
};
 
    console.log("render")
    return (
      <div>
            <h1 className='text-center my-5 pt-5'>NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
            {loading && <Spinnerr />}
            <InfiniteScroll
              dataLength={articles.length}
              next={fetchMoreData}
              hasMore={articles.length !== totalResults}
              loader={<Spinnerr/>}
            >
            <div className="container">
            <div className="row">
              {articles.map((element, index)=>{
              return <div className="col-md-4 p-2" key={`${element.url}-${index}`}>
                  <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} imgaeUrl={element.urlToImage?element.urlToImage:"https://c.ndtvimg.com/2024-05/pra3im7_bibhav-kumar-_625x300_16_May_24.jpeg"} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
              </div> 
              
            })} 
            </div>
        </div>
            </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
          <button disabled={page<=1} className="btn btn-dark" type='button' onClick={handlePrevClick}>&larr; Previous</button>
          <button className="btn btn-dark" disabled={page + 1 > Math.ceil(totalResults /props.pageSize)} type='button' onClick={handleNextClick}>Next &rarr;</button>
        </div> */}
      </div>
    ) 
}

News.defaultProps = {
  country: 'in',
  pageSize: 9,
  category: 'general',
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News
