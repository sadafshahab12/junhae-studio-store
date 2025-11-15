import Newsletter from "@/app/(public)/components/homePageComp/Newsletter";
import ArticleContent from "@/app/(public)/components/singleBlogPageComp/ArticleContent";
import AuthorBio from "@/app/(public)/components/singleBlogPageComp/AuthorBio";
import BlogPostHero from "@/app/(public)/components/singleBlogPageComp/BlogPostHero";
import Comments from "@/app/(public)/components/singleBlogPageComp/Comments";
import RelatedPosts from "@/app/(public)/components/singleBlogPageComp/RelatedPosts";
import { blogPost } from "@/app/data/constants";
import React from "react";

const SingleBlogPage = () => {
  return (
    <main>
      <BlogPostHero
        title={blogPost.title}
        category={blogPost.category}
        author={blogPost.author.name}
        publishDate={blogPost.publishDate}
        heroImageUrl={blogPost.heroImageUrl}
      />
      <ArticleContent
        content={blogPost.content}
        shopTheLook={blogPost.shopTheLook}
      />
      <AuthorBio author={blogPost.author} />
      <Comments comments={blogPost.comments} />
      <RelatedPosts posts={blogPost.relatedPosts} />
      <Newsletter />
    </main>
  );
};

export default SingleBlogPage;
