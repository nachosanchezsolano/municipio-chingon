import useSWR from 'swr'
import { getPosts } from '@/lib/wordpress'

export function usePosts(type: string) {
  const { data, error } = useSWR(`posts/${type}`, () => getPosts(type), {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshInterval: 60000, // Revalidate every minute
  })

  return {
    posts: data,
    isLoading: !error && !data,
    isError: error
  }
}

