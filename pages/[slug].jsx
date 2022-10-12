import React, { useContext, useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faHeart } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Header from "../components/header";
import Footer from "../components/footer";
import { fetchRelatedPosts, fetchSiteInfos } from "../lib/api";
import Head from "next/head";
import SocialShare from "../components/social-share";
import AppContext from "../lib/AppContext";
import { username, application_password } from "../lib/constant";

function Post(props) {
  const { post, media, tags, relatedPosts, avg_time } = props;
  const [card, setCard] = useState(post);
  const [likes, setLikes] = useState("");
  const likesSpan = useRef(null);
  const [url, setUrl] = useState("");
  const context = useContext(AppContext);
  let { mode, siteInfos } = context.state;

  function likesCount(post) {
    var count = 1;
    if (likes != "") count = -1;
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/wp/v2/posts/${post.id}`, {
      // make sure to authenticate or pass the X-WP-Nonce value as a header
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa(username + ":" + application_password),
      },
      // body: JSON.stringify({
      //   likes_count: parseInt(card.likes_count) + count,
      // }),
      body: JSON.stringify({
        acf: {
          likes_count: parseInt(card.likes_count) + count,
        },
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data)
        setCard(data);
        setLikes(count == 1 ? "active" : "");
        likesSpan.current.innerText =
          parseInt(card.likes_count) + count + "\u00A0";
      })
      .catch((error) => console.log("error", error));
  }

  useEffect(() => {
    setUrl(window.location.href);
  }, [post]);
  useEffect(async () => {
    if (!Object.keys(siteInfos).length) {
      const infos = await fetchSiteInfos();
      context.setSiteInfos(infos);
    }
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/wp/v2/posts/${post[0].id}`, {
      // make sure to authenticate or pass the X-WP-Nonce value as a header
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa(username + ":" + application_password),
      },
      body: JSON.stringify({
        views_count: post[0].views_count + 1,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data)
        setCard(data);
        setLikes(count == 1 ? "active" : "");
        likesSpan.current.innerText = data.likes_count + "\u00A0";
      })
      .catch((error) => console.log("error", error));
  }, []);

  return (
    <>
      <Head>
        {post[0].yoast_head ? (
          <>
            <meta
              property="og:locale"
              content={post[0].yoast_head_json.og_locale}
            />
            <meta
              property="og:type"
              content={post[0].yoast_head_json.og_type}
            />
            <meta
              property="og:title"
              content={post[0].yoast_head_json.og_title}
            />
            <meta property="og:url" content={post[0].yoast_head_json.og_url} />
            <meta
              property="og:description"
              content={post[0].yoast_head_json.og_description}
            />
            <meta
              property="og:image"
              content={post[0].yoast_head_json.twitter_image}
            />
            <meta
              name="description"
              content={post[0].yoast_head_json.description}
            />
            <title>{post[0].yoast_head_json.title}</title>
          </>
        ) : (
          ""
        )}
      </Head>
      <Header />
      <div className="container single-post-container">
        <article>
          <h1 dangerouslySetInnerHTML={{ __html: post[0].title.rendered }}></h1>
          <span className="single-post-date">{post[0].date.split("T")[0]}</span>
          <div className="d-flex f-right">
            <span className="views">
              <p>{post[0].views_count}&nbsp; </p>
              <FontAwesomeIcon icon={faEye} />
            </span>

            <span className="likes" onClick={() => likesCount(post[0])}>
              <p ref={likesSpan}>{post[0].likes_count}&nbsp; </p>
              <FontAwesomeIcon icon={faHeart} className={likes} />
            </span>
          </div>
          <p className="average_time">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
              width={14}
              height={14}
              fill="#707a8a"
            >
              <path d="M0 24C0 10.75 10.75 0 24 0H360C373.3 0 384 10.75 384 24C384 37.25 373.3 48 360 48H352V66.98C352 107.3 335.1 145.1 307.5 174.5L225.9 256L307.5 337.5C335.1 366 352 404.7 352 445V464H360C373.3 464 384 474.7 384 488C384 501.3 373.3 512 360 512H24C10.75 512 0 501.3 0 488C0 474.7 10.75 464 24 464H32V445C32 404.7 48.01 366 76.52 337.5L158.1 256L76.52 174.5C48.01 145.1 32 107.3 32 66.98V48H24C10.75 48 0 37.25 0 24V24zM99.78 384H284.2C281 379.6 277.4 375.4 273.5 371.5L192 289.9L110.5 371.5C106.6 375.4 102.1 379.6 99.78 384H99.78zM284.2 128C296.1 110.4 304 89.03 304 66.98V48H80V66.98C80 89.03 87 110.4 99.78 128H284.2z" />
            </svg>
            <span style={{ marginLeft: "8px" }}>{avg_time} mins</span>
          </p>
          <div id="single-post-tags">
            <ul>
              {tags.length
                ? tags.map((tag, index) => {
                    return <li key={index}>{tag.name}</li>;
                  })
                : ""}
            </ul>
          </div>
          {media ? (
            <div className="single-post-banner">
              <img src={media.source_url} />
            </div>
          ) : (
            <div className="single-post-banner">
              <img src="/img/placebo-effect.webp" />
            </div>
          )}
          <div
            className="single-post-content"
            dangerouslySetInnerHTML={{ __html: post[0].content.rendered }}
          ></div>
        </article>
        <aside>
          {post[0].meta.iframe1 ? (
            <iframe
              width={120}
              height={240}
              style={{
                width: "120px",
                height: "240px",
                display: "block !important",
              }}
              marginWidth="0"
              marginHeight="0"
              scrolling="no"
              frameBorder="0"
              src={`https:${post[0].meta.iframe1}`}
            ></iframe>
          ) : (
            ""
          )}

          {post[0].meta.iframe2 ? (
            <iframe
              width={120}
              height={240}
              style={{
                width: "120px",
                height: "240px",
                display: "block !important",
              }}
              marginWidth="0"
              marginHeight="0"
              scrolling="no"
              frameBorder="0"
              src={`https:${post[0].meta.iframe2}`}
            ></iframe>
          ) : (
            ""
          )}

          {post[0].meta.iframe3 ? (
            <iframe
              width={120}
              height={240}
              style={{
                width: "120px",
                height: "240px",
                display: "block !important",
              }}
              marginWidth="0"
              marginHeight="0"
              scrolling="no"
              frameBorder="0"
              src={`https:${post[0].meta.iframe3}`}
            ></iframe>
          ) : (
            ""
          )}

          <SocialShare post={post[0]} url={url} />
          <h6>Related Posts</h6>
          <div className="sidebar-related-posts">
            {relatedPosts.length ? (
              relatedPosts.map((post) => {
                return (
                  <Link href={`/${post.slug}`}>
                    <a className="related-post">
                      {post.featured_media ? (
                        <img
                          src={
                            post._embedded["wp:featuredmedia"][0].media_details
                              .sizes.thumbnail.source_url
                          }
                        />
                      ) : (
                        <img src="/img/placebo-effect.webp" />
                      )}
                      <h3
                        dangerouslySetInnerHTML={{
                          __html: post.title.rendered,
                        }}
                      ></h3>
                    </a>
                  </Link>
                );
              })
            ) : (
              <h4>No posts found</h4>
            )}
          </div>
        </aside>
      </div>

      <Footer />
    </>
  );
}

export async function getServerSideProps({ params }) {
  let res = await fetch(
    `${process.env.API_URL}/wp/v2/posts?_embed&slug=${params.slug}`
  );
  const post = await res.json();
  let media = {};
  if (post[0]._embedded["wp:featuredmedia"]) {
    media = post[0]._embedded["wp:featuredmedia"][0].media_details.sizes.full;
  }
  res = await fetch(`${process.env.API_URL}/wp/v2/tags?post=${post[0].id}`);
  const tags = await res.json();
  const relatedPosts = await fetchRelatedPosts(post[0].tags);
  let words = post[0].content.rendered
    .replace(/(<([^>]+)>)/gi, "")
    .replace(/\s+/g, " ")
    .replace(/\n/g, "")
    .trim()
    .match(/(\w+)/g).length;
  const avg_time = Math.ceil(words / 250);
  return {
    props: {
      post,
      tags,
      media,
      relatedPosts,
      avg_time,
    },
  };
}

// export async function getStaticPaths() {
//   const res = await fetch(`${process.env.API_URL}/wp/v2/posts`)
//   const posts = await res.json()
//   const paths = posts.map((post) => ({
//     params: { slug: post.slug },
//   }))
//   return { paths, fallback: false }
// }
export default Post;
