'use client';

// Force dynamic rendering to prevent build errors
export const dynamic = 'force-dynamic';

import { useState, useEffect, Suspense } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar,  ArrowRight, MessageSquare, Facebook, Twitter, Instagram } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SearchBar from '@/components/custom/search/SearchBar';
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

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

interface Comment {
  ID: number;
  content: string;
  author: string | { name: string };
  author_avatar: string;
  date: string;
}

// Add a loading state component
function LoadingState() {
  return (
    <section className="py-12 bg-gradient-to-b from-background to-background/80">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-primary mb-8 text-center">
          ブログ記事
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Featured post skeleton */}
          <Card className="md:col-span-2 md:row-span-2 group hover:shadow-lg transition-shadow duration-300 flex flex-col h-full overflow-hidden">
            <div className="h-64 md:h-80 bg-muted animate-pulse"></div>
            <CardHeader className="space-y-2">
              <div className="h-8 bg-muted animate-pulse mb-2"></div>
              <div className="h-4 bg-muted animate-pulse w-3/4 mb-2"></div>
              <div className="h-4 bg-muted animate-pulse w-1/2"></div>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="h-4 bg-muted animate-pulse w-full mb-2"></div>
              <div className="h-4 bg-muted animate-pulse w-5/6 mb-2"></div>
              <div className="h-4 bg-muted animate-pulse w-4/6"></div>
            </CardContent>
          </Card>
          
          {/* Regular post skeletons */}
          {[...Array(5)].map((_, i) => (
            <Card key={i} className="group hover:shadow-lg transition-shadow duration-300 flex flex-col h-full overflow-hidden">
              <div className="h-48 bg-muted animate-pulse"></div>
              <CardHeader className="space-y-2">
                <div className="h-6 bg-muted animate-pulse mb-2"></div>
                <div className="h-4 bg-muted animate-pulse w-3/4 mb-2"></div>
                <div className="h-4 bg-muted animate-pulse w-1/2"></div>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="h-4 bg-muted animate-pulse w-full mb-2"></div>
                <div className="h-4 bg-muted animate-pulse w-5/6"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// Main content component
function BlogContent() {
  const [posts, setPosts] = useState<WordPressPost[]>([]);
  const [latestPosts, setLatestPosts] = useState<WordPressPost[]>([]);
  const [postComments, setPostComments] = useState<Record<number, Comment[]>>({});
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
    setIsLoading(true);
    try {
      // Fetch more posts for suggestions to ensure we have enough
      const response = await fetch(`${WORDPRESS_API_URL}/posts?number=50`);
      const data = await response.json();
      
      // Filter out deleted or unpublished posts
      const validPosts = data.posts.filter((post: WordPressPost) => 
        post.status === 'publish' && !post.deleted
      );
      
      // Ensure we have at least 12 posts for the page
      if (validPosts && validPosts.length > 0) {
        setAllPosts(validPosts);
        
        // Set the latest 12 posts for the page
        const allDisplayedPosts = validPosts.slice(0, 12);
        setLatestPosts(allDisplayedPosts);
        
        // Fetch comments for the latest posts
        allDisplayedPosts.forEach((post: WordPressPost) => {
          fetchPostComments(post.ID);
        });
        
        console.log(`Loaded ${validPosts.length} valid posts for suggestions`);
      }
    } catch (error) {
      console.error('Error fetching all posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch comments for a specific post
  const fetchPostComments = async (postId: number) => {
    try {
      const response = await fetch(`${WORDPRESS_API_URL}/posts/${postId}/replies?number=3`);
      const data = await response.json();
      
      if (data.comments && data.comments.length > 0) {
        setPostComments(prev => ({
          ...prev,
          [postId]: data.comments
        }));
      }
    } catch (error) {
      console.error(`Error fetching comments for post ${postId}:`, error);
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
      
      // Filter out deleted or unpublished posts
      const validPosts = data.posts.filter((post: WordPressPost) => 
        post.status === 'publish' && !post.deleted
      );
      
      setPosts(validPosts);
      setTotalPages(Math.ceil(validPosts.length / POSTS_PER_PAGE));
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Update useEffect with proper dependencies
  useEffect(() => {
    const loadInitialData = async () => {
      await fetchAllPosts();
    };
    
    loadInitialData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    // Return both title and URL for each post with the correct ID-slug format
    return allPosts.map(post => ({
      title: post.title,
      url: `/blog/${post.ID}-${post.slug}`
    }));
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

  // Clean comment content to remove unwanted text
  const cleanCommentContent = (content: string) => {
    if (!content) return '';
    
    // Remove HTML tags but preserve line breaks
    let cleanedContent = content.replace(/<br\s*\/?>/gi, '\n');
    cleanedContent = cleanedContent.replace(/<[^>]*>/g, '');
    
    // Remove "uncategorized" or similar text that might be in the comment
    cleanedContent = cleanedContent.replace(/uncategorized/i, '');
    
    // Decode HTML entities
    const textarea = document.createElement('textarea');
    textarea.innerHTML = cleanedContent;
    cleanedContent = textarea.value;
    
    return cleanedContent;
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section - Redesigned to be more compact */}
      <section className="relative py-10 md:py-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent"></div>
        <div className="container mx-auto px-4 relative">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 max-w-5xl mx-auto">
            <div className="text-center md:text-left md:w-1/2">
              <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
                ブログ
              </h1>
              <p className="text-base text-muted-foreground">
                東洋思想、スピリチュアル、そして人生の深い洞察について
              </p>
            </div>
            
            {/* Search Form - More compact design */}
            <div className="w-full md:w-1/2">
              <div className="bg-card/50 backdrop-blur-sm rounded-lg p-3 shadow-sm border border-border/30">
                <SearchBar
                  onSearch={handleSearch}
                  suggestions={getSuggestions()}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Latest Posts Section */}
      {isLoading ? (
        <LoadingState />
      ) : (
        <>
          {latestPosts.length > 0 && !searchQuery && (
            <section className="py-12 bg-gradient-to-b from-background to-background/80">
              <div className="container mx-auto px-4">
                <h2 className="text-2xl md:text-3xl font-bold text-primary mb-8 text-center">
                  ブログ記事
                </h2>
                
                {/* Search Bar */}
                <div className="max-w-2xl mx-auto mb-8">
                  <SearchBar 
                    onSearch={handleSearch} 
                    suggestions={getSuggestions()} 
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {latestPosts.map((post, index) => (
                    <Card 
                      key={post.ID} 
                      className={`group hover:shadow-lg transition-shadow duration-300 flex flex-col h-full ${
                        index === 0 ? 'md:col-span-2 md:row-span-2' : ''
                      }`}
                    >
                      <Link href={`/blog/${post.ID}-${post.slug}`} className="flex flex-col h-full">
                        <CardHeader className="space-y-2">
                          {post.featured_image && (
                            <div className={`relative w-full overflow-hidden rounded-t-lg ${
                              index === 0 ? 'h-64 md:h-80' : 'h-48'
                            }`}>
                              <Image
                                src={post.featured_image}
                                alt={post.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                              {index === 0 && (
                                <div className="absolute top-4 left-4 bg-black text-white text-xs font-bold px-3 py-1 rounded-full">
                                  最新記事
                                </div>
                              )}
                            </div>
                          )}
                          <CardTitle className={`group-hover:text-primary transition-colors duration-300 line-clamp-2 ${
                            index === 0 ? 'text-2xl min-h-[4rem]' : 'text-xl min-h-[3.5rem]'
                          }`}>
                            {post.title}
                          </CardTitle>
                          <CardDescription className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {formatDate(post.date)}
                            {post.comment_count !== undefined && (
                              <span className="flex items-center gap-1 ml-2">
                                <MessageSquare className="w-4 h-4" />
                                {post.comment_count}
                              </span>
                            )}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow">
                          <p className="text-muted-foreground line-clamp-3 min-h-[4.5rem]">
                            {stripHtmlAndLimit(post.excerpt, index === 0 ? 150 : 100)}
                          </p>
                          
                          {/* Display top comments for featured posts */}
                          {index === 0 && postComments[post.ID] && postComments[post.ID].length > 0 && (
                            <div className="mt-4 pt-4 border-t border-border/30">
                              <h3 className="text-sm font-medium mb-2">最新のコメント</h3>
                              <div className="space-y-3">
                                {postComments[post.ID].map(comment => (
                                  <div key={comment.ID} className="flex gap-2 text-sm">
                                    <Avatar className="h-6 w-6">
                                      <AvatarImage src={comment.author_avatar} alt={typeof comment.author === 'string' ? comment.author : comment.author.name} />
                                      <AvatarFallback>{typeof comment.author === 'string' ? comment.author.charAt(0) : comment.author.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                      <span className="font-medium text-xs">{typeof comment.author === 'string' ? comment.author : comment.author.name}</span>
                                      <p className="text-muted-foreground text-xs line-clamp-2">{cleanCommentContent(comment.content)}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {/* Share buttons for featured posts */}
                          {index === 0 && (
                            <div className="mt-4 pt-4 border-t border-border/30">
                              <h3 className="text-sm font-medium mb-2">共有</h3>
                              <div className="flex gap-2">
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${window.location.origin}/blog/${post.slug}`)}`, '_blank');
                                  }}
                                  className="text-[#1877F2] hover:text-[#1877F2]/80"
                                >
                                  <Facebook className="w-4 h-4 mr-1" />
                                  Facebook
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(`${window.location.origin}/blog/${post.slug}`)}&text=${encodeURIComponent(post.title)}`, '_blank');
                                  }}
                                  className="text-[#1DA1F2] hover:text-[#1DA1F2]/80"
                                >
                                  <Twitter className="w-4 h-4 mr-1" />
                                  Twitter
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    window.open(`https://www.instagram.com/`, '_blank');
                                  }}
                                  className="text-[#E4405F] hover:text-[#E4405F]/80"
                                >
                                  <Instagram className="w-4 h-4 mr-1" />
                                  Instagram
                                </Button>
                              </div>
                            </div>
                          )}
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
              </div>
            </section>
          )}

          {/* Remove the Blog Posts Grid section and keep only the "View All Blogs" link */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="flex justify-center">
                <Link href="/blog/all?page_no=1">
                  <Button variant="outline" className="flex items-center gap-2">
                    すべてのブログを見る
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
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
                      &ldquo;最新の記事&rdquo;をご覧ください
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
        </>
      )}
    </main>
  );
}

// Main page component with Suspense boundary
export default function BlogPage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <BlogContent />
    </Suspense>
  );
} 