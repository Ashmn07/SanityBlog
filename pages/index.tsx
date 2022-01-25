import Head from 'next/head'
import Banner from '../components/Banner'
import Header from '../components/Header'
import PostList from '../components/PostList'
import {sanityClient,urlFor} from '../sanity'
import { Post } from '../types'

interface Props{
  posts:[Post]
}

export default function Home({posts}:Props) {
  return (
    <div className="max-w-7xl mx-auto">
      <Head>
        <title>Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header/>
      <Banner/>
      <PostList posts={posts}/>
    </div>
  )
}

export const getServerSideProps = async () => {
  const query = `*[_type == "post"]{
    _id,
    title,
    author -> {
      name,
      image
    },
    description,
    mainImage,
    slug
  }`

  const posts = await sanityClient.fetch(query)

  return {
    props:{
      posts
    }
  }
}
