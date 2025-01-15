import { getPage } from "@/lib/wordpress";

// Componente principal
export default async function Page({ params }: { params: { slug: string } }) {
  try {
    // Llamada a la función de `lib/wordpress` para obtener la página
    const page = await getPage(params.slug);

    // Si no se encuentra la página, lanza un error para manejarlo con un componente de error
    if (!page) {
      throw new Error("Page not found");
    }

    return (
      <article className="container py-6 md:py-12">
        <h1 className="text-4xl font-bold tracking-tight">{page.title}</h1>
        <div
          className="mt-6 prose prose-gray max-w-none dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: page.content }}
        />
      </article>
    );
  } catch (error) {
    console.error("Error rendering page:", error);
    return (
      <div className="container py-6 md:py-12">
        <h1 className="text-4xl font-bold tracking-tight">Error</h1>
        <p>Sorry, we couldn't load the page.</p>
      </div>
    );
  }
}
