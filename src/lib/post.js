import path from "path";
import fs from "fs";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "src/pages/posts");

export const getPostsData = async () => {
  //   const fetchData = await fetch("https://jsonplaceholder.typicode.com/posts");

  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, "");

    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf-8");

    const matterResult = matter(fileContents);

    return {
      id,
      ...matterResult.data,
    };
  });

  return allPostsData;
};

export const getAllPostIds = async () => {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
};
// こういう感じにしないと、getStaticPathsが動かない 公式参照
// [
// {
//     params: {
//         id: 'first-post'
//     }
// }
//]
