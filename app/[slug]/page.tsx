// pages/[slug].tsx
import { GetStaticPaths, GetStaticProps } from "next";
import { getPage } from "@/lib/wordpress";

export const getStaticPaths: GetStaticPaths = async () => {
  // Opcional: Obtén slugs dinámicamente desde la API
  const res = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/wp/v2/pages`);
  const pages = await res.json();

  const paths = pages.map((page: { slug: string }) => ({
    params: { slug: page.slug },
  }));

  return {
    paths, // Define las rutas dinámicas
    fallback: "blocking", // Genera páginas bajo demanda
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context.params?.slug as string;

  // Llama a la API desde el servidor
  const page = await getPage(slug);

  if (!page) {
    return { notFound: true };
  }

  return {
    props: {
      page,
    },
    revalidate: 10, // ISR: Actualiza cada 10 segundos
  };
};

const Page = ({ page }: { page: { title: string; content: string } }) => {
  return (
    <article className="container py-6 md:py-12">
      <h1 className="text-4xl font-bold tracking-tight">{page.title}</h1>
      <div
        className="mt-6 prose prose-gray max-w-none dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: page.content }}
      />
    </article>
  );
};

export default Page;
