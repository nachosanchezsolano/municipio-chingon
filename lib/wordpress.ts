import type { Post, Evento } from "@/types/wordpress"

const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || "";

export async function getPage(slug: string): Promise<{ title: string; content: string } | null> {
  try {
    const res = await fetch(`${API_URL}/wp/v2/pages?slug=${slug}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch page: ${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    return data[0] || null; // La API devuelve un array, toma el primer elemento
  } catch (error) {
    console.error("Error fetching page:", error);
    return null;
  }
}

export async function getPosts(type: string): Promise<Post []> {
  try {
    const res = await fetch(`${API_URL}/wp/v2/${type}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch posts: ${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
    
  }
}

export async function getPost(slug: string): Promise<Post | null> {
  try {
    const res = await fetch(`${API_URL}/wp/v2/noticias?slug=${slug}&_embed`)
    if (!res.ok) {
      throw new Error(`Failed to fetch post: ${res.status} ${res.statusText}`)
    }
    const data = await res.json()
    return data[0] || null
  } catch (error) {
    console.error('Error fetching post:', error)
    return null
  }
}

export async function getEventos(): Promise<Evento[]> {
  try {
    const res = await fetch(`${API_URL}/wp/v2/eventos?_embed&acf_format=standard`)
    if (!res.ok) {
      throw new Error(`Failed to fetch eventos: ${res.status} ${res.statusText}`)
    }
    const data = await res.json()
    return data
  } catch (error) {
    console.error('Error fetching eventos:', error)
    return [];
  }
}
