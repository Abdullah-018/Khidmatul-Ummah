const KU_STORAGE_KEY = "khidmatulUmmahCMS_v3_bangla_admin";
let KU_MEMORY_DATA = null;

const KU_DEFAULT_DATA = {
  texts: {
    organizationName: "খিদমাতুল উম্মাহ",
    slogan: "এসো ইনসাফের সমাজ গড়ি",
    heroEyebrow: "অরাজনৈতিক • অলাভজনক • ইসলামি দাতব্য ফাউন্ডেশন",
    heroTitle: "ইনসাফভিত্তিক সমাজ গড়ার প্রত্যয়ে খিদমাতুল উম্মাহ",
    heroCopy: "একটি ইনসাফভিত্তিক, দয়াশীল ও ঈমানভিত্তিক সমাজ গঠনের লক্ষ্যে আমরা কাজ করি শূরা, জবাবদিহিতা এবং প্রকল্পভিত্তিক দায়িত্বশীলতার মাধ্যমে।",
    aboutTitle: "শুধু অর্থ বিতরণ নয়, দায়িত্বশীল সমাজ গঠন",
    donateTitle: "আপনার সহায়তা একটি পরিবার, একটি মসজিদ, একটি গ্রামকে বদলে দিতে পারে",
    donateText: "এটি প্রাথমিক দান ফর্ম। পরবর্তী ধাপে অনলাইন দান পাঠানো, রসিদ তৈরি এবং পরিচালনা পরিষদের অনুমোদন ব্যবস্থা যুক্ত করা যাবে।",
    libraryTitle: "আমাদের বইয়ের কালেকশন",
    libraryIntro: "খিদমাতুল উম্মাহ-এর লাইব্রেরিতে বর্তমানে কী কী বই আছে—এখান থেকে দেখা যাবে। বইয়ের তালিকা এডমিন প্যানেল থেকে আপডেট হবে।",
    shuraTitle: "রানিং শূরা সদস্য",
    shuraIntro: "হোমপেজের “শূরা পরিচিতি” থেকে শূরা সদস্যদের নাম, পদবি ও ছবি দেখা যাবে। এই তথ্য এডমিন প্যানেল থেকে আপডেট করা যাবে।",
    footerText: "© ২০২৬ খিদমাতুল উম্মাহ। এটি ওয়েবসাইটের প্রাথমিক কাঠামো।",
    heroDonateBtn: "সহায়তা করুন",
    heroProjectBtn: "প্রকল্প দেখুন",
    heroPanelSmall: "সেবার অগ্রগতি",
    heroPanelText: "খাদ্য, চিকিৎসা, শিক্ষা ও সমাজ উন্নয়ন প্রকল্পের মাধ্যমে ইতোমধ্যে সহায়তা পৌঁছে দেওয়া হয়েছে।",
    navAdmin: "এডমিন প্যানেল",
    navDonate: "এখনই দান করুন",
    foundationEyebrow: "ফাউন্ডেশন পরিচিতি",
    foundationTitle: "পরিচয়, লক্ষ্য, মূলনীতি ও নীতিমালা",
    foundationIntro: "খিদমাতুল উম্মাহ-এর কাজ শুধু দান-সদকা নয়; কুরআন ও সুন্নাহর আলোকে ইনসাফভিত্তিক, সচেতন ও দায়িত্বশীল সমাজ গড়ে তোলাই আমাদের মূল ফিকির।",
    activityEyebrow: "উল্লেখযোগ্য কার্যক্রম",
    activityTitle: "এখন পর্যন্ত জনকল্যাণমূলক কাজ",
    activityIntro: "সম্পন্ন প্রকল্পগুলোর মোট ব্যয়ের ভিত্তিতে জনকল্যাণমূলক কাজের হিসাব স্বয়ংক্রিয়ভাবে আপডেট হয়।",
    reportEyebrow: "জবাবদিহিতা",
    reportTitle: "স্বচ্ছতা ও প্রতিবেদন",
    volunteerEyebrow: "স্বেচ্ছাসেবক উন্নয়ন",
    volunteerTitle: "সেবামূলক কাজে যুক্ত হোন",
    volunteerIntro: "স্বেচ্ছাসেবক নিবন্ধন, প্রশিক্ষণ, অভিভাবক সম্পৃক্ততা, গ্রাম উন্নয়ন এবং প্রকল্পভিত্তিক দল ব্যবস্থাপনা পরবর্তী ধাপে বিস্তারিত করা হবে।",
    adminLoginTitle: "এডমিন লগইন",
    adminDemoLogin: "",
    adminUsername: "ইউজারনেম",
    adminPassword: "পাসওয়ার্ড",
    adminLoginButton: "লগইন করুন",
    adminPanelSmall: "এডমিন প্যানেল",
    adminNavDashboard: "ড্যাশবোর্ড",
    adminNavProjects: "প্রকল্প",
    adminNavDonations: "দান ও রসিদ",
    adminNavDonors: "ডোনার তথ্য",
    adminNavAccounts: "দানের একাউন্ট",
    adminNavLibrary: "লাইব্রেরি",
    adminNavShura: "শূরা সদস্য",
    adminNavTexts: "টেক্সট ইডিটর",
    adminNavBackup: "ব্যাকআপ / ইমপোর্ট",
    adminTopEyebrow: "এডমিন ড্যাশবোর্ড",
    adminTopTitle: "খিদমাতুল উম্মাহ কন্ট্রোল প্যানেল",
    adminTopIntro: "এই ডেমো ভার্সনে তথ্য ব্রাউজারের লোকাল স্টোরেজে সংরক্ষিত হয়। লাইভ ওয়েবসাইটের জন্য নিরাপদ সার্ভার, ডাটাবেজ ও লগইন ব্যবস্থা লাগবে।",
    adminViewWebsite: "ওয়েবসাইট দেখুন",
    adminLogout: "লগআউট",
    adminQuickNotesTitle: "দ্রুত নোট",
    adminQuickNotesText: "হোমপেজের মোট ব্যয় সম্পন্ন প্রকল্পের ব্যয় থেকে স্বয়ংক্রিয়ভাবে আপডেট হয়। পরবর্তী প্রকল্প প্রকাশ করলে হোমপেজে হাইলাইটেড ব্যানার হিসেবে দেখা যাবে।",
    adminProjectsTitle: "প্রকল্প পাবলিশ সিস্টেম",
    adminProjectsIntro: "কমপ্লিট প্রকল্প এবং পরবর্তী প্রকল্প আলাদা type হিসেবে publish করুন।",
    adminDonationsTitle: "দান ও রসিদ ব্যবস্থাপনা",
    adminDonationsIntro: "ওয়েবসাইটের দান ফর্ম জমা দিলে দাতার তথ্য এখানে সংরক্ষিত হবে এবং ডোনার টেবিলেও স্বয়ংক্রিয়ভাবে যোগ হবে।",
    adminDonorsTitle: "ডোনার তথ্য এন্ট্রি ও তালিকা",
    adminDonorsIntro: "এখানে হাতে ডোনার যোগ করা যাবে। ওয়েবসাইট থেকে দান জমা দেওয়া ডোনাররাও স্বয়ংক্রিয়ভাবে এখানে যুক্ত হবে।",
    adminAccountsTitle: "দানের একাউন্ট সেটিংস",
    adminLibraryTitle: "লাইব্রেরি / বই ব্যবস্থাপনা",
    adminShuraTitle: "শূরা সদস্য যোগ / ব্যবস্থাপনা",
    adminTextsTitle: "টেক্সট ইডিটর",
    adminTextsIntro: "এখান থেকে হোমপেজ এবং এডমিন প্যানেলের গুরুত্বপূর্ণ লেখা পরিবর্তন করা যাবে।",
    adminBackupTitle: "ব্যাকআপ / ইমপোর্ট",
    adminBackupIntro: "JSON ব্যাকআপ ডাউনলোড করে পরবর্তীতে সার্ভার ডাটাবেজে স্থানান্তর করা যাবে।"
  },
  projects: [
    {
      id: makeId(), type: "completed", title: "রমজান ফুড প্যাক", short: "অসহায় পরিবারের মাঝে রমজানের খাদ্যসামগ্রী পৌঁছে দেওয়া হয়েছে।",
      details: "রমজান মাসে দরিদ্র পরিবারের জন্য প্রয়োজনীয় খাদ্যসামগ্রী বিতরণ করা হয়েছে।",
      date: "2026-03-20", location: "চালা গ্রাম", expense: 125000, target: 0, status: "published", featuredImage: "", videoUrl: "", jimmadar: "রমজান প্রকল্প জিম্মাদার"
    },
    {
      id: makeId(), type: "completed", title: "ইফতার বিতরণ", short: "রমজানে ইফতার বিতরণের মাধ্যমে অসহায় মানুষের পাশে দাঁড়ানো হয়েছে।",
      details: "স্থানীয় এলাকায় ইফতার বিতরণ করা হয়েছে এবং দাতাদের আমানত যথাযথভাবে পৌঁছে দেওয়া হয়েছে।",
      date: "2026-03-14", location: "স্থানীয় এলাকা", expense: 50000, target: 0, status: "published", featuredImage: "", videoUrl: "", jimmadar: "ইফতার টিম"
    },
    {
      id: makeId(), type: "completed", title: "ইসলামি লাইব্রেরি সাপোর্ট", short: "ইসলামি লাইব্রেরির জন্য বই ও প্রয়োজনীয় সামগ্রী প্রদান।",
      details: "লাইব্রেরি সহায়তার মাধ্যমে দ্বীনি শিক্ষার পরিবেশ শক্তিশালী করার উদ্যোগ নেওয়া হয়েছে।",
      date: "2026-02-25", location: "স্থানীয় লাইব্রেরি", expense: 35000, target: 0, status: "published", featuredImage: "", videoUrl: "", jimmadar: "শিক্ষা ও লাইব্রেরি বিভাগ"
    },
    {
      id: makeId(), type: "completed", title: "মক্তব ছাত্রছাত্রী পুরস্কার", short: "মক্তবের ছাত্রছাত্রীদের নিয়মিত পুরস্কার প্রদান করা হয়েছে।",
      details: "শিক্ষার্থীদের উৎসাহ বাড়াতে প্রতি নির্দিষ্ট সময় পর পুরস্কার প্রদান ও অভিভাবক সম্পৃক্ততার উদ্যোগ নেওয়া হয়েছে।",
      date: "2026-02-12", location: "মক্তব", expense: 45000, target: 0, status: "published", featuredImage: "", videoUrl: "", jimmadar: "মক্তব উন্নয়ন টিম"
    },
    {
      id: makeId(), type: "completed", title: "দুর্যোগে ত্রাণ বিতরণ", short: "দুর্যোগকালীন সময়ে জরুরি ত্রাণ সহায়তা পৌঁছে দেওয়া হয়েছে।",
      details: "জরুরি পরিস্থিতিতে খাদ্য, প্রয়োজনীয় সামগ্রী ও মানবিক সহায়তা দেওয়া হয়েছে।",
      date: "2026-01-30", location: "দুর্যোগপ্রবণ এলাকা", expense: 100000, target: 0, status: "published", featuredImage: "", videoUrl: "", jimmadar: "ত্রাণ কার্যক্রম জিম্মাদার"
    },
    {
      id: makeId(), type: "completed", title: "ঈদগাহ মাঠের পাটি প্রদান", short: "গ্রামের ঈদগাহ মাঠের জন্য পাটি প্রদান করা হয়েছে।",
      details: "ঈদের নামাজে মুসল্লিদের সুবিধার জন্য ঈদগাহ মাঠে প্রয়োজনীয় পাটি সহায়তা দেওয়া হয়েছে।",
      date: "2025-12-18", location: "গ্রামের ঈদগাহ মাঠ", expense: 30000, target: 0, status: "published", featuredImage: "", videoUrl: "", jimmadar: "সমাজ উন্নয়ন টিম"
    },
    {
      id: makeId(), type: "completed", title: "মসজিদ পুনর্নির্মাণ সহায়তা", short: "মসজিদ পুনর্নির্মাণে ছাদ ঢালাইয়ের সিমেন্ট প্রদান।",
      details: "মসজিদের পুনর্নির্মাণ কাজে প্রয়োজনীয় সিমেন্ট সহায়তা দেওয়া হয়েছে।",
      date: "2025-12-05", location: "স্থানীয় মসজিদ", expense: 80000, target: 0, status: "published", featuredImage: "", videoUrl: "", jimmadar: "মসজিদ-মাদ্রাসা উন্নয়ন বিভাগ"
    },
    {
      id: makeId(), type: "completed", title: "কবরস্থান লাইটিং", short: "রাতে কবর খননের জন্য লাইটের ব্যবস্থা করা হয়েছে।",
      details: "কবরস্থানে প্রয়োজনীয় আলোকায়নের মাধ্যমে জরুরি সময়ে মানুষের সুবিধা নিশ্চিত করা হয়েছে।",
      date: "2025-11-20", location: "স্থানীয় কবরস্থান", expense: 25000, target: 0, status: "published", featuredImage: "", videoUrl: "", jimmadar: "আলোকায়ন টিম"
    },
    {
      id: makeId(), type: "completed", title: "বৃক্ষরোপণ কর্মসূচি", short: "পরিবেশ ও সমাজ উন্নয়নে বৃক্ষরোপণ উদ্যোগ নেওয়া হয়েছে।",
      details: "গ্রামের শিক্ষার্থী ও যুবকদের সম্পৃক্ত করে বৃক্ষরোপণ কার্যক্রম পরিচালনা করা হয়েছে।",
      date: "2025-10-10", location: "চালা গ্রাম", expense: 15000, target: 0, status: "published", featuredImage: "", videoUrl: "", jimmadar: "বৃক্ষ উপহার টিম"
    },
    {
      id: makeId(), type: "completed", title: "ইসলাহী মাহফিল", short: "তিনটি ইসলাহী মাহফিল আয়োজন করা হয়েছে।",
      details: "দ্বীনি চেতনা ও সামাজিক সচেতনতা বৃদ্ধির জন্য ইসলাহী মাহফিল আয়োজন করা হয়েছে।",
      date: "2025-09-15", location: "চালা গ্রাম", expense: 40000, target: 0, status: "published", featuredImage: "", videoUrl: "", jimmadar: "মিডিয়া ও দাওয়াহ বিভাগ"
    },
    {
      id: makeId(), type: "completed", title: "জরুরি মেডিকেল ক্রাউডফান্ডিং", short: "চিকিৎসা সহায়তার জন্য ক্রাউড ফান্ডিং সম্পন্ন হয়েছে।",
      details: "জরুরি চিকিৎসার প্রয়োজনীয় অর্থ সংগ্রহে দাতাদের সহযোগিতায় সহায়তা পৌঁছে দেওয়া হয়েছে।",
      date: "2025-08-20", location: "স্থানীয় এলাকা", expense: 60000, target: 0, status: "published", featuredImage: "", videoUrl: "", jimmadar: "অর্থ ও হিসাব বিভাগ"
    },
    {
      id: makeId(), type: "upcoming", title: "স্ট্রিট লাইট প্রকল্প", short: "গ্রামের রাস্তায় নিরাপদ ও আলোকিত পরিবেশ তৈরি করার উদ্যোগ।",
      details: "পরবর্তী প্রকল্প হিসেবে গুরুত্বপূর্ণ রাস্তা ও অন্ধকার স্থানে স্ট্রিট লাইট স্থাপনের পরিকল্পনা নেওয়া হয়েছে। এটি বিজ্ঞাপনের মতো হোমপেজে হাইলাইটেড থাকবে।",
      date: "2026-07-15", location: "চালা গ্রাম", expense: 0, target: 120000, status: "published", featuredImage: "", videoUrl: "", jimmadar: "সমাজ উন্নয়ন জিম্মাদার"
    },
    {
      id: makeId(), type: "upcoming", title: "বৃক্ষ উপহার প্রকল্প", short: "প্রত্যেক শিক্ষার্থীকে একটি করে চারা দেওয়ার পরিকল্পনা।",
      details: "গাছটি জীবিত ও বড় হওয়ার প্রমাণ দেখাতে পারলে পরবর্তী বছর শিক্ষার্থীকে পুরস্কার দেওয়া হবে।",
      date: "2026-08-01", location: "মক্তব ও গ্রাম এলাকা", expense: 0, target: 45000, status: "draft", featuredImage: "", videoUrl: "", jimmadar: "শিক্ষা ও পরিবেশ টিম"
    }
  ],
  accounts: [
    { id: makeId(), type: "বিকাশ", number: "+৮৮০ ১৭৩৯৬০০৪৬৩", holder: "মাকছুদুল হাসান", instruction: "নিচের বিকাশ নম্বরে দান পাঠিয়ে রসিদ নম্বর সংরক্ষণ করুন।", active: true },
    { id: makeId(), type: "বিকাশ", number: "+৮৮০ ১৮৬৪৫৮৯৮৭৮", holder: "মুহাম্মাদ বেলাল", instruction: "পার্সোনাল বিকাশে দান পাঠানোর পর লেনদেন নম্বর সংরক্ষণ করুন।", active: true },
    { id: makeId(), type: "নগদ", number: "+৮৮০ ১৮৬৩৬৩৪৫৮১", holder: "কাজী রিয়াল", instruction: "নগদ পার্সোনাল নম্বরে দান পাঠিয়ে লেনদেন নম্বর সংরক্ষণ করুন।", active: true },
    { id: makeId(), type: "ব্যাংক জমা", number: "এডমিন প্যানেল থেকে আপডেট করুন", holder: "খিদমাতুল উম্মাহ", instruction: "ব্যাংক তথ্য এডমিন প্যানেল থেকে আপডেট করুন।", active: false }
  ],
  books: [
    { id: makeId(), name: "রিয়াদুস সালেহীন", author: "ইমাম নববী (রহ.)", category: "হাদিস", language: "বাংলা", quantity: 2, status: "উপলব্ধ", coverUrl: "", description: "আখলাক ও আমলের গুরুত্বপূর্ণ হাদিস সংকলন।" },
    { id: makeId(), name: "সীরাতে রাসূল ﷺ", author: "বিভিন্ন", category: "সীরাত", language: "বাংলা", quantity: 1, status: "উপলব্ধ", coverUrl: "", description: "রাসূলুল্লাহ ﷺ-এর জীবন নিয়ে বই।" },
    { id: makeId(), name: "আর রাহীকুল মাখতূম", author: "সফিউর রহমান মুবারকপুরী", category: "সীরাত", language: "বাংলা", quantity: 1, status: "উপলব্ধ", coverUrl: "", description: "নবীজীবনী বিষয়ক পরিচিত গ্রন্থ।" }
  ],
  shura: [
    { id: makeId(), name: "আমির সাহেব", position: "আমির / কেন্দ্রীয় জিম্মাদার", role: "আমির", phone: "", email: "", bio: "সংগঠনের সার্বিক তত্ত্বাবধান, সমন্বয় ও পরিচালনার দায়িত্ব পালন করবেন।", photoUrl: "", session: "২০২৬", active: true, order: 1 },
    { id: makeId(), name: "সচিব ১", position: "বিশেষ সদস্য / সচিব", role: "সচিব", phone: "", email: "", bio: "প্রশাসনিক ও প্রকল্প সমন্বয়ে দায়িত্বশীল।", photoUrl: "", session: "২০২৬", active: true, order: 2 },
    { id: makeId(), name: "সচিব ২", position: "বিশেষ সদস্য / সচিব", role: "সচিব", phone: "", email: "", bio: "হিসাব, প্রতিবেদন ও যোগাযোগে সহযোগিতা করবেন।", photoUrl: "", session: "২০২৬", active: true, order: 3 }
  ],
  donations: [],
  donors: [],
  reminders: [
    { type: "কুরআন", category: "দান", reference: "সূরা আল-বাকারা ২:২৬১", text: "আল্লাহর পথে ব্যয়ের দৃষ্টান্ত এমন এক শস্যদানা, যা সাতটি শীষ উৎপন্ন করে; প্রতিটি শীষে থাকে শত দানা। আল্লাহ যাকে চান বহুগুণ বাড়িয়ে দেন।" },
    { type: "কুরআন", category: "দান", reference: "সূরা আল-বাকারা ২:২৬৭", text: "তোমরা যা উপার্জন করেছ এবং যা আল্লাহ জমিন থেকে বের করেছেন, তার উত্তম অংশ থেকে ব্যয় করো।" },
    { type: "কুরআন", category: "সদকা", reference: "সূরা আল-বাকারা ২:২৭১", text: "প্রকাশ্যে সদকা করা ভালো; আর গোপনে দরিদ্রদের দিলে তা তোমাদের জন্য আরও উত্তম।" },
    { type: "কুরআন", category: "ইখলাস", reference: "সূরা আল-হাশর ৫৯:৯", text: "তারা নিজেদের প্রয়োজন থাকা সত্ত্বেও অন্যদের অগ্রাধিকার দেয়; যে নিজ কৃপণতা থেকে রক্ষা পেল, তারাই সফল।" },
    { type: "হাদিস", category: "সদকা", reference: "সহিহ মুসলিম ২৫৮৮", text: "সদকা সম্পদ কমায় না; আল্লাহ ক্ষমাশীল ব্যক্তির সম্মান বাড়িয়ে দেন এবং আল্লাহর জন্য বিনয়ী ব্যক্তিকে উন্নত করেন।" },
    { type: "হাদিস", category: "ইখলাস", reference: "সহিহ বুখারি ১", text: "সব আমল নিয়তের ওপর নির্ভরশীল; মানুষ তার নিয়ত অনুযায়ী প্রতিদান পাবে।" }
  ]
};

