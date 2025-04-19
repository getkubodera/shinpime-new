'use client';

// Force dynamic rendering to prevent build errors
export const dynamic = 'force-dynamic';

import { useState, useEffect, Suspense } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight, MessageSquare, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from 'next/navigation';

// Types for WordPress.com API responses
interface WordPressPost {
  ID: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  featured_image: string;
  URL: string;
  slug: string;
  comment_count?: number;
  status: string;
  deleted: boolean;
}

// Add a loading state component
function LoadingState() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <div className="h-48 bg-muted animate-pulse"></div>
            <CardContent className="p-4">
              <div className="h-6 bg-muted animate-pulse mb-2"></div>
              <div className="h-4 bg-muted animate-pulse w-3/4 mb-2"></div>
              <div className="h-4 bg-muted animate-pulse w-1/2"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// Main content component that uses useSearchParams
function AllBlogPostsContent() {
  const [posts, setPosts] = useState<WordPressPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPosts, setTotalPosts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  const searchParams = useSearchParams();
  const router = useRouter();
  const pageParam = searchParams.get('page_no');
  
  const POSTS_PER_PAGE = 12;
  const SITE_ID = 'blog.shinpi.me';
  const WORDPRESS_API_URL = `https://public-api.wordpress.com/rest/v1.1/sites/${SITE_ID}`;

  // Fetch posts from WordPress.com API
  const fetchPosts = async (page: number) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${WORDPRESS_API_URL}/posts?number=${POSTS_PER_PAGE}&page=${page}`,
        { cache: 'no-store' } // Disable caching to ensure fresh data
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Get the total number of posts from the API response
      const totalFound = data.found || 0;
      setTotalPosts(totalFound);
      setTotalPages(Math.ceil(totalFound / POSTS_PER_PAGE));
      
      // Filter out deleted or unpublished posts
      const validPosts = data.posts.filter((post: WordPressPost) => 
        post.status === 'publish' && !post.deleted
      );
      
      // Log the first post to debug the slug
      if (validPosts && validPosts.length > 0) {
        console.log('First post data:', validPosts[0]);
        console.log('First post slug:', validPosts[0].slug);
      }
      
      // Ensure each post has a valid slug
      const postsWithValidSlugs = validPosts.map((post: WordPressPost) => {
        // If the slug is missing or invalid, try to extract it from the URL
        if (!post.slug || post.slug === '') {
          const urlParts = post.URL.split('/');
          const potentialSlug = urlParts[urlParts.length - 2]; // Usually the slug is the second-to-last part
          return {
            ...post,
            slug: potentialSlug || 'default-slug'
          };
        }
        
        // Create a more reliable slug by combining ID and slug
        // This ensures uniqueness and helps with routing
        const reliableSlug = `${post.ID}-${post.slug}`;
        
        return {
          ...post,
          slug: reliableSlug
        };
      });
      
      setPosts(postsWithValidSlugs);
    } catch (error) {
      console.error('Error fetching posts:', error);
      // Set empty posts array to avoid rendering errors
      setPosts([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Update useEffect with proper dependencies
  useEffect(() => {
    const page = pageParam ? parseInt(pageParam) : 1;
    setCurrentPage(page);
    fetchPosts(page);
  }, [pageParam]);

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  // Strip HTML and limit text length
  const stripHtmlAndLimit = (html: string, limit: number = 150) => {
    if (!html) return '';
    const plainText = html.replace(/<[^>]*>/g, '');
    return plainText.length > limit ? plainText.substring(0, limit) + '...' : plainText;
  };

  // Handle page change
  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    router.push(`/blog/all?page_no=${newPage}`);
  };

  // Show loading state
  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <main className="min-h-screen bg-background">
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-primary">すべての記事</h1>
            <Link href="/blog">
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                ブログトップに戻る
              </Button>
            </Link>
          </div>
          
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold text-muted-foreground mb-4">記事が見つかりませんでした</h2>
              <p className="text-muted-foreground mb-6">申し訳ありませんが、現在表示できる記事がありません。</p>
              <Link href="/blog">
                <Button>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  ブログトップに戻る
                </Button>
              </Link>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                  <Link href={`/blog/${post.slug}`} key={post.ID}>
                    <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow">
                      {post.featured_image && (
                        <div className="relative h-48 w-full">
                          <Image
                            src={post.featured_image}
                            alt={post.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <CardContent className="p-4">
                        <h2 className="text-xl font-semibold mb-2 line-clamp-2">{post.title}</h2>
                        <div className="flex items-center text-sm text-muted-foreground mb-2">
                          <Calendar className="w-4 h-4 mr-1" />
                          {formatDate(post.date)}
                        </div>
                        <p className="text-muted-foreground line-clamp-3">
                          {stripHtmlAndLimit(post.excerpt || post.content)}
                        </p>
                      </CardContent>
                      <CardFooter className="p-4 pt-0 flex justify-between items-center">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MessageSquare className="w-4 h-4 mr-1" />
                          {post.comment_count || 0}
                        </div>
                        <Button variant="ghost" size="sm">
                          続きを読む
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                      </CardFooter>
                    </Card>
                  </Link>
                ))}
              </div>
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-8 gap-2">
                  <Button
                    variant="outline"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    前へ
                  </Button>
                  <div className="flex items-center px-4">
                    <span className="text-sm">
                      {currentPage} / {totalPages}
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    次へ
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </main>
  );
}

// Main page component with Suspense boundary
export default function AllBlogPostsPage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <AllBlogPostsContent />
    </Suspense>
  );
} 