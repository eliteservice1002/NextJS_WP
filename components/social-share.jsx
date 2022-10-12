import React from 'react';

function SocialShare(props) {
  const {post, url} = props
  return (
    <>
      <h6>Share Posts</h6>
      <div className="sidebar-social-share">
        <a className="twitter-share-button"
           target="_blank"
           href={`https://twitter.com/intent/tweet?url=${url}&text=${post.title.rendered}`}
           data-size="large">
          <i className="fab fa-twitter"></i>
        </a>

        <a target="_blank"
           href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
           className="fb-xfbml-parse-ignore">
          <i className="fab fa-facebook"></i>
        </a>

        <a target="_blank"
           href={`https://t.me/share/url?url=${url}&text=${post.title.rendered}`}>
          <i className="fab fa-telegram"></i>
        </a>

        <a target="_blank"
           href={`https://www.reddit.com/r/test/submit?url=${url}&title=${post.title.rendered}`}>
          <i className="fab fa-reddit"></i>
        </a>

        <a target="_blank"
           href={`https://vk.com/share.php?url=${url}`}>
          <i className="fab fa-vk"></i>
        </a>
        <a target="_blank"
           href={`https://service.weibo.com/share/share.php?url=${url}&title=${post.title.rendered}`}>
          <i className="fab fa-weibo"></i>
        </a>

      </div>
    </>
  );
}

export default SocialShare;