function makeId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return "id_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2);
}

function deepClone(obj) { return JSON.parse(JSON.stringify(obj)); }

function mergeKUData(defaultData, savedData) {
  const merged = {
    ...defaultData,
    ...savedData,
    texts: { ...defaultData.texts, ...(savedData.texts || {}) },
    projects: Array.isArray(savedData.projects) ? savedData.projects : defaultData.projects,
    accounts: Array.isArray(savedData.accounts) ? savedData.accounts : defaultData.accounts,
    books: Array.isArray(savedData.books) ? savedData.books : defaultData.books,
    shura: Array.isArray(savedData.shura) ? savedData.shura : defaultData.shura,
    donations: Array.isArray(savedData.donations) ? savedData.donations : defaultData.donations,
    donors: Array.isArray(savedData.donors) ? savedData.donors : defaultData.donors,
    reminders: Array.isArray(savedData.reminders) ? savedData.reminders : defaultData.reminders
  };
  migrateKUData(merged);
  return merged;
}

function migrateKUData(data) {
  if (!data.texts) data.texts = {};
  const currentDefaults = KU_DEFAULT_DATA.texts;
  [
    "adminTopIntro",
    "adminQuickNotesText",
    "adminDonationsIntro",
    "adminDonorsIntro",
    "adminNavLibrary",
    "adminLibraryTitle",
    "adminBackupIntro"
  ].forEach(key => {
    data.texts[key] = currentDefaults[key];
  });
  if (!Array.isArray(data.accounts)) data.accounts = [];
  if (!Array.isArray(data.reminders) || !data.reminders.length) data.reminders = deepClone(KU_DEFAULT_DATA.reminders);
  if (!Array.isArray(data.shura)) data.shura = [];
  const usedShuraOrders = new Set();
  data.shura.forEach((member, index) => {
    const rawOrder = Number(member.order);
    let order = Number.isFinite(rawOrder) ? Math.round(rawOrder) : index + 1;
    if (order < 1 || order > 21 || usedShuraOrders.has(order)) {
      order = index + 1;
      while (order <= 21 && usedShuraOrders.has(order)) order += 1;
    }
    member.order = Math.min(Math.max(order, 1), 21);
    usedShuraOrders.add(member.order);
  });
  const nagad = data.accounts.find(a => a.type === "নগদ");
  if (nagad) {
    nagad.number = "+৮৮০ ১৮৬৩৬৩৪৫৮১";
    nagad.holder = "কাজী রিয়াল";
    nagad.instruction = "নগদ পার্সোনাল নম্বরে দান পাঠিয়ে লেনদেন নম্বর সংরক্ষণ করুন।";
    nagad.active = true;
  } else {
    data.accounts.push({ id: makeId(), type: "নগদ", number: "+৮৮০ ১৮৬৩৬৩৪৫৮১", holder: "কাজী রিয়াল", instruction: "নগদ পার্সোনাল নম্বরে দান পাঠিয়ে লেনদেন নম্বর সংরক্ষণ করুন।", active: true });
  }
  data.accounts.forEach(account => {
    if (typeof account.gatewayUrl !== "string") account.gatewayUrl = "";
    if (typeof account.qrImage !== "string") account.qrImage = "";
    if (account.holder === "Khidmatul Ummah") account.holder = "খিদমাতুল উম্মাহ";
    if (account.instruction) account.instruction = account.instruction.replace("Transaction ID", "লেনদেন নম্বর");
  });
}

