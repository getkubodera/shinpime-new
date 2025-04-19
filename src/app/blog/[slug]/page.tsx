'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Calendar, ArrowLeft, Share2, User, Clock, Bookmark, MessageSquare, Send, Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from 'next/navigation';
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface WordPressPost {
  ID: number;
  title: string;
  content: string;
  date: string;
  featured_image: string;
  URL: string;
  author: {
    name: string;
    avatar_URL: string;
  };
}

interface Comment {
  ID: number;
  content: string;
  author: string | { name: string };
  author_avatar: string;
  date: string;
}

export default function BlogPostPage() {
  const [post, setPost] = useState<WordPressPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [commenterName, setCommenterName] = useState('');
  const [commenterEmail, setCommenterEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [youtubeVideos, setYoutubeVideos] = useState<string[]>([]);
  const [videoErrors, setVideoErrors] = useState<Record<string, boolean>>({});
  const [subscriberEmail, setSubscriberEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const params = useParams();
  const slug = params.slug as string;

  const SITE_ID = 'blog.shinpi.me';
  const WORDPRESS_API_URL = `https://public-api.wordpress.com/rest/v1.1/sites/${SITE_ID}`;

  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${WORDPRESS_API_URL}/posts/slug:${slug}`);
        const data = await response.json();
        setPost(data);
        
        // Extract YouTube links from content
        if (data && data.content) {
          const youtubeLinks = extractYoutubeLinks(data.content);
          setYoutubeVideos(youtubeLinks);
        }
        
        // Fetch comments for this post
        if (data && data.ID) {
          const commentsResponse = await fetch(`${WORDPRESS_API_URL}/posts/${data.ID}/replies`);
          const commentsData = await commentsResponse.json();
          setComments(commentsData.comments || []);
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) {
      fetchPost();
    }
  }, [slug]);

  // Extract YouTube links from content
  const extractYoutubeLinks = (content: string): string[] => {
    // Updated regex to capture the entire URL including query parameters
    const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})(?:\?[^\s<]*)?/g;
    const matches = content.match(youtubeRegex) || [];
    return matches.map(url => {
      // Extract video ID - now we need to handle the full URL
      const videoIdMatch = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
      const videoId = videoIdMatch ? videoIdMatch[1] : '';
      return videoId;
    }).filter(id => id !== '');
  };

  // Get YouTube embed URL from video ID
  const getYoutubeEmbedUrl = (videoId: string): string => {
    return `https://www.youtube.com/embed/${videoId}`;
  };

  // Get YouTube watch URL from video ID
  const getYoutubeWatchUrl = (videoId: string): string => {
    return `https://www.youtube.com/watch?v=${videoId}`;
  };

  // Handle video load error
  const handleVideoError = (videoId: string) => {
    setVideoErrors(prev => ({
      ...prev,
      [videoId]: true
    }));
  };

  // Process content to remove YouTube links
  const processContent = (content: string): string => {
    if (!content) return '';
    
    // Updated regex to match the entire URL including query parameters
    const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})(?:\?[^\s<]*)?/g;
    return content.replace(youtubeRegex, '');
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

  // Clean comment content to remove unwanted text
  const cleanCommentContent = (content: string) => {
    if (!content) return '';
    
    // First, replace the specific HTML entity that's causing problems
    let cleanedContent = content.replace(/&#8211;/g, '–');
    
    // Remove "uncategorized" or similar text that might be in the comment
    cleanedContent = cleanedContent
      .replace(/<p>uncategorized<\/p>/gi, '')
      .replace(/<p>Uncategorized<\/p>/gi, '')
      .replace(/<p>カテゴリーなし<\/p>/gi, '')
      .replace(/Uncategorized/gi, '')
      .replace(/uncategorized/gi, '')
      .replace(/カテゴリーなし/gi, '');
    
    return cleanedContent;
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!post || !newComment.trim() || !commenterName.trim() || !commenterEmail.trim()) return;
    
    setIsSubmitting(true);
    try {
      // In a real implementation, you would send this to your WordPress API
      // For now, we'll simulate adding a comment
      const newCommentObj: Comment = {
        ID: Date.now(),
        content: newComment,
        author: commenterName,
        author_avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(commenterName)}&background=random`,
        date: new Date().toISOString()
      };
      
      setComments([newCommentObj, ...comments]);
      setNewComment('');
      setCommenterName('');
      setCommenterEmail('');
      setShowCommentForm(false);
    } catch (error) {
      console.error('Error submitting comment:', error);
    } finally {
      setIsSubmitting(false);
    }
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

  // Handle bookmark
  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    
    // Save to localStorage
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    if (!isBookmarked) {
      // Add bookmark
      if (!bookmarks.includes(post?.ID)) {
        bookmarks.push(post?.ID);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
      }
    } else {
      // Remove bookmark
      const index = bookmarks.indexOf(post?.ID);
      if (index > -1) {
        bookmarks.splice(index, 1);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
      }
    }
  };

  // Check if post is bookmarked on load
  useEffect(() => {
    if (post) {
      const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
      setIsBookmarked(bookmarks.includes(post.ID));
    }
  }, [post]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-primary mb-4">記事が見つかりません</h1>
          <Link href="/blog">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              ブログ一覧に戻る
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link href="/blog" className="inline-flex items-center text-muted-foreground hover:text-primary mb-8 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              ブログ一覧に戻る
            </Link>
            
            <div className="space-y-8">
              <h1 className="text-3xl md:text-5xl font-bold text-primary leading-tight">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {formatDate(post.date)}
                </div>
                {post.author && (
                  <div className="flex items-center gap-2">
                    <div className="relative w-8 h-8 rounded-full overflow-hidden border border-border/50">
                      <Image
                        src={post.author.avatar_URL}
                        alt={post.author.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {post.author.name}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image Section */}
      {post.featured_image && (
        <section className="py-4">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="relative w-full h-[300px] md:h-[400px] rounded-xl overflow-hidden shadow-lg">
                <Image
                  src={post.featured_image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Content Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-card rounded-xl shadow-md border border-border/50 overflow-hidden">
              <div className="p-6 md:p-10">
                {/* YouTube Videos Section */}
                {youtubeVideos.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-4 text-primary">関連動画</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {youtubeVideos.map((videoId, index) => (
                        <div key={index} className="relative w-full pb-[56.25%] rounded-lg overflow-hidden bg-muted/30">
                          {videoErrors[videoId] ? (
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                              <Youtube className="w-12 h-12 text-red-500 mb-4" />
                              <p className="text-muted-foreground mb-4">この動画は埋め込み再生が無効になっています</p>
                              <Button 
                                variant="outline" 
                                className="bg-red-500 hover:bg-red-600 text-white border-red-500"
                                onClick={() => window.open(getYoutubeWatchUrl(videoId), '_blank')}
                              >
                                YouTubeで視聴する
                              </Button>
                            </div>
                          ) : (
                            <iframe
                              src={getYoutubeEmbedUrl(videoId)}
                              title={`YouTube video ${index + 1}`}
                              className="absolute top-0 left-0 w-full h-full"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              onError={() => handleVideoError(videoId)}
                            ></iframe>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Content in multiple columns for long content */}
                <div className="prose prose-lg max-w-none prose-headings:text-primary prose-a:text-primary hover:prose-a:text-primary/80 prose-img:rounded-lg prose-img:shadow-md">
                  {post && post.content && post.content.length > 1000 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div dangerouslySetInnerHTML={{ __html: processContent(post.content.substring(0, Math.ceil(post.content.length / 2))) }} />
                      <div dangerouslySetInnerHTML={{ __html: processContent(post.content.substring(Math.ceil(post.content.length / 2))) }} />
                    </div>
                  ) : (
                    <div dangerouslySetInnerHTML={{ __html: processContent(post?.content || '') }} />
                  )}
                </div>
              </div>
              
              <div className="flex flex-col gap-4 p-6 border-t border-border/50 bg-muted/30">
                <div className="flex justify-center gap-2">
                  <Button 
                    variant="ghost" 
                    onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}
                    className="text-[#1877F2] hover:text-[#1877F2]/80"
                  >
                    <Facebook className="w-4 h-4 mr-2" />
                    Facebookで共有
                  </Button>
                  <Button 
                    variant="ghost" 
                    onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}`, '_blank')}
                    className="text-[#1DA1F2] hover:text-[#1DA1F2]/80"
                  >
                    <Twitter className="w-4 h-4 mr-2" />
                    Twitterで共有
                  </Button>
                  <Button 
                    variant="ghost" 
                    onClick={() => window.open(`https://www.instagram.com/`, '_blank')}
                    className="text-[#E4405F] hover:text-[#E4405F]/80"
                  >
                    <Instagram className="w-4 h-4 mr-2" />
                    Instagramで共有
                  </Button>
                </div>
                <div className="flex justify-center">
                  <Link href="/blog">
                    <Button variant="outline" className="w-full sm:w-auto">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      ブログ一覧に戻る
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comments Section */}
      <section className="py-12 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-card rounded-xl shadow-md border border-border/50 overflow-hidden">
              <div className="p-6 md:p-10">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
                    <MessageSquare className="w-5 h-5" />
                    コメント ({comments.length})
                  </h2>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowCommentForm(!showCommentForm)}
                  >
                    {showCommentForm ? 'キャンセル' : 'コメントを投稿'}
                  </Button>
                </div>

                {/* Comment Form */}
                {showCommentForm && (
                  <form onSubmit={handleSubmitComment} className="mb-8 space-y-4 p-4 bg-muted/30 rounded-lg">
                    <Textarea
                      placeholder="コメントを入力してください..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="min-h-[120px]"
                      required
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        placeholder="お名前"
                        value={commenterName}
                        onChange={(e) => setCommenterName(e.target.value)}
                        required
                      />
                      <Input
                        type="email"
                        placeholder="メールアドレス"
                        value={commenterEmail}
                        onChange={(e) => setCommenterEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="flex justify-end">
                      <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        ) : (
                          <Send className="w-4 h-4 mr-2" />
                        )}
                        コメントを投稿
                      </Button>
                    </div>
                  </form>
                )}

                {/* Comments List */}
                <div className="space-y-6">
                  {comments.length > 0 ? (
                    comments.map((comment) => (
                      <div key={comment.ID} className="flex gap-4 p-4 bg-muted/20 rounded-lg">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={comment.author_avatar} alt={typeof comment.author === 'string' ? comment.author : comment.author.name} />
                          <AvatarFallback>{typeof comment.author === 'string' ? comment.author.charAt(0) : comment.author.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium">{typeof comment.author === 'string' ? comment.author : comment.author.name}</span>
                            <span className="text-xs text-muted-foreground">
                              {formatDate(comment.date)}
                            </span>
                          </div>
                          <div 
                            className="text-foreground prose prose-sm max-w-none" 
                            dangerouslySetInnerHTML={{ 
                              __html: cleanCommentContent(comment.content) || '' 
                            }} 
                          />
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <p>まだコメントはありません。最初のコメントを投稿してみましょう！</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
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