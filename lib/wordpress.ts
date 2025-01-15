import type { Post, Evento } from "@/types/wordpress";

const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || "";

if (!API_URL) {
  throw new Error("NEXT_PUBLIC_WORDPRESS_API_URL no está definido en el archivo .env");
}

async function fetchFromAPI<T>(endpoint: string): Promise<T | null> {
  try {
    const res = await fetch(`${API_URL}${endpoint}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
    }
    return await res.json();
  } catch (error) {
    console.error(`Error fetching from API (${endpoint}):`, error);
    return null;
  }
}

export async function getPage(slug: string): Promise<{ title: string; content: string } | null> {
  const data = await fetchFromAPI<{ title: string; content: string }[]>(`/wp/v2/pages?slug=${slug}`);
  return data ? data[0] || null : null;
}

export async function getPosts(type: string): Promise<Post[]> {
  const data = await fetchFromAPI<Post[]>(`/wp/v2/${type}`);
  return data || [];
}

export async function getPost(slug: string): Promise<Post | null> {
  const data = await fetchFromAPI<Post[]>(`/wp/v2/noticias?slug=${slug}&_embed`);
  return data ? data[0] || null : null;
}

export async function getEventos(): Promise<Evento[]> {
  const data = await fetchFromAPI<Evento[]>(`/wp/v2/eventos?_embed&acf_format=standard`);
  return data || [];
}
