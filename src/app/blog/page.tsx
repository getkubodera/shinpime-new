'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SearchBar from '@/components/custom/search/SearchBar';
import { Input } from "@/components/ui/input";

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
}

export default function BlogPage() {
  const [posts, setPosts] = useState<WordPressPost[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [allPosts, setAllPosts] = useState<WordPressPost[]>([]);
  const [subscriberEmail, setSubscriberEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const POSTS_PER_PAGE = 6;
  const SITE_ID = 'blog.shinpi.me';
  const WORDPRESS_API_URL = `https://public-api.wordpress.com/rest/v1.1/sites/${SITE_ID}`;

  // Fetch all posts for suggestions
  const fetchAllPosts = async () => {
    try {
      const response = await fetch(`${WORDPRESS_API_URL}/posts?number=100`);
      const data = await response.json();
      setAllPosts(data.posts);
    } catch (error) {
      console.error('Error fetching all posts:', error);
    }
  };

  // Fetch posts from WordPress.com API
  const fetchPosts = async (page: number, search: string = '') => {
    setIsLoading(true);
    try {
      const searchParam = search ? `&search=${encodeURIComponent(search)}` : '';
      const response = await fetch(
        `${WORDPRESS_API_URL}/posts?number=${POSTS_PER_PAGE}&page=${page}${searchParam}`
      );
      
      const data = await response.json();
      setPosts(data.posts);
      setTotalPages(Math.ceil(data.found / POSTS_PER_PAGE));
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchPosts(currentPage);
    fetchAllPosts();
  }, [currentPage]);

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
    fetchPosts(1, query);
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  // Strip HTML tags and limit excerpt length
  const stripHtmlAndLimit = (html: string, limit: number = 150) => {
    const text = html.replace(/<[^>]*>/g, '');
    return text.length > limit ? `${text.slice(0, limit)}...` : text;
  };

  // Get suggestions from all posts
  const getSuggestions = () => {
    return allPosts.map(post => post.title);
  };

  // Handle subscription
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subscriberEmail.trim()) return;
    
    setIsSubscribing(true);
    
    // Create a URL for the WordPress.com subscription page
    const subscriptionUrl = `https://subscribe.wordpress.com/?email=${encodeURIComponent(subscriberEmail)}&blog_id=${SITE_ID}`;
    
    // Open in a new window
    window.open(subscriptionUrl, '_blank');
    
    // Show success message
    setSubscriptionStatus({
      success: true,
      message: 'WordPress.comの購読ページに移動しました。メールアドレスを確認して購読を完了してください。',
    });
    
    // Reset form after a short delay
    setTimeout(() => {
      setSubscriberEmail('');
      setIsSubscribing(false);
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              ブログ
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              東洋思想、スピリチュアル、そして人生の深い洞察について
            </p>
            
            {/* Search Form */}
            <div className="max-w-lg mx-auto">
              <SearchBar
                onSearch={handleSearch}
                suggestions={getSuggestions()}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                  <Card key={post.ID} className="group hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
                    <Link href={`/blog/${post.slug}`} className="flex flex-col h-full">
                      <CardHeader className="space-y-2">
                        {post.featured_image && (
                          <div className="relative w-full h-48 overflow-hidden rounded-t-lg">
                            <Image
                              src={post.featured_image}
                              alt={post.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        )}
                        <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300 line-clamp-2 min-h-[3.5rem]">
                          {post.title}
                        </CardTitle>
                        <CardDescription className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {formatDate(post.date)}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <p className="text-muted-foreground line-clamp-3 min-h-[4.5rem]">
                          {stripHtmlAndLimit(post.excerpt, 100)}
                        </p>
                      </CardContent>
                      <CardFooter className="mt-auto pt-4 border-t">
                        <Button variant="ghost" className="w-full group-hover:text-primary transition-colors duration-300">
                          続きを読む
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </CardFooter>
                    </Link>
                  </Card>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-12">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                  >
                    前のページ
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                  >
                    次のページ
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Subscribe Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl shadow-md border border-primary/20 overflow-hidden">
              <div className="p-8 md:p-12 text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">最新の記事を受け取る</h2>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  メールマガジンに登録して、最新の記事や特別なコンテンツをいち早く受け取りましょう。
                </p>
                
                {subscriptionStatus ? (
                  <div className={`p-4 rounded-lg mb-4 ${subscriptionStatus.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                    {subscriptionStatus.message}
                  </div>
                ) : null}
                
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <Input 
                    type="email" 
                    placeholder="メールアドレス" 
                    className="flex-1"
                    value={subscriberEmail}
                    onChange={(e) => setSubscriberEmail(e.target.value)}
                    required
                    disabled={isSubscribing}
                  />
                  <Button 
                    type="submit" 
                    variant="default" 
                    className="shadow-md"
                    disabled={isSubscribing}
                  >
                    {isSubscribing ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        処理中...
                      </div>
                    ) : (
                      '登録する'
                    )}
                  </Button>
                </form>
                
                <p className="text-xs text-muted-foreground mt-4">
                  プライバシーポリシーに同意したものとみなされます。いつでも登録解除できます。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 