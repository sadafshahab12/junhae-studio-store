import Newsletter from "@/app/components/homePageComp/Newsletter";
import ArticleContent from "@/app/components/singleBlogPageComp/ArticleContent";
import AuthorBio from "@/app/components/singleBlogPageComp/AuthorBio";
import BlogPostHero from "@/app/components/singleBlogPageComp/BlogPostHero";
import Comments from "@/app/components/singleBlogPageComp/Comments";
import RelatedPosts from "@/app/components/singleBlogPageComp/RelatedPosts";
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