function loadKUData() {
  try {
    if (typeof localStorage === "undefined") {
      return KU_MEMORY_DATA ? mergeKUData(deepClone(KU_DEFAULT_DATA), KU_MEMORY_DATA) : deepClone(KU_DEFAULT_DATA);
    }
    const raw = localStorage.getItem(KU_STORAGE_KEY);
    if (!raw) {
      const seeded = deepClone(KU_DEFAULT_DATA);
      saveKUData(seeded);
      return seeded;
    }
    return mergeKUData(deepClone(KU_DEFAULT_DATA), JSON.parse(raw));
  } catch (error) {
    console.error("LocalStorage data load failed", error);
    return KU_MEMORY_DATA ? mergeKUData(deepClone(KU_DEFAULT_DATA), KU_MEMORY_DATA) : deepClone(KU_DEFAULT_DATA);
  }
}

function saveKUData(data) {
  KU_MEMORY_DATA = deepClone(data);
  try {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem(KU_STORAGE_KEY, JSON.stringify(data));
    }
  } catch (error) {
    console.warn("LocalStorage data save skipped", error);
  }
}
function resetKUData() { const seeded = deepClone(KU_DEFAULT_DATA); saveKUData(seeded); return seeded; }

function formatBDT(value) {
  return "৳" + new Intl.NumberFormat("bn-BD", { maximumFractionDigits: 0 }).format(Number(value || 0));
}
function formatNumberBN(value) { return new Intl.NumberFormat("bn-BD", { maximumFractionDigits: 0 }).format(Number(value || 0)); }
function formatDateBN(value) {
  if (!value) return "তারিখ নেই";
  const date = new Date(String(value).includes("T") ? value : value + "T00:00:00");
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("bn-BD", { day: "numeric", month: "long", year: "numeric" }).format(date);
}
function escapeHTML(str) {
  return String(str ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
function sortByDateDesc(items) { return [...items].sort((a,b) => String(b.date || "").localeCompare(String(a.date || ""))); }
function totalCompletedExpense(data) {
  return (data.projects || [])
    .filter(p => p.type === "completed" && p.status === "published")
    .reduce((sum, p) => sum + Number(p.expense || 0), 0);
}
async function fileToDataURL(file) {
  if (!file) return "";
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
function translateProjectType(type) { return type === "completed" ? "কমপ্লিট প্রকল্প" : "পরবর্তী প্রকল্প"; }
function translateStatus(status) {
  const map = { published: "প্রকাশিত", draft: "ড্রাফট", Pending: "অপেক্ষমাণ", Verified: "ভেরিফাইড", Approved: "অনুমোদিত", Cancelled: "বাতিল", Active: "সক্রিয়", Inactive: "নিষ্ক্রিয়", Available: "উপলব্ধ", "Not Available": "উপলব্ধ নয়", "উপলব্ধ": "উপলব্ধ", "উপলব্ধ নয়": "উপলব্ধ নয়" };
  return map[status] || status || "-";
}
function donorKeyFromDonation(donation) {
  return String(donation.mobile || donation.email || donation.donorName || "").trim().toLowerCase();
}
function upsertDonorFromDonation(data, donation) {
  if (!data.donors) data.donors = [];
  const key = donorKeyFromDonation(donation);
  if (!key) return;
  let donor = data.donors.find(d => String(d.mobile || d.email || d.name || "").trim().toLowerCase() === key);
  if (!donor) {
    donor = { id: makeId(), name: donation.donorName || "", mobile: donation.mobile || "", email: donation.email || "", address: donation.address || "", status: "Active", note: "ওয়েবসাইটের দান ফর্ম থেকে স্বয়ংক্রিয়ভাবে যুক্ত", source: "ওয়েবসাইট", totalAmount: 0, totalDonations: 0, lastDonationDate: "" };
    data.donors.push(donor);
  }
  donor.name = donor.name || donation.donorName || "";
  donor.mobile = donor.mobile || donation.mobile || "";
  donor.email = donor.email || donation.email || "";
  donor.address = donor.address || donation.address || "";
  const related = (data.donations || []).filter(d => donorKeyFromDonation(d) === key);
  donor.totalAmount = related.reduce((sum, d) => sum + Number(d.amount || 0), 0);
  donor.totalDonations = related.length;
  donor.lastDonationDate = related.map(d => d.date).filter(Boolean).sort().pop() || donation.date || "";
}
function syncDonorsFromDonations(data) {
  if (!data.donors) data.donors = [];
  (data.donations || []).forEach(donation => upsertDonorFromDonation(data, donation));
}

function downloadJSON(filename, data) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}










