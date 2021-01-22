import { GetStaticProps, GetStaticPaths, NextPage } from "next";

import { getAllBooksIds, getBooksData } from "../../../lib/books";
import { Layout } from "../../../components/Layout";

interface Props {
  locale: string;
  booksData: {
    lang: string;
    title: string;
    slug: string;
    date: string;
    category: string;
    contentHtml: string;
  };
}

const Book: NextPage<Props> = ({ booksData, locale }) => {
  const { title, contentHtml } = booksData;

  return (
    <Layout title={title}>
      <article className="book-content">
        <h1>{title}</h1>
        <div
          className="book-text"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      </article>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const bookData = await getBooksData(`/${params.lang}/${params.id}`);

  return {
    props: {
      locale: params?.lang || "en",
      bookData,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllBooksIds();

  return {
    paths,
    fallback: false,
  };
};

export default Book;
