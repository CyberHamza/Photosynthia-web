export interface BlogArticle {
 title: string;
 description: string;
 url: string;
 urlToImage: string;
 publishedAt: string;
 source: { name: string };
}

const API_KEY = '04302854c264445380d914c88995dded';

export async function fetchBlogs(): Promise<BlogArticle[]> {
 const response = await fetch(
   `https://newsapi.org/v2/everything?q=environment+climate+plants&language=en&sortBy=publishedAt&pageSize=12&apiKey=${API_KEY}`
 );

 const data = await response.json();
 if (!response.ok) {
   throw new Error(data.message || 'Failed to fetch blogs');
 }

 return data.articles;
}
