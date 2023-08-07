import React, { Component } from 'react'

export default class NewsComponentItem extends Component {
    render() {
        let { title, discription, imgUrl, newsURL, author, publishedAt, source } = this.props;
        return (
            <div>
                <div style={{ width: '220px' }}>
                    <div className='card'>
                        <div>
                            <span className="badge  bg-danger" style={{display:'flex',justifyContent:'flex-end',position:'absolute',right:'0'}}> {/*className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{ left: '90%', zIndex: '1' } */}
                                {source}{/*source.charAt(0).toUpperCase() + source.slice(1,).toLowerCase()*/}
                            </span>
                        </div>
                        <img src={imgUrl ? imgUrl : 'https://cdn.pixabay.com/photo/2015/02/15/09/33/news-636978_1280.jpg'} className="card-img-top" style={{paddingLeft:'2px',borderRadius: '4%'}} alt="..." />
                        <div className="card-body">
                            <h6 className="card-title">{title}</h6>
                            <p className="card-text">{discription} ....</p>
                            <p className="card-text"><small className="text-dark ">At &rarr; {new Date(publishedAt).toUTCString()}</small></p>
                            <p className="card-text"><small className="text-primary">Author &rarr; {author ? author : 'Unknown'} </small></p>
                            <a rel="noreferrer" href={newsURL} target='_blank' className="btn btn-secondary">Read More</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
