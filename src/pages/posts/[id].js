import { Layout } from "@/components/layout";
import { getAllPostIds } from "@/lib/post";

export const getStaticPaths = async () => {
  const paths = await getAllPostIds();
  return {
    paths,
    fallback: false,
  };
};

export default function Post() {
  return <Layout>Enter</Layout>;
}
