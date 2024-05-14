import Header from "@/app/components/Header";
import { Post } from "@/app/utils/Interface";
import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import { PortableText } from "@portabletext/react";
import { VT323 } from "next/font/google";
import {notFound}from 'next/navigation'
import Image from "next/image";
import Link from "next/link";
import React from "react";
const datafont = VT323({ weight: "400", subsets: ["latin"] });

interface Params {
  params: {
    slug: string;
  };
}

async function getPost(slug: string) {
  const query = `*[_type == "post" && slug.current == "${slug}"][0]{
  title,
  slug,
  publishedAt,
  excerpt,
  _id,
  body,
  tags[]->{
    _id,
    slug,
    name
  }
}`;

  const post = await client.fetch(query);
  return post;
}

export const revalidation = 60;

const page = async ({ params }: Params) => {
  const post: Post = await getPost(params?.slug);
  console.log(post, "posts");

  if(!post){
    notFound();
  }
  return (
    <div>
      <Header title={post?.title} />
      <div className="text-center">
        <span className={`${datafont.className} text-purple-500`}>
          {new Date(post?.publishedAt).toDateString()}
        </span>
        <div className="mt-5">
          {post?.tags?.map((tag) => (
            <Link key={tag?._id} href={`/tag/${tag.slug.current}`}>
              <span>#{tag.name}</span>
            </Link>
          ))}
        </div>
      </div>
      <div className={richTextStyles}>
        <PortableText
          value={post?.body}
          components={myPortableTextComponents}
        />
      </div>
    </div>
  );
};

export default page;

const myPortableTextComponents = {
  types: {
    image: ({ value }: any) => (
      <Image
        src={urlForImage(value)}
        alt="Post"
        width={700}
        height={700}
      />
    ),
  },
};

const richTextStyles = `
mt-14
text-justify
max-w-2xl
m-auto
prose-headings:my-5
prose-heading:text-2xl
prose-p:mb-5
prose-p:leading-7
prose-li:list-disc
prose-li:leading-7
prose-li:ml-4
`;
