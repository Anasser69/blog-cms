import Header from "@/app/components/Header";
import PostComponents from "@/app/components/PostComponents";
import { Post } from "@/app/utils/Interface";
import { client } from "@/sanity/lib/client";
import React from "react";
interface Params {
  params: {
    slug: string;
  };
}

async function getPostsByTag(tag: string) {
  const query = `*[_type == "post"&& references(*[_type =="tag"&& slug.current == "${tag}"]._id)]{
  title,
  slug,
  publishedAt,
  excerpt,
  tags[]->{
    _id,
    slug,
    name
  }}`;

  const posts = await client.fetch(query);
  return posts;
}

const page = async ({ params }: Params) => {
  const posts: Array<Post> = await getPostsByTag(params.slug);
  console.log(posts, "post");
  return (
    <div>
      <Header title={`#${params?.slug}`} tags />
      <div>
        {posts?.length > 0 &&
          posts?.map((post) => <PostComponents key={post?._id} post={post} />)}
      </div>
    </div>
  );
};

export default page;
 