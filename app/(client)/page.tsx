import {client} from "@/sanity/lib/client"
import Header from "../components/Header";
import { Post } from "../utils/Interface";
import PostComponents from "../components/PostComponents";

async function getPosts(){
const query = `*[_type == "post"]{
  title,
  slug,
  publishedAt,
  excerpt,
  tags[]->{
    _id,
    slug,
    name
  }
}`;
const data=await client.fetch(query)
return data
}



export default async function Home() {
  const posts: Post[] = await getPosts();
  console.log(posts,"posts")
  
  return (
  <div>
    <Header title="Articals" />
    <div>
      {posts?.length > 0 && posts?.map((post)=>(
        <PostComponents key={post?._id} post={post}  />
      ))}
    </div>
  </div>
  )
}
