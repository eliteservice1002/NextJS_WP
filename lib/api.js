export async function fetchPosts(page, category, search= null) {
  let url = ''
  if(category === 'All') {
    url = `${process.env.NEXT_PUBLIC_API_URL}/wp/v2/posts?_embed&page=${page}&per_page=6`
  }else {
    url = `${process.env.NEXT_PUBLIC_API_URL}/wp/v2/posts?_embed&page=${page}&per_page=6&categories=${category}`
  }
  if(search) {
    url = `${url}&search=${search}`
  }
  try {
    const res = await fetch(url)
    const data = await res.json();
    if(!Array.isArray(data)) {
      return []
    }else {
      return data;
    }
  }catch (e) {
    return []
  }
}

export async function fetchRelatedPosts(tags) {
  let url = `${process.env.NEXT_PUBLIC_API_URL}/wp/v2/posts?_embed&order=desc&per_page=3`;
  tags.map((tag, index) => {
    url += `&tag[${index}]=${tag}`
  })
  const res = await fetch(url)
  return await res.json()
}

export async function fetchFeaturedPosts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/wp/v2/posts?_embed&meta_key=featured&meta_value=true`)
  return await res.json()
}

export async function fetchCategories() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/wp/v2/categories`)
  return await res.json()
}

export async function fetchSiteInfos() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/?_embed`)
  return await res.json()
}