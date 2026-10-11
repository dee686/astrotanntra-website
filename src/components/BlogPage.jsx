import React, { useState, useEffect, useMemo } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Search, 
  Sparkles, 
  Clock, 
  Calendar, 
  User, 
  Share2, 
  CheckCircle2, 
  Plus, 
  Edit3, 
  Trash2, 
  Lock, 
  Unlock, 
  ShieldCheck, 
  Mail, 
  BookOpen, 
  Compass, 
  Sun, 
  Grid, 
  Flame, 
  Flower2, 
  Home, 
  X, 
  Check, 
  ExternalLink, 
  MessageSquare,
  Globe,
  Tag,
  ChevronLeft,
  ChevronRight,
  RotateCcw
} from 'lucide-react';
import { 
  BLOG_CATEGORIES, 
  PRESET_BLOG_IMAGES, 
  getStoredBlogs, 
  addBlog, 
  updateBlog, 
  deleteBlog, 
  resetBlogsToDefault 
} from '../data/blogsData';
import { isBlogAdmin, loginWithEmail } from '../services/authService';

export default function BlogPage({ 
  onGoBack, 
  onOpenConsultation, 
  onOpenKundli, 
  lang = 'en', 
  setLang, 
  user = null,
  onLoginSuccess = null 
}) {
  const isHi = lang === 'hi';

  // Blogs database state
  const [blogs, setBlogs] = useState(() => getStoredBlogs());
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const ARTICLES_PER_PAGE = 6;

  // Admin access state
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => isBlogAdmin(user));
  const [isAdminLoginModalOpen, setIsAdminLoginModalOpen] = useState(false);
  const [adminEmailInput, setAdminEmailInput] = useState('deepak.kumar686@gmail.com');
  const [adminPasswordInput, setAdminPasswordInput] = useState('Password@123');
  const [adminLoginError, setAdminLoginError] = useState('');

  // Article Edit / Create Modal state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null); // null = new article
  const [editFormData, setEditFormData] = useState({
    title: '',
    titleHi: '',
    category: 'astrology',
    author: 'Acharya Devendra Shastri',
    authorHi: 'आचार्य देवेन्द्र शास्त्री',
    date: '',
    dateHi: '',
    readTime: '5 min read',
    readTimeHi: '5 मिनट का पठन',
    imageUrl: PRESET_BLOG_IMAGES[0].url,
    excerpt: '',
    excerptHi: '',
    contentStr: '',
    contentHiStr: '',
    keyTakeawaysStr: '',
    keyTakeawaysHiStr: '',
    remedyOrInsight: '',
    remedyOrInsightHi: '',
    isFeatured: false,
    isPopular: false,
    popularRank: ''
  });

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Toast notification
  const [toastMessage, setToastMessage] = useState(null);
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Sync admin status when user prop changes
  useEffect(() => {
    setIsAdminLoggedIn(isBlogAdmin(user));
  }, [user]);

  // Scroll to top on view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedArticle, currentPageNum, selectedCategory]);

  // Filtered blogs based on search query and category
  const filteredBlogs = useMemo(() => {
    return blogs.filter(blog => {
      // Category filter
      if (selectedCategory !== 'all' && blog.category !== selectedCategory) {
        return false;
      }
      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const titleMatch = (blog.title || '').toLowerCase().includes(q) || (blog.titleHi || '').toLowerCase().includes(q);
        const excerptMatch = (blog.excerpt || '').toLowerCase().includes(q) || (blog.excerptHi || '').toLowerCase().includes(q);
        const authorMatch = (blog.author || '').toLowerCase().includes(q) || (blog.authorHi || '').toLowerCase().includes(q);
        const categoryMatch = (blog.categoryLabelEn || '').toLowerCase().includes(q) || (blog.categoryLabelHi || '').toLowerCase().includes(q);
        return titleMatch || excerptMatch || authorMatch || categoryMatch;
      }
      return true;
    });
  }, [blogs, selectedCategory, searchQuery]);

  // Featured article (first featured found or first in list)
  const featuredArticle = useMemo(() => {
    return blogs.find(b => b.isFeatured) || blogs[0];
  }, [blogs]);

  // Popular articles (filtered by isPopular or fallback to first 5)
  const popularArticles = useMemo(() => {
    const popular = blogs.filter(b => b.isPopular && b.id !== featuredArticle?.id);
    popular.sort((a, b) => (a.popularRank || 99) - (b.popularRank || 99));
    if (popular.length >= 5) return popular.slice(0, 5);
    // Fill remaining with other blogs
    const others = blogs.filter(b => b.id !== featuredArticle?.id && !popular.includes(b));
    return [...popular, ...others].slice(0, 5);
  }, [blogs, featuredArticle]);

  // Latest blogs list (excluding featured in standard view, or showing filtered list)
  const latestBlogsList = useMemo(() => {
    if (searchQuery.trim() || selectedCategory !== 'all') {
      return filteredBlogs;
    }
    // Default home view: show articles excluding featured
    return blogs.filter(b => b.id !== featuredArticle?.id);
  }, [blogs, filteredBlogs, searchQuery, selectedCategory, featuredArticle]);

  // Pagination for latest blogs
  const totalPages = Math.max(1, Math.ceil(latestBlogsList.length / ARTICLES_PER_PAGE));
  const paginatedBlogs = useMemo(() => {
    const start = (currentPageNum - 1) * ARTICLES_PER_PAGE;
    return latestBlogsList.slice(start, start + ARTICLES_PER_PAGE);
  }, [latestBlogsList, currentPageNum]);

  // Handle Admin Login submission
  const handleAdminLoginSubmit = (e) => {
    e.preventDefault();
    setAdminLoginError('');

    const res = loginWithEmail(adminEmailInput, adminPasswordInput);
    if (!res.success) {
      setAdminLoginError(res.message || (isHi ? 'गलत क्रेडेंशियल्स।' : 'Invalid credentials.'));
      return;
    }

    if (!isBlogAdmin(res.user)) {
      setAdminLoginError(
        isHi 
          ? 'इस खाते को ब्लॉग संपादन की अनुमति नहीं है। केवल अधिकृत एडमिन आईडी (deepak.kumar686@gmail.com) का उपयोग करें।' 
          : 'This account does not have blog editor rights. Please use authorized admin ID (deepak.kumar686@gmail.com).'
      );
      return;
    }

    setIsAdminLoggedIn(true);
    setIsAdminLoginModalOpen(false);
    if (onLoginSuccess) onLoginSuccess(res.user);
    showToast(isHi ? 'एडमिन मोड सफलतापूर्वक सक्रिय हो गया!' : 'Admin Editor Mode Activated Successfully!');
  };

  // Open Create Modal
  const handleOpenCreateModal = () => {
    const now = new Date();
    const dateEn = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const dateHi = now.toLocaleDateString('hi-IN', { month: 'short', day: 'numeric', year: 'numeric' });

    setEditingBlog(null);
    setEditFormData({
      title: '',
      titleHi: '',
      category: 'astrology',
      author: user?.name || 'Deepak Kumar',
      authorHi: 'दीपक कुमार',
      date: dateEn,
      dateHi: dateHi,
      readTime: '5 min read',
      readTimeHi: '5 मिनट का पठन',
      imageUrl: PRESET_BLOG_IMAGES[0].url,
      excerpt: '',
      excerptHi: '',
      contentStr: '',
      contentHiStr: '',
      keyTakeawaysStr: '',
      keyTakeawaysHiStr: '',
      remedyOrInsight: '',
      remedyOrInsightHi: '',
      isFeatured: false,
      isPopular: false,
      popularRank: ''
    });
    setIsEditModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEditModal = (blog, e) => {
    if (e) e.stopPropagation();
    setEditingBlog(blog);
    setEditFormData({
      title: blog.title || '',
      titleHi: blog.titleHi || '',
      category: blog.category || 'astrology',
      author: blog.author || '',
      authorHi: blog.authorHi || '',
      date: blog.date || '',
      dateHi: blog.dateHi || '',
      readTime: blog.readTime || '5 min read',
      readTimeHi: blog.readTimeHi || '5 मिनट का पठन',
      imageUrl: blog.imageUrl || PRESET_BLOG_IMAGES[0].url,
      excerpt: blog.excerpt || '',
      excerptHi: blog.excerptHi || '',
      contentStr: Array.isArray(blog.content) ? blog.content.join('\n\n') : (blog.content || ''),
      contentHiStr: Array.isArray(blog.contentHi) ? blog.contentHi.join('\n\n') : (blog.contentHi || ''),
      keyTakeawaysStr: Array.isArray(blog.keyTakeaways) ? blog.keyTakeaways.join('\n') : '',
      keyTakeawaysHiStr: Array.isArray(blog.keyTakeawaysHi) ? blog.keyTakeawaysHi.join('\n') : '',
      remedyOrInsight: blog.remedyOrInsight || '',
      remedyOrInsightHi: blog.remedyOrInsightHi || '',
      isFeatured: !!blog.isFeatured,
      isPopular: !!blog.isPopular,
      popularRank: blog.popularRank ? String(blog.popularRank) : ''
    });
    setIsEditModalOpen(true);
  };

  // Handle Save Blog
  const handleSaveBlogSubmit = (e) => {
    e.preventDefault();
    if (!editFormData.title.trim()) {
      showToast(isHi ? 'कृपया शीर्षक दर्ज करें' : 'Please enter article title');
      return;
    }

    const catObj = BLOG_CATEGORIES.find(c => c.id === editFormData.category);
    const categoryLabelEn = catObj ? catObj.labelEn : 'Astrology';
    const categoryLabelHi = catObj ? catObj.labelHi : 'वैदिक ज्योतिष';

    // Parse multiline content
    const content = editFormData.contentStr
      .split('\n\n')
      .map(p => p.trim())
      .filter(Boolean);
    const contentHi = editFormData.contentHiStr
      .split('\n\n')
      .map(p => p.trim())
      .filter(Boolean);

    const keyTakeaways = editFormData.keyTakeawaysStr
      .split('\n')
      .map(t => t.trim())
      .filter(Boolean);
    const keyTakeawaysHi = editFormData.keyTakeawaysHiStr
      .split('\n')
      .map(t => t.trim())
      .filter(Boolean);

    const blogPayload = {
      title: editFormData.title.trim(),
      titleHi: editFormData.titleHi.trim() || editFormData.title.trim(),
      category: editFormData.category,
      categoryLabelEn,
      categoryLabelHi,
      author: editFormData.author.trim() || 'Acharya Devendra Shastri',
      authorHi: editFormData.authorHi.trim() || 'आचार्य देवेन्द्र शास्त्री',
      date: editFormData.date.trim() || 'Today',
      dateHi: editFormData.dateHi.trim() || 'आज',
      readTime: editFormData.readTime.trim() || '5 min read',
      readTimeHi: editFormData.readTimeHi.trim() || '5 मिनट का पठन',
      imageUrl: editFormData.imageUrl.trim() || PRESET_BLOG_IMAGES[0].url,
      excerpt: editFormData.excerpt.trim(),
      excerptHi: editFormData.excerptHi.trim() || editFormData.excerpt.trim(),
      content: content.length > 0 ? content : [editFormData.excerpt.trim()],
      contentHi: contentHi.length > 0 ? contentHi : [editFormData.excerptHi.trim() || editFormData.excerpt.trim()],
      keyTakeaways: keyTakeaways.length > 0 ? keyTakeaways : ['Authentic Vedic guidance for destiny alignment.'],
      keyTakeawaysHi: keyTakeawaysHi.length > 0 ? keyTakeawaysHi : ['भाग्य संवारने हेतु प्रामाणिक वैदिक मार्गदर्शन।'],
      remedyOrInsight: editFormData.remedyOrInsight.trim(),
      remedyOrInsightHi: editFormData.remedyOrInsightHi.trim(),
      isFeatured: editFormData.isFeatured,
      isPopular: editFormData.isPopular,
      popularRank: editFormData.popularRank ? parseInt(editFormData.popularRank, 10) : null
    };

    let updatedList;
    if (editingBlog) {
      // If setting this to featured, unset other featured
      if (blogPayload.isFeatured) {
        blogs.forEach(b => { if (b.id !== editingBlog.id) b.isFeatured = false; });
      }
      updatedList = updateBlog(editingBlog.id, blogPayload);
      if (selectedArticle && selectedArticle.id === editingBlog.id) {
        setSelectedArticle({ ...editingBlog, ...blogPayload });
      }
      showToast(isHi ? 'लेख सफलतापूर्वक अपडेट किया गया!' : 'Article updated successfully!');
    } else {
      // If setting this to featured, unset other featured
      if (blogPayload.isFeatured) {
        blogs.forEach(b => { b.isFeatured = false; });
      }
      updatedList = addBlog(blogPayload);
      showToast(isHi ? 'नया लेख सफलतापूर्वक प्रकाशित हुआ!' : 'New article published successfully!');
    }

    setBlogs(updatedList);
    setIsEditModalOpen(false);
  };

  // Handle Delete Blog
  const handleDeleteBlog = (blogId, e) => {
    if (e) e.stopPropagation();
    const conf = window.confirm(
      isHi 
        ? 'क्या आप वाकई इस लेख को हटाना चाहते हैं? यह क्रिया पूर्ववत नहीं की जा सकती।' 
        : 'Are you sure you want to delete this article? This action cannot be undone.'
    );
    if (!conf) return;

    const updated = deleteBlog(blogId);
    setBlogs(updated);
    if (selectedArticle && selectedArticle.id === blogId) {
      setSelectedArticle(null);
    }
    showToast(isHi ? 'लेख हटा दिया गया है।' : 'Article deleted successfully.');
  };

  // Reset to default articles
  const handleResetDefaults = () => {
    const conf = window.confirm(
      isHi 
        ? 'क्या आप सभी लेखों को प्रारंभिक डिफ़ॉल्ट पर रीसेट करना चाहते हैं?' 
        : 'Reset all articles back to default seed articles?'
    );
    if (!conf) return;
    const reset = resetBlogsToDefault();
    setBlogs(reset);
    showToast(isHi ? 'डिफ़ॉल्ट लेख पुनर्स्थापित किए गए।' : 'Default articles restored.');
  };

  // Newsletter subscription
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || !newsletterEmail.includes('@')) {
      showToast(isHi ? 'कृपया मान्य ईमेल पता दर्ज करें' : 'Please enter a valid email address');
      return;
    }
    try {
      const subs = JSON.parse(localStorage.getItem('astrotanntra_subscribers') || '[]');
      subs.push({ email: newsletterEmail.trim(), date: new Date().toISOString() });
      localStorage.setItem('astrotanntra_subscribers', JSON.stringify(subs));
    } catch (err) {}

    setNewsletterSubscribed(true);
    showToast(
      isHi 
        ? 'धन्यवाद! आप हमारी वैदिक ज्योतिष पत्रिका से जुड़ चुके हैं।' 
        : 'Thank you! You have subscribed to our Vedic astrology newsletter.'
    );
  };

  // Helper for category icons
  const renderCategoryIcon = (iconName) => {
    switch (iconName) {
      case 'Compass': return <Compass className="w-5 h-5" />;
      case 'Sun': return <Sun className="w-5 h-5" />;
      case 'Grid': return <Grid className="w-5 h-5" />;
      case 'Flame': return <Flame className="w-5 h-5" />;
      case 'Flower2': return <Flower2 className="w-5 h-5" />;
      case 'Home': return <Home className="w-5 h-5" />;
      case 'BookOpen': return <BookOpen className="w-5 h-5" />;
      default: return <Sparkles className="w-5 h-5" />;
    }
  };

  const relatedArticles = useMemo(() => {
    if (!selectedArticle) return [];
    return blogs.filter(b => b.id !== selectedArticle.id && (b.category === selectedArticle.category || b.isPopular)).slice(0, 3);
  }, [blogs, selectedArticle]);

  return (
    <div className="min-h-screen bg-[#0b031b] text-slate-100 flex flex-col selection:bg-amber-500 selection:text-black">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#1c0836]/95 border-2 border-amber-400 text-amber-200 px-5 py-3 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.8),0_0_25px_rgba(245,158,11,0.4)] flex items-center gap-3 animate-fadeIn backdrop-blur-md max-w-md w-[90%] sm:w-auto">
          <span className="text-amber-400 text-base shrink-0">✦</span>
          <span className="text-xs sm:text-sm font-semibold">{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors ml-auto cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {selectedArticle ? (
        /* ==========================================
           ARTICLE DETAIL READER VIEW
           ========================================== */
        <div className="flex-1 flex flex-col animate-fadeIn">
          {/* Breadcrumb Navigation & Top Action Bar */}
          <div className="bg-[#12052c] border-b border-purple-900/60 sticky top-0 z-30 backdrop-blur-md bg-opacity-95">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-400 overflow-x-auto whitespace-nowrap py-1">
              <button 
                onClick={onGoBack} 
                className="hover:text-amber-400 transition-colors flex items-center gap-1 cursor-pointer"
              >
                {isHi ? 'होम' : 'Home'}
              </button>
              <span>›</span>
              <button 
                onClick={() => setSelectedArticle(null)} 
                className="hover:text-amber-400 transition-colors cursor-pointer"
              >
                {isHi ? 'ब्लॉग' : 'Blog'}
              </button>
              <span>›</span>
              <span className="text-amber-300 font-medium truncate max-w-[200px] sm:max-w-xs">
                {isHi ? (article.titleHi || article.title) : article.title}
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {isAdminLoggedIn ? (
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={(e) => handleOpenEditModal(article, e)}
                    className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1 cursor-pointer transition-all shadow-sm"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>{isHi ? 'संपादित करें' : 'Edit Post'}</span>
                  </button>
                  <button
                    onClick={(e) => handleDeleteBlog(article.id, e)}
                    className="p-1.5 rounded-lg bg-rose-950 hover:bg-rose-900 text-rose-300 border border-rose-800/60 cursor-pointer transition-all"
                    title={isHi ? 'लेख हटाएं' : 'Delete Post'}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsAdminLoginModalOpen(true)}
                  className="px-2.5 py-1 rounded-lg bg-purple-950/80 hover:bg-purple-900 border border-purple-700/60 text-purple-300 text-xs flex items-center gap-1 cursor-pointer transition-all"
                  title="Admin Sign In"
                >
                  <Lock className="w-3 h-3 text-amber-400" />
                  <span className="hidden sm:inline">{isHi ? 'एडमिन लॉगिन' : 'Admin Login'}</span>
                </button>
              )}

              <button
                onClick={() => setSelectedArticle(null)}
                className="px-3 py-1.5 rounded-lg bg-purple-950 hover:bg-purple-900 text-amber-200 border border-purple-800 text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>{isHi ? 'सभी लेख' : 'Back to Blog'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Article Reader Body */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 flex-1 w-full space-y-8 animate-fadeIn">
          
          {/* Article Header Meta */}
          <div className="space-y-4 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2.5 flex-wrap">
              <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-amber-400/20 text-amber-300 border border-amber-400/50">
                {isHi ? (article.categoryLabelHi || article.category) : (article.categoryLabelEn || article.category)}
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                {isHi ? (article.dateHi || article.date) : article.date}
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                {isHi ? (article.readTimeHi || article.readTime) : article.readTime}
              </span>
            </div>

            <h1 className="font-cinzel text-2xl sm:text-4xl md:text-5xl font-extrabold text-amber-300 leading-tight">
              {isHi ? (article.titleHi || article.title) : article.title}
            </h1>

            {/* Author Byline */}
            <div className="pt-2 flex items-center justify-between border-b border-purple-800/60 pb-5 flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-amber-500 to-purple-700 flex items-center justify-center font-bold text-slate-950 text-sm shadow-md ring-2 ring-amber-400/60">
                  <User className="w-5 h-5 text-slate-950" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 block">{isHi ? 'वैदिक लेखक एवं शोधकर्ता' : 'Vedic Author & Researcher'}</span>
                  <span className="font-bold text-sm text-slate-100">{isHi ? (article.authorHi || article.author) : article.author}</span>
                </div>
              </div>

              {/* Share actions */}
              <div className="flex items-center gap-2">
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(`${article.title} - Read more on Astrotanntra: ${window.location.href}`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{isHi ? 'शेयर करें' : 'WhatsApp'}</span>
                </a>
                <button
                  onClick={() => {
                    if (navigator.clipboard) {
                      navigator.clipboard.writeText(window.location.href);
                      showToast(isHi ? 'लेख का लिंक कॉपी किया गया!' : 'Article link copied to clipboard!');
                    }
                  }}
                  className="px-3 py-1.5 rounded-lg bg-purple-900/60 hover:bg-purple-800 border border-purple-700 text-slate-300 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{isHi ? 'कॉपी लिंक' : 'Copy Link'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Hero Article Image */}
          {article.imageUrl && (
            <div className="rounded-3xl overflow-hidden border border-amber-500/30 shadow-[0_15px_40px_rgba(0,0,0,0.8)] relative max-h-[460px] group">
              <img 
                src={article.imageUrl} 
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b031b] via-transparent to-transparent opacity-80" />
            </div>
          )}

          {/* Excerpt Lead Paragraph */}
          <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-[#1c0836] to-[#140529] border-l-4 border-amber-400 border-r border-t border-b border-purple-800/60 shadow-lg">
            <p className="text-base sm:text-lg text-amber-200 font-medium leading-relaxed italic">
              "{isHi ? (article.excerptHi || article.excerpt) : article.excerpt}"
            </p>
          </div>

          {/* Main Article Paragraphs */}
          <div className="space-y-5 text-slate-200 text-sm sm:text-base leading-relaxed sm:leading-loose">
            {(isHi ? (article.contentHi || article.content) : article.content).map((para, pIdx) => (
              <p key={pIdx} className="font-light">
                {para}
              </p>
            ))}
          </div>

          {/* Key Takeaways Callout Box */}
          {((isHi ? article.keyTakeawaysHi : article.keyTakeaways) || []).length > 0 && (
            <div className="p-6 rounded-2xl bg-[#160633] border border-amber-500/40 shadow-xl space-y-3">
              <h3 className="font-cinzel text-lg font-bold text-amber-300 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>{isHi ? 'मुख्य आध्यात्मिक एवं ज्योतिषीय निष्कर्ष' : 'Key Astrological Takeaways'}</span>
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
                {(isHi ? article.keyTakeawaysHi : article.keyTakeaways).map((item, tIdx) => (
                  <li key={tIdx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Remedy / Sacred Insight Highlight Box */}
          {(article.remedyOrInsight || article.remedyOrInsightHi) && (
            <div className="p-6 rounded-2xl bg-gradient-to-r from-[#2a0e4a] via-[#1f0939] to-[#150529] border border-amber-400/60 shadow-gold-glow flex flex-col sm:flex-row items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-400/20 text-amber-300 flex items-center justify-center shrink-0 border border-amber-400/50">
                <Sparkles className="w-6 h-6" />
              </div>
              <div className="space-y-1 text-center sm:text-left">
                <span className="text-[11px] font-extrabold tracking-wider uppercase text-amber-400 block">
                  {isHi ? 'वैदिक उपाय एवं निर्देश' : 'Vedic Remedy & Sacred Insight'}
                </span>
                <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed">
                  {isHi ? (article.remedyOrInsightHi || article.remedyOrInsight) : article.remedyOrInsight}
                </p>
              </div>
            </div>
          )}

          {/* Author Bio & Consultation CTA Card */}
          <div className="p-6 rounded-3xl bg-[#14062c] border border-purple-800/80 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#531e84] border border-amber-400 flex items-center justify-center font-bold text-amber-300 text-lg shrink-0">
                <User className="w-7 h-7" />
              </div>
              <div>
                <h4 className="font-cinzel font-bold text-base text-amber-300">
                  {isHi ? (article.authorHi || article.author) : article.author}
                </h4>
                <p className="text-xs text-slate-300 max-w-md mt-0.5">
                  {isHi
                    ? 'एस्ट्रोतंत्र के वरिष्ठ आचार्य, वैदिक ज्योतिष, कर्म सिद्धांत एवं तंत्र शास्त्रों के गहन अध्येता।'
                    : 'Senior Acharya at Astrotanntra, specializing in Parashari Jyotish, Kundli diagnosis, and Vedic remedial harmonization.'}
                </p>
              </div>
            </div>

            <button
              onClick={() => onOpenConsultation?.(`Consultation regarding: ${article.title}`)}
              className="gold-btn px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider shrink-0 cursor-pointer shadow-gold-glow flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>{isHi ? 'लेखक से परामर्श लें' : 'Consult on this Topic'}</span>
            </button>
          </div>

          {/* Related Articles Carousel */}
          {related.length > 0 && (
            <div className="pt-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-cinzel text-xl font-bold text-amber-300">
                  {isHi ? 'संबंधित एवं लोकप्रिय लेख' : 'Related Articles'}
                </h3>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="text-xs text-amber-400 hover:underline cursor-pointer"
                >
                  {isHi ? 'सभी देखें →' : 'View All →'}
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedArticles.map(rel => (
                  <div
                    key={rel.id}
                    onClick={() => setSelectedArticle(rel)}
                    className="p-3.5 rounded-2xl bg-[#14052e] border border-purple-800/60 hover:border-amber-400/70 transition-all flex flex-col justify-between cursor-pointer group shadow-md"
                  >
                    <div>
                      {rel.imageUrl && (
                        <div className="h-32 rounded-xl overflow-hidden mb-3 relative">
                          <img 
                            src={rel.imageUrl} 
                            alt={rel.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                          />
                          <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold bg-[#0b031b]/80 text-amber-300 border border-amber-400/40">
                            {isHi ? (rel.categoryLabelHi || rel.category) : (rel.categoryLabelEn || rel.category)}
                          </span>
                        </div>
                      )}
                      <h4 className="font-bold text-xs text-slate-100 group-hover:text-amber-300 transition-colors line-clamp-2 leading-snug">
                        {isHi ? (rel.titleHi || rel.title) : rel.title}
                      </h4>
                    </div>
                    <div className="mt-3 pt-2 border-t border-purple-900/60 flex items-center justify-between text-[11px] text-slate-400">
                      <span>{isHi ? (rel.dateHi || rel.date) : rel.date}</span>
                      <span className="text-amber-400 font-semibold group-hover:translate-x-0.5 transition-transform">→</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </article>

      </div>
    ) : (
      /* ==========================================
         MAIN BLOG DIRECTORY VIEW (Matching Screenshot)
         ========================================== */
      <div className="flex-1 flex flex-col animate-fadeIn">
        {/* 1. TOP BREADCRUMB & ADMIN STATUS BAR */}
        <div className="bg-[#12052c] border-b border-purple-900/60 sticky top-0 z-30 backdrop-blur-md bg-opacity-95">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between gap-4">
            
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-400">
              <button 
                onClick={onGoBack} 
                className="hover:text-amber-400 transition-colors cursor-pointer"
              >
                {isHi ? 'होम' : 'Home'}
              </button>
              <span>›</span>
              <span className="text-amber-300 font-semibold">{isHi ? 'ब्लॉग' : 'Blog'}</span>
            </div>

            {/* Admin Status / Actions */}
            <div className="flex items-center gap-3">
              {isAdminLoggedIn ? (
                <div className="flex items-center gap-2">
                  <span className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-600/70 text-emerald-300 font-semibold text-xs shadow-sm">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Admin: deepak.kumar686@gmail.com</span>
                  </span>
                  <button
                    onClick={handleOpenCreateModal}
                    className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-gold-glow transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{isHi ? 'नया लेख लिखें' : '+ New Blog Post'}</span>
                  </button>
                  <button
                    onClick={handleResetDefaults}
                    className="p-1.5 rounded-lg bg-purple-950 hover:bg-purple-900 text-slate-300 border border-purple-800 text-xs cursor-pointer transition-all"
                    title={isHi ? 'डिफ़ॉल्ट रीसेट करें' : 'Reset to Default Articles'}
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsAdminLoginModalOpen(true)}
                  className="px-3 py-1.5 rounded-xl bg-purple-950 hover:bg-purple-900 border border-purple-700/80 text-amber-300 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-all"
                >
                  <Lock className="w-3.5 h-3.5 text-amber-400" />
                  <span>{isHi ? 'एडमिन पोर्टल' : 'Admin Login'}</span>
                </button>
              )}

              <button
                onClick={onGoBack}
                className="px-3 py-1.5 rounded-xl bg-cosmic-800 hover:bg-cosmic-700 text-slate-200 border border-purple-800 text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{isHi ? 'मुख्य पृष्ठ' : 'Home'}</span>
              </button>
            </div>
          </div>
        </div>

      {/* 2. HERO HEADER & SEARCH BAR (Matching Screenshot Header) */}
      <section className="relative overflow-hidden pt-8 pb-10 sm:py-14 border-b border-purple-900/40 bg-gradient-to-b from-[#18073b] via-[#12042d] to-[#0b031b]">
        {/* Subtle cosmic background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-amber-500/10 blur-[130px] rounded-full pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-8 text-center relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/15 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-widest shadow-sm">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{isHi ? 'एस्ट्रोतंत्र वैदिक ब्लॉग' : 'ASTROTANNTRA JOURNAL'}</span>
          </div>

          <h1 className="font-cinzel text-3xl sm:text-5xl md:text-6xl font-extrabold text-amber-300 tracking-tight leading-tight">
            {isHi ? 'हमारे वैदिक लेख एवं ब्लॉग' : 'Explore Our Blog'}
          </h1>

          <p className="text-xs sm:text-base text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
            {isHi
              ? 'ज्योतिष, राशिफल, कुण्डली, तंत्र, आध्यात्म और वास्तु पर गहन अंतर्दृष्टि प्राप्त करें। जीवन में सकारात्मक दिशा और आध्यात्मिक ज्ञान पाएं।'
              : 'Discover insights on astrology, horoscopes, kundli, tantra, spirituality and vastu. Learn, grow and find guidance for a better life.'}
          </p>

          {/* Search Bar Input */}
          <div className="max-w-2xl mx-auto pt-3">
            <form 
              onSubmit={(e) => { e.preventDefault(); }}
              className="relative flex items-center rounded-2xl bg-[#1b083c] border-2 border-amber-500/50 shadow-2xl p-1.5 focus-within:border-amber-400 focus-within:ring-2 focus-within:ring-amber-400/30 transition-all"
            >
              <div className="pl-3.5 pr-2 text-slate-400">
                <Search className="w-5 h-5 text-amber-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPageNum(1);
                }}
                placeholder={isHi ? 'लेख खोजें... (उदा. करियर राशिफल, वास्तु टिप्स, कुण्डली)' : 'Search articles... (e.g. career horoscope, vastu tips, kundli)'}
                className="w-full bg-transparent text-sm sm:text-base text-slate-100 placeholder:text-slate-400 outline-none pr-3 py-2"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="p-1.5 text-slate-400 hover:text-white mr-1 cursor-pointer"
                >
                  ✕
                </button>
              )}
              <button
                type="submit"
                className="gold-btn px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider shrink-0 cursor-pointer shadow-gold-glow"
              >
                {isHi ? 'खोजें' : 'Search'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* 3. FEATURED ARTICLE & POPULAR ARTICLES GRID (Shown when not filtering) */}
      {!searchQuery && selectedCategory === 'all' && featuredArticle && (
        <section className="max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-12 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT: FEATURED ARTICLE CARD (Matching Screenshot Hero Box) */}
            <div className="lg:col-span-8">
              <div 
                onClick={() => setSelectedArticle(featuredArticle)}
                className="rounded-3xl bg-[#14062c] border border-amber-500/50 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] hover:border-amber-400 transition-all cursor-pointer group flex flex-col md:flex-row relative"
              >
                {/* Image Section */}
                <div className="md:w-1/2 relative min-h-[260px] md:min-h-[360px] overflow-hidden">
                  <img 
                    src={featuredArticle.imageUrl} 
                    alt={featuredArticle.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#14062c] via-transparent to-transparent md:hidden" />
                  
                  {/* Featured Badge */}
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-amber-500 text-slate-950 font-black text-[10px] tracking-wider uppercase shadow-md flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-slate-950" />
                    <span>{isHi ? 'विशेष आलेख' : 'Featured Article'}</span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <span className="text-[11px] font-extrabold uppercase tracking-widest text-amber-400 block">
                      {isHi ? (featuredArticle.categoryLabelHi || featuredArticle.category) : (featuredArticle.categoryLabelEn || featuredArticle.category)}
                    </span>

                    <h2 className="font-cinzel text-xl sm:text-2xl md:text-3xl font-extrabold text-white group-hover:text-amber-300 transition-colors leading-snug">
                      {isHi ? (featuredArticle.titleHi || featuredArticle.title) : featuredArticle.title}
                    </h2>

                    <p className="text-xs sm:text-sm text-slate-300 line-clamp-3 leading-relaxed font-light">
                      {isHi ? (featuredArticle.excerptHi || featuredArticle.excerpt) : featuredArticle.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-purple-800/60 flex flex-col gap-3">
                    <div className="flex items-center gap-4 text-xs text-slate-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-amber-400" />
                        {isHi ? (featuredArticle.dateHi || featuredArticle.date) : featuredArticle.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-amber-400" />
                        {isHi ? (featuredArticle.readTimeHi || featuredArticle.readTime) : featuredArticle.readTime}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <button 
                        type="button"
                        className="px-4 py-2 rounded-xl bg-[#531e84] hover:bg-[#3d1363] text-amber-200 font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-sm"
                      >
                        <span>{isHi ? 'पूरा लेख पढ़ें' : 'Read Full Article'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      {isAdminLoggedIn && (
                        <div className="flex items-center gap-1.5" onClick={e => e.stopPropagation()}>
                          <button
                            onClick={(e) => handleOpenEditModal(featuredArticle, e)}
                            className="p-2 rounded-lg bg-purple-900/60 hover:bg-amber-500 hover:text-slate-950 text-amber-300 border border-purple-700/60 transition-colors"
                            title={isHi ? 'संपादित करें' : 'Edit Post'}
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* RIGHT: POPULAR ARTICLES SIDEBAR (Matching Screenshot Right Column) */}
            <div className="lg:col-span-4">
              <div className="rounded-3xl bg-[#14062c] border border-purple-800/80 p-5 sm:p-6 shadow-xl space-y-4">
                
                {/* Popular Header */}
                <div className="flex items-center gap-2 pb-3 border-b border-purple-800/60">
                  <Flame className="w-5 h-5 text-amber-400" />
                  <h3 className="font-cinzel text-lg font-bold text-amber-300 tracking-wide">
                    {isHi ? 'सर्वाधिक लोकप्रिय लेख' : 'Popular Articles'}
                  </h3>
                </div>

                {/* Popular Articles List */}
                <div className="divide-y divide-purple-900/50 space-y-3">
                  {popularArticles.map((pop, idx) => (
                    <div
                      key={pop.id}
                      onClick={() => setSelectedArticle(pop)}
                      className={`pt-3 first:pt-0 flex items-start gap-3 cursor-pointer group hover:bg-purple-950/30 p-2 rounded-xl transition-all ${
                        idx === 0 ? '' : ''
                      }`}
                    >
                      {/* Image Thumbnail with Rank Badge */}
                      <div className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-xl overflow-hidden shrink-0 border border-purple-800/80">
                        <img 
                          src={pop.imageUrl} 
                          alt={pop.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform" 
                        />
                        <span className="absolute top-1 left-1 w-5 h-5 rounded-full bg-amber-500 text-slate-950 font-black text-[10px] flex items-center justify-center shadow-md">
                          {pop.popularRank || idx + 1}
                        </span>
                      </div>

                      {/* Info */}
                      <div className="min-w-0 flex-1 space-y-1">
                        <h4 className="font-bold text-xs sm:text-sm text-slate-100 group-hover:text-amber-300 transition-colors line-clamp-2 leading-snug">
                          {isHi ? (pop.titleHi || pop.title) : pop.title}
                        </h4>
                        <div className="flex items-center gap-2 text-[10px] sm:text-[11px] text-slate-400">
                          <span>{isHi ? (pop.dateHi || pop.date) : pop.date}</span>
                          <span>•</span>
                          <span>{isHi ? (pop.readTimeHi || pop.readTime) : pop.readTime}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </div>

          </div>
        </section>
      )}

      {/* 4. BROWSE BY CATEGORY BAR (Matching Screenshot Category Row) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-4 sm:py-6 w-full">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <BookOpen className="w-5 h-5 text-amber-400" />
            <h3 className="font-cinzel text-lg sm:text-xl font-bold text-amber-300 uppercase tracking-wide">
              {isHi ? 'श्रेणी अनुसार देखें' : 'Browse by Category'}
            </h3>
            <div className="h-px bg-purple-800/60 flex-1 ml-2" />
          </div>

          {/* Category Cards Carousel / Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2.5 sm:gap-3">
            {BLOG_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setCurrentPageNum(1);
                  }}
                  className={`p-3 rounded-2xl border transition-all flex flex-col items-center justify-center text-center gap-2 cursor-pointer shadow-sm group ${
                    isSelected
                      ? 'bg-gradient-to-b from-amber-500 to-amber-600 border-amber-300 text-slate-950 font-bold shadow-gold-glow scale-102 ring-2 ring-amber-400/50'
                      : 'bg-[#15062e] border-purple-800/80 text-slate-200 hover:border-amber-400/70 hover:bg-[#1f0942]'
                  }`}
                >
                  <div className={`p-2 rounded-xl transition-transform group-hover:scale-110 ${
                    isSelected ? 'bg-slate-950/20 text-slate-950' : 'bg-purple-900/50 text-amber-300'
                  }`}>
                    {renderCategoryIcon(cat.icon)}
                  </div>
                  <span className="text-xs font-semibold leading-tight">
                    {isHi ? cat.labelHi : cat.labelEn}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. LATEST BLOGS SECTION (Matching Screenshot 3x2 Grid) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-8 w-full flex-1">
        <div className="space-y-6">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-purple-800/60 flex-wrap gap-2">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-amber-300">
                {selectedCategory !== 'all' 
                  ? (isHi ? `${BLOG_CATEGORIES.find(c => c.id === selectedCategory)?.labelHi} लेख` : `${BLOG_CATEGORIES.find(c => c.id === selectedCategory)?.labelEn} Articles`)
                  : (searchQuery ? (isHi ? `खोज परिणाम: "${searchQuery}"` : `Search Results for "${searchQuery}"`) : (isHi ? 'नवीनतम लेख' : 'Latest Blogs'))
                }
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-purple-900/60 text-purple-200 text-xs font-bold border border-purple-700">
                {latestBlogsList.length}
              </span>
            </div>

            {(selectedCategory !== 'all' || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                  setCurrentPageNum(1);
                }}
                className="text-xs text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>{isHi ? 'सभी लेख देखें →' : 'View All Blogs →'}</span>
              </button>
            )}
          </div>

          {/* Cards Grid (3 Columns) */}
          {paginatedBlogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedBlogs.map((blog) => (
                <div
                  key={blog.id}
                  onClick={() => setSelectedArticle(blog)}
                  className="rounded-3xl bg-[#14062c] border border-purple-800/80 hover:border-amber-400/80 transition-all flex flex-col justify-between overflow-hidden shadow-lg group cursor-pointer hover:-translate-y-1"
                >
                  <div>
                    {/* Thumbnail Image */}
                    <div className="h-48 sm:h-52 w-full overflow-hidden relative">
                      <img 
                        src={blog.imageUrl} 
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#14062c] via-transparent to-transparent opacity-60" />
                      
                      {/* Floating Category Badge */}
                      <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-[#0b031b]/85 text-amber-300 border border-amber-400/40 backdrop-blur-sm">
                        {isHi ? (blog.categoryLabelHi || blog.category) : (blog.categoryLabelEn || blog.category)}
                      </span>

                      {/* Admin Quick Actions */}
                      {isAdminLoggedIn && (
                        <div 
                          className="absolute top-3 right-3 flex items-center gap-1 z-10"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            onClick={(e) => handleOpenEditModal(blog, e)}
                            className="p-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md cursor-pointer transition-colors"
                            title={isHi ? 'संपादित करें' : 'Edit'}
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={(e) => handleDeleteBlog(blog.id, e)}
                            className="p-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white shadow-md cursor-pointer transition-colors"
                            title={isHi ? 'हटाएं' : 'Delete'}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Card Content */}
                    <div className="p-5 space-y-2.5">
                      <h4 className="font-cinzel font-bold text-base sm:text-lg text-white group-hover:text-amber-300 transition-colors line-clamp-2 leading-snug">
                        {isHi ? (blog.titleHi || blog.title) : blog.title}
                      </h4>
                      <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed font-light">
                        {isHi ? (blog.excerptHi || blog.excerpt) : blog.excerpt}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="p-5 pt-3 border-t border-purple-800/60 flex items-center justify-between text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-amber-400" />
                      {isHi ? (blog.dateHi || blog.date) : blog.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      {isHi ? (blog.readTimeHi || blog.readTime) : blog.readTime}
                    </span>
                  </div>

                </div>
              ))}
            </div>
          ) : (
            <div className="py-16 text-center space-y-3 rounded-3xl bg-[#14062c] border border-purple-800/60">
              <BookOpen className="w-12 h-12 text-amber-400/50 mx-auto" />
              <h4 className="font-cinzel text-lg font-bold text-amber-200">
                {isHi ? 'कोई लेख नहीं मिला' : 'No Articles Found'}
              </h4>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                {isHi 
                  ? 'आपके खोज मापदंड के अनुसार कोई लेख उपलब्ध नहीं है। कृपया दूसरा शब्द खोजें।' 
                  : 'No articles match your current search or category filter. Try clearing filters.'}
              </p>
              <button
                onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
                className="gold-btn px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer mt-2"
              >
                {isHi ? 'सभी लेख देखें' : 'View All Articles'}
              </button>
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="pt-6 flex items-center justify-center gap-2">
              <button
                onClick={() => setCurrentPageNum(p => Math.max(1, p - 1))}
                disabled={currentPageNum === 1}
                className="w-9 h-9 rounded-xl border border-purple-800 bg-[#14062c] flex items-center justify-center text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:border-amber-400 cursor-pointer transition-colors"
                aria-label="Previous page"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPageNum(pageNum)}
                  className={`w-9 h-9 rounded-xl font-bold text-xs flex items-center justify-center transition-all cursor-pointer ${
                    currentPageNum === pageNum
                      ? 'bg-amber-400 text-slate-950 shadow-md font-extrabold scale-105'
                      : 'bg-[#14062c] border border-purple-800 text-slate-300 hover:border-amber-400 hover:text-white'
                  }`}
                >
                  {pageNum}
                </button>
              ))}

              <button
                onClick={() => setCurrentPageNum(p => Math.min(totalPages, p + 1))}
                disabled={currentPageNum === totalPages}
                className="w-9 h-9 rounded-xl border border-purple-800 bg-[#14062c] flex items-center justify-center text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:border-amber-400 cursor-pointer transition-colors"
                aria-label="Next page"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </section>

      {/* 6. NEWSLETTER SUBSCRIPTION STRIP (Matching Screenshot Bottom) */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-8 mb-6">
        <div className="rounded-3xl border border-amber-500/40 bg-gradient-to-r from-[#1c093a] via-[#240d4f] to-[#14052b] p-6 sm:p-10 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 text-amber-300 border border-amber-400/50 flex items-center justify-center shrink-0">
              <Mail className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-amber-300">
                {isHi ? 'हमारी वैदिक ज्योतिष पत्रिका से जुड़ें' : 'Join Our Newsletter'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
                {isHi
                  ? 'ज्योतिषीय अंतर्दृष्टि, साप्ताहिक राशिफल और आध्यात्मिक उपाय सीधे अपने ईमेल इनबॉक्स में प्राप्त करें।'
                  : 'Get the latest astrology insights, horoscope updates and spiritual tips directly in your inbox.'}
              </p>
            </div>
          </div>

          <div className="w-full md:w-auto shrink-0 space-y-2">
            <form 
              onSubmit={handleNewsletterSubmit}
              className="flex flex-col sm:flex-row items-center gap-2 max-w-md w-full"
            >
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder={isHi ? 'अपना ईमेल पता दर्ज करें' : 'Enter your email address'}
                disabled={newsletterSubscribed}
                className="w-full sm:w-72 px-4 py-3 rounded-xl bg-[#0b031b]/90 border border-purple-700/80 text-xs sm:text-sm text-white placeholder:text-slate-400 outline-none focus:border-amber-400"
              />
              <button
                type="submit"
                disabled={newsletterSubscribed}
                className="w-full sm:w-auto gold-btn px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider cursor-pointer shadow-gold-glow whitespace-nowrap"
              >
                {newsletterSubscribed ? (isHi ? 'सदस्यता सक्रिय' : 'Subscribed!') : (isHi ? 'सब्सक्राइब करें' : 'Subscribe')}
              </button>
            </form>
            <p className="text-[11px] text-slate-400 flex items-center gap-1 justify-center md:justify-start">
              <Lock className="w-3 h-3 text-amber-400" />
              <span>{isHi ? 'हम आपकी गोपनीयता का सम्मान करते हैं। कोई स्पैम नहीं।' : 'We respect your privacy. No spam, ever.'}</span>
            </p>
          </div>

        </div>
      </section>
      </div>
    )}

      {/* ==========================================
          MODAL 1: ADMIN LOGIN MODAL
          ========================================== */}
      {isAdminLoginModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-[#15062e] border-2 border-amber-400/80 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-[0_20px_60px_rgba(0,0,0,0.9)] space-y-5 text-slate-100">
            <div className="flex items-center justify-between pb-3 border-b border-purple-800">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-6 h-6 text-amber-400" />
                <h3 className="font-cinzel text-xl font-bold text-amber-300">
                  {isHi ? 'एडमिन सत्यापन' : 'Admin Login'}
                </h3>
              </div>
              <button
                onClick={() => setIsAdminLoginModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-300">
              {isHi
                ? 'केवल अधिकृत एडमिन को ब्लॉग पोस्ट लिखने, संपादित करने अथवा हटाने की अनुमति है।'
                : 'Only authorized administrators can publish, edit, or delete articles on Astrotanntra.'}
            </p>

            <form onSubmit={handleAdminLoginSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-amber-200 block mb-1">
                  {isHi ? 'एडमिन ईमेल आईडी' : 'Admin Email ID'}
                </label>
                <input
                  type="email"
                  value={adminEmailInput}
                  onChange={(e) => setAdminEmailInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b031b] border border-purple-700 text-sm text-white focus:border-amber-400 outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-amber-200 block mb-1">
                  {isHi ? 'पासवर्ड' : 'Password'}
                </label>
                <input
                  type="password"
                  value={adminPasswordInput}
                  onChange={(e) => setAdminPasswordInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b031b] border border-purple-700 text-sm text-white focus:border-amber-400 outline-none"
                  required
                />
              </div>

              {adminLoginError && (
                <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-300 text-xs">
                  {adminLoginError}
                </div>
              )}

              <div className="p-3 rounded-xl bg-purple-950/60 border border-purple-800/60 text-[11px] text-slate-300 space-y-1">
                <span className="font-bold text-amber-300 block">{isHi ? 'अधिकृत क्रेडेंशियल:' : 'Authorized Credentials:'}</span>
                <p>ID: <code className="text-amber-200">deepak.kumar686@gmail.com</code></p>
                <p>Password: <code className="text-amber-200">Password@123</code></p>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAdminLoginModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl bg-purple-950 hover:bg-purple-900 text-slate-300 text-xs font-semibold cursor-pointer"
                >
                  {isHi ? 'रद्द करें' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="flex-1 gold-btn py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider cursor-pointer shadow-gold-glow"
                >
                  {isHi ? 'लॉगिन करें' : 'Authenticate'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==========================================
          MODAL 2: CREATE / EDIT BLOG POST MODAL
          ========================================== */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn">
          <div className="bg-[#15062e] border-2 border-amber-400/80 rounded-3xl p-5 sm:p-8 max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl space-y-6 text-slate-100 my-auto">
            
            <div className="flex items-center justify-between pb-3 border-b border-purple-800">
              <div className="flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-amber-400" />
                <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-amber-300">
                  {editingBlog ? (isHi ? 'लेख संपादित करें' : 'Edit Blog Post') : (isHi ? 'नया लेख प्रकाशित करें' : 'Create New Blog Post')}
                </h3>
              </div>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveBlogSubmit} className="space-y-4 text-xs">
              
              {/* Titles in EN & HI */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-amber-200 block mb-1">
                    Article Title (English) *
                  </label>
                  <input
                    type="text"
                    value={editFormData.title}
                    onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
                    placeholder="e.g. How Your Zodiac Sign Influences Your Career"
                    className="w-full px-3 py-2 rounded-xl bg-[#0b031b] border border-purple-700 text-white focus:border-amber-400 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="font-semibold text-amber-200 block mb-1">
                    लेख शीर्षक (हिन्दी)
                  </label>
                  <input
                    type="text"
                    value={editFormData.titleHi}
                    onChange={(e) => setEditFormData({ ...editFormData, titleHi: e.target.value })}
                    placeholder="उदा. आपकी राशि आपके करियर को कैसे प्रभावित करती है"
                    className="w-full px-3 py-2 rounded-xl bg-[#0b031b] border border-purple-700 text-white focus:border-amber-400 outline-none"
                  />
                </div>
              </div>

              {/* Category & Read Time */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="font-semibold text-amber-200 block mb-1">
                    Category *
                  </label>
                  <select
                    value={editFormData.category}
                    onChange={(e) => setEditFormData({ ...editFormData, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#0b031b] border border-purple-700 text-white focus:border-amber-400 outline-none cursor-pointer"
                  >
                    {BLOG_CATEGORIES.filter(c => c.id !== 'all').map(c => (
                      <option key={c.id} value={c.id}>
                        {c.labelEn} ({c.labelHi})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-amber-200 block mb-1">
                    Author Name
                  </label>
                  <input
                    type="text"
                    value={editFormData.author}
                    onChange={(e) => setEditFormData({ ...editFormData, author: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#0b031b] border border-purple-700 text-white focus:border-amber-400 outline-none"
                  />
                </div>
                <div>
                  <label className="font-semibold text-amber-200 block mb-1">
                    Read Time
                  </label>
                  <input
                    type="text"
                    value={editFormData.readTime}
                    onChange={(e) => setEditFormData({ ...editFormData, readTime: e.target.value })}
                    placeholder="e.g. 5 min read"
                    className="w-full px-3 py-2 rounded-xl bg-[#0b031b] border border-purple-700 text-white focus:border-amber-400 outline-none"
                  />
                </div>
              </div>

              {/* Image URL & Preset Selection */}
              <div>
                <label className="font-semibold text-amber-200 block mb-1">
                  Cover Image URL
                </label>
                <input
                  type="url"
                  value={editFormData.imageUrl}
                  onChange={(e) => setEditFormData({ ...editFormData, imageUrl: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#0b031b] border border-purple-700 text-white focus:border-amber-400 outline-none mb-2"
                />
                
                {/* Preset Image Chooser */}
                <div className="space-y-1">
                  <span className="text-[11px] text-slate-400 block">Quick Preset Images:</span>
                  <div className="flex items-center gap-2 overflow-x-auto pb-1">
                    {PRESET_BLOG_IMAGES.map((img, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setEditFormData({ ...editFormData, imageUrl: img.url })}
                        className={`px-2.5 py-1 rounded-lg border text-[11px] shrink-0 cursor-pointer transition-all ${
                          editFormData.imageUrl === img.url 
                            ? 'bg-amber-500 text-slate-950 font-bold border-amber-300' 
                            : 'bg-purple-950/70 border-purple-800 text-slate-300 hover:border-amber-400'
                        }`}
                      >
                        {img.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Excerpts in EN & HI */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-amber-200 block mb-1">
                    Brief Excerpt / Summary (English)
                  </label>
                  <textarea
                    rows={3}
                    value={editFormData.excerpt}
                    onChange={(e) => setEditFormData({ ...editFormData, excerpt: e.target.value })}
                    placeholder="Short 2-3 sentence overview..."
                    className="w-full px-3 py-2 rounded-xl bg-[#0b031b] border border-purple-700 text-white focus:border-amber-400 outline-none"
                  />
                </div>
                <div>
                  <label className="font-semibold text-amber-200 block mb-1">
                    संक्षिप्त सारांश (हिन्दी)
                  </label>
                  <textarea
                    rows={3}
                    value={editFormData.excerptHi}
                    onChange={(e) => setEditFormData({ ...editFormData, excerptHi: e.target.value })}
                    placeholder="2-3 पंक्तियों का संक्षिप्त सारांश..."
                    className="w-full px-3 py-2 rounded-xl bg-[#0b031b] border border-purple-700 text-white focus:border-amber-400 outline-none"
                  />
                </div>
              </div>

              {/* Full Content in EN & HI */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-amber-200 block mb-1">
                    Full Content (English - Separate paragraphs by blank line)
                  </label>
                  <textarea
                    rows={6}
                    value={editFormData.contentStr}
                    onChange={(e) => setEditFormData({ ...editFormData, contentStr: e.target.value })}
                    placeholder="Paragraph 1...&#10;&#10;Paragraph 2..."
                    className="w-full px-3 py-2 rounded-xl bg-[#0b031b] border border-purple-700 text-white focus:border-amber-400 outline-none font-mono text-[11px]"
                  />
                </div>
                <div>
                  <label className="font-semibold text-amber-200 block mb-1">
                    सम्पूर्ण आलेख (हिन्दी - पैराग्राफ को खाली पंक्ति से अलग करें)
                  </label>
                  <textarea
                    rows={6}
                    value={editFormData.contentHiStr}
                    onChange={(e) => setEditFormData({ ...editFormData, contentHiStr: e.target.value })}
                    placeholder="पैराग्राफ 1...&#10;&#10;पैराग्राफ 2..."
                    className="w-full px-3 py-2 rounded-xl bg-[#0b031b] border border-purple-700 text-white focus:border-amber-400 outline-none font-mono text-[11px]"
                  />
                </div>
              </div>

              {/* Special Remedy / Insight Callout */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-amber-200 block mb-1">
                    Vedic Remedy / Astrological Insight (English)
                  </label>
                  <input
                    type="text"
                    value={editFormData.remedyOrInsight}
                    onChange={(e) => setEditFormData({ ...editFormData, remedyOrInsight: e.target.value })}
                    placeholder="e.g. Recite Aditya Hridaya Stotra at sunrise on Sunday..."
                    className="w-full px-3 py-2 rounded-xl bg-[#0b031b] border border-purple-700 text-white focus:border-amber-400 outline-none"
                  />
                </div>
                <div>
                  <label className="font-semibold text-amber-200 block mb-1">
                    वैदिक उपाय / आध्यात्मिक निर्देश (हिन्दी)
                  </label>
                  <input
                    type="text"
                    value={editFormData.remedyOrInsightHi}
                    onChange={(e) => setEditFormData({ ...editFormData, remedyOrInsightHi: e.target.value })}
                    placeholder="उदा. रविवार को सूर्योदय के समय आदित्य हृदय स्तोत्र का पाठ करें..."
                    className="w-full px-3 py-2 rounded-xl bg-[#0b031b] border border-purple-700 text-white focus:border-amber-400 outline-none"
                  />
                </div>
              </div>

              {/* Featured & Popular toggles */}
              <div className="p-3 rounded-2xl bg-purple-950/40 border border-purple-800 flex items-center justify-between flex-wrap gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editFormData.isFeatured}
                    onChange={(e) => setEditFormData({ ...editFormData, isFeatured: e.target.checked })}
                    className="w-4 h-4 rounded text-amber-500 cursor-pointer accent-amber-500"
                  />
                  <span className="font-semibold text-amber-300">Set as Hero Featured Article</span>
                </label>

                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editFormData.isPopular}
                      onChange={(e) => setEditFormData({ ...editFormData, isPopular: e.target.checked })}
                      className="w-4 h-4 rounded text-amber-500 cursor-pointer accent-amber-500"
                    />
                    <span className="font-semibold text-amber-300">Show in Popular Sidebar</span>
                  </label>
                  {editFormData.isPopular && (
                    <input
                      type="number"
                      min="1"
                      max="5"
                      value={editFormData.popularRank}
                      onChange={(e) => setEditFormData({ ...editFormData, popularRank: e.target.value })}
                      placeholder="Rank (1-5)"
                      className="w-24 px-2 py-1 rounded-lg bg-[#0b031b] border border-purple-700 text-white outline-none"
                    />
                  )}
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-purple-950 hover:bg-purple-900 text-slate-300 text-xs font-semibold cursor-pointer"
                >
                  {isHi ? 'रद्द करें' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="gold-btn px-7 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider cursor-pointer shadow-gold-glow"
                >
                  {editingBlog ? (isHi ? 'परिवर्तन सहेजें' : 'Save Changes') : (isHi ? 'लेख प्रकाशित करें' : 'Publish Article')}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
