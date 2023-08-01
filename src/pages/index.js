import { Layout } from "../components/layout";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import utilStyles from "../styles/utils.module.css";
import { getPostsData } from "@/lib/post";

export const getStaticProps = async () => {
  const allPostsData = await getPostsData();

  return {
    props: {
      allPostsData,
    },
  };
};

// export const getServersideProps = async (context) => {
//   return {
//     props: {
//       allPostsData: [],
//     },
//   }

export default function Home({ allPostsData }) {
  return (
    <Layout>
      {JSON.stringify(allPostsData)}
      <section className={utilStyles.headingMd}>
        <p>私は岸田文雄です</p>
      </section>
      <section>
        <h2>📝商品一覧</h2>
        <div className={styles.grid}>
          {allPostsData.map(({ id, title, date, thumbnail }) => (
            <article key={id}>
              <Link href={`/posts/${id}`}>
                <img src={`${thumbnail}`} />
              </Link>
              <Link href={`/posts/${id}`}>
                <p className={utilStyles.boldText}>{title}</p>
              </Link>
              <br />
              <small className={utilStyles.lightText}>{date}</small>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
}
