import Head from "next/head";
import { Layout } from "@/components/layout";
import { getAllPostIds, getPostData } from "@/lib/post";
import utilStyles from "@/styles/utils.module.css";

export const getStaticPaths = async () => {
  const paths = await getAllPostIds();

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const postData = await getPostData(params.id);

  return {
    props: {
      postData,
    },
  };
};

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingX1}> {postData.title}</h1>
        <div className={utilStyles.lightText}>{postData.date}</div>
        <div
          dangerouslySetInnerHTML={{ __html: postData.blogContentHtml }}
        ></div>
      </article>
    </Layout>
  );
}
