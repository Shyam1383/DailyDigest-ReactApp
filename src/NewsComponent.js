import React, { Component } from 'react'
import NewsCompoonetItem from './NewsComponentItem'
import PropTypes from 'prop-types'
import Load from './Load'
import InfiniteScroll from "react-infinite-scroll-component";

export default class NewsComponent extends Component {
    static defaultProps = {
        country: 'in',
        category: 'general',
        pageSize: 8
    }
    static propTypes = {
        country: PropTypes.string,
        category: PropTypes.string,
        pageSize: PropTypes.number
    }
    capitaliseFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1,).toLowerCase();
    }
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            page: 1,
            loading: true,
            totalResults: 0

        }
        document.title = `${this.capitaliseFirstLetter(this.props.category)}-DailyDigest`

    }
    async updateNews() {
        this.props.setProgress(0)
        let url;
        if (this.props.home === 'home') {
            url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=${this.props.apiKey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
        }
        else {
            url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
        }
        this.props.setProgress(30)
        let data = await fetch(url);
        this.props.setProgress(50)
        let parsedData = await data.json();
        this.props.setProgress(70)
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        })
        this.props.setProgress(100)
    }
    async componentDidMount() {
        this.updateNews()
    }
    // handlePrevClick = async () => {
    //     this.setState({ page: this.state.page - 1 })
    //     this.updateNews()
    // }
    // handleNextClick = async () => {
    //     this.setState({ page: this.state.page + 1 })
    //     this.updateNews()
    // }
    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 })
        let url;
        if (this.props.home === 'home') {
            url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=${this.props.apiKey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
        }
        else {
            url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
        }
   
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults
        })
    }
    render() {
        return (
            <>
                <h1 className="text-center " style={{marginTop:'60px',marginBottom:'30px'}}>
                    Top {this.capitaliseFirstLetter(this.props.category === 'home' ? '' : this.props.category)} Headlines
                </h1>
                {this.state.loading && <Load />}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Load />}
                >
                    <div className="container " >
                        <div className="row" >
                            {this.state.articles.map((element) => {
                                return (
                                    <div className="col md-4" key={element.url} >
                                        <NewsCompoonetItem title={element.title ? element.title : ""}
                                            discription={element.description ? element.description : ''} imgUrl={element.urlToImage}
                                            newsURL={element.url} publishedAt={element.publishedAt} author={element.author}
                                            source={element.source.name}
                                        />
                                    </div>
                                )
                            }
                            )}
                        </div>
                        {/* <div className='container d-flex justify-content-between'> 
                        <button disabled={this.state.page <= 1} type="button" className="btn btn-secondary" onClick={this.handlePrevClick}>&larr; Previous </button>
                        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-secondary" onClick={this.handleNextClick}>Next  &rarr;</button>
                    </div>
                    */}
                    </div>
                </InfiniteScroll>
            </>
        )
    }
}
