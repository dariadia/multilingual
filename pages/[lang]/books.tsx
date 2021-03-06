import { useState } from "react";
import { NextPage, GetStaticProps, GetStaticPaths } from "next";
import Link from "next/link";

import { Layout } from "../../components";
import { getSortedBooksData } from "../../lib/books";
import { useTranslation } from "../../intl/useTranslation";

export interface BookData {
  uuid: string;
  pathSlug: string;
  description: string;
  lang: string;
  title: string;
  slug: string;
  date: string;
  category: string;
  contentHtml: string;
  series?: { name: string; book_number: number, episode_number: number }
};

interface Props {
  locale: string;
  allBooksData: BookData[];
}

const Book: NextPage<Props> = ({ locale, allBooksData }) => {
  const { t } = useTranslation();
  const booksData = allBooksData.filter((book) => book.lang === locale);

  // Pagination
  const BOOKS_PER_PAGE = 4;
  const numPages = Math.ceil(booksData.length / BOOKS_PER_PAGE);
  const [currentPage, setCurrentPage] = useState(1);
  const pagedBooks = booksData.slice(
    (currentPage - 1) * BOOKS_PER_PAGE,
    currentPage * BOOKS_PER_PAGE
  );

  return (
    <Layout className="books" title={t("books")}>
      <section className="page-content">
        <h1>{t("books")}</h1>
        {pagedBooks.map((book) => (
          <article key={book.uuid} className="book">
            <Link href={`/[lang]/book/[pathSlug]`} as={`/${locale}/book/${book.pathSlug}`}>
              <a>
                <h3>{book.title}</h3>
              </a>
            </Link>
            <h6>
              {book.series?.name}. {t("book")} {book.series?.book_number}. {t("episode")} {book.series?.episode_number}
            </h6>
            {book.description && <p dangerouslySetInnerHTML={{ __html: book.description }} />}
          </article>
        ))}

        {numPages > 1 && (
          <div className="pagination">
            {Array.from({ length: numPages }, (_, i) => (
              <button
                key={`pagination-number${i + 1}`}
                onClick={() => setCurrentPage(i + 1)}
                className={currentPage === i + 1 ? "active" : ""}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </section>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const allBooksData = getSortedBooksData();

  return {
    props: {
      locale: ctx.params?.lang || "en",
      allBooksData,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { lang: "en" } }, { params: { lang: "de" } }],
    fallback: false,
  };
};

export default Book;
