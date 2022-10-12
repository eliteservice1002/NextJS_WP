import React, {useContext, useEffect, useState} from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import Carousel from "../components/carousel";
import Categories from "../components/categories";
import PostCard from "../components/post-card";
import AppContext from "../lib/AppContext";
import {fetchCategories, fetchFeaturedPosts, fetchPosts, fetchSiteInfos} from "../lib/api";
import InfiniteScroll from "react-infinite-scroll-component";
import debounce from 'lodash.debounce'

function Home(props) {
  const context = useContext(AppContext)
  const {category} = context.state
  const [posts, setPosts] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [keyword, setKeyword] = useState('')
  let {categories, initialPosts, featuredPosts, siteInfos} = props

  useEffect(() => {
    setPosts(initialPosts)
    setPage(2)
    context.setSiteInfos(siteInfos)
  },[])

  useEffect(async () => {
    let posts = await fetchPosts(1, category)
    setPosts(posts)
    setPage(2)
    if(posts.length) {
      setHasMore(true)
    }else {
      setHasMore(false)
    }
  }, [category])

  useEffect(async () => {
    await searchPosts()
  }, [keyword])

  async function getMorePosts() {
    let nextPosts = await fetchPosts(page, category, keyword)
    if(Array.isArray(nextPosts) && nextPosts.length) {
      setPosts([...posts, ...nextPosts])
      setPage(page+1)
    }else {
      setHasMore(false)
    }
  }

  const searchPosts = debounce(async () => {
    let posts = await fetchPosts(1, category, keyword)
    if(posts.length) {
      setPosts(posts)
      setPage(2)
      setHasMore(true)
    }else {
      setPosts([])
      setHasMore(false)
    }
  }, 500)
  return (
    <>
      <Header />

    <div id="mainContainer">
      <Carousel featuredPosts={featuredPosts} />
      <div id="searchMobile" className="container">
        <div className="search-container">
          <input className="search-input" type="search" placeholder="Search" />
        </div>
      </div>
      <div className="catNav container">
        <Categories categories={categories} />
        <div id="searchDesktop" className="search-container">
          <input className="search-input" type="search" placeholder="Search" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
        </div>
      </div>
      <InfiniteScroll
        next={() => getMorePosts()}
        hasMore={hasMore}
        loader={<h4 className="not-found">Loading...</h4>}
        dataLength={posts.length}>
      <div className="postsRow container">
        {posts.length ?
          posts.map((post,index) => {
            return (
              <PostCard key={`post_${post.id}`} post={post} />
            )
          })
          : <h1 className="not-found">No posts found</h1>
        }
      </div>
      </InfiniteScroll>
    </div>
      <Footer/>
    </>
  )
}

export async function getServerSideProps() {
  const categories = await fetchCategories()
  const initialPosts = await fetchPosts(1, 'All')
  const featuredPosts = await fetchFeaturedPosts()
  const siteInfos = await fetchSiteInfos();
  return {
    props: {
      categories,
      initialPosts,
      featuredPosts,
      siteInfos
    }
  }
}

export default Home;