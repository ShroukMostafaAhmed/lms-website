// components/VideoPlayer/VideoPlayer.jsx
import React, { useMemo, useRef, useState, useEffect } from "react";

/* ---------- Enhanced Utils ---------- */

// HTML & JSON escapes - more comprehensive
const unescapeAll = (s = "") =>
  String(s)
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\\u0026/g, "&")     // \u0026 => &
    .replace(/\\\//g, "/")        // https:\/\/ => https://
    .replace(/\\/g, "")           // Remove remaining backslashes
    .replace(/\s+/g, " ")         // Normalize whitespace
    .trim();

// Extract URLs from HTML tags
const extractFromTags = (s = "") => {
  // iframe src
  const iframe = s.match(/<iframe[^>]*\s+src=["']([^"']+)["']/i);
  if (iframe?.[1]) return iframe[1];
  
  // anchor href
  const anchor = s.match(/<a[^>]*\s+href=["']([^"']+)["']/i);
  if (anchor?.[1]) return anchor[1];
  
  // video src
  const video = s.match(/<video[^>]*\s+src=["']([^"']+)["']/i);
  if (video?.[1]) return video[1];
  
  return s;
};

// Enhanced URL extraction with comprehensive object parsing
function extractUrlFromAnything(input) {
  console.log('🔍 VideoPlayer - Processing input:', {
    value: input,
    type: typeof input,
    isArray: Array.isArray(input)
  });
  
  if (!input) return "";
  
  // String processing
  if (typeof input === "string") {
    const cleaned = extractFromTags(unescapeAll(input)).trim();
    console.log('📝 String processed to:', cleaned);
    return cleaned;
  }

  // Object processing
  if (typeof input === "object" && input !== null) {
    // Handle arrays
    if (Array.isArray(input)) {
      for (const item of input) {
        const result = extractUrlFromAnything(item);
        if (result) return result;
      }
      return "";
    }
    
    // Extended list of possible URL keys
    const urlKeys = [
      // Standard keys
      "url", "src", "href", "link",
      // Video specific
      "video", "videoURL", "videoUrl", "video_url", "videoLink",
      "youtubeUrl", "youtube_url", "youtubeLink", "youtube_link",
      "embedUrl", "embed_url", "embedLink", "embed_link",
      "watchUrl", "watch_url", "streamUrl", "stream_url",
      // Platform specific
      "ytUrl", "yt_url", "vimeoUrl", "vimeo_url",
      // Generic media
      "media", "mediaUrl", "media_url", "source", "sourceUrl"
    ];
    
    // Check direct properties
    for (const key of urlKeys) {
      if (input.hasOwnProperty(key) && input[key]) {
        console.log(`🔑 Found URL in key "${key}":`, input[key]);
        return extractUrlFromAnything(input[key]);
      }
    }
    
    // Check nested objects
    for (const [key, value] of Object.entries(input)) {
      if (typeof value === "object" && value !== null) {
        const nested = extractUrlFromAnything(value);
        if (nested && nested.includes('http')) {
          console.log(`🪆 Found nested URL in "${key}":`, nested);
          return nested;
        }
      }
    }
    
    // Search in stringified JSON as last resort
    try {
      const json = JSON.stringify(input);
      const urlPattern = /https?:\\?\/\\?\/[^"\\\s,}]+/gi;
      const matches = json.match(urlPattern);
      
      if (matches && matches.length > 0) {
        const url = unescapeAll(matches[0]);
        console.log('🔍 Found URL in JSON string:', url);
        return url;
      }
    } catch (error) {
      console.warn('❌ JSON processing failed:', error);
    }
  }
  
  const fallback = String(input);
  console.log('🔄 Fallback to string:', fallback.slice(0, 100));
  return fallback;
}

// Enhanced YouTube ID validation
const YOUTUBE_ID_PATTERN = /^[A-Za-z0-9_-]{11}$/;

// Comprehensive YouTube URL to embed converter
function toYoutubeEmbed(input) {
  const rawUrl = extractUrlFromAnything(input);
  const cleanUrl = unescapeAll(rawUrl).trim();
  
  console.log('🎬 YouTube processing:', { rawUrl, cleanUrl });
  
  if (!cleanUrl) return null;

  // Direct YouTube ID
  if (YOUTUBE_ID_PATTERN.test(cleanUrl)) {
    console.log('✅ Direct YouTube ID detected:', cleanUrl);
    return `https://www.youtube.com/embed/${cleanUrl}?rel=0&modestbranding=1&iv_load_policy=3&autoplay=0`;
  }

  // URL parsing
  try {
    const url = new URL(cleanUrl.startsWith('http') ? cleanUrl : `https://${cleanUrl}`);
    const hostname = url.hostname.replace(/^www\./, "").toLowerCase();
    const pathSegments = url.pathname.split("/").filter(Boolean);
    
    console.log('🔗 URL parsed:', { hostname, pathSegments, searchParams: url.searchParams.toString() });

    // YouTube.com variants
    if (hostname.includes('youtube.com') || hostname === 'm.youtube.com') {
      // Standard watch URL: ?v=ID
      const videoId = url.searchParams.get("v");
      if (videoId && YOUTUBE_ID_PATTERN.test(videoId)) {
        console.log('✅ YouTube watch URL - ID:', videoId);
        return buildYouTubeEmbed(videoId, url);
      }
      
      // Path-based URLs: /embed/ID, /shorts/ID, /live/ID, /v/ID
      const pathPatterns = ['embed', 'shorts', 'live', 'v', 'watch'];
      for (const segment of pathSegments) {
        if (YOUTUBE_ID_PATTERN.test(segment)) {
          console.log('✅ YouTube path URL - ID:', segment);
          return buildYouTubeEmbed(segment, url);
        }
      }
    }

    // youtu.be short URLs
    if (hostname === 'youtu.be' && pathSegments[0] && YOUTUBE_ID_PATTERN.test(pathSegments[0])) {
      console.log('✅ youtu.be short URL - ID:', pathSegments[0]);
      return buildYouTubeEmbed(pathSegments[0], url);
    }

    // youtube-nocookie.com
    if (hostname.includes('youtube-nocookie.com')) {
      for (const segment of pathSegments) {
        if (YOUTUBE_ID_PATTERN.test(segment)) {
          console.log('✅ YouTube nocookie URL - ID:', segment);
          return buildYouTubeEmbed(segment, url);
        }
      }
    }

  } catch (urlError) {
    console.warn('⚠️ URL parsing failed:', urlError.message);
  }

  // Last resort: extract any 11-character sequence that looks like a YouTube ID
  const idMatch = cleanUrl.match(/([A-Za-z0-9_-]{11})(?![A-Za-z0-9_-])/);
  if (idMatch && idMatch[1]) {
    console.log('🔍 Extracted potential YouTube ID:', idMatch[1]);
    return `https://www.youtube.com/embed/${idMatch[1]}?rel=0&modestbranding=1&iv_load_policy=3&autoplay=0`;
  }

  console.log('❌ No YouTube ID found in URL');
  return null;
}

// Build YouTube embed URL with proper parameters
function buildYouTubeEmbed(videoId, originalUrl = null) {
  const params = new URLSearchParams({
    rel: "0",
    modestbranding: "1",
    iv_load_policy: "3",
    autoplay: "0",
    controls: "1"
  });
  
  // Extract timestamp if present
  if (originalUrl) {
    const timestamp = originalUrl.searchParams.get("t") || 
                     originalUrl.searchParams.get("start") ||
                     originalUrl.searchParams.get("time");
    if (timestamp) {
      const cleanTime = timestamp.toString().replace(/s$/i, "");
      if (/^\d+$/.test(cleanTime)) {
        params.set("start", cleanTime);
      }
    }
  }
  
  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
}

/* ---------- Main Component ---------- */
export default function VideoPlayer({ 
  videoUrl, 
  title = "Skill Video", 
  autoplay = false,
  showDebug = false // Set to true for debugging
}) {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef(null);

  // Process the input URL
  const cleanedUrl = useMemo(() => {
    const result = extractUrlFromAnything(videoUrl);
    console.log('🎯 Final cleaned URL:', result);
    return result;
  }, [videoUrl]);

  // Try to convert to YouTube embed
  const youtubeEmbedUrl = useMemo(() => {
    const result = toYoutubeEmbed(cleanedUrl);
    console.log('📺 YouTube embed result:', result);
    return result;
  }, [cleanedUrl]);

  // Reset loading state when URL changes
  useEffect(() => {
    setIsLoading(true);
    setError("");
  }, [cleanedUrl, youtubeEmbedUrl]);

  // YouTube embed renderer
  if (youtubeEmbedUrl) {
    return (
      <div className="relative w-full max-w-6xl mx-auto rounded-2xl overflow-hidden shadow-lg">
        {/* Debug info */}
        {showDebug && (
          <div className="absolute top-0 left-0 z-20 text-[10px] bg-green-600 text-white px-2 py-1 rounded-br">
            Mode: YouTube | {cleanedUrl.slice(0, 50)}...
          </div>
        )}
        
        {/* Loading overlay */}
        {isLoading && (
          <div className="absolute inset-0 bg-gray-900 flex items-center justify-center z-10">
            <div className="text-white text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
              <p>جاري تحميل الفيديو...</p>
            </div>
          </div>
        )}
        
        {/* YouTube iframe */}
        <div className="relative w-full bg-black" style={{ paddingTop: "56.25%" }}>
          <iframe
            className="absolute inset-0 w-full h-full"
            src={youtubeEmbedUrl}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            onLoad={() => {
              console.log('✅ YouTube iframe loaded');
              setIsLoading(false);
            }}
            onError={(e) => {
              console.error('❌ YouTube iframe error:', e);
              setError("فشل في تحميل فيديو YouTube");
              setIsLoading(false);
            }}
          />
        </div>
      </div>
    );
  }

  // Fallback: Direct video file
  const videoSrc = cleanedUrl || "https://www.w3schools.com/html/mov_bbb.mp4";
  
  return (
    <div className="relative w-full max-w-6xl mx-auto rounded-2xl overflow-hidden shadow-lg">
      {/* Debug info */}
      {showDebug && (
        <div className="absolute top-0 left-0 z-20 text-[10px] bg-blue-600 text-white px-2 py-1 rounded-br">
          Mode: Video File | {cleanedUrl ? cleanedUrl.slice(0, 40) : 'fallback'}...
          {error && ` | Error: ${error}`}
        </div>
      )}
      
      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-gray-900 flex items-center justify-center z-10">
          <div className="text-white text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
            <p>جاري تحميل الفيديو...</p>
          </div>
        </div>
      )}
      
      {/* Video element */}
      <div className="relative w-full bg-black" style={{ paddingTop: "56.25%" }}>
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full"
          src={videoSrc}
          title={title}
          controls
          playsInline
          preload="metadata"
          autoPlay={autoplay}
          onLoadStart={() => {
            console.log('🎬 Video loading started');
            setIsLoading(true);
          }}
          onLoadedData={() => {
            console.log('✅ Video loaded successfully');
            setIsLoading(false);
            setError("");
          }}
          onError={(e) => {
            const errorCode = e.currentTarget?.error?.code;
            const errorMessage = e.currentTarget?.error?.message || 'Unknown error';
            console.error('❌ Video error:', { errorCode, errorMessage });
            setError(`خطأ في تحميل الفيديو: ${errorCode || 'UNKNOWN'}`);
            setIsLoading(false);
          }}
          onCanPlay={() => {
            console.log('🎯 Video can start playing');
            setIsLoading(false);
          }}
        />
      </div>
      
      {/* Error message */}
      {error && (
        <div className="absolute inset-0 bg-gray-900 bg-opacity-90 flex items-center justify-center">
          <div className="text-white text-center p-4">
            <p className="text-red-400 mb-2">⚠️ {error}</p>
            <p className="text-sm text-gray-300">تأكد من صحة رابط الفيديو</p>
          </div>
        </div>
      )}
    </div>
  );
}