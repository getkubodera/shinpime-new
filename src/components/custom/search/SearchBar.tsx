'use client';

import { useState, useEffect, useRef } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, List } from "lucide-react";
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface SearchBarProps {
  onSearch: (query: string) => void;
  suggestions: { title: string; url: string }[];
}

export default function SearchBar({ onSearch, suggestions }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [displayedSuggestions, setDisplayedSuggestions] = useState<{ title: string; url: string }[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const SUGGESTIONS_PER_PAGE = 5;

  // Mount effect - runs once on component mount
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Filter suggestions when search query changes
  useEffect(() => {
    const filtered = suggestions.filter(suggestion =>
      suggestion.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    // Show only the first 5 suggestions
    setDisplayedSuggestions(filtered.slice(0, SUGGESTIONS_PER_PAGE));
  }, [searchQuery, suggestions]);

  // Update dropdown position when input is focused or when scrolling
  const updateDropdownPosition = () => {
    if (inputRef.current) {
      const rect = inputRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width
      });
    }
  };

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if the click is on a suggestion item
      const target = event.target as HTMLElement;
      if (target.closest('.suggestion-item')) {
        return; // Don't close if clicking on a suggestion
      }
      
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Update position on scroll and resize
  useEffect(() => {
    if (!showSuggestions) return;

    const handleScroll = () => {
      requestAnimationFrame(updateDropdownPosition);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateDropdownPosition);
    
    // Initial position update
    updateDropdownPosition();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateDropdownPosition);
    };
  }, [showSuggestions]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(searchQuery);
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (suggestion: { title: string; url: string }) => {
    setSearchQuery(suggestion.title);
    onSearch(suggestion.title);
    setShowSuggestions(false);
    
    // Use Next.js router for navigation
    router.push(suggestion.url);
  };

  // Render dropdown using portal
  const renderDropdown = () => {
    if (!mounted || !showSuggestions) return null;

    return createPortal(
      <div 
        className="absolute z-[9999] bg-background border-2 border-primary/30 rounded-md shadow-xl overflow-auto" 
        style={{ 
          top: `${dropdownPosition.top}px`, 
          left: `${dropdownPosition.left}px`, 
          width: `${dropdownPosition.width}px`,
          maxHeight: '80vh',
          minHeight: '300px'
        }}
      >
        {displayedSuggestions.length > 0 ? (
          <>
            {displayedSuggestions.map((suggestion, index) => (
              <button
                key={index}
                type="button"
                className="suggestion-item w-full px-4 py-3 text-left hover:bg-accent hover:text-accent-foreground transition-colors text-sm border-b border-border/30 last:border-b-0"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleSuggestionClick(suggestion);
                }}
              >
                {suggestion.title}
              </button>
            ))}
            
            {/* All Blogs Button */}
            <Link 
              href="/blog/all?page_no=1" 
              className="suggestion-item w-full px-4 py-3 text-left hover:bg-accent hover:text-accent-foreground transition-colors text-sm border-t border-border/30 flex items-center justify-between"
              onClick={() => setShowSuggestions(false)}
            >
              <span>すべての記事を見る</span>
              <List className="w-4 h-4" />
            </Link>
          </>
        ) : (
          <>
            <div className="px-4 py-3 text-sm text-muted-foreground">
              検索結果がありません
            </div>
            
            {/* All Blogs Button */}
            <Link 
              href="/blog/all?page_no=1" 
              className="suggestion-item w-full px-4 py-3 text-left hover:bg-accent hover:text-accent-foreground transition-colors text-sm border-t border-border/30 flex items-center justify-between"
              onClick={() => setShowSuggestions(false)}
            >
              <span>すべての記事を見る</span>
              <List className="w-4 h-4" />
            </Link>
          </>
        )}
      </div>,
      document.body
    );
  };

  return (
    <div ref={searchRef} className="relative w-full">
      <form onSubmit={handleSubmit} className="flex">
        <div className="relative flex-1">
          <Input
            ref={inputRef}
            type="text"
            placeholder="記事を検索..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => {
              setShowSuggestions(true);
              updateDropdownPosition();
            }}
            className="w-full pr-10 rounded-r-none"
          />
          <Button 
            type="submit" 
            size="sm" 
            variant="ghost" 
            className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
          >
            <Search className="w-4 h-4 text-muted-foreground" />
          </Button>
        </div>
      </form>
      
      {renderDropdown()}
    </div>
  );
} 