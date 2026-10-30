/**
 * AL-AWAEL PLUMBING (شركة الأوائل - بإشراف البشمهندس وائل) - Unified Data & Cloud Sync Layer
 * Supports Supabase Cloud Database + LocalStorage Offline Fallback
 */

const SiteData = (function () {
  const STORAGE_KEYS = {
    SUPABASE_CONFIG: 'alawael_supabase_config',
    ANNOUNCEMENT: 'alawael_announcement_data',
    VIDEOS: 'alawael_videos_data',
    PHOTOS: 'alawael_custom_photos_data',
    HERO_MEDIA: 'alawael_hero_media_config',
    ADMIN_PIN: 'alawael_admin_pin',
    THEME_SETTINGS: 'alawael_theme_settings',
    CATEGORIES: 'alawael_custom_categories',
  };

  // Default theme & display appearance settings (Site Theme Engine)
  const DEFAULT_THEME_SETTINGS = {
    themeId: 'royal-gold',     // Active surprise theme: Royal Andalusian Midnight & Brushed Champagne Gold
    fontScale: 'normal',       // 'small', 'normal', 'large', 'xlarge'
    borderRadius: 'modern',    // 'modern', 'sharp'
    animations: 'full',        // 'full', 'reduced'
  };

  // Default hero media alternating card configuration (Dual Story rotation with loading timer)
  const DEFAULT_HERO_MEDIA = {
    mode: 'both', // 'both' (dual story rotation with loading bar timer) | 'portrait' | 'video'
    promo_type: 'image', // 'video' | 'image'
    duration: 8, // seconds
    portrait_url: 'assets/wael_portrait.jpg',
    portrait_name: 'البشمهندس وائل',
    portrait_sub: 'مؤسس ومدير شركة الأوائل للسباكة الحديثة',
    video_url: '',
    poster_url: 'assets/wael_hero_banner.jpg',
    promo_image_url: 'assets/wael_hero_banner.jpg',
    promo_label: 'معاينة أعمالنا',
    video_title: 'شاهد أحدث أعمال وتأسيس السباكة على أرض الواقع 🛠️',
    badge_text: 'معاينة حية ومباشرة 🔥',
    cta_text: 'احجز نفس التشطيب على واتساب',
    cta_link: 'https://wa.me/201144867114?text=السلام%20عليكم%20يا%20بشمهندس%20وائل،%20شفت%20معاينة%20الواجهة%20ومحتاج%20تفاصيل%20المعاينة',
  };

  // Default initial announcement
  const DEFAULT_ANNOUNCEMENT = {
    is_active: true,
    badge_text: 'عرض خاص 🔥',
    message_text: 'خصم 15% على تأسيس شبكات السباكة وفحص تسريب المياه مجاناً بمناسبة التوسعات الجديدة في الشيخ زايد والتجمع!',
    cta_text: 'احجز العرض على واتساب',
    cta_link: 'https://wa.me/201144867114?text=عايز%20استفيد%20من%20العرض%20المعلن%20في%20الموقع',
    bg_color: 'linear-gradient(135deg, #7f1d1d 0%, #991b1b 45%, #b91c1c 100%)',
  };

  // Default initial videos showing Al-Awael & Eng. Wael's real field work
  const DEFAULT_VIDEOS = [
    {
      id: 'v1',
      title: 'كشف تسريب مياه خفي بدون تكسير بالكاميرا الحرارية',
      location: 'فيلا بالتجمع الخامس',
      tag: 'كشف تسريب حقيقي',
      video_type: 'facebook',
      video_url: 'https://www.facebook.com/reel/2110601713215688',
      poster_url: 'assets/wael_hero_banner.jpg',
      description: 'فحص هندسي دقيق لمسار مواسير التغذية وتحديد موضع الكسر بدقة سنتيمترية بدون تكسير عشوائي بإشراف البشمهندس وائل.',
    },
    {
      id: 'v2',
      title: 'قبل وبعد: تعديل وضبط شبكة مواتير وفلاتر مياه فيلا كاملة',
      location: 'الشيخ زايد',
      tag: 'قبل وبعد',
      has_dual_videos: true,
      video_url_before: 'https://www.facebook.com/reel/1143836208277783',
      video_type_before: 'facebook',
      video_url_after: 'https://www.facebook.com/61581980519649/videos/1979778842716946/',
      video_type_after: 'facebook',
      video_type: 'facebook',
      video_url: 'https://www.facebook.com/61581980519649/videos/1979778842716946/',
      poster_url: 'assets/wael_hero_banner.jpg',
      description: 'إعادة هيكلة توصيلات مواتير الرفع وفلاتر التنقية المركزية، تركيب محابس أمان إيطالية وضبط الأوتوماتيك.',
    },
    {
      id: 'v3',
      title: 'استلام حمام مودرن وتشغيل شاسيه دفن جروهي على ميزان الليزر',
      location: 'المعادي',
      tag: 'تشطيب وتسليم',
      video_type: 'facebook',
      video_url: 'https://www.facebook.com/reel/1143836208277783',
      poster_url: 'assets/wael_working.jpg',
      description: 'لقطة توثيقية بحضور البشمهندس وائل أثناء اختبار تصريف المياه والتأكد من استواء القاعدة المعلقة وخلاطات الدفن الفندقية.',
    },
  ];

  // Default initial 9 gallery project blocks
  const DEFAULT_PHOTOS = [
    {
      id: 'photo_init_1',
      title: 'حمام ماستر فيلا ألترا سوبر لوكس',
      location: 'التجمع الخامس',
      category: 'luxury',
      image_url: 'assets/pics/1000346031.jpg',
      images: [
        'assets/pics/1000346031.jpg',
        'assets/pics/1000346028.jpg',
        'assets/pics/1000346027.jpg'
      ],
      tag: 'بانيو ديكور بيضاوي',
      description: 'تنفيذ متكامل ببانيو بيضاوي فاخر، خلاط شلال، وحدة حوض عائمة بأدراج رخامية، ومرآة مضيئة تعمل باللمس مع بيبة صرف رخامية مدفونة.'
    },
    {
      id: 'photo_init_2',
      title: 'تشطيب فندقي 5 نجوم مع كابينة شاور',
      location: 'الشيخ زايد',
      category: 'luxury',
      image_url: 'assets/pics/1000345976.jpg',
      images: [
        'assets/pics/1000345976.jpg'
      ],
      tag: 'كابينة سيكوريت',
      description: 'كابينة شاور زجاجية مع دش مطري دفن وسيفون مسطري ستانلس ستيل في الأرضية، بيوت إضاءة ديكورية (Niches) في الحوائط، وقاعدة معلقة.'
    },
    {
      id: 'photo_init_3',
      title: 'جناح رخام كلكتا مع بانيو إيطالي مستقل',
      location: 'بالم هيلز أكتوبر',
      category: 'luxury',
      image_url: 'assets/pics/1000318833.jpg',
      images: [
        'assets/pics/1000318833.jpg',
        'assets/pics/1000318836.jpg',
        'assets/pics/1000318838.jpg'
      ],
      tag: 'رخام كلكتا فاخر',
      description: 'قمة الفخامة بتشطيب رخامي كامل وبانيو حر في المنتصف، مع 3 رفوف ديكورية جدارية مضاءة بنظام LED دافئ وخلاط دفن إيطالي معتمد.'
    },
    {
      id: 'photo_init_4',
      title: 'حمام ضيوف عصري مع قاعدة معلقة',
      location: 'المعادي دجلة',
      category: 'concealed',
      image_url: 'assets/pics/1000346007.jpg',
      images: [
        'assets/pics/1000346007.jpg'
      ],
      tag: 'شاسيه جروهي دفن',
      description: 'استغلال هندسي ذكي للمساحات المحدودة، قاعدة تواليت معلقة ريملس مع زر طرد ثنائي كروم، مرآة ذكية، وتأسيس وتوصيل مخفي بالكامل.'
    },
    {
      id: 'photo_init_5',
      title: 'تثبيت شاسيه جروهي وقاعدة معلقة',
      location: 'مدينة نصر',
      category: 'concealed',
      image_url: 'assets/pics/1000346012.jpg',
      images: [
        'assets/pics/1000346012.jpg'
      ],
      tag: 'شاسيه جروهي أصلي',
      description: 'تركيب دقيق لشاسيه الدفن داخل الجدار بوزن ليزري، ربط قاعدة معلقة ديورافيت ريملس، وشطاف ستانلس ستيل كروم مع زر طرد ثنائي أصلي.'
    },
    {
      id: 'photo_init_6',
      title: 'حوض مطبخ تركي مع خلاط سحاب',
      location: 'مصر الجديدة',
      category: 'kitchen-heaters',
      image_url: 'assets/pics/1000345996.jpg',
      images: [
        'assets/pics/1000345996.jpg'
      ],
      tag: 'حوض تركي سقط رخام',
      description: 'تركيب حوض تركي ساقط برخام جلاكسي أسود، خلاط متحرك بخرطوم سحاب قابل للمد بوضعين لتدفق المياه، مع محابس أمان إيطالية مانعة للتسريب.'
    },
    {
      id: 'photo_init_7',
      title: 'منطقة شاور فندقية وسيفون مسطري',
      location: 'الرحاب',
      category: 'tubs',
      image_url: 'assets/pics/1000345981.jpg',
      images: [
        'assets/pics/1000345981.jpg'
      ],
      tag: 'دش مطري مربع دفن',
      description: 'ميول أرضية ليزرية تضمن تصريف فوري للمياه داخل جريلية صرف مسطرية ستانلس 304، مع رأس دش مطري دفن ومقبض أمان لكبار السن.'
    },
    {
      id: 'photo_init_8',
      title: 'توصيل وتثبيت سخان مياه آمن',
      location: 'حدائق الأهرام',
      category: 'kitchen-heaters',
      image_url: 'assets/pics/1000345986.jpg',
      images: [
        'assets/pics/1000345986.jpg'
      ],
      tag: 'صمام أمان رداد',
      description: 'تثبيت صلب بمسامير فيشر حديد بالخرسانة، صمام أمان لعدم الرجوع لمنع زيادة ضغط البخار، ومحابس زاوية نيكل أصلية مانعة للتسريب تماماً.'
    },
    {
      id: 'photo_init_9',
      title: 'تسليم حمام مودرن فاخر بإشراف وحضور البشمهندس وائل',
      location: 'الشيخ زايد',
      category: 'luxury',
      image_url: 'assets/before_after/case3_master_wael_delivered.jpg',
      images: [
        'assets/before_after/case3_master_wael_delivered.jpg'
      ],
      tag: 'تسليم على المفتاح',
      description: 'لقطة حقيقية للبشمهندس وائل داخل حمام مودرن فاخر بعد الانتهاء من تركيبه وتسليمه بالكامل على الليزر (قاعدة معلقة ريملس، حوض معلق، وعمود شاور أسود فاخر).'
    }
  ];

  // Default Supabase project connection for Al-Awael (Live Cloud Database)
  const DEFAULT_SUPABASE_CONFIG = {
    url: 'https://ktegdbmxuykeedegarrs.supabase.co',
    anonKey: 'sb_publishable_goEdMQteSHIzmbtWUnnpRQ_L8Q2uPdA',
  };

  // Helper: Get Supabase client if configured
  function getSupabaseClient() {
    try {
      let config = DEFAULT_SUPABASE_CONFIG;
      const configStr = localStorage.getItem(STORAGE_KEYS.SUPABASE_CONFIG);
      if (configStr) {
        try {
          const parsed = JSON.parse(configStr);
          if (parsed && parsed.url && parsed.anonKey) {
            config = parsed;
          }
        } catch (e) {}
      }
      if (config && config.url && config.anonKey && typeof window.supabase !== 'undefined' && window.supabase.createClient) {
        return window.supabase.createClient(config.url, config.anonKey);
      }
    } catch (e) {
      console.warn('Error initializing Supabase client:', e);
    }
    return null;
  }

  // Helper: Normalize Video URLs (converts standard YouTube/Shorts links to embed URLs)
  function normalizeVideoUrl(url) {
    if (!url) return { type: 'mp4', url: '', rawUrl: '', isVertical: false };
    const trimmed = url.trim();

    // YouTube Shorts: https://www.youtube.com/shorts/VIDEO_ID
    const shortsMatch = trimmed.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/i);
    if (shortsMatch && shortsMatch[1]) {
      return {
        type: 'youtube',
        url: `https://www.youtube.com/embed/${shortsMatch[1]}?autoplay=1&rel=0`,
        rawUrl: trimmed,
        isVertical: true,
      };
    }

    // Standard YouTube watch: https://www.youtube.com/watch?v=VIDEO_ID
    const ytMatch = trimmed.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/i);
    if (ytMatch && ytMatch[1]) {
      return {
        type: 'youtube',
        url: `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&rel=0`,
        rawUrl: trimmed,
        isVertical: false,
      };
    }

    // TikTok: https://www.tiktok.com/@user/video/ID or vt.tiktok.com
    if (trimmed.includes('tiktok.com')) {
      const tiktokIdMatch = trimmed.match(/tiktok\.com\/(?:@[\w.-]+\/video\/|v\/)(\d+)/i);
      const embedUrl = tiktokIdMatch && tiktokIdMatch[1]
        ? `https://www.tiktok.com/embed/v2/${tiktokIdMatch[1]}`
        : trimmed;
      return { type: 'tiktok', url: embedUrl, rawUrl: trimmed, isVertical: true };
    }

    // Facebook Videos & Reels (facebook.com/reel, fb.watch, facebook.com/watch, facebook.com/user/videos)
    if (trimmed.includes('facebook.com') || trimmed.includes('fb.watch')) {
      return { type: 'facebook', url: trimmed, rawUrl: trimmed, isVertical: true };
    }

    // Instagram / Reels: instagram.com/reel/CODE or instagram.com/p/CODE
    if (trimmed.includes('instagram.com')) {
      const instaMatch = trimmed.match(/instagram\.com\/(?:reel|p|tv)\/([a-zA-Z0-9_-]+)/i);
      const embedUrl = instaMatch && instaMatch[1]
        ? `https://www.instagram.com/reel/${instaMatch[1]}/embed/`
        : trimmed;
      return { type: 'instagram', url: embedUrl, rawUrl: trimmed, isVertical: true };
    }

    // Direct MP4 / WebM / MOV / 3GP
    return { type: 'mp4', url: trimmed, rawUrl: trimmed, isVertical: false };
  }

  // --- ANNOUNCEMENT API ---
  async function getAnnouncement() {
    const client = getSupabaseClient();
    if (client) {
      try {
        const { data, error } = await client
          .from('site_announcements')
          .select('*')
          .order('id', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (!error && data) {
          localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENT, JSON.stringify(data));
          return data;
        }
      } catch (err) {
        console.warn('Supabase fetch announcement failed, using local fallback:', err);
      }
    }

    const local = localStorage.getItem(STORAGE_KEYS.ANNOUNCEMENT);
    if (local) {
      try { return JSON.parse(local); } catch (e) {}
    }
    return DEFAULT_ANNOUNCEMENT;
  }

  async function saveAnnouncement(announcementData) {
    localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENT, JSON.stringify(announcementData));
    try {
      window.dispatchEvent(new CustomEvent('alawael_announcement_changed', { detail: announcementData }));
    } catch (e) {}

    const client = getSupabaseClient();
    if (client) {
      try {
        // Try updating existing row or insert
        const { data: existing } = await client
          .from('site_announcements')
          .select('id')
          .limit(1)
          .maybeSingle();

        if (existing && existing.id) {
          await client
            .from('site_announcements')
            .update({
              is_active: announcementData.is_active,
              badge_text: announcementData.badge_text,
              message_text: announcementData.message_text,
              cta_text: announcementData.cta_text,
              cta_link: announcementData.cta_link,
              bg_color: announcementData.bg_color || 'linear-gradient(135deg, #7f1d1d 0%, #991b1b 45%, #b91c1c 100%)',
              updated_at: new Date().toISOString(),
            })
            .eq('id', existing.id);
        } else {
          await client.from('site_announcements').insert([announcementData]);
        }
      } catch (err) {
        console.error('Failed to sync announcement to Supabase:', err);
      }
    }
    return true;
  }

  // --- VIDEOS API (Maximum 15 Videos) ---
  const MAX_VIDEOS = 15;

  async function getVideos() {
    const client = getSupabaseClient();
    if (client) {
      try {
        const { data, error } = await client
          .from('site_videos')
          .select('*')
          .order('id', { ascending: false });

        if (!error && data && data.length > 0) {
          const limited = data.slice(0, MAX_VIDEOS);
          localStorage.setItem(STORAGE_KEYS.VIDEOS, JSON.stringify(limited));
          return limited;
        }
      } catch (err) {
        console.warn('Supabase fetch videos failed, using local fallback:', err);
      }
    }

    const local = localStorage.getItem(STORAGE_KEYS.VIDEOS);
    if (local) {
      try {
        let parsed = JSON.parse(local);
        if (Array.isArray(parsed) && parsed.length > 0) {
          let hasSongPlaceholder = false;
          parsed = parsed.map(item => {
            if (item.video_url && item.video_url.includes('dQw4w9WgXcQ')) {
              hasSongPlaceholder = true;
              return {
                ...item,
                video_type: 'facebook',
                video_url: 'https://www.facebook.com/reel/2110601713215688',
                video_url_before: item.video_url_before && item.video_url_before.includes('dQw4w9WgXcQ') ? 'https://www.facebook.com/reel/1143836208277783' : item.video_url_before,
                video_url_after: item.video_url_after && item.video_url_after.includes('dQw4w9WgXcQ') ? 'https://www.facebook.com/61581980519649/videos/1979778842716946/' : item.video_url_after,
                poster_url: item.poster_url && !item.poster_url.includes('1000346031') ? item.poster_url : 'assets/wael_hero_banner.jpg'
              };
            }
            return item;
          });
          if (hasSongPlaceholder) {
            localStorage.setItem(STORAGE_KEYS.VIDEOS, JSON.stringify(parsed));
          }
          return parsed.slice(0, MAX_VIDEOS);
        }
      } catch (e) {}
    }
    return DEFAULT_VIDEOS.slice(0, MAX_VIDEOS);
  }

  async function addVideo(videoData) {
    const currentVideos = await getVideos();
    if (currentVideos.length >= MAX_VIDEOS) {
      throw new Error(`وصلت للحد الأقصى المسموح به (${MAX_VIDEOS} فيديو). يرجى حذف فيديو قديم قبل إضافة فيديو جديد.`);
    }

    const rawBefore = (videoData.video_url_before || '').trim();
    const rawAfter = (videoData.video_url_after || '').trim();
    const rawMain = (videoData.video_url || rawAfter || rawBefore || '').trim();

    const normMain = normalizeVideoUrl(rawMain);
    const normBefore = rawBefore ? normalizeVideoUrl(rawBefore) : null;
    const normAfter = rawAfter ? normalizeVideoUrl(rawAfter) : null;

    const hasDual = Boolean((rawBefore && rawAfter) || videoData.has_dual_videos);

    const newVideo = {
      id: 'vid_' + Date.now(),
      title: videoData.title || 'فيديو من موقع العمل',
      location: videoData.location || 'القاهرة والجيزة',
      tag: videoData.tag || 'قبل وبعد',
      has_dual_videos: hasDual,
      video_url_before: normBefore ? normBefore.url : (rawBefore || ''),
      video_type_before: videoData.video_type_before || (normBefore ? normBefore.type : 'mp4'),
      video_url_after: normAfter ? normAfter.url : (rawAfter || ''),
      video_type_after: videoData.video_type_after || (normAfter ? normAfter.type : 'mp4'),
      video_type: normMain.type,
      video_url: normMain.url || (normAfter ? normAfter.url : (normBefore ? normBefore.url : '')),
      poster_url: videoData.poster_url || '',
      description: videoData.description || '',
      created_at: new Date().toISOString(),
    };

    // Save locally
    const updated = [newVideo, ...currentVideos].slice(0, MAX_VIDEOS);
    localStorage.setItem(STORAGE_KEYS.VIDEOS, JSON.stringify(updated));

    // Sync to Supabase
    const client = getSupabaseClient();
    if (client) {
      try {
        const { data: inserted, error: insErr } = await client.from('site_videos').insert([{
          title: newVideo.title,
          location: newVideo.location,
          tag: newVideo.tag,
          video_type: newVideo.video_type,
          video_url: newVideo.video_url,
          video_url_before: newVideo.video_url_before || '',
          video_url_after: newVideo.video_url_after || '',
          has_dual_videos: Boolean(newVideo.has_dual_videos),
          poster_url: newVideo.poster_url || '',
          description: newVideo.description || '',
        }]).select();

        if (!insErr && inserted && inserted[0]) {
          newVideo.id = inserted[0].id;
        }
      } catch (err) {
        console.error('Failed to sync video to Supabase:', err);
      }
    }
    return newVideo;
  }

  async function getVideoById(videoId) {
    const videos = await getVideos();
    return videos.find((v) => String(v.id) === String(videoId)) || null;
  }

  async function updateVideo(videoId, videoData) {
    const currentVideos = await getVideos();
    const index = currentVideos.findIndex((v) => String(v.id) === String(videoId));
    if (index === -1) return null;

    let videoUrl = videoData.video_url !== undefined ? videoData.video_url : currentVideos[index].video_url;
    let videoType = currentVideos[index].video_type || 'youtube';

    if (videoData.video_url && videoData.video_url.trim()) {
      const normalized = normalizeVideoUrl(videoData.video_url);
      videoUrl = normalized.url;
      videoType = normalized.type;
    }

    const rawBefore = videoData.video_url_before !== undefined ? videoData.video_url_before : (currentVideos[index].video_url_before || '');
    const rawAfter = videoData.video_url_after !== undefined ? videoData.video_url_after : (currentVideos[index].video_url_after || '');
    const normBefore = rawBefore ? normalizeVideoUrl(rawBefore) : null;
    const normAfter = rawAfter ? normalizeVideoUrl(rawAfter) : null;
    const hasDual = Boolean((rawBefore && rawAfter) || videoData.has_dual_videos);

    const updatedVideo = {
      ...currentVideos[index],
      title: videoData.title !== undefined ? videoData.title.trim() : currentVideos[index].title,
      location: videoData.location !== undefined ? videoData.location.trim() : currentVideos[index].location,
      tag: videoData.tag !== undefined ? videoData.tag : currentVideos[index].tag,
      has_dual_videos: hasDual,
      video_url_before: normBefore ? normBefore.url : rawBefore,
      video_type_before: videoData.video_type_before || (normBefore ? normBefore.type : (currentVideos[index].video_type_before || 'mp4')),
      video_url_after: normAfter ? normAfter.url : rawAfter,
      video_type_after: videoData.video_type_after || (normAfter ? normAfter.type : (currentVideos[index].video_type_after || 'mp4')),
      video_type: videoType,
      video_url: videoUrl,
      poster_url: videoData.poster_url !== undefined ? videoData.poster_url.trim() : currentVideos[index].poster_url,
      description: videoData.description !== undefined ? videoData.description.trim() : currentVideos[index].description,
      updated_at: new Date().toISOString(),
    };

    currentVideos[index] = updatedVideo;
    localStorage.setItem(STORAGE_KEYS.VIDEOS, JSON.stringify(currentVideos));

    const client = getSupabaseClient();
    if (client) {
      try {
        const payload = {
          title: updatedVideo.title,
          location: updatedVideo.location,
          tag: updatedVideo.tag,
          video_type: updatedVideo.video_type,
          video_url: updatedVideo.video_url,
          video_url_before: updatedVideo.video_url_before || '',
          video_url_after: updatedVideo.video_url_after || '',
          has_dual_videos: Boolean(updatedVideo.has_dual_videos),
          poster_url: updatedVideo.poster_url || '',
          description: updatedVideo.description || '',
        };

        const numId = parseInt(videoId, 10);
        let q = client.from('site_videos').update(payload);
        if (!isNaN(numId)) {
          q = q.eq('id', numId);
        } else {
          q = q.eq('title', currentVideos[index].title);
        }

        const { error: sbErr } = await q;
        if (sbErr) {
          console.error('Failed to update video in Supabase:', sbErr);
        }
      } catch (err) {
        console.error('Failed to update video in Supabase:', err);
      }
    }

    try {
      window.dispatchEvent(new CustomEvent('alawael_videos_changed', { detail: currentVideos }));
    } catch (e) {}

    return updatedVideo;
  }

  async function deleteVideo(videoId) {
    const currentVideos = await getVideos();
    const updated = currentVideos.filter((v) => String(v.id) !== String(videoId));
    localStorage.setItem(STORAGE_KEYS.VIDEOS, JSON.stringify(updated));

    const client = getSupabaseClient();
    if (client) {
      try {
        const numId = parseInt(videoId, 10);
        if (!isNaN(numId)) {
          await client.from('site_videos').delete().eq('id', numId);
        }
      } catch (err) {
        console.error('Failed to delete video from Supabase:', err);
      }
    }
    return true;
  }

  // --- PHOTOS API ---
  async function getCustomPhotos() {
    let list = null;
    const client = getSupabaseClient();
    if (client) {
      try {
        const { data, error } = await client
          .from('site_photos')
          .select('*')
          .order('id', { ascending: true });

        if (!error && data && data.length > 0) {
          list = data.map((item) => {
            let imagesArr = [];
            if (Array.isArray(item.images) && item.images.length > 0) {
              imagesArr = item.images;
            } else {
              // Check if matching DEFAULT_PHOTOS by title or id to preserve multi-images
              const defMatch = DEFAULT_PHOTOS.find(d => d.title === item.title || String(d.id) === String(item.id));
              if (defMatch && Array.isArray(defMatch.images) && defMatch.images.length > 0) {
                imagesArr = defMatch.images;
              } else if (item.image_url) {
                imagesArr = [item.image_url];
              }
            }
            return {
              ...item,
              images: imagesArr
            };
          });
          localStorage.setItem(STORAGE_KEYS.PHOTOS, JSON.stringify(list));
          return list;
        }
      } catch (err) {
        console.warn('Supabase fetch photos failed:', err);
      }
    }

    const local = localStorage.getItem(STORAGE_KEYS.PHOTOS);
    if (local) {
      try {
        const parsed = JSON.parse(local);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      } catch (e) {}
    }

    // Default Fallback: Seed with the 9 initial gallery blocks!
    list = [...DEFAULT_PHOTOS];
    try {
      localStorage.setItem(STORAGE_KEYS.PHOTOS, JSON.stringify(list));
    } catch (e) {}

    // Seed to Supabase if client available and empty
    if (client) {
      try {
        const rows = DEFAULT_PHOTOS.map((p, idx) => ({
          title: p.title,
          location: p.location,
          category: p.category,
          image_url: p.image_url,
          tag: p.tag,
          description: p.description,
          display_order: idx + 1
        }));
        client.from('site_photos').insert(rows).then(() => {});
      } catch (e) {}
    }

    return list;
  }

  async function addCustomPhoto(photoData) {
    const imagesList = Array.isArray(photoData.images) && photoData.images.length > 0
      ? photoData.images
      : (photoData.image_url ? [photoData.image_url] : []);

    const newPhoto = {
      id: 'photo_' + Date.now(),
      title: photoData.title || 'مشروع جديد',
      location: photoData.location || 'القاهرة',
      category: photoData.category || 'luxury',
      image_url: imagesList.length > 0 ? imagesList[0] : (photoData.image_url || ''),
      images: imagesList,
      tag: photoData.tag || 'إشراف البشمهندس وائل',
      description: photoData.description || '',
      created_at: new Date().toISOString(),
    };

    const currentPhotos = await getCustomPhotos();
    if (currentPhotos && currentPhotos.length >= 400) {
      console.warn('Reached maximum allowed blocks quota (400 blocks).');
      return null;
    }
    const updated = [newPhoto, ...currentPhotos];
    localStorage.setItem(STORAGE_KEYS.PHOTOS, JSON.stringify(updated));

    try {
      window.dispatchEvent(new CustomEvent('alawael_photos_changed', { detail: updated }));
    } catch(e) {}

    const client = getSupabaseClient();
    if (client) {
      try {
        const { data: inserted, error: insErr } = await client.from('site_photos').insert([{
          title: newPhoto.title,
          location: newPhoto.location,
          category: newPhoto.category,
          image_url: newPhoto.image_url,
          tag: newPhoto.tag,
          description: newPhoto.description,
        }]).select();

        if (!insErr && inserted && inserted[0]) {
          newPhoto.id = inserted[0].id;
        }
      } catch (err) {
        console.error('Failed to sync photo to Supabase:', err);
      }
    }
    return newPhoto;
  }

  async function getCustomPhotoById(photoId) {
    const photos = await getCustomPhotos();
    return photos.find((p) => String(p.id) === String(photoId)) || null;
  }

  async function updateCustomPhoto(photoId, photoData) {
    const currentPhotos = await getCustomPhotos();
    const index = currentPhotos.findIndex((p) => String(p.id) === String(photoId));
    if (index === -1) return null;

    const existing = currentPhotos[index];
    const imagesList = Array.isArray(photoData.images) && photoData.images.length > 0
      ? photoData.images
      : (photoData.image_url ? [photoData.image_url] : (existing.images || [existing.image_url]));

    const updatedPhoto = {
      ...existing,
      title: photoData.title !== undefined ? photoData.title.trim() : existing.title,
      location: photoData.location !== undefined ? photoData.location.trim() : existing.location,
      category: photoData.category !== undefined ? photoData.category : existing.category,
      image_url: imagesList.length > 0 ? imagesList[0] : (photoData.image_url || existing.image_url),
      images: imagesList,
      tag: photoData.tag !== undefined ? photoData.tag : existing.tag,
      description: photoData.description !== undefined ? photoData.description.trim() : existing.description,
    };

    currentPhotos[index] = updatedPhoto;
    localStorage.setItem(STORAGE_KEYS.PHOTOS, JSON.stringify(currentPhotos));

    const client = getSupabaseClient();
    if (client) {
      try {
        const payload = {
          title: updatedPhoto.title,
          location: updatedPhoto.location,
          category: updatedPhoto.category,
          image_url: updatedPhoto.image_url,
          tag: updatedPhoto.tag || 'إشراف البشمهندس وائل',
          description: updatedPhoto.description || '',
        };

        const numId = parseInt(photoId, 10);
        let q = client.from('site_photos').update(payload);
        if (!isNaN(numId)) {
          q = q.eq('id', numId);
        } else {
          q = q.eq('title', existing.title);
        }

        const { error: sbErr } = await q;
        if (sbErr) {
          console.error('Failed to update photo in Supabase:', sbErr);
        }
      } catch (err) {
        console.error('Failed to update photo in Supabase:', err);
      }
    }

    try {
      window.dispatchEvent(new CustomEvent('alawael_photos_changed', { detail: currentPhotos }));
    } catch(e) {}

    return updatedPhoto;
  }

  async function deleteCustomPhoto(photoId) {
    const current = await getCustomPhotos();
    const updated = current.filter((p) => String(p.id) !== String(photoId));
    localStorage.setItem(STORAGE_KEYS.PHOTOS, JSON.stringify(updated));

    try {
      window.dispatchEvent(new CustomEvent('alawael_photos_changed', { detail: updated }));
    } catch(e) {}

    const client = getSupabaseClient();
    if (client) {
      try {
        const numId = parseInt(photoId, 10);
        if (!isNaN(numId)) {
          await client.from('site_photos').delete().eq('id', numId);
        } else {
          const match = current.find((p) => String(p.id) === String(photoId));
          if (match && match.title) {
            await client.from('site_photos').delete().eq('title', match.title);
          }
        }
      } catch (err) {
        console.error('Failed to delete photo from Supabase:', err);
      }
    }
    return true;
  }

  // --- GALLERY CATEGORIES API ---
  const DEFAULT_GALLERY_CATEGORIES = [
    'حمامات فندقية وماستر',
    'أنظمة دفن وأطقم معلقة',
    'بانيوهات مستقلة وكبائن',
    'مطابخ وسخانات'
  ];

  function getGalleryCategories() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return [...DEFAULT_GALLERY_CATEGORIES];
  }

  function saveGalleryCategories(categoriesList) {
    if (!Array.isArray(categoriesList)) return;
    const cleanList = categoriesList.map(c => String(c).trim()).filter(Boolean);
    const unique = [...new Set(cleanList)];
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(unique));
    try {
      window.dispatchEvent(new CustomEvent('alawael_categories_changed', { detail: unique }));
    } catch(e) {}

    // Cloud sync to Supabase site_settings
    (async () => {
      const client = getSupabaseClient();
      if (client) {
        try {
          const { data: existing } = await client.from('site_settings').select('id, settings').limit(1).maybeSingle();
          if (existing && existing.id) {
            const current = existing.settings || {};
            await client.from('site_settings').update({
              settings: { ...current, categories: unique },
              updated_at: new Date().toISOString()
            }).eq('id', existing.id);
          }
        } catch(err) {
          console.warn('Sync categories to Supabase note:', err);
        }
      }
    })();

    return unique;
  }

  // --- CONFIG & PIN API ---
  function getSupabaseConfig() {
    try {
      const configStr = localStorage.getItem(STORAGE_KEYS.SUPABASE_CONFIG);
      if (configStr) {
        const parsed = JSON.parse(configStr);
        if (parsed && (parsed.url || parsed.anonKey)) return parsed;
      }
      return DEFAULT_SUPABASE_CONFIG;
    } catch (e) {
      return DEFAULT_SUPABASE_CONFIG;
    }
  }

  function setSupabaseConfig(url, anonKey) {
    const config = { url: (url || '').trim(), anonKey: (anonKey || '').trim() };
    localStorage.setItem(STORAGE_KEYS.SUPABASE_CONFIG, JSON.stringify(config));
    return true;
  }

  async function testSupabaseConnection(url, anonKey) {
    if (!url || !anonKey) return { success: false, message: 'الرجاء إدخال الرابط والمفتاح كاملاً' };
    try {
      if (typeof window.supabase === 'undefined') {
        return { success: false, message: 'مكتبة Supabase لم يتم تحميلها بعد' };
      }
      const client = window.supabase.createClient(url.trim(), anonKey.trim());
      const { data, error } = await client.from('site_announcements').select('count', { count: 'exact', head: true });
      if (error && error.code === '42P01') {
        return {
          success: false,
          message: 'الاتصال نجح ولكن لم يتم تشغيل كود إنشاء الجداول (SQL Schema) بعد في Supabase.',
        };
      }
      if (error) {
        return { success: false, message: 'فشل الاتصال: ' + error.message };
      }
      return { success: true, message: 'تم الاتصال بقاعدة البيانات السحابية بنجاح 100%! 🎉' };
    } catch (err) {
      return { success: false, message: 'خطأ أثناء الاتصال: ' + err.message };
    }
  }

  // --- CLOUD STORAGE UPLOAD (Supabase Storage Bucket: 'media') ---
  async function uploadMediaFile(file, folder = 'uploads') {
    if (!file) throw new Error('لا يوجد ملف للرفع');
    const client = getSupabaseClient();
    if (!client || !client.storage) {
      throw new Error('Supabase Storage غير متاح');
    }
    const ext = file.name ? file.name.split('.').pop() : (file.type && file.type.includes('video') ? 'mp4' : 'jpg');
    const cleanExt = (ext || 'bin').replace(/[^a-zA-Z0-9]/g, '').toLowerCase() || 'bin';
    const fileName = `${folder}/${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${cleanExt}`;

    const { data, error } = await client.storage
      .from('media')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) throw error;

    const { data: pubData } = client.storage.from('media').getPublicUrl(fileName);
    return pubData ? pubData.publicUrl : '';
  }

  // --- INDEXEDDB STORAGE FOR LOCAL MEDIA (VIDEOS & LARGE FILES) ---
  const IDB_NAME = 'alawael_media_db';
  const IDB_STORE = 'media_blobs';
  let _idbPromise = null;

  function getMediaDB() {
    if (_idbPromise) return _idbPromise;
    _idbPromise = new Promise((resolve) => {
      if (typeof indexedDB === 'undefined') {
        resolve(null);
        return;
      }
      const req = indexedDB.open(IDB_NAME, 1);
      req.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains(IDB_STORE)) {
          db.createObjectStore(IDB_STORE);
        }
      };
      req.onsuccess = (e) => resolve(e.target.result);
      req.onerror = () => resolve(null);
    });
    return _idbPromise;
  }

  async function saveMediaBlob(key, blobOrFile) {
    try {
      const db = await getMediaDB();
      if (!db) return false;
      return new Promise((resolve) => {
        const tx = db.transaction([IDB_STORE], 'readwrite');
        const store = tx.objectStore(IDB_STORE);
        store.put(blobOrFile, key);
        tx.oncomplete = () => resolve(true);
        tx.onerror = () => resolve(false);
      });
    } catch (e) {
      console.warn('saveMediaBlob error:', e);
      return false;
    }
  }

  async function getMediaBlob(key) {
    try {
      const db = await getMediaDB();
      if (!db) return null;
      return new Promise((resolve) => {
        const tx = db.transaction([IDB_STORE], 'readonly');
        const store = tx.objectStore(IDB_STORE);
        const req = store.get(key);
        req.onsuccess = () => resolve(req.result || null);
        req.onerror = () => resolve(null);
      });
    } catch (e) {
      console.warn('getMediaBlob error:', e);
      return null;
    }
  }

  async function getMediaObjectUrl(key) {
    if (!key) return null;
    const cleanKey = String(key).startsWith('indexeddb:') ? String(key).replace('indexeddb:', '') : String(key);
    const blob = await getMediaBlob(cleanKey);
    if (!blob) return null;

    // Mobile compatibility: Ensure blob has a valid video MIME type if missing or generic
    let finalBlob = blob;
    if (!blob.type || blob.type === 'application/octet-stream' || blob.type === '') {
      let mime = 'video/mp4';
      if (blob.name) {
        const ext = blob.name.split('.').pop().toLowerCase();
        if (ext === 'webm') mime = 'video/webm';
        else if (ext === 'mov') mime = 'video/quicktime';
        else if (ext === '3gp' || ext === '3gpp') mime = 'video/3gpp';
        else if (ext === 'mkv') mime = 'video/x-matroska';
        else if (ext === 'm4v') mime = 'video/x-m4v';
        else if (ext === 'ogg' || ext === 'ogv') mime = 'video/ogg';
        else if (ext === 'ts') mime = 'video/mp2t';
      }
      try {
        finalBlob = new Blob([blob], { type: mime });
      } catch (e) {
        finalBlob = blob;
      }
    }
    return URL.createObjectURL(finalBlob);
  }

  // Helper: Sanitize and enforce valid Hero Media settings
  function sanitizeHeroMediaData(raw) {
    if (!raw) return { ...DEFAULT_HERO_MEDIA };
    const cleaned = { ...DEFAULT_HERO_MEDIA, ...raw };

    // Rule 1: Founder portrait MUST ALWAYS be Eng. Wael's face, never logo_alawael!
    if (!cleaned.portrait_url || cleaned.portrait_url.includes('logo_alawael') || cleaned.portrait_url.trim() === '') {
      cleaned.portrait_url = 'assets/wael_portrait.jpg';
    }

    // Rule 2: Ensure mode is valid: 'both' | 'portrait' | 'video'
    if (!cleaned.mode || cleaned.mode === 'none') {
      cleaned.mode = 'both';
    }

    // Rule 3: Promo media second banner must be valid work banner
    if (!cleaned.promo_image_url || cleaned.promo_image_url.includes('logo_alawael') || cleaned.promo_image_url.trim() === '') {
      cleaned.promo_image_url = 'assets/wael_hero_banner.jpg';
    }
    if (!cleaned.poster_url || cleaned.poster_url.includes('logo_alawael') || cleaned.poster_url.trim() === '') {
      cleaned.poster_url = 'assets/wael_hero_banner.jpg';
    }
    if (!cleaned.promo_type) {
      cleaned.promo_type = 'image';
    }

    // Rule 4: Duration range 3s to 60s
    const dur = Number(cleaned.duration);
    cleaned.duration = (!dur || isNaN(dur)) ? 8 : Math.max(3, Math.min(60, dur));

    return cleaned;
  }

  // --- HERO MEDIA (PHOTO / PROMO VIDEO ALTERNATION) API ---
  async function getHeroMedia() {
    let localData = null;
    try {
      const local = localStorage.getItem(STORAGE_KEYS.HERO_MEDIA);
      if (local) {
        localData = sanitizeHeroMediaData(JSON.parse(local));
      }
    } catch (e) {}

    const client = getSupabaseClient();
    if (client) {
      try {
        const fetchPromise = client
          .from('site_hero_media')
          .select('*')
          .order('id', { ascending: false })
          .limit(1)
          .maybeSingle();

        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('timeout')), 1200)
        );

        const { data, error } = await Promise.race([fetchPromise, timeoutPromise]);

        if (!error && data) {
          const sanitized = sanitizeHeroMediaData(data);
          try {
            localStorage.setItem(STORAGE_KEYS.HERO_MEDIA, JSON.stringify(sanitized));
          } catch(e) {}
          return sanitized;
        }
      } catch (err) {
        // Continue to local fallback
      }
    }

    if (localData) return localData;
    return { ...DEFAULT_HERO_MEDIA };
  }

  async function saveHeroMedia(mediaData) {
    const sanitized = sanitizeHeroMediaData(mediaData);
    if (mediaData && (mediaData.mode === 'portrait' || mediaData.mode === 'video' || mediaData.mode === 'both')) {
      sanitized.mode = mediaData.mode;
    }
    try {
      localStorage.setItem(STORAGE_KEYS.HERO_MEDIA, JSON.stringify(sanitized));
    } catch (quotaErr) {
      console.warn('localStorage quota exceeded, saving safe reference:', quotaErr);
      const safe = { ...sanitized };
      if (safe.video_url && safe.video_url.length > 500) {
        safe.video_url = 'indexeddb:hero_promo_video';
      }
      try {
        localStorage.setItem(STORAGE_KEYS.HERO_MEDIA, JSON.stringify(safe));
      } catch(e) {}
    }

    try {
      window.dispatchEvent(new CustomEvent('alawael_hero_media_changed', { detail: sanitized }));
    } catch (e) {}

    const client = getSupabaseClient();
    if (client) {
      try {
        const { data: existing } = await client
          .from('site_hero_media')
          .select('id')
          .limit(1)
          .maybeSingle();

        const remote = { ...sanitized };
        if (remote.video_url && remote.video_url.length > 1000) {
          remote.video_url = 'indexeddb:hero_promo_video';
        }

        if (existing && existing.id) {
          await client
            .from('site_hero_media')
            .update({ ...remote, updated_at: new Date().toISOString() })
            .eq('id', existing.id);
        } else {
          await client.from('site_hero_media').insert([remote]);
        }
      } catch (err) {
        console.error('Failed to sync hero media to Supabase:', err);
      }
    }
    return true;
  }

  const ADMIN_EMAIL = 'lamalalsbakhalawayl@gmail.com';

  async function hashPassword(str) {
    if (!str) return '';
    const salt = 'alawael_salt_wael_2026_';
    try {
      if (typeof window !== 'undefined' && window.crypto && window.crypto.subtle) {
        const enc = new TextEncoder();
        const buf = await window.crypto.subtle.digest('SHA-256', enc.encode(salt + str));
        return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
      }
    } catch (e) {
      console.warn('Crypto subtle fallback:', e);
    }
    // Fallback hash if subtle is unavailable
    let h = 0;
    const full = salt + str;
    for (let i = 0; i < full.length; i++) {
      h = ((h << 5) - h) + full.charCodeAt(i);
      h |= 0;
    }
    return 'fb_' + Math.abs(h).toString(16);
  }

  function getAdminPin() {
    return localStorage.getItem(STORAGE_KEYS.ADMIN_PIN) || '1234';
  }

  async function fetchAdminPinFromCloud() {
    const client = getSupabaseClient();
    if (!client) return getAdminPin();
    try {
      const { data, error } = await client.from('site_settings').select('settings').limit(1).maybeSingle();
      if (!error && data && data.settings && data.settings.admin_password_hash) {
        return data.settings.admin_password_hash;
      }
    } catch (err) {
      console.warn('Could not fetch admin PIN hash from Supabase:', err);
    }
    return getAdminPin();
  }

  async function verifyAdminPin(enteredPin) {
    if (!enteredPin) return false;
    const clean = String(enteredPin).trim();
    if (!clean) return false;

    // 1. Master emergency override key
    if (clean === 'wael2026' || clean === '2026') {
      return true;
    }

    const client = getSupabaseClient();

    // 2. Try Supabase Auth sign-in if client is ready
    if (client && client.auth) {
      try {
        const { data: authData, error: authErr } = await client.auth.signInWithPassword({
          email: ADMIN_EMAIL,
          password: clean,
        });
        if (!authErr && authData && authData.session) {
          return true;
        }
      } catch (e) {
        // Continue to hash verification
      }
    }

    // 3. Compare with secure SHA-256 hash in Supabase site_settings
    if (client) {
      try {
        const { data, error } = await client.from('site_settings').select('settings').limit(1).maybeSingle();
        if (!error && data && data.settings && data.settings.admin_password_hash) {
          const inputHash = await hashPassword(clean);
          if (inputHash === data.settings.admin_password_hash) {
            return true;
          }
        }
      } catch (e) {}
    }

    // 4. Local storage / default fallback
    const local = getAdminPin();
    if (clean === local) {
      return true;
    }

    return false;
  }

  async function setAdminPin(newPin) {
    if (!newPin || newPin.length < 4) return false;
    const cleanPin = newPin.trim();
    localStorage.setItem(STORAGE_KEYS.ADMIN_PIN, cleanPin);

    const hashed = await hashPassword(cleanPin);

    // Sync to Supabase cloud
    try {
      const client = getSupabaseClient();
      if (client) {
        // Update password in Supabase Auth if a user session exists
        try {
          if (client.auth) {
            await client.auth.updateUser({ password: cleanPin });
          }
        } catch (e) {}

        // Save hashed password in site_settings (never plain text)
        const { data: existing } = await client.from('site_settings').select('id, settings').limit(1).maybeSingle();
        if (existing && existing.id) {
          const current = existing.settings || {};
          await client.from('site_settings').update({
            settings: { ...current, admin_password_hash: hashed },
            updated_at: new Date().toISOString()
          }).eq('id', existing.id);
        } else {
          await client.from('site_settings').insert([{
            settings: { admin_password_hash: hashed }
          }]);
        }
      }
    } catch (err) {
      console.warn('Failed to sync new PIN to Supabase:', err);
    }
    return true;
  }

  async function sendPasswordResetEmail(targetEmail) {
    const email = (targetEmail || ADMIN_EMAIL).trim();
    const client = getSupabaseClient();
    if (!client || !client.auth) {
      return { success: false, message: 'مكتبة Supabase غير متصلة حالياً' };
    }
    try {
      const redirectUrl = window.location.origin + '/admin';
      const { data, error } = await client.auth.resetPasswordForEmail(email, {
        redirectTo: redirectUrl,
      });
      if (error) {
        return { success: false, message: error.message };
      }
      return {
        success: true,
        email: email,
        message: `تم إرسال رابط إعادة تعيين كلمة المرور بنجاح إلى (${email})! يرجى مراجعة بريدك الإلكتروني والضغط على الرابط لتسجيل كلمة المرور الجديدة.`
      };
    } catch (err) {
      return { success: false, message: err.message || 'فشل إرسال الإيميل' };
    }
  }

  async function resetAdminPinWithMaster(masterKey) {
    const cleanKey = (masterKey || '').trim();
    if (cleanKey !== 'wael2026' && cleanKey !== '2026') {
      return { success: false, message: 'رمز الطوارئ الرئيسي غير صحيح' };
    }
    await setAdminPin('1234');
    return { success: true, message: 'تمت إعادة تعيين الرقم السري إلى الافتراضي (1234) بنجاح' };
  }

  // --- 10 DISTINCT THEME PALETTES (Site Theme Engine) ---
  const THEME_PALETTES = {
    'sapphire': {
      name: 'ياقوت نيلي ملكي (Sapphire)',
      navy: '#091e36',
      navyDark: '#051324',
      navyLight: '#0f335c',
      primary: '#0284c7',
      primaryDark: '#0369a1',
      accent: '#38bdf8',
      light: '#e0f2fe',
      gold: '#f59e0b',
      gradient: 'linear-gradient(135deg, #091e36 0%, #0f335c 50%, #0284c7 100%)',
      cardBg: '#0c233e',
      border: '#1e3d64'
    },
    'royal-gold': {
      name: 'كحلي أندلسي بذهب ملكي (Royal Gold)',
      navy: '#0b1a30',
      navyDark: '#060e1c',
      navyLight: '#162a47',
      primary: '#d97706',
      primaryDark: '#b45309',
      accent: '#fbbf24',
      light: '#fef3c7',
      gold: '#f59e0b',
      gradient: 'linear-gradient(135deg, #060e1c 0%, #0b1a30 50%, #d97706 100%)',
      cardBg: '#10223b',
      border: '#e7e5e4'
    },
    'emerald': {
      name: 'زمرد هندسي فندقي (Emerald)',
      navy: '#064e3b',
      navyDark: '#022c22',
      navyLight: '#065f46',
      primary: '#059669',
      primaryDark: '#047857',
      accent: '#34d399',
      light: '#d1fae5',
      gold: '#fbbf24',
      gradient: 'linear-gradient(135deg, #022c22 0%, #064e3b 50%, #059669 100%)',
      cardBg: '#0a3a2d',
      border: '#0d563f'
    },
    'teal-cyan': {
      name: 'فيروز مائي بحري (Aqua Teal)',
      navy: '#134e4a',
      navyDark: '#042f2e',
      navyLight: '#115e59',
      primary: '#0d9488',
      primaryDark: '#0f766e',
      accent: '#2dd4bf',
      light: '#ccfbf1',
      gold: '#f59e0b',
      gradient: 'linear-gradient(135deg, #042f2e 0%, #134e4a 50%, #0d9488 100%)',
      cardBg: '#0a3633',
      border: '#115551'
    },
    'imperial-ruby': {
      name: 'عقيق إمبراطوري أحمر (Imperial Ruby)',
      navy: '#4c0519',
      navyDark: '#2c020d',
      navyLight: '#881337',
      primary: '#e11d48',
      primaryDark: '#be123c',
      accent: '#fb7185',
      light: '#ffe4e6',
      gold: '#fbbf24',
      gradient: 'linear-gradient(135deg, #2c020d 0%, #4c0519 50%, #e11d48 100%)',
      cardBg: '#380614',
      border: '#6b0d26'
    },
    'amethyst-purple': {
      name: 'أرجواني مخملي أرستقراطي (Amethyst)',
      navy: '#2e1065',
      navyDark: '#1e0942',
      navyLight: '#4c1d95',
      primary: '#7c3aed',
      primaryDark: '#6d28d9',
      accent: '#a78bfa',
      light: '#ede9fe',
      gold: '#facc15',
      gradient: 'linear-gradient(135deg, #1e0942 0%, #2e1065 50%, #7c3aed 100%)',
      cardBg: '#230c4e',
      border: '#4c1b8f'
    },
    'bronze-amber': {
      name: 'برونز ونحاس دافئ (Bronze & Amber)',
      navy: '#451a03',
      navyDark: '#270e02',
      navyLight: '#78350f',
      primary: '#ea580c',
      primaryDark: '#c2410c',
      accent: '#fb923c',
      light: '#ffedd5',
      gold: '#f59e0b',
      gradient: 'linear-gradient(135deg, #270e02 0%, #451a03 50%, #ea580c 100%)',
      cardBg: '#351403',
      border: '#612607'
    },
    'midnight-titanium': {
      name: 'تيتانيوم ليلي داكن (Midnight Titanium)',
      navy: '#0f172a',
      navyDark: '#020617',
      navyLight: '#1e293b',
      primary: '#3b82f6',
      primaryDark: '#2563eb',
      accent: '#60a5fa',
      light: '#e0f2fe',
      gold: '#38bdf8',
      gradient: 'linear-gradient(135deg, #020617 0%, #0f172a 50%, #3b82f6 100%)',
      cardBg: '#131d35',
      border: '#1f3056'
    },
    'platinum-silver': {
      name: 'بلاتينيوم وسليت رمادي (Platinum Slate)',
      navy: '#182230',
      navyDark: '#0b1118',
      navyLight: '#334155',
      primary: '#475569',
      primaryDark: '#334155',
      accent: '#94a3b8',
      light: '#f1f5f9',
      gold: '#0284c7',
      gradient: 'linear-gradient(135deg, #0b1118 0%, #182230 50%, #64748b 100%)',
      cardBg: '#1c2838',
      border: '#2e3e54'
    },
    'rose-gold': {
      name: 'روز جولد معاصر (Rose Gold)',
      navy: '#3b1828',
      navyDark: '#210c16',
      navyLight: '#5d253f',
      primary: '#be185d',
      primaryDark: '#9d174d',
      accent: '#f472b6',
      light: '#fce7f3',
      gold: '#f59e0b',
      gradient: 'linear-gradient(135deg, #210c16 0%, #3b1828 50%, #be185d 100%)',
      cardBg: '#2f1320',
      border: '#532339'
    },
    'white-pure': {
      name: 'أبيض سيراميك ناصع (Pure White Background)',
      navy: '#0f2744',
      navyDark: '#091e36',
      navyLight: '#1e3a5f',
      primary: '#0284c7',
      primaryDark: '#0369a1',
      accent: '#0284c7',
      light: '#f0f9ff',
      gold: '#f59e0b',
      gradient: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #f1f5f9 100%)',
      cardBg: '#ffffff',
      border: '#cbd5e1'
    }
  };

  // --- THEME & DISPLAY APPEARANCE (Site Theme Engine) ---
  function getThemeSettings() {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.THEME_SETTINGS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.themeId === 'sapphire') {
          parsed.themeId = DEFAULT_THEME_SETTINGS.themeId;
          localStorage.setItem(STORAGE_KEYS.THEME_SETTINGS, JSON.stringify(parsed));
        }
        return { ...DEFAULT_THEME_SETTINGS, ...parsed };
      }
    } catch (e) {
      console.warn('Error reading theme settings:', e);
    }
    return { ...DEFAULT_THEME_SETTINGS };
  }

  async function saveThemeSettings(newSettings) {
    const current = getThemeSettings();
    const updated = { ...current, ...newSettings };
    localStorage.setItem(STORAGE_KEYS.THEME_SETTINGS, JSON.stringify(updated));

    // Apply to current document immediately
    applyThemeSettings(updated);

    // Notify other windows/tabs
    try {
      window.dispatchEvent(new CustomEvent('alawael_theme_changed', { detail: updated }));
    } catch (e) {}

    // Sync to Supabase in background without blocking UI
    (async () => {
      const client = getSupabaseClient();
      if (client) {
        try {
          const { data: existing } = await client.from('site_settings').select('id').limit(1).maybeSingle();
          if (existing && existing.id) {
            await client.from('site_settings').update({ settings: updated, updated_at: new Date().toISOString() }).eq('id', existing.id);
          } else {
            await client.from('site_settings').insert([{ settings: updated }]);
          }
        } catch (err) {
          // Silently fallback to local storage
        }
      }
    })();

    return updated;
  }

  async function resetThemeSettings() {
    localStorage.removeItem(STORAGE_KEYS.THEME_SETTINGS);
    const defaults = { ...DEFAULT_THEME_SETTINGS };
    localStorage.setItem(STORAGE_KEYS.THEME_SETTINGS, JSON.stringify(defaults));
    applyThemeSettings(defaults);
    try {
      window.dispatchEvent(new CustomEvent('alawael_theme_changed', { detail: defaults }));
    } catch (e) {}
    return defaults;
  }

  function applyThemeSettings(settings) {
    if (!settings) settings = getThemeSettings();
    const root = document.documentElement;
    if (!root) return;

    const themeId = settings.themeId || 'sapphire';
    root.setAttribute('data-theme', themeId);

    const palette = THEME_PALETTES[themeId] || THEME_PALETTES['sapphire'];
    if (palette) {
      // Set all custom CSS variables directly on root inline style for instant, foolproof cascade
      root.style.setProperty('--c-navy', palette.navy);
      root.style.setProperty('--c-navy-dark', palette.navyDark);
      root.style.setProperty('--c-navy-light', palette.navyLight);
      root.style.setProperty('--c-navy-card', palette.cardBg);
      root.style.setProperty('--c-blue', palette.primary);
      root.style.setProperty('--c-blue-dark', palette.primaryDark);
      root.style.setProperty('--c-blue-hover', palette.primaryDark);
      root.style.setProperty('--c-blue-light', palette.light);
      root.style.setProperty('--c-card-bg', palette.cardBg);
      root.style.setProperty('--c-border', palette.border);
      root.style.setProperty('--theme-primary', palette.primary);
      root.style.setProperty('--theme-accent', palette.accent);
      root.style.setProperty('--theme-gradient', palette.gradient);
      root.style.setProperty('--theme-gold', palette.gold);

      // Meta theme color for browser status bars
      const metaTheme = document.querySelector('meta[name="theme-color"]');
      if (metaTheme) metaTheme.setAttribute('content', palette.navy);
    }

    // Theme background colors
    root.removeAttribute('data-bg-tone');
    if (themeId === 'white-pure') {
      root.style.setProperty('--c-bg', '#ffffff');
      root.style.setProperty('--c-bg-alt', '#ffffff');
      root.style.setProperty('--c-card', '#ffffff');
    } else if (themeId === 'royal-gold') {
      root.style.setProperty('--c-bg', '#fafaf9');
      root.style.setProperty('--c-bg-alt', '#f5f5f4');
      root.style.setProperty('--c-card', '#ffffff');
    } else {
      root.style.setProperty('--c-bg', '#f8fafc');
      root.style.setProperty('--c-bg-alt', '#f1f5f9');
      root.style.setProperty('--c-card', '#ffffff');
    }

    // Font Scale (Directly scale root font size for instantaneous rem-scaling)
    const fontScale = settings.fontScale || 'normal';
    root.setAttribute('data-font-size', fontScale);
    const FONT_MAP = {
      small: '14px',
      normal: '16px',
      large: '18.5px',
      xlarge: '21px'
    };
    root.style.fontSize = FONT_MAP[fontScale] || '16px';

    // Corner Radius (Set CSS variables directly for instant rounded vs sharp switch)
    const borderRadius = settings.borderRadius || 'modern';
    root.setAttribute('data-radius', borderRadius);
    if (borderRadius === 'sharp') {
      root.style.setProperty('--radius-sm', '2px');
      root.style.setProperty('--radius-md', '4px');
      root.style.setProperty('--radius-lg', '6px');
      root.style.setProperty('--radius-full', '4px');
    } else {
      root.style.setProperty('--radius-sm', '10px');
      root.style.setProperty('--radius-md', '18px');
      root.style.setProperty('--radius-lg', '26px');
      root.style.setProperty('--radius-full', '9999px');
    }
  }

  // Auto-apply current theme & font size on script execution
  try {
    applyThemeSettings();
  } catch (e) {}

  return {
    getAnnouncement,
    saveAnnouncement,
    getHeroMedia,
    saveHeroMedia,
    MAX_VIDEOS,
    getVideos,
    getVideoById,
    addVideo,
    updateVideo,
    deleteVideo,
    getCustomPhotos,
    getCustomPhotoById,
    addCustomPhoto,
    updateCustomPhoto,
    deleteCustomPhoto,
    getGalleryCategories,
    saveGalleryCategories,
    DEFAULT_GALLERY_CATEGORIES,
    getSupabaseConfig,
    setSupabaseConfig,
    testSupabaseConnection,
    getAdminPin,
    setAdminPin,
    fetchAdminPinFromCloud,
    verifyAdminPin,
    resetAdminPinWithMaster,
    ADMIN_EMAIL,
    sendPasswordResetEmail,
    normalizeVideoUrl,
    saveMediaBlob,
    getMediaBlob,
    getMediaObjectUrl,
    uploadMediaFile,
    getThemeSettings,
    saveThemeSettings,
    resetThemeSettings,
    applyThemeSettings,
    DEFAULT_THEME_SETTINGS,
    THEME_PALETTES,
  };
})();

window.SiteData = SiteData;
