import fs from "fs";
import path from "path";
import matter, { GrayMatterFile } from "gray-matter";
import remark from "remark";
import html from "remark-html";

const booksDirectory = path.resolve(process.cwd(), "books");

function getAllBooksFileNames(directoryPath, filesList = []) {
  const files = fs.readdirSync(directoryPath);

  files.forEach((file) => {
    if (fs.statSync(`${directoryPath}/${file}`).isDirectory()) {
      filesList = getAllBooksFileNames(`${directoryPath}/${file}`, filesList);
    } else {
      filesList.push(path.join(path.basename(directoryPath), "/", file));
    }
  });

  const filteredList = filesList.filter((file) => file.includes(".md"));
  return filteredList;
}

// Sorts books by date
export function getSortedBooksData() {
  const fileNames = getAllBooksFileNames(booksDirectory);

  const allBooksData = fileNames.map((fileName) => {
    const id = fileName.split("/")[1].replace(/\.md$/, "");
    const fullPath = path.join(booksDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf-8");
    const frontMatter: GrayMatterFile<string> = matter(fileContents);

    return {
      id,
      ...(frontMatter.data as {
        lang: string;
        date: string;
        category: string;
      }),
    };
  });

  return allBooksData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

// Get IDs for books
export function getAllBooksIds() {
  const fileNames = getAllBooksFileNames(booksDirectory);

  return fileNames.map((fileName) => ({
    params: {
      id: fileName.split("/")[1].replace(/\.md$/, ""),
      lang: fileName.split("/")[0],
    },
  }));
}

export async function getBooksData(id) {
  const fullPath = path.join(booksDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf-8");
  const frontMatter = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(frontMatter.content);

  const contentHtml = processedContent.toString();

  return {
    id,
    ...(frontMatter.data as { date: string; title: string }),
    contentHtml,
  };
}
