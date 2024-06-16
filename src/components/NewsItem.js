import React from 'react'

const NewsItem = (props)=> { 
    let {title, description, imgaeUrl, newsUrl, author, date, source} = props;
    return (
      <div>
        <div className="card" >
        <div  style={{right:"0",display:"flex",justifyContent:'flex-end'}}><span className="position-absolute top-0 badge rounded-pill bg-danger"> {source} </span></div>
          <img src={imgaeUrl?imgaeUrl:"https://c.ndtvimg.com/2024-05/pra3im7_bibhav-kumar-_625x300_16_May_24.jpeg"} className="card-img-top" alt="..."/>
          <div className="card-body">
              <h5 className="card-title">{title}</h5>
              <p className="card-text">{description}</p>
              <p className="card-text"><small className="text-body-secondary">By {!author?"Unknown":author} on {new Date(date).toGMTString()}</small></p>
              <a href={newsUrl} target='_blank' rel="noreferrer" className="btn btn-dark btn-sm">Read More</a>
          </div>
        </div>
      </div>
    ) 
}

export default NewsItem
