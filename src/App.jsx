import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  Sparkles, Shield, Download, Globe, Layout, CheckCircle2,
  ChevronRight, ChevronLeft, Plus, Trash2, Eye, Palette, ArrowUp, ArrowDown,
  RotateCcw, ZoomIn, ZoomOut, Printer, FileDown, Menu, X, ChevronDown,
  Lock, Upload, AlertTriangle, Camera, ImageOff, Info, FileUp, FileJson, ClipboardPaste, ShieldCheck, Target, Award, SearchCheck, MessageCircle, Mail, Linkedin, ExternalLink, Brain, Cpu
} from 'lucide-react';

const TEMPLATES = [
  { id: 'classic', nameAr: 'الكلاسيكي الرسمي', nameEn: 'Professional Classic', descAr: 'ترويسة متوسطة رسمية وخطوط فاصلة تقليدية للشركات والجهات الحكومية.', descEn: 'Centered formal header with classic dividers for corporate roles.', layout: 'centered-classic', tag: 'Corporate' },
  { id: 'executive', nameAr: 'الإداري العصري', nameEn: 'Modern Executive', descAr: 'ترويسة داكنة فخمة مع عمود جانبي للمهارات واللغات والشهادات.', descEn: 'Executive dark banner with a structured sidebar for skills.', layout: 'dark-sidebar', tag: 'Executive' },
  { id: 'minimal', nameAr: 'البسيط الأنيق', nameEn: 'Minimal Clean', descAr: 'مساحات بيضاء مريحة وتوزيع متوازن بين الاسم وبيانات التواصل.', descEn: 'Generous whitespace with an asymmetric split header.', layout: 'asymmetric-minimal', tag: 'Minimal' },
  { id: 'creative', nameAr: 'الإبداعي للمصممين', nameEn: 'Creative Portfolio', descAr: 'عمود جانبي ملون بالكامل يضم الصورة والاسم والمهارات بجرأة.', descEn: 'Full-height colored sidebar featuring photo, name, and skills.', layout: 'full-color-sidebar', tag: 'Creative' },
  { id: 'ats', nameAr: 'متوافق مع ATS', nameEn: 'ATS Friendly', descAr: 'عمود واحد نظيف أحادي اللون مصمم لاجتياز أنظمة الفرز الآلي.', descEn: 'Clean monochrome single-column built for ATS scanners.', layout: 'ats-single', tag: 'ATS' },
  { id: 'technical', nameAr: 'مطور البرمجيات', nameEn: 'Technical Developer', descAr: 'تصميم تقني بلمسة برمجية يبرز المشاريع والمهارات التقنية.', descEn: 'Tech-inspired header highlighting projects and stack.', layout: 'tech-grid', tag: 'Tech' },
  { id: 'academic', nameAr: 'الأكاديمي والبحثي', nameEn: 'Academic CV', descAr: 'يُقدّم التعليم والشهادات الأكاديمية في الصدارة بأسلوب رسمي.', descEn: 'Prioritizes education, degrees, and certifications at the top.', layout: 'academic-top', tag: 'Academic' },
  { id: 'medical', nameAr: 'الكوادر الطبية', nameEn: 'Medical Professional', descAr: 'شريط طبي هادئ وإبراز للتخصص وسنوات الخبرة للكوادر الصحية.', descEn: 'Calm clinical styling highlighting specialty and experience.', layout: 'medical-split', tag: 'Medical' },
  { id: 'graduate', nameAr: 'الخريجين الجدد', nameEn: 'Fresh Graduate', descAr: 'يبرز التعليم والمشاريع والمهارات والتطوع قبل الخبرة العملية.', descEn: 'Highlights education, projects, and skills first for new grads.', layout: 'graduate-focus', tag: 'Graduate' },
  { id: 'international', nameAr: 'الاحترافي الدولي', nameEn: 'International Professional', descAr: 'ترويسة بطاقية حديثة وشبكة سفلية منظمة للتقديم الدولي.', descEn: 'Global standard card header with balanced two-column footer grid.', layout: 'global-card', tag: 'Global' },
];



// بيانات التواصل الخاصة بالمطور
const DEVELOPER_INFO = {
  name: 'AYASH MAHMOUD ALSHAMERI',
  nameAr: 'م. عياش محمود الشميري',
  title: 'Software & AI Developer',
  tagline: 'Code meets intelligence.',
  whatsapp: 'https://wa.me/967779189823',
  email: 'mailto:ayashalshameri2025@gmail.com',
  website: 'https://ayash-site.netlify.app/',
  smartmed: 'https://helpful-halva-0e0635.netlify.app/',
  linkedin: 'https://linkedin.com/in/ayash-alshameri',
};

const ATS_TEMPLATES = [
  {
    id: 'ats-harvard',
    nameAr: 'قالب هارفارد (Harvard ATS)',
    nameEn: 'Harvard Standard ATS',
    descAr: 'المعيار الذهبي العالمي المعتمد في الجامعات والشركات الكبرى (عمود واحد، ترويسة متوسطة، خطوط فاصلة دقيقة).',
    descEn: 'The global gold standard: centered header, crisp horizontal dividers, pure single-column.',
    badge: 'GOLD STANDARD'
  },
  {
    id: 'ats-executive',
    nameAr: 'التنفيذي القياسي (Executive ATS)',
    nameEn: 'Corporate Executive ATS',
    descAr: 'مصمم للمناصب الإدارية والبنوك والمنظمات الدولية بأسلوب منظم ومباشر يقرؤه أي نظام فرز.',
    descEn: 'Built for management, banking, and UN/NGO roles with clean left/right aligned structure.',
    badge: 'CORPORATE'
  },
  {
    id: 'ats-tech',
    nameAr: 'التقني والدولي (Tech / Global ATS)',
    nameEn: 'Tech & International ATS',
    descAr: 'يضع المهارات والمشاريع في الصدارة مباشرة بعد النبذة لرفع نسبة التطابق في الوظائف التقنية.',
    descEn: 'Prioritizes technical skills and projects right below summary for tech & global screening.',
    badge: 'TECH & GLOBAL'
  }
];

const STOP_WORDS = new Set([
  'the','and','for','with','that','this','from','your','will','have','are','you','our','not','but','all','can','who','job','role','work','team','years','experience','skills','required','preferred','about','into','their','more','than','must','able','using','such','other','both','well','also','within','across','strong','good','excellent',
  'في','من','على','إلى','عن','مع','أو','و','ان','أن','التي','الذي','هذا','هذه','ذلك','تلك','كما','حيث','عند','بين','بعد','قبل','خلال','ضمن','عبر','حول','فوق','تحت','لدى','لدي','يكون','تكون','كان','كانت','العمل','خبرة','مهارات','مطلوب','وظيفة','فريق','سنوات','جيد','ممتاز','القدرة'
]);

function evaluateATSScore(cv, isAr) {
  const checks = [
    {
      ok: Boolean(cv.personal.fullName && (cv.personal.email || cv.personal.phone)),
      pts: 20,
      labelAr: 'بيانات التواصل الأساسية مكتملة (الاسم + البريد/الهاتف)',
      labelEn: 'Core contact details present (Name + Email/Phone)'
    },
    {
      ok: Boolean(cv.summary.bio && cv.summary.bio.trim().length >= 40),
      pts: 15,
      labelAr: 'ملخص مهني واضح وغني بالكلمات المفتاحية (40 حرفًا فأكثر)',
      labelEn: 'Clear professional summary (40+ characters)'
    },
    {
      ok: cv.experience.length > 0,
      pts: 20,
      labelAr: 'وجود خبرات مهنية مفصّلة بأسماء الجهات والمسميات',
      labelEn: 'Work experience entries with roles & companies'
    },
    {
      ok: cv.experience.some(e => /\d+|%|\+/.test(`${e.description} ${e.achievements}`)),
      pts: 15,
      labelAr: 'استخدام أرقام أو نسب مئوية لقياس الإنجازات (يرفع القبول في ATS)',
      labelEn: 'Measurable metrics/numbers in achievements (boosts ATS rank)'
    },
    {
      ok: cv.education.length > 0,
      pts: 15,
      labelAr: 'قسم التعليم والمؤهلات الأكاديمية مكتمل',
      labelEn: 'Education & academic qualifications included'
    },
    {
      ok: cv.skills.length >= 4,
      pts: 15,
      labelAr: 'إدراج 4 مهارات تخصصية على الأقل لتسهيل الفرز الآلي',
      labelEn: 'At least 4 targeted skills listed for keyword scanning'
    }
  ];
  const score = checks.reduce((acc, c) => acc + (c.ok ? c.pts : 0), 0);
  return { score, checks };
}

function matchJobDescription(cv, jobDesc) {
  if (!jobDesc || !jobDesc.trim()) return null;
  const cvText = [
    cv.personal.jobTitle,
    cv.summary.bio,
    cv.summary.objective,
    cv.summary.specialty,
    ...cv.experience.map(e => `${e.role} ${e.company} ${e.description} ${e.achievements}`),
    ...cv.education.map(e => `${e.degree} ${e.major} ${e.institution}`),
    ...cv.skills.map(s => s.name),
    ...cv.projects.map(p => `${p.name} ${p.tech} ${p.description}`),
    ...cv.certifications.map(c => `${c.title} ${c.issuer}`),
  ].join(' ').toLowerCase();

  const words = jobDesc
    .toLowerCase()
    .replace(/[^\p{L}\p{N}#+.]+/gu, ' ')
    .split(/\s+/)
    .filter(w => w.length >= 3 && !STOP_WORDS.has(w) && !/^\d+$/.test(w));

  const freq = {};
  words.forEach(w => { freq[w] = (freq[w] || 0) + 1; });
  const topKeywords = Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 18)
    .map(([w]) => w);

  if (topKeywords.length === 0) return null;

  const matched = topKeywords.filter(k => cvText.includes(k));
  const missing = topKeywords.filter(k => !cvText.includes(k));
  const percent = Math.round((matched.length / topKeywords.length) * 100);
  return { percent, matched, missing };
}

const EMPTY_CV = {
  personal: {
    fullName: '', jobTitle: '', email: '', phone: '', location: '',
    address: '', linkedin: '', github: '', website: '', photo: ''
  },
  summary: { bio: '', objective: '', specialty: '', yearsExp: '' },
  education: [],
  experience: [],
  skills: [],
  certifications: [],
  projects: [],
  languages: [],
  volunteering: [],
  references: [],
  customSections: []
};

const SAMPLE_CV_AR = {
  personal: {
    fullName: 'م. عياش محمود الشميري',
    jobTitle: 'مطور برمجيات وذكاء اصطناعي | مدرب تقني',
    email: 'ayash@example.com',
    phone: '+967 770 000 000',
    location: 'اليمن - مأرب',
    address: 'شارع الجامعة',
    linkedin: 'linkedin.com/in/ayash-alshameri',
    github: 'github.com/ayash-alshameri',
    website: 'ayash-studio.dev',
    photo: ''
  },
  summary: {
    bio: 'مطور برمجيات ومدرب متخصص في تطبيقات الذكاء الاصطناعي وتطوير الحلول الرقمية الحديثة، بخبرة عملية في بناء الأنظمة التعليمية وتدريب الكوادر الطبية والإدارية.',
    objective: 'تطوير منصات تقنية ذكية تسهم في رفع كفاءة العمل المؤسسي والتعليمي.',
    specialty: 'هندسة البرمجيات والذكاء الاصطناعي',
    yearsExp: '5 سنوات'
  },
  education: [
    { id: 1, institution: 'جامعة إقليم سبأ', major: 'علوم الحاسوب وأمن المعلومات', degree: 'بكالوريوس', start: '2020', end: '2024', gpa: 'امتياز' }
  ],
  experience: [
    { id: 1, company: 'أكاديمية كرى للعلوم الصحية والإدارية', role: 'مطور برمجيات ومدرب تقني ومنسق برامج', location: 'مأرب', start: '2023', end: 'حتى الآن', description: 'تطوير الأنظمة الداخلية وتدريب الكوادر على أدوات الذكاء الاصطناعي وICDL.', achievements: 'إطلاق برنامج SMARTMED AI لتدريب الكوادر الطبية.' }
  ],
  skills: [
    { id: 1, name: 'React & Tailwind CSS', category: 'تقنية', level: 'متقدم' },
    { id: 2, name: 'تطبيقات الذكاء الاصطناعي', category: 'تقنية', level: 'متقدم' },
    { id: 3, name: 'إدارة البرامج التدريبية', category: 'إدارية', level: 'متقدم' },
    { id: 4, name: 'القيادة والتواصل الفعال', category: 'شخصية', level: 'متقدم' }
  ],
  certifications: [
    { id: 1, title: 'الذكاء الاصطناعي ومسارك المهني', issuer: 'EMC Professional Camp', date: '2026', link: '' }
  ],
  projects: [
    { id: 1, name: 'AYASH CV STUDIO', description: 'منصة ويب متكاملة لبناء السير الذاتية بخصوصية تامة داخل المتصفح.', tech: 'React, Tailwind CSS', link: 'https://ayash-cv-studio.netlify.app' }
  ],
  languages: [
    { id: 1, name: 'العربية', level: 'اللغة الأم' },
    { id: 2, name: 'الإنجليزية', level: 'جيد جدًا' }
  ],
  volunteering: [
    { id: 1, title: 'مبادرة محو الأمية الرقمية', org: 'فريق تقني تطوعي', period: '2024', details: 'تقديم ورش عمل مجانية للطلاب حول أدوات الإنتاجية.' }
  ],
  references: [
    { id: 1, name: 'متاحة عند الطلب', role: '', contact: '' }
  ],
  customSections: []
};

const SAMPLE_CV_EN = {
  personal: {
    fullName: 'Eng. Ayash Mahmoud Alshameri',
    jobTitle: 'Software & AI Developer | Tech Trainer',
    email: 'ayash@example.com',
    phone: '+967 770 000 000',
    location: 'Marib, Yemen',
    address: 'University St.',
    linkedin: 'linkedin.com/in/ayash-alshameri',
    github: 'github.com/ayash-alshameri',
    website: 'ayash-studio.dev',
    photo: ''
  },
  summary: {
    bio: 'Software & AI Developer and certified technology trainer specializing in modern web applications, AI workflows, and digital transformation for healthcare and education.',
    objective: 'Building intelligent software platforms that empower teams and learners.',
    specialty: 'Software Engineering & AI',
    yearsExp: '5 Years'
  },
  education: [
    { id: 1, institution: 'Saba Region University', major: 'Computer Science & Information Security', degree: 'B.Sc.', start: '2020', end: '2024', gpa: '3.9 / 4.0' }
  ],
  experience: [
    { id: 1, company: 'Kara Academy for Health & Admin Sciences', role: 'Software & AI Developer / Program Coordinator', location: 'Marib', start: '2023', end: 'Present', description: 'Leading technical training programs, AI workshops, and internal software tools.', achievements: 'Launched SMARTMED AI program for healthcare professionals.' }
  ],
  skills: [
    { id: 1, name: 'React & Tailwind CSS', category: 'Technical', level: 'Expert' },
    { id: 2, name: 'AI Applications & Prompting', category: 'Technical', level: 'Expert' },
    { id: 3, name: 'Program Coordination', category: 'Management', level: 'Advanced' },
    { id: 4, name: 'Public Speaking & Training', category: 'Soft', level: 'Advanced' }
  ],
  certifications: [
    { id: 1, title: 'AI & Your Career Path', issuer: 'EMC Professional Camp', date: '2026', link: '' }
  ],
  projects: [
    { id: 1, name: 'AYASH CV STUDIO', description: 'Privacy-first in-browser CV builder with 10 templates and PDF/Word export.', tech: 'React, Tailwind CSS', link: 'https://ayash-cv-studio.netlify.app' }
  ],
  languages: [
    { id: 1, name: 'Arabic', level: 'Native' },
    { id: 2, name: 'English', level: 'Professional' }
  ],
  volunteering: [
    { id: 1, title: 'Digital Literacy Initiative', org: 'Tech Volunteers', period: '2024', details: 'Delivered free productivity workshops for university students.' }
  ],
  references: [
    { id: 1, name: 'Available upon request', role: '', contact: '' }
  ],
  customSections: []
};

const DEFAULT_SECTIONS = [
  { id: 'personal', labelAr: 'المعلومات الشخصية', labelEn: 'Personal Info', visible: true },
  { id: 'summary', labelAr: 'النبذة الشخصية', labelEn: 'Summary', visible: true },
  { id: 'experience', labelAr: 'الخبرات المهنية', labelEn: 'Experience', visible: true },
  { id: 'education', labelAr: 'التعليم', labelEn: 'Education', visible: true },
  { id: 'skills', labelAr: 'المهارات', labelEn: 'Skills', visible: true },
  { id: 'projects', labelAr: 'المشاريع', labelEn: 'Projects', visible: true },
  { id: 'certifications', labelAr: 'الدورات والشهادات', labelEn: 'Certifications', visible: true },
  { id: 'languages', labelAr: 'اللغات', labelEn: 'Languages', visible: true },
  { id: 'volunteering', labelAr: 'الأعمال التطوعية', labelEn: 'Volunteering', visible: true },
  { id: 'references', labelAr: 'المراجع', labelEn: 'References', visible: true },
];

const DEFAULT_DESIGN = {
  accentColor: '#2563EB',
  fontFamily: 'Cairo',
  fontSize: 'base',
  headingStyle: 'underline',
  showPhoto: true,
  photoShape: 'circle',
  photoSize: 'md',
  spacing: 'normal',
  margins: 'normal',
};

const COLOR_PRESETS = ['#2563EB', '#0B1020', '#7C3AED', '#0F766E', '#B91C1C', '#1D4ED8', '#334155'];

const escapeHtml = (str = '') =>
  String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

// Dynamic browser-only script loader (100% client-side, zero server uploads)
function loadExternalScript(src, globalCheck) {
  return new Promise((resolve, reject) => {
    if (globalCheck()) return resolve();
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) {
      existing.addEventListener('load', () => resolve());
      existing.addEventListener('error', () => reject(new Error('Script load failed')));
      return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Script load failed'));
    document.head.appendChild(script);
  });
}

// Extract text from PDF file 100% inside the browser using PDF.js
async function extractTextFromPDF(file) {
  await loadExternalScript(
    'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js',
    () => Boolean(window.pdfjsLib)
  );
  window.pdfjsLib.GlobalWorkerOptions.workerSrc =
    'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

  const arrayBuffer = await file.arrayBuffer();
  const pdf = await window.pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  const allLines = [];

  for (let p = 1; p <= pdf.numPages; p++) {
    const page = await pdf.getPage(p);
    const content = await page.getTextContent();
    let currentLine = '';
    let lastY = null;

    content.items.forEach(item => {
      const str = item.str || '';
      const y = item.transform ? Math.round(item.transform[5]) : null;
      if (lastY !== null && y !== null && Math.abs(y - lastY) > 6) {
        if (currentLine.trim()) allLines.push(currentLine.trim());
        currentLine = str;
      } else {
        currentLine += (currentLine && str && !currentLine.endsWith(' ') && !str.startsWith(' ') ? ' ' : '') + str;
      }
      if (y !== null) lastY = y;
    });
    if (currentLine.trim()) allLines.push(currentLine.trim());
  }
  return allLines.join('\n');
}

// Extract text from Word (.docx) file 100% inside the browser using JSZip + DOMParser
async function extractTextFromDOCX(file) {
  await loadExternalScript(
    'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js',
    () => Boolean(window.JSZip)
  );
  const arrayBuffer = await file.arrayBuffer();
  const zip = await window.JSZip.loadAsync(arrayBuffer);
  const docXmlFile = zip.file('word/document.xml');
  if (!docXmlFile) throw new Error('Invalid DOCX');

  const xmlText = await docXmlFile.async('string');
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlText, 'application/xml');
  const paragraphs = Array.from(xmlDoc.getElementsByTagName('w:p'));

  const lines = paragraphs
    .map(p => {
      const texts = Array.from(p.getElementsByTagName('w:t')).map(t => t.textContent || '');
      return texts.join('').trim();
    })
    .filter(Boolean);

  return lines.join('\n');
}

// Smart client-side CV text parser v3 (handles Arabic/English ordinals, inline bullets, auto-routes courses/skills/experience, and creates Custom Sections for extra data)
function parseRawCVText(rawText, isAr) {
  let clean = rawText
    .replace(/<style[\s\S]*?<\/style>/gi, '\n')
    .replace(/<script[\s\S]*?<\/script>/gi, '\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/(p|div|li|tr|h[1-6])>/gi, '\n')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/\r/g, '');

  // 1. Break BEFORE any Arabic ordinal section prefix (أولاً:, ثانياً:, ثالثاً:, ...)
  clean = clean.replace(
    /(?:^|\s)((?:أول[ااً]|ثاني[ااً]|ثالث[ااً]|رابع[ااً]|خامس[ااً]|سادس[ااً]|سابع[ااً]|ثامن[ااً]|تاسع[ااً]|عاشر[ااً])\s*[:：\-])/g,
    '\n###ORD###$1'
  );

  // 2. Break inline bullet dashes (" - ") and numbered list items (" 1. ", " 2. ") onto separate lines
  clean = clean
    .replace(/\s+[-•▪]\s+/g, '\n- ')
    .replace(/\s+(\d{1,2})\s*[.)\-]\s+(?=[\u0600-\u06FFa-zA-Z])/g, '\n$1. ');

  const isPlaceholder = (val) => {
    const v = (val || '').replace(/[\s._\-…ـ]+/g, '');
    return v.length === 0;
  };

  const docTitleRx = /^(?:السيرة\s*الذاتية(?:\s*\(?\s*cv\s*\)?)?|cv|curriculum\s*vitae|resume)$/i;

  const standardHeadings = [
    { key: 'personal', rx: /^(?:البيانات\s*الشخصية|المعلومات\s*الشخصية|بيانات\s*التواصل|معلومات\s*التواصل|التواصل|الاتصال|personal\s*info(?:rmation)?|contact\s*info(?:rmation)?|contact\s*details|contact)/i },
    { key: 'objective', rx: /^(?:الهدف\s*الوظيفي|الهدف\s*المهني|الأهداف\s*المهنية|الأهداف|career\s*objective|objective)/i },
    { key: 'summary', rx: /^(?:النبذة|نبذة|النبذة\s*الشخصية|النبذة\s*المهنية|ملخص|الملخص|الملخص\s*المهني|عنّي|عني|summary|professional\s*summary|about|about\s*me|profile)/i },
    { key: 'experience', rx: /^(?:الخبرات\s*العملية\s*والمهنية|الخبرات\s*المهنية\s*والعملية|الخبرات\s*العملية|الخبرات\s*المهنية|التاريخ\s*الوظيفي|الخبرات|الخبرة|خبرات|work\s*experience|professional\s*experience|career\s*history|experience|employment)/i },
    { key: 'education', rx: /^(?:المؤهلات\s*العلمية\s*والعسكرية|المؤهلات\s*العلمية|المؤهلات\s*الأكاديمية|التحصيل\s*العلمي|التعليم|المؤهلات|الدراسة|academic\s*background|qualifications|education)/i },
    { key: 'skills', rx: /^(?:المهارات\s*والقدرات|القدرات\s*والمهارات|المهارات\s*التقنية|المهارات\s*الشخصية|المهارات\s*الإدارية|المهارات|مهارات|القدرات|الكفاءات|technical\s*skills|soft\s*skills|core\s*skills|competencies|skills)/i },
    { key: 'projects', rx: /^(?:أبرز\s*المشاريع|المشاريع|مشاريع|الأعمال|key\s*projects|projects|portfolio)/i },
    { key: 'certifications', rx: /^(?:الدورات\s*والشهادات|الشهادات\s*والدورات|الدورات\s*التدريبية|الدورات|الشهادات|التدريب|certifications|certificates|courses|training)/i },
    { key: 'languages', rx: /^(?:اللغات|لغات|languages)/i },
    { key: 'volunteering', rx: /^(?:الأعمال\s*التطوعية|العمل\s*التطوعي|الأنشطة\s*التطوعية|التطوع|الأنشطة|volunteering|volunteer|activities|community)/i },
    { key: 'references', rx: /^(?:المراجع|المعرفون|المعرّفون|references|referees)/i },
  ];

  // Expand lines so an ordinal heading + inline body text gets split cleanly right after the heading
  const expandedLines = [];
  clean.split('\n').forEach(rawL => {
    let l = rawL.replace(/\s+/g, ' ').trim();
    if (!l) return;

    if (l.startsWith('###ORD###')) {
      l = l.replace('###ORD###', '').trim();
      const stripped = l.replace(/^(?:أول[ااً]|ثاني[ااً]|ثالث[ااً]|رابع[ااً]|خامس[ااً]|سادس[ااً]|سابع[ااً]|ثامن[ااً]|تاسع[ااً]|عاشر[ااً])\s*[:：\-]\s*/i, '').trim();
      let matchedHead = null;
      for (const h of standardHeadings) {
        const m = stripped.match(h.rx);
        if (m) {
          const headPart = m[0].trim();
          const restPart = stripped.slice(m[0].length).replace(/^[:：\-–—\s]+/, '').trim();
          matchedHead = { headPart, restPart };
          break;
        }
      }
      if (matchedHead) {
        expandedLines.push(`@@SEC@@${matchedHead.headPart}`);
        if (matchedHead.restPart) expandedLines.push(matchedHead.restPart);
      } else {
        const colonIdx = stripped.indexOf(':');
        if (colonIdx > 1 && colonIdx < 40) {
          expandedLines.push(`@@SEC@@${stripped.slice(0, colonIdx).trim()}`);
          const rest = stripped.slice(colonIdx + 1).trim();
          if (rest) expandedLines.push(rest);
        } else {
          expandedLines.push(`@@SEC@@${stripped}`);
        }
      }
      return;
    }

    expandedLines.push(l);
  });

  const parsed = JSON.parse(JSON.stringify(EMPTY_CV));
  const newCustomSectionDefs = [];
  if (expandedLines.length === 0) return { cvData: parsed, newCustomSectionDefs };

  // Global regex extraction for obvious contact links
  const emailMatch = clean.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  const phoneMatch = clean.match(/(?:\+?\d[\d\s\-()]{7,16}\d)/);
  const linkedinMatch = clean.match(/(?:https?:\/\/)?(?:www\.)?linkedin\.com\/[^\s,]+/i);
  const githubMatch = clean.match(/(?:https?:\/\/)?(?:www\.)?github\.com\/[^\s,]+/i);

  if (emailMatch) parsed.personal.email = emailMatch[0];
  if (phoneMatch) parsed.personal.phone = phoneMatch[0].trim();
  if (linkedinMatch) parsed.personal.linkedin = linkedinMatch[0];
  if (githubMatch) parsed.personal.github = githubMatch[0];

  const buckets = {
    personal: [], summary: [], objective: [], experience: [], education: [],
    skills: [], projects: [], certifications: [], languages: [], volunteering: [], references: []
  };
  const customBuckets = {}; // id -> { title, lines: [] }
  const extraPersonalLines = [];

  let currentKey = 'personal';
  let currentCustomId = null;

  const extraHeadingRx = /^(?:الجوائز|التكريمات|الإنجازات|الأبحاث|المنشورات|العضويات|الهوايات|الاهتمامات|المعلومات\s*الإضافية|رخصة\s*القيادة|awards|honors|publications|research|memberships|hobbies|interests|additional\s*info|achievements|patents)\s*[:：\-]?$/i;

  expandedLines.forEach(line => {
    const cleanCheck = line.replace(/^@@SEC@@/, '').replace(/[:：\-]+$/, '').trim();
    if (!cleanCheck || docTitleRx.test(cleanCheck)) return;

    const isForcedSec = line.startsWith('@@SEC@@');
    const stdMatch = standardHeadings.find(h => h.rx.test(cleanCheck) && cleanCheck.length <= 50);

    if (stdMatch && (isForcedSec || cleanCheck.length <= 38)) {
      currentKey = stdMatch.key;
      currentCustomId = null;
      return;
    }

    if (
      isForcedSec ||
      extraHeadingRx.test(cleanCheck) ||
      (/[:：]$/.test(line) && line.length <= 36 && !/^(?:الاسم|الجنسية|المحافظة|المديرية|العزلة|العنوان|الهاتف|رقم\s*الهاتف|البريد|المسمى|التخصص|الموقع|name|phone|email|address)/i.test(cleanCheck))
    ) {
      const cid = `custom_${Date.now()}_${Object.keys(customBuckets).length + 1}`;
      customBuckets[cid] = { title: cleanCheck, lines: [] };
      currentKey = 'custom';
      currentCustomId = cid;
      return;
    }

    if (currentKey === 'custom' && currentCustomId) {
      customBuckets[currentCustomId].lines.push(line);
    } else if (buckets[currentKey]) {
      buckets[currentKey].push(line);
    }
  });

  // 3. Parse Personal & Contact Info accurately
  const addressParts = [];
  buckets.personal.forEach(rawLine => {
    const line = rawLine.replace(/^[-•*▪]\s*/, '').trim();
    if (!line || docTitleRx.test(line)) return;

    const kv = line.match(/^([^:：]{2,28})\s*[:：]\s*(.*)$/);
    if (kv) {
      const key = kv[1].trim();
      const val = kv[2].trim();
      if (isPlaceholder(val)) return;

      if (/^(?:الاسم(?:\s+الكامل)?|name|full\s*name)$/i.test(key)) {
        parsed.personal.fullName = val;
      } else if (/^(?:المسمى\s*الوظيفي|الوظيفة|التخصص|job\s*title|title|position)$/i.test(key)) {
        parsed.personal.jobTitle = val;
      } else if (/^(?:البريد(?:\s*الإلكتروني)?|الإيميل|email|e-mail)$/i.test(key)) {
        parsed.personal.email = val;
      } else if (/^(?:رقم\s*الهاتف|الهاتف|الجوال|الموبايل|رقم\s*الجوال|phone|mobile|tel)$/i.test(key)) {
        parsed.personal.phone = val;
      } else if (/^(?:الدولة|المدينة|المحافظة|الدولة\s*والمدينة|location|city|country)$/i.test(key)) {
        parsed.personal.location = parsed.personal.location ? `${parsed.personal.location} - ${val}` : val;
      } else if (/^(?:العنوان|السكن|المديرية|العزلة|الحي|address|district)$/i.test(key)) {
        addressParts.push(`${key}: ${val}`);
      } else if (/^(?:linkedin|لينكد\s*إن)$/i.test(key)) {
        parsed.personal.linkedin = val;
      } else if (/^(?:github|جيت\s*هب)$/i.test(key)) {
        parsed.personal.github = val;
      } else if (/^(?:الموقع(?:\s*الشخصي|\s*الإلكتروني)?|website)$/i.test(key)) {
        parsed.personal.website = val;
      } else {
        extraPersonalLines.push(`${key}: ${val}`);
      }
      return;
    }

    if (!parsed.personal.fullName && line.length < 60 && !line.includes('@')) {
      parsed.personal.fullName = line;
    } else if (!parsed.personal.jobTitle && line.length < 75 && !line.includes('@')) {
      parsed.personal.jobTitle = line;
    } else if (!isPlaceholder(line)) {
      extraPersonalLines.push(line);
    }
  });

  if (addressParts.length > 0) parsed.personal.address = addressParts.join(' - ');
  if (extraPersonalLines.length > 0) {
    const cid = `custom_${Date.now()}_personal_extra`;
    customBuckets[cid] = { title: isAr ? 'بيانات شخصية إضافية' : 'Additional Personal Info', lines: extraPersonalLines };
  }

  // 4. Populate Summary & Objective
  if (buckets.summary.length > 0) {
    parsed.summary.bio = buckets.summary.map(l => l.replace(/^[-•*▪]\s*/, '')).join(' ');
  }
  if (buckets.objective.length > 0) {
    parsed.summary.objective = buckets.objective.map(l => l.replace(/^[-•*▪]\s*/, '')).join(' ');
    if (!parsed.summary.bio) {
      parsed.summary.bio = parsed.summary.objective;
      parsed.summary.objective = '';
    }
  }

  // 5. Populate Education & Smartly Route Courses ("دورة ...") to Certifications!
  if (buckets.education.length > 0) {
    buckets.education.forEach((rawLine, i) => {
      const line = rawLine.replace(/^[-•*▪\d.)]+\s*/, '').trim();
      if (!line) return;
      if (/^(?:دورة|دورات|شهادة\s*تدريبية|course|training|workshop)/i.test(line)) {
        const parts = line.split(/[–—\-|]/).map(p => p.trim()).filter(Boolean);
        parsed.certifications.push({
          id: Date.now() + 550 + i,
          title: parts[0] || line,
          issuer: parts.slice(1).join(' - '),
          date: '',
          link: ''
        });
      } else {
        const parts = line.split(/[–—\-|]/).map(p => p.trim()).filter(Boolean);
        parsed.education.push({
          id: Date.now() + 200 + i,
          degree: parts[0] || line,
          institution: parts.slice(1).join(' - '),
          major: '',
          start: '',
          end: '',
          gpa: ''
        });
      }
    });
  }

  // 6. Populate Experience (Handles intro sentence + numbered/bulleted items cleanly)
  if (buckets.experience.length > 0) {
    buckets.experience.forEach((rawLine, i) => {
      const line = rawLine.trim();
      if (!line) return;
      if (/(?:ومن\s*أبرزها|فيما\s*يلي|تشمل)\s*[:：]?$/i.test(line) || (/^(?:يمتلك|أمتلك|خبرة\s*متنوعة)/i.test(line) && /[:：]$/.test(line))) {
        if (!parsed.summary.bio) {
          parsed.summary.bio = line.replace(/[,،]?\s*ومن\s*أبرزها\s*[:：]?$/i, '.');
        }
        return;
      }
      const cleanItem = line.replace(/^(?:\d{1,2}\s*[.)\-]|[-•*▪])\s*/, '').trim();
      if (!cleanItem) return;

      const splitMatch = cleanItem.match(/^([^،,:–—\-]{6,55})[،,:–—\-]\s*(.+)$/);
      if (splitMatch) {
        parsed.experience.push({
          id: Date.now() + 100 + i,
          role: splitMatch[1].trim(),
          company: '',
          location: '',
          start: '',
          end: '',
          description: splitMatch[2].trim(),
          achievements: ''
        });
      } else {
        parsed.experience.push({
          id: Date.now() + 100 + i,
          role: cleanItem.length > 55 ? cleanItem.slice(0, 52) + '...' : cleanItem,
          company: '',
          location: '',
          start: '',
          end: '',
          description: cleanItem.length > 55 ? cleanItem : '',
          achievements: ''
        });
      }
    });
  }

  // 7. Populate Skills (supports full Arabic skill sentences & auto-categorizes)
  if (buckets.skills.length > 0) {
    const skillItems = [];
    buckets.skills.forEach(rawLine => {
      const line = rawLine.replace(/^(?:\d{1,2}\s*[.)\-]|[-•*▪])\s*/, '').trim();
      if (!line) return;
      if (line.includes('،') && line.split('،').every(p => p.trim().length < 28)) {
        line.split('،').forEach(s => { if (s.trim()) skillItems.push(s.trim()); });
      } else if (line.includes(',') && line.split(',').every(p => p.trim().length < 28)) {
        line.split(',').forEach(s => { if (s.trim()) skillItems.push(s.trim()); });
      } else {
        skillItems.push(line.replace(/\.$/, ''));
      }
    });
    parsed.skills = skillItems.filter(s => s.length >= 2 && s.length <= 140).slice(0, 30).map((name, idx) => ({
      id: Date.now() + 300 + idx,
      name,
      category: /حاسوب|برمجة|كمبيوتر|أوفيس|إكسل|وورد|تطبيقات|قيادة|توزيع|تسويق|react|python|office/i.test(name)
        ? (isAr ? 'تقنية ومهنية' : 'Technical')
        : /إشراف|إدارة|تنظيم|قيادة\s*فريق/i.test(name)
        ? (isAr ? 'إدارية' : 'Management')
        : (isAr ? 'شخصية' : 'Soft'),
      level: ''
    }));
  }

  // 8. Populate Projects
  if (buckets.projects.length > 0) {
    buckets.projects.forEach((rawLine, idx) => {
      const cleanItem = rawLine.replace(/^(?:\d{1,2}\s*[.)\-]|[-•*▪])\s*/, '').trim();
      if (!cleanItem) return;
      const parts = cleanItem.split(/[:：–—\-]/);
      parsed.projects.push({
        id: Date.now() + 400 + idx,
        name: (parts[0] || cleanItem).trim(),
        tech: '',
        description: parts.slice(1).join(' - ').trim(),
        link: ''
      });
    });
  }

  // 9. Populate Certifications
  if (buckets.certifications.length > 0) {
    buckets.certifications.forEach((rawLine, idx) => {
      const cleanItem = rawLine.replace(/^(?:\d{1,2}\s*[.)\-]|[-•*▪])\s*/, '').trim();
      if (!cleanItem) return;
      const parts = cleanItem.split(/[–—\-|]/).map(p => p.trim()).filter(Boolean);
      parsed.certifications.push({
        id: Date.now() + 500 + idx,
        title: parts[0] || cleanItem,
        issuer: parts[1] || '',
        date: parts[2] || '',
        link: ''
      });
    });
  }

  // 10. Populate Languages
  if (buckets.languages.length > 0) {
    buckets.languages
      .join('\n')
      .split(/[\n,،•|·]/)
      .map(s => s.replace(/^[-*▪]\s*/, '').trim())
      .filter(Boolean)
      .slice(0, 8)
      .forEach((item, idx) => {
        const parts = item.split(/[:：\-–(]/);
        parsed.languages.push({
          id: Date.now() + 600 + idx,
          name: (parts[0] || item).trim(),
          level: (parts[1] || '').replace(/\)$/, '').trim()
        });
      });
  }

  // 11. Populate Volunteering
  if (buckets.volunteering.length > 0) {
    buckets.volunteering.slice(0, 10).forEach((line, idx) => {
      parsed.volunteering.push({
        id: Date.now() + 700 + idx,
        title: line.replace(/^(?:\d{1,2}\s*[.)\-]|[-•*▪])\s*/, '').trim(),
        org: '',
        period: '',
        details: ''
      });
    });
  }

  // 12. Populate References
  if (buckets.references.length > 0) {
    buckets.references.slice(0, 6).forEach((line, idx) => {
      parsed.references.push({
        id: Date.now() + 800 + idx,
        name: line.replace(/^(?:\d{1,2}\s*[.)\-]|[-•*▪])\s*/, '').trim(),
        role: '',
        contact: ''
      });
    });
  }

  // 13. Auto-create Custom Sections for any extra data not in standard tabs
  Object.entries(customBuckets).forEach(([cid, obj]) => {
    if (obj.lines.length > 0) {
      parsed.customSections.push({
        id: cid,
        title: obj.title,
        content: obj.lines.join('\n')
      });
      newCustomSectionDefs.push({
        id: cid,
        labelAr: obj.title,
        labelEn: obj.title,
        visible: true,
        isCustom: true
      });
    }
  });

  // 14. Auto-derive Job Title if missing (from first education or experience, strictly from user data)
  if (!parsed.personal.jobTitle) {
    if (parsed.education[0]?.degree) {
      parsed.personal.jobTitle = parsed.education[0].degree.replace(/^شهادة\s+/, '');
    } else if (parsed.experience[0]?.role) {
      parsed.personal.jobTitle = parsed.experience[0].role;
    }
  }

  return { cvData: parsed, newCustomSectionDefs };
}


// ============================================================================
// LOCAL AI SEMANTIC CLASSIFIER v2 (100% In-Browser NLP Engine — Zero Servers)
// Works on ANY raw, unformatted, or mixed text: cleans, classifies every clause,
// routes misplaced items to their exact sections, and removes duplicates.
// ============================================================================
function classifyLineSemantically(line) {
  const l = line.toLowerCase();
  const scores = {
    education: 0,
    certifications: 0,
    experience: 0,
    skills: 0,
    languages: 0,
    projects: 0,
    volunteering: 0,
    summary: 0,
  };

  // Weighted Arabic & English semantic features
  if (/(جامعة|كلية|معهد|بكالوريوس|ماجستير|دكتوراه|دبلوم|ثانوية|تخرج|معدل|تخصص|خريج|bachelor|master|phd|university|college|b\.sc|m\.sc|gpa|degree|graduated)/i.test(l)) scores.education += 5;
  if (/(دورة|دورات|شهادة|شهادات|ورشة|تدريب|مخيم|أكاديمية\s*حسوب|معتمد|course|certificate|certification|workshop|bootcamp|udemy|coursera|diploma\s*in)/i.test(l)) scores.certifications += 5;
  if (/(عملت|أعمل|العمل\s*في|العمل\s*على|العمل\s*مشرف|موظف|مدير|منسق|مشرف|مهندس|مطور|مدرب|طبيب|محاسب|شركة|مؤسسة|أكاديمية|مستشفى|بنك|محل|مبيعات|توزيع|سائق|مندوب|worked|working\s*at|manager|developer|engineer|coordinator|company|hospital|bank)/i.test(l)) scores.experience += 4;
  if (/(?:19|20)\d{2}\s*[-–—]\s*(?:(?:19|20)\d{2}|حتى الآن|present|current)/i.test(l)) scores.experience += 3;
  if (/(يجيد|أجيد|إجادة|مهارة|مهارات|القدرة\s*على|قادر\s*على|استخدام\s*الحاسوب|الكمبيوتر|أوفيس|إكسل|وورد|القيادة|التواصل|العمل\s*ضمن\s*فريق|تحمل\s*ضغط|الانضباط|الالتزام|التعامل\s*مع\s*العملاء|برمجة|تصميم|react|python|javascript|excel|word|photoshop|canva|sql|leadership|teamwork|proficient|skilled)/i.test(l)) scores.skills += 5;
  if (/(اللغة\s*العربية|اللغة\s*الإنجليزية|العربية|الإنجليزية|الفرنسية|الألمانية|اللغة\s*الأم|ممتاز\s*في\s*الإنجليزية|arabic|english|french|german|native|fluent)/i.test(l) && l.length < 55) scores.languages += 6;
  if (/(مشروع|منصة|تطبيق|موقع\s*ويب|نظام\s*إلكتروني|تم\s*تطوير|قمت\s*ببناء|project|platform|built\s*a|developed\s*a|github\.com)/i.test(l)) scores.projects += 5;
  if (/(تطوع|تطوعي|مبادرة|جمعية|خيري|مجتمعي|volunteer|initiative|charity|ngo\s*volunteer)/i.test(l)) scores.volunteering += 5;
  if (/(أسعى|أهدف|أطمح|أبحث\s*عن\s*فرصة|ملخص|متخصص\s*في|خبرة\s*عملية\s*في|seeking|passionate|dedicated|objective|looking\s*for)/i.test(l)) scores.summary += 5;

  let bestKey = null;
  let bestScore = 0;
  for (const [k, s] of Object.entries(scores)) {
    if (s > bestScore) {
      bestScore = s;
      bestKey = k;
    }
  }
  return bestScore >= 4 ? bestKey : null;
}

// Smart Local AI Parse: Always cleans, classifies unheaded/mixed text, re-routes misplaced items, and deduplicates
function smartLocalAIParse(rawText, isAr) {
  const result = parseRawCVText(rawText, isAr);
  const { cvData } = result;
  const now = Date.now();

  // 1. ALWAYS inspect summary.bio sentence-by-sentence to extract misplaced skills, education, experience, courses, languages, projects, volunteering
  if (cvData.summary.bio && cvData.summary.bio.trim().length > 20) {
    const clauses = cvData.summary.bio
      .split(/(?:\n|[.؟!؛•▪]+|\s+-\s+)/)
      .map(s => s.replace(/^[-•*▪\d.)]+\s*/, '').trim())
      .filter(s => s.length >= 3);

    const pureSummary = [];
    clauses.forEach((clause, idx) => {
      const predicted = classifyLineSemantically(clause);
      if (predicted === 'skills') {
        cvData.skills.push({
          id: now + 900 + idx,
          name: clause,
          category: /حاسوب|كمبيوتر|أوفيس|إكسل|وورد|برمجة|تصميم|react|python|excel|word/i.test(clause)
            ? (isAr ? 'تقنية ومهنية' : 'Technical')
            : /إدارة|إشراف|قيادة|تنظيم/i.test(clause)
            ? (isAr ? 'إدارية' : 'Management')
            : (isAr ? 'شخصية ومهنية' : 'Soft'),
          level: ''
        });
      } else if (predicted === 'education') {
        const parts = clause.split(/[–—\-|]/).map(p => p.trim()).filter(Boolean);
        cvData.education.push({ id: now + 920 + idx, degree: parts[0] || clause, institution: parts.slice(1).join(' - '), major: '', start: '', end: '', gpa: '' });
      } else if (predicted === 'certifications') {
        const parts = clause.split(/[–—\-|]/).map(p => p.trim()).filter(Boolean);
        cvData.certifications.push({ id: now + 940 + idx, title: parts[0] || clause, issuer: parts.slice(1).join(' - '), date: '', link: '' });
      } else if (predicted === 'experience') {
        const splitMatch = clause.match(/^([^،,:–—\-]{6,55})[،,:–—\-]\s*(.+)$/);
        cvData.experience.push({
          id: now + 960 + idx,
          role: splitMatch ? splitMatch[1].trim() : (clause.length > 55 ? clause.slice(0, 52) + '...' : clause),
          company: '',
          location: '',
          start: '',
          end: '',
          description: splitMatch ? splitMatch[2].trim() : (clause.length > 55 ? clause : ''),
          achievements: ''
        });
      } else if (predicted === 'languages') {
        const parts = clause.split(/[:：\-–(]/);
        cvData.languages.push({ id: now + 980 + idx, name: (parts[0] || clause).trim(), level: (parts[1] || '').replace(/\)$/, '').trim() });
      } else if (predicted === 'projects') {
        const parts = clause.split(/[:：–—\-]/);
        cvData.projects.push({ id: now + 990 + idx, name: (parts[0] || clause).trim(), tech: '', description: parts.slice(1).join(' - ').trim(), link: '' });
      } else if (predicted === 'volunteering') {
        cvData.volunteering.push({ id: now + 995 + idx, title: clause, org: '', period: '', details: '' });
      } else {
        pureSummary.push(clause);
      }
    });
    cvData.summary.bio = pureSummary.join('. ');
  }

  // 2. Cross-section smart cleanup: move any skill-like item accidentally placed in experience -> skills
  const cleanExp = [];
  cvData.experience.forEach((exp, idx) => {
    const fullText = `${exp.role} ${exp.description}`.trim();
    if (/^(?:يجيد|أجيد|إجادة|القدرة\s*على|مهارة|مهارات)\s+/i.test(fullText) && !exp.company) {
      cvData.skills.push({
        id: now + 1100 + idx,
        name: fullText.replace(/\.$/, ''),
        category: /حاسوب|كمبيوتر|أوفيس|برمجة|قيادة|تسويق/i.test(fullText) ? (isAr ? 'تقنية ومهنية' : 'Technical') : (isAr ? 'شخصية' : 'Soft'),
        level: ''
      });
    } else {
      cleanExp.push(exp);
    }
  });
  cvData.experience = cleanExp;

  // 3. Deduplicate skills & languages cleanly
  const seenSkills = new Set();
  cvData.skills = cvData.skills.filter(s => {
    const key = (s.name || '').trim().toLowerCase();
    if (!key || seenSkills.has(key)) return false;
    seenSkills.add(key);
    return true;
  });

  const seenLangs = new Set();
  cvData.languages = cvData.languages.filter(l => {
    const key = (l.name || '').trim().toLowerCase();
    if (!key || seenLangs.has(key)) return false;
    seenLangs.add(key);
    return true;
  });

  // 4. Re-check Job Title derivation if still empty
  if (!cvData.personal.jobTitle) {
    if (cvData.education[0]?.degree) {
      cvData.personal.jobTitle = cvData.education[0].degree.replace(/^شهادة\s+/, '');
    } else if (cvData.experience[0]?.role) {
      cvData.personal.jobTitle = cvData.experience[0].role;
    }
  }

  return result;
}

// ============================================================================
// OPTIONAL GEMINI AI PARSER (Only runs with explicit user consent + own API key)
// ============================================================================
async function parseCVWithGeminiAI(rawText, apiKey, isAr) {
  const prompt = `You are a strict, accurate CV data extraction engine. Extract ALL information from the following CV text WITHOUT inventing, fabricating, or omitting any real detail. Return ONLY valid JSON matching this exact structure:
{
  "personal": { "fullName": "", "jobTitle": "", "email": "", "phone": "", "location": "", "address": "", "linkedin": "", "github": "", "website": "" },
  "summary": { "bio": "", "objective": "", "specialty": "", "yearsExp": "" },
  "education": [{ "degree": "", "institution": "", "major": "", "start": "", "end": "", "gpa": "" }],
  "experience": [{ "role": "", "company": "", "location": "", "start": "", "end": "", "description": "", "achievements": "" }],
  "skills": [{ "name": "", "category": "", "level": "" }],
  "certifications": [{ "title": "", "issuer": "", "date": "", "link": "" }],
  "projects": [{ "name": "", "tech": "", "description": "", "link": "" }],
  "languages": [{ "name": "", "level": "" }],
  "volunteering": [{ "title": "", "org": "", "period": "", "details": "" }],
  "references": [{ "name": "", "role": "", "contact": "" }],
  "customSections": [{ "title": "", "content": "" }]
}
Rules:
1. Put every piece of data in its exact logical section (e.g., training courses go to certifications, computer/soft abilities go to skills).
2. If there is extra data that does not fit the standard fields (like Nationality, Date of Birth, Awards, Hobbies, Military info), create an entry in "customSections" with an appropriate title in ${isAr ? 'Arabic' : 'English'}.
3. Ignore placeholder dots like "........".
4. Preserve the original language of the CV text.

CV TEXT:
${rawText}`;

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${encodeURIComponent(apiKey.trim())}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { responseMimeType: 'application/json', temperature: 0.1 }
      })
    }
  );

  if (!res.ok) throw new Error('Gemini API request failed');
  const json = await res.json();
  const textOut = json?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!textOut) throw new Error('Empty AI response');

  const data = JSON.parse(textOut);
  const now = Date.now();
  const withIds = (arr, offset) => (Array.isArray(arr) ? arr.map((item, i) => ({ ...item, id: now + offset + i })) : []);

  const customSecs = Array.isArray(data.customSections)
    ? data.customSections
        .filter(c => c && (c.title || c.content))
        .map((c, i) => ({ id: `custom_${now}_${i}`, title: c.title || (isAr ? 'معلومات إضافية' : 'Additional Info'), content: c.content || '' }))
    : [];

  const cvData = {
    personal: { ...EMPTY_CV.personal, ...(data.personal || {}) },
    summary: { ...EMPTY_CV.summary, ...(data.summary || {}) },
    education: withIds(data.education, 100),
    experience: withIds(data.experience, 200),
    skills: withIds(data.skills, 300),
    certifications: withIds(data.certifications, 400),
    projects: withIds(data.projects, 500),
    languages: withIds(data.languages, 600),
    volunteering: withIds(data.volunteering, 700),
    references: withIds(data.references, 800),
    customSections: customSecs,
  };

  const newCustomSectionDefs = customSecs.map(c => ({
    id: c.id,
    labelAr: c.title,
    labelEn: c.title,
    visible: true,
    isCustom: true,
  }));

  return { cvData, newCustomSectionDefs };
}

// Responsive A4 Scaler (Multi-Page Support): dynamically measures full CV height so 2+ pages are NEVER clipped on screen or PDF print
function ResponsiveA4Frame({ children, zoomMultiplier = 1, isPrintable = false }) {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(360);
  const [contentHeight, setContentHeight] = useState(1123);
  const A4_WIDTH_PX = 794; // 210mm at 96dpi
  const A4_HEIGHT_PX = 1123; // 297mm at 96dpi

  useEffect(() => {
    const updateDims = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
      if (contentRef.current) {
        const h = contentRef.current.scrollHeight || contentRef.current.offsetHeight || A4_HEIGHT_PX;
        setContentHeight(Math.max(A4_HEIGHT_PX, h));
      }
    };
    updateDims();
    const ro = new ResizeObserver(updateDims);
    if (containerRef.current) ro.observe(containerRef.current);
    if (contentRef.current) ro.observe(contentRef.current);
    window.addEventListener('resize', updateDims);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', updateDims);
    };
  }, [children]);

  const fitScale = Math.min(1, (containerWidth - 8) / A4_WIDTH_PX);
  const finalScale = Math.max(0.28, fitScale * zoomMultiplier);
  const scaledW = Math.round(A4_WIDTH_PX * finalScale);
  const scaledH = Math.round(contentHeight * finalScale);
  const pageCount = Math.max(1, Math.ceil((contentHeight - 20) / A4_HEIGHT_PX));

  return (
    <div ref={containerRef} className="w-full flex flex-col items-center overflow-x-hidden print-main">
      {pageCount > 1 && (
        <div className="mb-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#2563EB] text-[11px] font-bold no-print">
          {pageCount} A4 Pages
        </div>
      )}
      <div
        className={`relative ${isPrintable ? 'print-reset-wrapper' : ''}`}
        style={{ width: `${scaledW}px`, height: `${scaledH}px` }}
      >
        <div
          ref={contentRef}
          className={isPrintable ? 'print-reset-wrapper' : ''}
          style={{
            width: `${A4_WIDTH_PX}px`,
            transform: `scale(${finalScale})`,
            transformOrigin: 'top left',
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        >
          {children}
          {/* Visual page-break guide lines on screen only */}
          {Array.from({ length: pageCount - 1 }).map((_, idx) => (
            <div
              key={idx}
              className="no-print pointer-events-none absolute left-0 right-0 border-t-2 border-dashed border-blue-400/70 flex justify-end"
              style={{ top: `${(idx + 1) * A4_HEIGHT_PX}px` }}
            >
              <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-b">
                Page {idx + 2}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Miniature Live Template Thumbnail for Cards
function TemplateThumbnail({ children }) {
  const boxRef = useRef(null);
  const [boxW, setBoxW] = useState(260);
  const A4_W = 794;

  useEffect(() => {
    const update = () => { if (boxRef.current) setBoxW(boxRef.current.clientWidth); };
    update();
    const ro = new ResizeObserver(update);
    if (boxRef.current) ro.observe(boxRef.current);
    return () => ro.disconnect();
  }, []);

  const scale = Math.max(0.2, boxW / A4_W);

  return (
    <div
      ref={boxRef}
      className="relative w-full h-56 sm:h-64 rounded-xl bg-white border border-slate-200 overflow-hidden shadow-inner pointer-events-none select-none"
    >
      <div
        style={{
          width: `${A4_W}px`,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default function App() {
  const [lang, setLang] = useState('ar');
  const [view, setView] = useState('landing');
  const [selectedTemplate, setSelectedTemplate] = useState('executive');
  const [previewTemplateModal, setPreviewTemplateModal] = useState(null);
  const [cv, setCv] = useState(EMPTY_CV);
  const [sections, setSections] = useState(DEFAULT_SECTIONS);
  const [activeSection, setActiveSection] = useState('personal');
  const [design, setDesign] = useState(DEFAULT_DESIGN);
  const [showDesignPanel, setShowDesignPanel] = useState(false);
  const [zoomMul, setZoomMul] = useState(1);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [mobileTab, setMobileTab] = useState('edit');
  const [openFaq, setOpenFaq] = useState(0);
  const [showClearModal, setShowClearModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [pasteText, setPasteText] = useState('');
  const [importingFile, setImportingFile] = useState(false);
  const [aiMode, setAiMode] = useState('local'); // local | gemini
  const [geminiApiKey, setGeminiApiKey] = useState('');
  const [aiConsent, setAiConsent] = useState(false);
  const [atsTemplate, setAtsTemplate] = useState('ats-harvard');
  const [jobDesc, setJobDesc] = useState('');
  const [toast, setToast] = useState('');

  const isAr = lang === 'ar';
  const dir = isAr ? 'rtl' : 'ltr';

  const notify = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const completeness = useMemo(() => {
    let score = 0;
    if (cv.personal.fullName) score += 20;
    if (cv.personal.jobTitle) score += 10;
    if (cv.personal.email || cv.personal.phone) score += 10;
    if (cv.summary.bio) score += 15;
    if (cv.experience.length > 0) score += 15;
    if (cv.education.length > 0) score += 15;
    if (cv.skills.length > 0) score += 10;
    if (cv.languages.length > 0 || cv.projects.length > 0 || cv.certifications.length > 0) score += 5;
    return Math.min(100, score);
  }, [cv]);


  const atsEval = useMemo(() => evaluateATSScore(cv, isAr), [cv, isAr]);
  const jdMatch = useMemo(() => matchJobDescription(cv, jobDesc), [cv, jobDesc]);

  const t = useMemo(() => ({
    navHome: isAr ? 'الرئيسية' : 'Home',
    navTemplates: isAr ? 'القوالب' : 'Templates',
    navFeatures: isAr ? 'المميزات' : 'Features',
    navHow: isAr ? 'كيفية الاستخدام' : 'How It Works',
    navFaq: isAr ? 'الأسئلة الشائعة' : 'FAQ',
    startNow: isAr ? 'ابدأ الآن' : 'Start Now',
    heroTitle: isAr ? 'سيرتك الذاتية... أول خطوة نحو مستقبلك المهني' : 'Your CV... The First Step Toward Your Future Career',
    heroDesc: isAr ? 'أنشئ سيرة ذاتية احترافية تعكس مهاراتك وخبراتك أو استورد سيرتك السابقة لتعديلها فورًا، بخصوصية تامة داخل متصفحك.' : 'Create a professional CV or import your existing CV to edit instantly, with 100% in-browser privacy.',
    ctaCreate: isAr ? 'أنشئ سيرتك الذاتية الآن' : 'Build Your CV Now',
    ctaImport: isAr ? 'استيراد سيرة سابقة' : 'Import Previous CV',
    ctaExplore: isAr ? 'استكشف القوالب' : 'Explore Templates',
    privacyBanner: isAr ? 'خصوصيتك أولويتنا. تتم معالجة بيانات سيرتك الذاتية داخل متصفحك فقط، ولا نقوم بحفظها على خوادمنا.' : 'Your privacy is our priority. Your CV data is processed strictly inside your browser and is never stored on any server.',
    loadSample: isAr ? 'بيانات تجريبية' : 'Sample Data',
    clearAll: isAr ? 'مسح الكل' : 'Clear All',
    downloadPdf: isAr ? 'تنزيل PDF' : 'Download PDF',
    downloadWord: isAr ? 'تنزيل Word' : 'Download Word',
    downloadJson: isAr ? 'حفظ نسخة بيانات (JSON)' : 'Save Data (JSON)',
    editCv: isAr ? 'تعديل السيرة' : 'Edit CV',
    changeTemplate: isAr ? 'تغيير القالب' : 'Change Template',
    exportReady: isAr ? 'مراجعة وتصدير السيرة الذاتية' : 'Review & Export Your CV',
  }), [isAr]);

  const updatePersonal = (field, value) => setCv(prev => ({ ...prev, personal: { ...prev.personal, [field]: value } }));
  const updateSummary = (field, value) => setCv(prev => ({ ...prev, summary: { ...prev.summary, [field]: value } }));
  const addItem = (key, templateObj) => setCv(prev => ({ ...prev, [key]: [...prev[key], { ...templateObj, id: Date.now() }] }));
  const updateItem = (key, id, field, value) => setCv(prev => ({ ...prev, [key]: prev[key].map(item => (item.id === id ? { ...item, [field]: value } : item)) }));
  const removeItem = (key, id) => setCv(prev => ({ ...prev, [key]: prev[key].filter(item => item.id !== id) }));

  const moveSection = (index, direction) => {
    const newArr = [...sections];
    const target = index + direction;
    if (target < 1 || target >= newArr.length) return;
    [newArr[index], newArr[target]] = [newArr[target], newArr[index]];
    setSections(newArr);
  };

  const toggleSectionVisibility = (id) => setSections(prev => prev.map(s => (s.id === id ? { ...s, visible: !s.visible } : s)));

  const addCustomSection = () => {
    const id = `custom_${Date.now()}`;
    const newSec = { id, title: isAr ? 'قسم مخصص جديد' : 'New Custom Section', content: '' };
    setCv(prev => ({ ...prev, customSections: [...prev.customSections, newSec] }));
    setSections(prev => [...prev, { id, labelAr: newSec.title, labelEn: newSec.title, visible: true, isCustom: true }]);
    setActiveSection(id);
  };

  const deleteCustomSection = (id) => {
    setCv(prev => ({ ...prev, customSections: prev.customSections.filter(c => c.id !== id) }));
    setSections(prev => prev.filter(s => s.id !== id));
    if (activeSection === id) setActiveSection('personal');
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      notify(isAr ? 'الرجاء اختيار ملف صورة صالح' : 'Please select a valid image file');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      notify(isAr ? 'حجم الصورة كبير جدًا (الحد الأقصى 5MB)' : 'Image too large (Max 5MB)');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      updatePersonal('photo', reader.result);
      setDesign(d => ({ ...d, showPhoto: true }));
      notify(isAr ? 'تمت إضافة الصورة الشخصية بنجاح' : 'Profile photo added');
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    updatePersonal('photo', '');
    notify(isAr ? 'تمت إزالة الصورة الشخصية' : 'Profile photo removed');
  };

  // Import previous CV file (.pdf, .docx, .doc, .html, .txt, .md, .json) 100% client-side
  const handleImportFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = '';
    setImportingFile(true);

    try {
      const lowerName = file.name.toLowerCase();

      if (lowerName.endsWith('.json')) {
        const content = await file.text();
        const data = JSON.parse(content);
        if (data.personal) {
          const merged = {
            ...EMPTY_CV,
            ...data,
            personal: { ...EMPTY_CV.personal, ...data.personal },
            summary: { ...EMPTY_CV.summary, ...(data.summary || {}) }
          };
          setCv(merged);
          if (Array.isArray(merged.customSections) && merged.customSections.length > 0) {
            setSections(prev => [
              ...prev.filter(s => !s.isCustom),
              ...merged.customSections.map(c => ({ id: c.id, labelAr: c.title, labelEn: c.title, visible: true, isCustom: true }))
            ]);
          }
          setShowImportModal(false);
          setView('builder');
          notify(isAr ? 'تم استيراد بيانات السيرة الذاتية بنجاح!' : 'CV data imported successfully!');
          return;
        }
        throw new Error('Invalid JSON');
      }

      let extractedText = '';
      if (lowerName.endsWith('.pdf')) {
        extractedText = await extractTextFromPDF(file);
      } else if (lowerName.endsWith('.docx')) {
        extractedText = await extractTextFromDOCX(file);
      } else {
        extractedText = await file.text();
      }

      if (!extractedText || !extractedText.trim()) {
        notify(isAr ? 'لم يتم العثور على نص قابل للقراءة داخل الملف (قد يكون PDF مصوّراً)' : 'No readable text found (PDF might be a scanned image)');
        return;
      }

      let parsedResult;
      if (aiMode === 'gemini' && geminiApiKey.trim() && aiConsent) {
        parsedResult = await parseCVWithGeminiAI(extractedText, geminiApiKey, isAr);
      } else {
        parsedResult = smartLocalAIParse(extractedText, isAr);
      }
      const { cvData, newCustomSectionDefs } = parsedResult;
      setCv(cvData);
      setSections(prev => [
        ...prev.filter(s => !s.isCustom),
        ...newCustomSectionDefs
      ]);
      setShowImportModal(false);
      setView('builder');
      notify(
        newCustomSectionDefs.length > 0
          ? (isAr ? `تم تحليل الملف وتوزيع البيانات + إضافة ${newCustomSectionDefs.length} قسم مخصص!` : `File parsed with ${newCustomSectionDefs.length} custom section(s)!`)
          : (isAr ? 'تم استيراد الملف وتوزيع جميع الأقسام تلقائيًا!' : 'File imported and all sections populated!')
      );
    } catch (err) {
      notify(isAr ? 'تعذّر قراءة هذا الملف. تأكد أنه PDF أو DOCX نصي سليم أو الصق النص بالأسفل.' : 'Could not read file. Ensure it is a valid text PDF/DOCX or paste text below.');
    } finally {
      setImportingFile(false);
    }
  };

  const handleImportPastedText = async () => {
    if (!pasteText.trim()) return;
    setImportingFile(true);
    try {
      let parsedResult;
      if (aiMode === 'gemini' && geminiApiKey.trim() && aiConsent) {
        parsedResult = await parseCVWithGeminiAI(pasteText, geminiApiKey, isAr);
      } else {
        parsedResult = smartLocalAIParse(pasteText, isAr);
      }
      const { cvData, newCustomSectionDefs } = parsedResult;
      setCv(cvData);
      setSections(prev => [
        ...prev.filter(s => !s.isCustom),
        ...newCustomSectionDefs
      ]);
      setPasteText('');
      setShowImportModal(false);
      setView('builder');
      notify(
        newCustomSectionDefs.length > 0
          ? (isAr ? `تم التحليل بالذكاء الاصطناعي وتوزيع البيانات + ${newCustomSectionDefs.length} قسم مخصص!` : `AI parsed with ${newCustomSectionDefs.length} custom section(s)!`)
          : (isAr ? 'تم التحليل بالذكاء الاصطناعي وتوزيع جميع الحقول بدقة!' : 'AI parsed and populated all fields!')
      );
    } catch {
      notify(isAr ? 'تعذّر الاتصال بـ Gemini AI. تأكد من مفتاح API أو استخدم المحلل المحلي.' : 'Gemini AI error. Check API key or switch to Local AI.');
    } finally {
      setImportingFile(false);
    }
  };

  const handleExportJSON = () => {
    const blob = new Blob([JSON.stringify(cv, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${(cv.personal.fullName || 'AYASH_CV_DATA').replace(/\s+/g, '_')}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    notify(isAr ? 'تم حفظ نسخة بياناتك (JSON) على جهازك' : 'CV backup (JSON) saved');
  };

  const handleExportPDF = () => window.print();

  const handleExportWord = () => {
    const accent = selectedTemplate === 'ats' ? '#0B1020' : selectedTemplate === 'medical' ? '#0F766E' : design.accentColor;
    const align = isAr ? 'right' : 'left';
    const visibleMap = Object.fromEntries(sections.map(s => [s.id, s.visible]));
    const showImg = design.showPhoto && cv.personal.photo && selectedTemplate !== 'ats';
    const imgSizePx = design.photoSize === 'sm' ? 70 : design.photoSize === 'lg' ? 110 : 90;

    const contacts = [
      cv.personal.email, cv.personal.phone, cv.personal.location,
      cv.personal.address, cv.personal.linkedin, cv.personal.github, cv.personal.website
    ].filter(Boolean).map(escapeHtml).join(' &nbsp;|&nbsp; ');

    const sectionTitle = (title) =>
      `<h2 style="color:${accent};font-size:13pt;border-bottom:2px solid ${accent};padding-bottom:4px;margin-top:16px;margin-bottom:8px;text-align:${align};">${escapeHtml(title)}</h2>`;

    const blocks = sections.filter(s => s.id !== 'personal' && visibleMap[s.id]).map(s => {
      const id = s.id;
      if (id === 'summary' && (cv.summary.bio || cv.summary.objective)) {
        return `${sectionTitle(isAr ? 'النبذة المهنية' : 'Professional Summary')}
          ${cv.summary.bio ? `<p style="margin:4px 0;line-height:1.6;">${escapeHtml(cv.summary.bio)}</p>` : ''}
          ${cv.summary.objective ? `<p style="margin:4px 0;color:#475569;">${escapeHtml(cv.summary.objective)}</p>` : ''}`;
      }
      if (id === 'experience' && cv.experience.length > 0) {
        return `${sectionTitle(isAr ? 'الخبرات المهنية' : 'Work Experience')}
          ${cv.experience.map(e => `
            <div style="margin-bottom:10px;">
              <p style="margin:0;font-weight:bold;font-size:11.5pt;">${escapeHtml(e.role)} <span style="font-weight:normal;color:#64748b;font-size:10pt;">(${escapeHtml(e.start)}${e.end ? ` - ${escapeHtml(e.end)}` : ''})</span></p>
              <p style="margin:2px 0;color:${accent};font-weight:bold;font-size:10.5pt;">${escapeHtml(e.company)}${e.location ? ` — ${escapeHtml(e.location)}` : ''}</p>
              ${e.description ? `<p style="margin:3px 0;line-height:1.5;">${escapeHtml(e.description)}</p>` : ''}
              ${e.achievements ? `<p style="margin:2px 0;color:#334155;font-size:10pt;">★ ${escapeHtml(e.achievements)}</p>` : ''}
            </div>`).join('')}`;
      }
      if (id === 'education' && cv.education.length > 0) {
        return `${sectionTitle(isAr ? 'التعليم' : 'Education')}
          ${cv.education.map(ed => `
            <div style="margin-bottom:8px;">
              <p style="margin:0;font-weight:bold;">${escapeHtml(ed.degree)} ${ed.major ? `- ${escapeHtml(ed.major)}` : ''} <span style="font-weight:normal;color:#64748b;font-size:10pt;">(${escapeHtml(ed.start)}${ed.end ? ` - ${escapeHtml(ed.end)}` : ''})</span></p>
              <p style="margin:2px 0;color:#475569;font-size:10.5pt;">${escapeHtml(ed.institution)}${ed.gpa ? ` — ${escapeHtml(ed.gpa)}` : ''}</p>
            </div>`).join('')}`;
      }
      if (id === 'skills' && cv.skills.length > 0) {
        return `${sectionTitle(isAr ? 'المهارات' : 'Skills')}
          <p style="margin:4px 0;line-height:1.8;">${cv.skills.map(sk => `<span style="background:#f1f5f9;border:1px solid #cbd5e1;padding:2px 8px;margin:2px;">${escapeHtml(sk.name)}${sk.level ? ` (${escapeHtml(sk.level)})` : ''}</span>`).join(' &nbsp; ')}</p>`;
      }
      if (id === 'projects' && cv.projects.length > 0) {
        return `${sectionTitle(isAr ? 'المشاريع' : 'Projects')}
          ${cv.projects.map(p => `<div style="margin-bottom:8px;"><p style="margin:0;font-weight:bold;">${escapeHtml(p.name)}</p>${p.tech ? `<p style="margin:2px 0;color:${accent};font-size:10pt;">${escapeHtml(p.tech)}</p>` : ''}${p.description ? `<p style="margin:2px 0;">${escapeHtml(p.description)}</p>` : ''}</div>`).join('')}`;
      }
      if (id === 'certifications' && cv.certifications.length > 0) {
        return `${sectionTitle(isAr ? 'الدورات والشهادات' : 'Certifications')}
          <ul style="margin:4px 0;padding-${align}:18px;">${cv.certifications.map(c => `<li style="margin-bottom:4px;"><b>${escapeHtml(c.title)}</b> — ${escapeHtml(c.issuer)}${c.date ? ` (${escapeHtml(c.date)})` : ''}</li>`).join('')}</ul>`;
      }
      if (id === 'languages' && cv.languages.length > 0) {
        return `${sectionTitle(isAr ? 'اللغات' : 'Languages')}<p style="margin:4px 0;">${cv.languages.map(l => `<b>${escapeHtml(l.name)}:</b> ${escapeHtml(l.level)}`).join(' &nbsp;|&nbsp; ')}</p>`;
      }
      if (id === 'volunteering' && cv.volunteering.length > 0) {
        return `${sectionTitle(isAr ? 'الأعمال التطوعية' : 'Volunteering')}${cv.volunteering.map(v => `<p style="margin:4px 0;"><b>${escapeHtml(v.title)}</b> — ${escapeHtml(v.org)}${v.period ? ` (${escapeHtml(v.period)})` : ''}</p>`).join('')}`;
      }
      if (id === 'references' && cv.references.length > 0) {
        return `${sectionTitle(isAr ? 'المراجع' : 'References')}${cv.references.map(r => `<p style="margin:3px 0;"><b>${escapeHtml(r.name)}</b>${r.role ? ` — ${escapeHtml(r.role)}` : ''}${r.contact ? ` — ${escapeHtml(r.contact)}` : ''}</p>`).join('')}`;
      }
      const custom = cv.customSections.find(c => c.id === id);
      if (custom && (custom.title || custom.content)) {
        return `${sectionTitle(custom.title)}<p style="margin:4px 0;white-space:pre-line;">${escapeHtml(custom.content)}</p>`;
      }
      return '';
    }).join('');

    const wordHtml = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40" dir="${dir}" lang="${lang}">
      <head><meta charset="utf-8" /><title>${escapeHtml(cv.personal.fullName || 'AYASH CV STUDIO')}</title>
      <style>@page { size: A4; margin: 1.5cm; } body { font-family: '${design.fontFamily}', 'Arial', sans-serif; direction: ${dir}; text-align: ${align}; color: #0B1020; font-size: 11pt; }</style></head>
      <body>
        <table width="100%" cellpadding="0" cellspacing="0" style="border-bottom:3px solid ${accent};padding-bottom:10px;margin-bottom:12px;">
          <tr>
            ${showImg ? `<td width="${imgSizePx + 16}" valign="middle"><img src="${cv.personal.photo}" width="${imgSizePx}" height="${imgSizePx}" style="object-fit:cover;" /></td>` : ''}
            <td valign="middle" style="text-align:${align};">
              <h1 style="margin:0;font-size:20pt;color:#0B1020;">${escapeHtml(cv.personal.fullName || (isAr ? 'الاسم الكامل' : 'Full Name'))}</h1>
              <p style="margin:4px 0;font-size:12pt;font-weight:bold;color:${accent};">${escapeHtml(cv.personal.jobTitle || '')}</p>
              ${contacts ? `<p style="margin:4px 0;font-size:9.5pt;color:#475569;">${contacts}</p>` : ''}
            </td>
          </tr>
        </table>
        ${blocks}
      </body></html>`;

    const blob = new Blob(['\ufeff', wordHtml], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${(cv.personal.fullName || 'AYASH_CV').replace(/\s+/g, '_')}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    notify(isAr ? 'تم تنزيل ملف Word المنسّق بنجاح' : 'Formatted Word file downloaded');
  };

  const activeIdx = sections.findIndex(s => s.id === activeSection);
  const goPrevSection = () => { if (activeIdx > 0) setActiveSection(sections[activeIdx - 1].id); };
  const goNextSection = () => { if (activeIdx < sections.length - 1) setActiveSection(sections[activeIdx + 1].id); };

  const renderCVDocument = (data = cv, tplId = selectedTemplate, mini = false) => {
    const isAtsTpl = tplId === 'ats' || tplId.startsWith('ats-');
    const accent = isAtsTpl ? '#000000' : tplId === 'medical' ? '#0F766E' : design.accentColor;
    const fontClass = design.fontFamily === 'IBM Plex Sans Arabic' ? 'font-ibm' : design.fontFamily === 'Inter' ? 'font-inter' : 'font-cairo';
    const padClass = design.margins === 'compact' ? 'p-5' : design.margins === 'wide' ? 'p-10' : 'p-7';
    const gapClass = design.spacing === 'compact' ? 'space-y-3' : design.spacing === 'relaxed' ? 'space-y-6' : 'space-y-4';
    const textSize = design.fontSize === 'sm' ? 'text-xs' : design.fontSize === 'lg' ? 'text-base' : 'text-sm';

    const visibleMap = Object.fromEntries(sections.map(s => [s.id, s.visible]));
    const photoShapeCls = design.photoShape === 'rounded' ? 'rounded-2xl' : design.photoShape === 'square' ? 'rounded-none' : 'rounded-full';
    const photoSizeCls = design.photoSize === 'sm' ? 'w-16 h-16' : design.photoSize === 'lg' ? 'w-28 h-28' : 'w-[88px] h-[88px]';

    const headingCls =
      design.headingStyle === 'pill' && !isAtsTpl
        ? 'inline-block px-3 py-0.5 rounded-full text-white font-bold text-xs uppercase tracking-wider mb-2'
        : design.headingStyle === 'left-bar' && !isAtsTpl
        ? `font-bold text-sm uppercase tracking-wide mb-2 ${isAr ? 'border-r-4 pr-2' : 'border-l-4 pl-2'}`
        : 'font-bold text-sm uppercase tracking-wide pb-1 mb-2 border-b-2';

    const headingStyleObj =
      design.headingStyle === 'pill' && !isAtsTpl
        ? { backgroundColor: accent }
        : { color: accent, borderColor: accent };

    const getOrderedSectionIds = () => {
      const base = sections.filter(s => s.id !== 'personal').map(s => s.id);
      if (tplId === 'academic') {
        const prio = ['summary', 'education', 'certifications', 'projects', 'experience'];
        return [...prio.filter(id => base.includes(id)), ...base.filter(id => !prio.includes(id))];
      }
      if (tplId === 'graduate') {
        const prio = ['summary', 'education', 'projects', 'skills', 'volunteering', 'experience'];
        return [...prio.filter(id => base.includes(id)), ...base.filter(id => !prio.includes(id))];
      }
      if (tplId === 'technical') {
        const prio = ['summary', 'skills', 'projects', 'experience', 'education'];
        return [...prio.filter(id => base.includes(id)), ...base.filter(id => !prio.includes(id))];
      }
      return base;
    };

    const renderSectionBlock = (secId, darkSide = false) => {
      if (!mini && !visibleMap[secId]) return null;
      const hCls = darkSide ? 'font-bold text-xs uppercase tracking-wider pb-1 mb-2 border-b border-white/30 text-white' : headingCls;
      const hSty = darkSide ? {} : headingStyleObj;
      const txtMain = darkSide ? 'text-white' : 'text-[#0B1020]';
      const txtSub = darkSide ? 'text-white/80' : 'text-slate-600';

      if (secId === 'summary' && (data.summary.bio || data.summary.objective)) {
        return (
          <div key="summary">
            <h3 className={hCls} style={hSty}>{isAr ? 'النبذة المهنية' : 'Professional Summary'}</h3>
            {data.summary.bio && <p className={`${darkSide ? 'text-white/90' : 'text-slate-700'} leading-relaxed`}>{data.summary.bio}</p>}
            {data.summary.objective && <p className={`${txtSub} mt-1 text-xs`}>{data.summary.objective}</p>}
          </div>
        );
      }
      if (secId === 'experience' && data.experience.length > 0) {
        return (
          <div key="experience">
            <h3 className={hCls} style={hSty}>{isAr ? 'الخبرات المهنية' : 'Work Experience'}</h3>
            <div className="space-y-3">
              {data.experience.map(exp => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline flex-wrap gap-1">
                    <span className={`font-bold ${txtMain}`}>{exp.role || (isAr ? 'المسمى الوظيفي' : 'Job Title')}</span>
                    <span className="text-xs text-slate-500">{exp.start} {exp.end ? `- ${exp.end}` : ''}</span>
                  </div>
                  <div className="text-xs font-semibold" style={{ color: darkSide ? '#E2E8F0' : accent }}>{exp.company} {exp.location ? `• ${exp.location}` : ''}</div>
                  {exp.description && <p className="text-slate-700 mt-1 leading-relaxed">{exp.description}</p>}
                  {exp.achievements && <p className="text-slate-600 text-xs mt-1">★ {exp.achievements}</p>}
                </div>
              ))}
            </div>
          </div>
        );
      }
      if (secId === 'education' && data.education.length > 0) {
        return (
          <div key="education">
            <h3 className={hCls} style={hSty}>{isAr ? 'التعليم' : 'Education'}</h3>
            <div className="space-y-2">
              {data.education.map(edu => (
                <div key={edu.id}>
                  <div className="flex justify-between items-baseline flex-wrap">
                    <span className={`font-bold ${txtMain}`}>{edu.degree} {edu.major ? `- ${edu.major}` : ''}</span>
                    <span className={`text-xs ${txtSub}`}>{edu.start} {edu.end ? `- ${edu.end}` : ''}</span>
                  </div>
                  <div className={`text-xs ${txtSub}`}>{edu.institution} {edu.gpa ? `• ${edu.gpa}` : ''}</div>
                </div>
              ))}
            </div>
          </div>
        );
      }
      if (secId === 'skills' && data.skills.length > 0) {
        const grouped = data.skills.reduce((acc, sk) => {
          const cat = sk.category || (isAr ? 'عامة' : 'General');
          if (!acc[cat]) acc[cat] = [];
          acc[cat].push(sk);
          return acc;
        }, {});
        const cats = Object.keys(grouped);
        return (
          <div key="skills">
            <h3 className={hCls} style={hSty}>{isAr ? 'المهارات' : 'Skills'}</h3>
            <div className="space-y-2">
              {cats.map(cat => (
                <div key={cat}>
                  {cats.length > 1 && <div className={`text-[11px] font-bold mb-1 ${txtSub}`}>{cat}</div>}
                  <div className="flex flex-wrap gap-1.5">
                    {grouped[cat].map(sk => (
                      <span key={sk.id} className={`px-2.5 py-0.5 rounded-md text-xs font-medium ${darkSide ? 'bg-white/15 text-white border border-white/20' : 'bg-slate-100 text-slate-800 border border-slate-200'}`}>
                        {sk.name} {sk.level ? `(${sk.level})` : ''}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      }
      if (secId === 'projects' && data.projects.length > 0) {
        return (
          <div key="projects">
            <h3 className={hCls} style={hSty}>{isAr ? 'المشاريع' : 'Projects'}</h3>
            <div className="space-y-2">
              {data.projects.map(pr => (
                <div key={pr.id}>
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className={`font-bold ${txtMain}`}>{pr.name}</span>
                    {pr.link && <span className="text-[11px] text-blue-600 font-mono">{pr.link}</span>}
                  </div>
                  {pr.tech && <div className="text-xs font-mono" style={{ color: accent }}>{pr.tech}</div>}
                  {pr.description && <p className="text-slate-700 text-xs mt-0.5">{pr.description}</p>}
                </div>
              ))}
            </div>
          </div>
        );
      }
      if (secId === 'certifications' && data.certifications.length > 0) {
        return (
          <div key="certifications">
            <h3 className={hCls} style={hSty}>{isAr ? 'الدورات والشهادات' : 'Certifications'}</h3>
            <ul className="space-y-1">
              {data.certifications.map(c => (
                <li key={c.id} className={`text-xs ${darkSide ? 'text-white/90' : 'text-slate-700'}`}>
                  <span className={`font-bold ${txtMain}`}>{c.title}</span> — {c.issuer} {c.date ? `(${c.date})` : ''}
                </li>
              ))}
            </ul>
          </div>
        );
      }
      if (secId === 'languages' && data.languages.length > 0) {
        return (
          <div key="languages">
            <h3 className={hCls} style={hSty}>{isAr ? 'اللغات' : 'Languages'}</h3>
            <div className="flex flex-wrap gap-3">
              {data.languages.map(l => (
                <div key={l.id} className={`text-xs ${txtMain}`}><span className="font-bold">{l.name}:</span> <span className={txtSub}>{l.level}</span></div>
              ))}
            </div>
          </div>
        );
      }
      if (secId === 'volunteering' && data.volunteering.length > 0) {
        return (
          <div key="volunteering">
            <h3 className={hCls} style={hSty}>{isAr ? 'الأعمال التطوعية' : 'Volunteering'}</h3>
            <div className="space-y-1.5">
              {data.volunteering.map(v => (
                <div key={v.id} className="text-xs">
                  <span className={`font-bold ${txtMain}`}>{v.title}</span> — {v.org} {v.period ? `(${v.period})` : ''}
                  {v.details && <p className={txtSub}>{v.details}</p>}
                </div>
              ))}
            </div>
          </div>
        );
      }
      if (secId === 'references' && data.references.length > 0) {
        return (
          <div key="references">
            <h3 className={hCls} style={hSty}>{isAr ? 'المراجع' : 'References'}</h3>
            <div className="space-y-1">
              {data.references.map(r => (
                <div key={r.id} className={`text-xs ${txtMain}`}><span className="font-bold">{r.name}</span> {r.role ? `• ${r.role}` : ''} {r.contact ? `• ${r.contact}` : ''}</div>
              ))}
            </div>
          </div>
        );
      }
      const custom = data.customSections?.find(c => c.id === secId);
      if (custom && (custom.title || custom.content)) {
        return (
          <div key={custom.id}>
            <h3 className={hCls} style={hSty}>{custom.title}</h3>
            <p className="text-slate-700 whitespace-pre-line">{custom.content}</p>
          </div>
        );
      }
      return null;
    };

    const contactItems = [
      data.personal.email, data.personal.phone, data.personal.location,
      data.personal.address, data.personal.linkedin, data.personal.github, data.personal.website
    ].filter(Boolean);

    const orderedIds = getOrderedSectionIds();
    const showPhotoHere = design.showPhoto && data.personal.photo && !isAtsTpl;

    
    // PURE ELITE ATS TEMPLATES (Single-column, zero photo, 100% ATS-scanner compliant)
    if (tplId === 'ats-harvard' || tplId === 'ats-executive' || tplId === 'ats-tech') {
      const isCentered = tplId === 'ats-harvard';
      const atsOrder = tplId === 'ats-tech'
        ? ['summary', 'skills', 'projects', 'experience', 'education', 'certifications', 'languages', 'volunteering', 'references']
        : ['summary', 'experience', 'education', 'skills', 'projects', 'certifications', 'languages', 'volunteering', 'references'];
      const customIds = (data.customSections || []).map(c => c.id);
      const finalAtsIds = [...atsOrder, ...customIds];

      return (
        <div id={mini ? undefined : 'cv-a4-preview'} dir={dir} className={`bg-white text-black ${fontClass} ${textSize} w-full min-h-[297mm] shadow-xl border border-slate-200 print-container p-8 space-y-4`}>
          <div className={`${isCentered ? 'text-center' : 'text-start'} pb-3 border-b-2 border-black`}>
            <h1 className="text-2xl font-extrabold uppercase tracking-wide text-black">
              {data.personal.fullName || (isAr ? 'الاسم الكامل' : 'YOUR FULL NAME')}
            </h1>
            {data.personal.jobTitle && (
              <p className="text-sm font-bold text-slate-800 mt-0.5">{data.personal.jobTitle}</p>
            )}
            {contactItems.length > 0 && (
              <div className={`flex flex-wrap ${isCentered ? 'justify-center' : 'justify-start'} gap-x-2 gap-y-0.5 mt-1.5 text-xs text-slate-800`}>
                {contactItems.map((item, idx) => <span key={idx}>{idx > 0 ? ' | ' : ''}{item}</span>)}
              </div>
            )}
          </div>
          <div className="space-y-4">
            {finalAtsIds.map(id => renderSectionBlock(id))}
          </div>
        </div>
      );
    }

    if (tplId === 'creative') {
      const sideIds = ['skills', 'languages', 'certifications', 'references'];
      return (
        <div id={mini ? undefined : 'cv-a4-preview'} dir={dir} className={`bg-white text-[#0B1020] ${fontClass} ${textSize} w-full min-h-[297mm] shadow-xl border border-slate-200 print-container grid grid-cols-12`}>
          <div className={`col-span-4 text-white ${padClass} ${gapClass}`} style={{ backgroundColor: accent }}>
            <div className="text-center space-y-2 pb-4 border-b border-white/25">
              {showPhotoHere && <img src={data.personal.photo} alt="Profile" className={`${photoSizeCls} ${photoShapeCls} object-cover border-4 border-white/80 shadow-lg mx-auto`} />}
              <h1 className="text-xl font-extrabold">{data.personal.fullName || (isAr ? 'الاسم الكامل' : 'Full Name')}</h1>
              <p className="text-xs text-white/85 font-semibold">{data.personal.jobTitle || (isAr ? 'المسمى الوظيفي' : 'Job Title')}</p>
            </div>
            {contactItems.length > 0 && (
              <div className="space-y-1 text-[11px] text-white/90">
                {contactItems.map((item, idx) => <div key={idx} className="truncate">• {item}</div>)}
              </div>
            )}
            {sideIds.map(id => renderSectionBlock(id, true))}
          </div>
          <div className={`col-span-8 ${padClass} ${gapClass}`}>
            {orderedIds.filter(id => !sideIds.includes(id)).map(id => renderSectionBlock(id, false))}
          </div>
        </div>
      );
    }

    if (tplId === 'classic' || tplId === 'academic') {
      return (
        <div id={mini ? undefined : 'cv-a4-preview'} dir={dir} className={`bg-white text-[#0B1020] ${fontClass} ${textSize} w-full min-h-[297mm] shadow-xl border border-slate-200 print-container`}>
          <div className={`${padClass} text-center border-b-4 border-double`} style={{ borderColor: accent }}>
            {showPhotoHere && <img src={data.personal.photo} alt="Profile" className={`${photoSizeCls} ${photoShapeCls} object-cover border-2 border-slate-200 shadow mx-auto mb-3`} />}
            <h1 className="text-2xl font-extrabold text-[#0B1020]">{data.personal.fullName || (isAr ? 'الاسم الكامل' : 'Your Full Name')}</h1>
            <p className="text-sm font-semibold mt-1" style={{ color: accent }}>{data.personal.jobTitle || (isAr ? 'المسمى الوظيفي' : 'Job Title')}</p>
            {contactItems.length > 0 && (
              <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 mt-2 text-xs text-slate-600">
                {contactItems.map((item, idx) => <span key={idx}>{idx > 0 ? ' | ' : ''}{item}</span>)}
              </div>
            )}
          </div>
          <div className={`${padClass} ${gapClass}`}>{orderedIds.map(id => renderSectionBlock(id))}</div>
        </div>
      );
    }

    if (tplId === 'minimal') {
      return (
        <div id={mini ? undefined : 'cv-a4-preview'} dir={dir} className={`bg-white text-[#0B1020] ${fontClass} ${textSize} w-full min-h-[297mm] shadow-xl border border-slate-200 print-container`}>
          <div className={`${padClass} flex items-center justify-between gap-4 border-b border-slate-200`}>
            <div className="flex items-center gap-4">
              {showPhotoHere && <img src={data.personal.photo} alt="Profile" className={`${photoSizeCls} ${photoShapeCls} object-cover border border-slate-200 shrink-0`} />}
              <div>
                <h1 className="text-2xl font-extrabold tracking-tight">{data.personal.fullName || (isAr ? 'الاسم الكامل' : 'Your Full Name')}</h1>
                <p className="text-sm text-slate-500 font-medium mt-0.5">{data.personal.jobTitle || (isAr ? 'المسمى الوظيفي' : 'Job Title')}</p>
              </div>
            </div>
            <div className="text-[11px] text-slate-500 text-end space-y-0.5">
              {contactItems.slice(0, 4).map((item, idx) => <div key={idx}>{item}</div>)}
            </div>
          </div>
          <div className={`${padClass} ${gapClass}`}>{orderedIds.map(id => renderSectionBlock(id))}</div>
        </div>
      );
    }

    if (tplId === 'international') {
      const bottomIds = ['skills', 'languages'];
      return (
        <div id={mini ? undefined : 'cv-a4-preview'} dir={dir} className={`bg-white text-[#0B1020] ${fontClass} ${textSize} w-full min-h-[297mm] shadow-xl border border-slate-200 print-container ${padClass} ${gapClass}`}>
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-4">
            {showPhotoHere && <img src={data.personal.photo} alt="Profile" className={`${photoSizeCls} ${photoShapeCls} object-cover border-2 border-white shadow shrink-0`} />}
            <div>
              <h1 className="text-2xl font-extrabold text-[#0B1020]">{data.personal.fullName || (isAr ? 'الاسم الكامل' : 'Your Full Name')}</h1>
              <p className="text-sm font-bold mt-0.5" style={{ color: accent }}>{data.personal.jobTitle || (isAr ? 'المسمى الوظيفي' : 'Job Title')}</p>
              {contactItems.length > 0 && (
                <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2 text-xs text-slate-600">
                  {contactItems.map((item, idx) => <span key={idx}>• {item}</span>)}
                </div>
              )}
            </div>
          </div>
          <div className={gapClass}>{orderedIds.filter(id => !bottomIds.includes(id)).map(id => renderSectionBlock(id))}</div>
          <div className="grid grid-cols-2 gap-6 pt-2 border-t border-slate-200">
            {bottomIds.map(id => <div key={id}>{renderSectionBlock(id)}</div>)}
          </div>
        </div>
      );
    }

    const isSidebarTemplate = ['executive', 'technical', 'medical'].includes(tplId);
    const headerBg = tplId === 'executive' ? '#0B1020' : tplId === 'technical' ? '#0F172A' : tplId === 'medical' ? '#F0FDFA' : tplId === 'graduate' ? '#EFF6FF' : 'transparent';
    const headerDark = ['executive', 'technical'].includes(tplId);

    return (
      <div id={mini ? undefined : 'cv-a4-preview'} dir={dir} className={`bg-white text-[#0B1020] ${fontClass} ${textSize} w-full min-h-[297mm] shadow-xl border border-slate-200 print-container`}>
        {tplId === 'medical' && <div className="h-2.5 w-full bg-[#0F766E]" />}
        {tplId === 'graduate' && <div className="h-2 w-full" style={{ backgroundColor: accent }} />}
        <div className={`${padClass} ${headerDark ? 'text-white' : 'border-b-2'}`} style={{ backgroundColor: headerBg, borderColor: headerDark ? 'transparent' : accent }}>
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {showPhotoHere && <img src={data.personal.photo} alt="Profile" className={`${photoSizeCls} ${photoShapeCls} object-cover border-2 ${headerDark ? 'border-white/80' : 'border-slate-200'} shadow-md shrink-0`} />}
              <div>
                <h1 className={`text-2xl font-extrabold ${headerDark ? 'text-white' : 'text-[#0B1020]'}`}>{data.personal.fullName || (isAr ? 'الاسم الكامل' : 'Your Full Name')}</h1>
                <p className={`text-sm font-semibold mt-0.5 ${headerDark ? 'text-blue-200' : ''}`} style={!headerDark ? { color: accent } : {}}>{data.personal.jobTitle || (isAr ? 'المسمى الوظيفي' : 'Job Title')}</p>
              </div>
            </div>
            {tplId === 'technical' && <div className="text-[11px] font-mono bg-white/10 px-2.5 py-1 rounded text-blue-200 shrink-0">{'<DEV_CV />'}</div>}
          </div>
          {contactItems.length > 0 && (
            <div className={`flex flex-wrap gap-x-4 gap-y-1 mt-3 text-xs ${headerDark ? 'text-slate-200' : 'text-slate-600'}`}>
              {contactItems.map((item, idx) => <span key={idx}>• {item}</span>)}
            </div>
          )}
        </div>
        {isSidebarTemplate ? (
          <div className="grid grid-cols-12 min-h-[230mm]">
            <div className={`col-span-4 bg-slate-50 ${padClass} ${gapClass} border-e border-slate-200`}>
              {['skills', 'languages', 'certifications', 'references'].map(id => renderSectionBlock(id))}
            </div>
            <div className={`col-span-8 ${padClass} ${gapClass}`}>
              {orderedIds.filter(id => !['skills', 'languages', 'certifications', 'references'].includes(id)).map(id => renderSectionBlock(id))}
            </div>
          </div>
        ) : (
          <div className={`${padClass} ${gapClass}`}>{orderedIds.map(id => renderSectionBlock(id))}</div>
        )}
      </div>
    );
  };

  return (
    <div dir={dir} className="min-h-screen w-full overflow-x-hidden bg-[#F5F7FB] text-[#0B1020] flex flex-col">
      {toast && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 bg-[#0B1020] text-white px-5 py-2.5 rounded-xl shadow-2xl text-xs font-bold flex items-center gap-2 no-print max-w-[90vw]">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="truncate">{toast}</span>
        </div>
      )}

      {/* Navbar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-2">
          <button onClick={() => setView('landing')} className="flex items-center gap-2 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0B1020] via-[#2563EB] to-[#7C3AED] flex items-center justify-center text-white font-extrabold shadow shrink-0">
              A
            </div>
            <div className="text-start truncate">
              <div className="font-extrabold text-sm sm:text-base tracking-tight text-[#0B1020] truncate">AYASH CV STUDIO</div>
              <div className="text-[10px] text-slate-500 font-mono truncate">Code meets intelligence</div>
            </div>
          </button>

          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-700">
            <button onClick={() => setView('landing')} className="hover:text-[#2563EB] transition">{t.navHome}</button>
            <button onClick={() => setView('templates')} className="hover:text-[#2563EB] transition">{t.navTemplates}</button>
            <button onClick={() => { setSelectedTemplate(atsTemplate); setView('ats'); }} className={`px-3 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition ${view === 'ats' ? 'bg-[#0B1020] text-white shadow' : 'bg-[#0B1020]/5 text-[#0B1020] border border-[#0B1020]/20 hover:bg-[#0B1020] hover:text-white'}`}>
              <ShieldCheck className="w-4 h-4 text-[#2563EB]" /> {isAr ? 'بوابة ATS الاحترافية' : 'ATS Pro Studio'}
            </button>
            <button onClick={() => setShowImportModal(true)} className="hover:text-[#2563EB] transition flex items-center gap-1"><FileUp className="w-4 h-4" />{t.ctaImport}</button>
            <button onClick={() => { setView('landing'); setTimeout(() => document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' }), 50); }} className="hover:text-[#2563EB] transition">{t.navFaq}</button>
          </nav>

          <div className="flex items-center gap-2 shrink-0">
            <button onClick={() => setLang(isAr ? 'en' : 'ar')} className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-bold hover:bg-slate-50">
              <Globe className="w-3.5 h-3.5 text-[#2563EB]" />
              {isAr ? 'EN' : 'عربي'}
            </button>
            <button onClick={() => setView('builder')} className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white text-xs font-bold shadow hover:opacity-95 transition">
              <Sparkles className="w-4 h-4" /> {t.startNow}
            </button>
            <button onClick={() => setMobileMenu(!mobileMenu)} className="md:hidden p-2 rounded-lg border border-slate-200">
              {mobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {mobileMenu && (
          <div className="md:hidden bg-white border-t border-slate-200 px-4 py-3 space-y-2 text-sm font-semibold">
            <button onClick={() => { setView('landing'); setMobileMenu(false); }} className="block w-full text-start py-1.5">{t.navHome}</button>
            <button onClick={() => { setView('templates'); setMobileMenu(false); }} className="block w-full text-start py-1.5">{t.navTemplates}</button>
            <button onClick={() => { setSelectedTemplate(atsTemplate); setView('ats'); setMobileMenu(false); }} className="block w-full text-start py-1.5 font-extrabold text-[#0B1020] flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-[#2563EB]" /> {isAr ? 'بوابة ATS الاحترافية' : 'ATS Pro Studio'}</button>
            <button onClick={() => { setShowImportModal(true); setMobileMenu(false); }} className="block w-full text-start py-1.5 text-[#7C3AED]">{t.ctaImport}</button>
            <button onClick={() => { setView('builder'); setMobileMenu(false); }} className="block w-full text-start py-1.5 text-[#2563EB]">{t.startNow}</button>
          </div>
        )}
      </header>

      {/* Privacy Strip */}
      <div className="bg-[#0B1020] text-slate-200 text-[11px] sm:text-xs py-2 px-3 text-center flex items-center justify-center gap-2 no-print">
        <Lock className="w-3.5 h-3.5 text-[#7C3AED] shrink-0" />
        <span>{t.privacyBanner}</span>
      </div>

      {/* LANDING VIEW */}
      {view === 'landing' && (
        <main className="flex-1 w-full">
          <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 lg:py-16 grid lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#2563EB] text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                Build Your Career. Design Your Future.
              </div>
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-[#0B1020]">
                {t.heroTitle}
              </h1>
              <p className="text-slate-600 text-sm sm:text-base lg:text-lg leading-relaxed">
                {t.heroDesc}
              </p>
              <div className="flex flex-wrap gap-3">
                <button onClick={() => setView('builder')} className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white text-sm font-bold shadow-lg shadow-blue-500/20 hover:opacity-95 transition flex items-center gap-2">
                  {t.ctaCreate} {isAr ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </button>
                <button onClick={() => setShowImportModal(true)} className="px-5 py-3 rounded-xl bg-white border-2 border-[#2563EB] text-[#2563EB] text-sm font-bold hover:bg-blue-50 transition flex items-center gap-2">
                  <FileUp className="w-4 h-4" /> {t.ctaImport}
                </button>
                <button onClick={() => setView('templates')} className="px-5 py-3 rounded-xl bg-white border border-slate-200 text-sm font-bold text-[#0B1020] hover:border-[#2563EB] transition">
                  {t.ctaExplore}
                </button>
              </div>
            </div>

            {/* Live Real CV Preview in Hero */}
            <div className="w-full max-w-md mx-auto lg:max-w-none">
              <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-3">
                <TemplateThumbnail>
                  {renderCVDocument(isAr ? SAMPLE_CV_AR : SAMPLE_CV_EN, 'executive', true)}
                </TemplateThumbnail>
              </div>
            </div>
          </section>

          
          {/* VIP ATS Pro Studio Banner */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-12">
            <div className="rounded-3xl bg-gradient-to-br from-[#0B1020] via-[#111936] to-[#1E1B4B] text-white p-6 sm:p-10 shadow-2xl border border-white/10 grid lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-8 space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-blue-300 text-xs font-bold">
                  <ShieldCheck className="w-4 h-4" />
                  {isAr ? 'قسم نخبوي خاص للمنظمات الدولية والشركات الكبرى' : 'ELITE PORTAL FOR GLOBAL COMPANIES & NGOs'}
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold">
                  {isAr ? 'بوابة ATS الاحترافية — اجتَز أنظمة الفرز الآلي بثقة' : 'ATS Pro Studio — Pass Automated Screening With Confidence'}
                </h2>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  {isAr
                    ? 'قسم مستقل ومخصص لمن يتقدمون للشركات العالمية والبنوك والمنظمات: يضم 3 قوالب ATS نقية 100% (منها قالب هارفارد)، فاحص جودة فوري من 100%، ومُطابِق الوصف الوظيفي لاكتشاف الكلمات المفتاحية المفقودة.'
                    : 'A dedicated portal with 3 pure ATS templates (including Harvard Standard), a live 0-100% ATS score checker, and a Job Description Keyword Matcher.'}
                </p>
              </div>
              <div className="lg:col-span-4 flex lg:justify-end">
                <button
                  onClick={() => { setSelectedTemplate(atsTemplate); setView('ats'); }}
                  className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white font-extrabold text-sm shadow-xl hover:opacity-95 transition flex items-center justify-center gap-2"
                >
                  <Target className="w-5 h-5" />
                  {isAr ? 'ادخل بوابة ATS الاحترافية' : 'Enter ATS Pro Studio'}
                </button>
              </div>
            </div>
          </section>

          {/* Featured Templates with REAL Live Thumbnails */}
          <section className="bg-white py-14 border-y border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
                <h2 className="text-xl sm:text-3xl font-extrabold">{isAr ? 'اختر من قوالبنا الاحترافية' : 'Featured Live Templates'}</h2>
                <button onClick={() => setView('templates')} className="text-sm font-bold text-[#2563EB] hover:underline">
                  {isAr ? 'عرض جميع القوالب (10) ←' : 'View All 10 Templates →'}
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {TEMPLATES.slice(0, 4).map(tpl => (
                  <div key={tpl.id} className="rounded-2xl border border-slate-200 bg-[#F5F7FB] p-3.5 flex flex-col justify-between hover:border-[#2563EB] transition">
                    <div>
                      <TemplateThumbnail>
                        {renderCVDocument(isAr ? SAMPLE_CV_AR : SAMPLE_CV_EN, tpl.id, true)}
                      </TemplateThumbnail>
                      <div className="flex items-center justify-between mt-3">
                        <h3 className="font-extrabold text-sm">{isAr ? tpl.nameAr : tpl.nameEn}</h3>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-[#2563EB]">{tpl.tag}</span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1 line-clamp-2">{isAr ? tpl.descAr : tpl.descEn}</p>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <button onClick={() => setPreviewTemplateModal(tpl.id)} className="px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold hover:bg-slate-50">
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => { setSelectedTemplate(tpl.id); setView('builder'); }} className="flex-1 py-2 rounded-xl bg-[#0B1020] text-white text-xs font-bold hover:bg-[#2563EB] transition">
                        {isAr ? 'استخدام القالب' : 'Use Template'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Features */}
          <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
            <h2 className="text-xl sm:text-3xl font-extrabold text-center mb-8">
              {isAr ? 'مميزات AYASH CV STUDIO' : 'Why Choose AYASH CV STUDIO'}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { icon: Layout, ar: '10 قوالب بمعاينة حقيقية', en: '10 Real Live Templates', dAr: 'شاهد التصميم الفعلي لكل قالب قبل اختياره مع اختلاف كامل في التوزيع.', dEn: 'See the actual layout of every template before choosing.' },
                { icon: FileUp, ar: 'استيراد سيرة ذاتية سابقة', en: 'Import Previous CV', dAr: 'ارفع ملف سيرتك السابقة أو الصق نصها لتعبئة النموذج تلقائيًا.', dEn: 'Upload a previous CV file or paste text to auto-fill.' },
                { icon: Camera, ar: 'صورة شخصية اختيارية', en: 'Optional Profile Photo', dAr: 'أضف صورتك (دائرية/مربعة) وتحكم بحجمها أو أخفها بضغطة زر.', dEn: 'Upload an optional photo with shape & size controls.' },
                { icon: Globe, ar: 'متجاوب على الجوال والكمبيوتر', en: 'Mobile & Desktop Ready', dAr: 'تصميم ثابت ومنظم على الأندرويد والآيفون بدون انزلاق يمين أو يسار.', dEn: 'Zero horizontal scroll on Android, iPhone, and Desktop.' },
                { icon: Download, ar: 'تصدير PDF وWord منسّق', en: 'Polished PDF & Word', dAr: 'ملفات PDF نصية وملفات Word متوافقة مع MS Word وWPS.', dEn: 'Selectable PDF and cleanly formatted Word files.' },
                { icon: Shield, ar: 'خصوصية تامة 100%', en: '100% Privacy First', dAr: 'لا حسابات ولا خوادم؛ كل شيء يُعالج داخل متصفحك فقط.', dEn: 'Zero servers, zero tracking, in-memory only.' },
              ].map((f, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-white border border-slate-200">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#2563EB] mb-3">
                    <f.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-base mb-1">{isAr ? f.ar : f.en}</h3>
                  <p className="text-xs sm:text-sm text-slate-600">{isAr ? f.dAr : f.dEn}</p>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section id="faq" className="max-w-3xl mx-auto px-4 sm:px-6 pb-14">
            <h2 className="text-xl sm:text-3xl font-extrabold text-center mb-6">
              {isAr ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
            </h2>
            <div className="space-y-3">
              {[
                { qAr: 'كيف أستورد سيرتي الذاتية السابقة؟', aAr: 'اضغط على زر "استيراد سيرة سابقة" وارفع ملف JSON أو TXT أو Word، أو انسخ نص سيرتك والصقه مباشرة ليتم توزيعه تلقائيًا في الحقول.', qEn: 'How do I import my previous CV?', aEn: 'Click "Import Previous CV" to upload a JSON/TXT/Word file or paste your CV text to auto-fill.' },
                { qAr: 'هل يتم حفظ بياناتي على الإنترنت؟', aAr: 'لا إطلاقًا. تعمل المنصة داخل ذاكرة متصفحك فقط، ويمكنك حفظ نسخة JSON على جهازك لتعديلها لاحقًا.', qEn: 'Is my data saved online?', aEn: 'Never. Everything stays in your browser memory; you can save a local JSON backup anytime.' },
              ].map((item, idx) => (
                <div key={idx} className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                  <button onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)} className="w-full px-5 py-4 flex items-center justify-between font-bold text-sm text-start">
                    <span>{isAr ? item.qAr : item.qEn}</span>
                    <ChevronDown className={`w-4 h-4 transition ${openFaq === idx ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaq === idx && <div className="px-5 pb-4 text-sm text-slate-600">{isAr ? item.aAr : item.aEn}</div>}
                </div>
              ))}
            </div>
          </section>
        </main>
      )}

      {/* TEMPLATES LIBRARY VIEW (ALL 10 WITH REAL LIVE PREVIEWS) */}
      {view === 'templates' && (
        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-8 w-full">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-xl sm:text-3xl font-extrabold">{isAr ? 'مكتبة القوالب الاحترافية (10 قوالب)' : 'Professional Templates Library (10)'}</h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">{isAr ? 'شاهد الشكل الحقيقي لكل قالب أمامك واختر الأنسب لتخصصك.' : 'Preview the real layout of each template and pick your favorite.'}</p>
            </div>
            <button onClick={() => setView('builder')} className="px-4 py-2 rounded-xl bg-[#2563EB] text-white text-xs sm:text-sm font-bold">
              {isAr ? 'العودة للمحرر' : 'Back to Builder'}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TEMPLATES.map(tpl => (
              <div key={tpl.id} className={`rounded-2xl bg-white border-2 p-4 flex flex-col justify-between transition ${selectedTemplate === tpl.id ? 'border-[#2563EB] shadow-lg' : 'border-slate-200'}`}>
                <div>
                  <TemplateThumbnail>
                    {renderCVDocument(isAr ? SAMPLE_CV_AR : SAMPLE_CV_EN, tpl.id, true)}
                  </TemplateThumbnail>
                  <div className="flex items-center justify-between mt-3">
                    <h3 className="font-extrabold text-base">{isAr ? tpl.nameAr : tpl.nameEn}</h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#0B1020] text-white">{tpl.tag}</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">{isAr ? tpl.descAr : tpl.descEn}</p>
                </div>
                <div className="flex gap-2 mt-4">
                  <button onClick={() => setPreviewTemplateModal(tpl.id)} className="flex-1 py-2 rounded-xl border border-slate-200 text-xs font-bold hover:bg-slate-50 flex items-center justify-center gap-1">
                    <Eye className="w-3.5 h-3.5" /> {isAr ? 'معاينة كاملة' : 'Full Preview'}
                  </button>
                  <button onClick={() => { setSelectedTemplate(tpl.id); setView('builder'); }} className="flex-1 py-2 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white text-xs font-bold">
                    {isAr ? 'استخدام القالب' : 'Use Template'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      )}

      {/* BUILDER VIEW (CLEAN & ZERO-OVERFLOW ON MOBILE) */}
      {view === 'builder' && (
        <main className="flex-1 max-w-[1600px] mx-auto w-full px-3 sm:px-5 py-4 flex flex-col gap-3 print-main">
          {/* Compact Top Toolbar */}
          <div className="bg-white rounded-2xl border border-slate-200 p-2.5 flex flex-wrap items-center justify-between gap-2 no-print">
            <div className="flex flex-wrap items-center gap-1.5">
              <button onClick={() => setShowImportModal(true)} className="px-3 py-1.5 rounded-lg bg-purple-50 text-[#7C3AED] text-xs font-bold hover:bg-purple-100 flex items-center gap-1">
                <FileUp className="w-3.5 h-3.5" /> {isAr ? 'استيراد سيرة' : 'Import'}
              </button>
              <button onClick={() => { setCv(isAr ? SAMPLE_CV_AR : SAMPLE_CV_EN); notify(isAr ? 'تمت تعبئة بيانات تجريبية' : 'Sample data loaded'); }} className="px-3 py-1.5 rounded-lg bg-blue-50 text-[#2563EB] text-xs font-bold hover:bg-blue-100">
                {t.loadSample}
              </button>
              <button onClick={() => setShowDesignPanel(!showDesignPanel)} className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 border ${showDesignPanel ? 'bg-[#0B1020] text-white border-[#0B1020]' : 'bg-white text-slate-700 border-slate-200'}`}>
                <Palette className="w-3.5 h-3.5" /> {isAr ? 'التصميم' : 'Design'}
              </button>
              <button onClick={() => setView('templates')} className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-bold hover:bg-slate-50">
                {t.changeTemplate}
              </button>
              <button onClick={() => setShowClearModal(true)} className="px-2.5 py-1.5 rounded-lg bg-red-50 text-red-600 text-xs font-bold hover:bg-red-100">
                {t.clearAll}
              </button>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
              <div className="flex lg:hidden border border-slate-200 rounded-lg overflow-hidden text-xs font-bold">
                <button onClick={() => setMobileTab('edit')} className={`px-3 py-1.5 ${mobileTab === 'edit' ? 'bg-[#2563EB] text-white' : 'bg-white'}`}>{isAr ? 'تحرير البيانات' : 'Edit'}</button>
                <button onClick={() => setMobileTab('preview')} className={`px-3 py-1.5 ${mobileTab === 'preview' ? 'bg-[#2563EB] text-white' : 'bg-white'}`}>{isAr ? 'معاينة A4' : 'Preview'}</button>
              </div>
              <button onClick={() => setView('export')} className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white text-xs font-bold flex items-center gap-1.5 shadow">
                <Download className="w-4 h-4" /> {isAr ? 'تنزيل' : 'Export'}
              </button>
            </div>
          </div>

          {/* Design Panel */}
          {showDesignPanel && (
            <div className="bg-white rounded-2xl border border-slate-200 p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 text-xs no-print">
              <div>
                <label className="font-bold block mb-1.5">{isAr ? 'لون القالب' : 'Accent Color'}</label>
                <div className="flex flex-wrap gap-1.5">
                  {COLOR_PRESETS.map(c => (
                    <button key={c} onClick={() => setDesign(d => ({ ...d, accentColor: c }))} className={`w-6 h-6 rounded-full border-2 ${design.accentColor === c ? 'border-black scale-110' : 'border-white'}`} style={{ backgroundColor: c }} />
                  ))}
                </div>
              </div>
              <div>
                <label className="font-bold block mb-1.5">{isAr ? 'نوع الخط' : 'Font Family'}</label>
                <select value={design.fontFamily} onChange={e => setDesign(d => ({ ...d, fontFamily: e.target.value }))} className="w-full border rounded-lg p-1.5">
                  <option value="Cairo">Cairo</option>
                  <option value="IBM Plex Sans Arabic">IBM Plex Sans Arabic</option>
                  <option value="Inter">Inter</option>
                </select>
              </div>
              <div>
                <label className="font-bold block mb-1.5">{isAr ? 'حجم الخط والعناوين' : 'Font & Headings'}</label>
                <div className="space-y-1.5">
                  <select value={design.fontSize} onChange={e => setDesign(d => ({ ...d, fontSize: e.target.value }))} className="w-full border rounded-lg p-1.5">
                    <option value="sm">{isAr ? 'خط صغير' : 'Small'}</option>
                    <option value="base">{isAr ? 'خط متوسط' : 'Medium'}</option>
                    <option value="lg">{isAr ? 'خط كبير' : 'Large'}</option>
                  </select>
                  <select value={design.headingStyle} onChange={e => setDesign(d => ({ ...d, headingStyle: e.target.value }))} className="w-full border rounded-lg p-1.5">
                    <option value="underline">{isAr ? 'خط سفلي' : 'Underline'}</option>
                    <option value="left-bar">{isAr ? 'شريط جانبي' : 'Side Bar'}</option>
                    <option value="pill">{isAr ? 'بطاقة ملونة' : 'Colored Pill'}</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="font-bold block mb-1.5">{isAr ? 'الهوامش والمسافات' : 'Margins & Spacing'}</label>
                <div className="space-y-1.5">
                  <select value={design.margins} onChange={e => setDesign(d => ({ ...d, margins: e.target.value }))} className="w-full border rounded-lg p-1.5">
                    <option value="compact">{isAr ? 'هوامش مضغوطة' : 'Compact'}</option>
                    <option value="normal">{isAr ? 'هوامش متوازنة' : 'Normal'}</option>
                    <option value="wide">{isAr ? 'هوامش واسعة' : 'Wide'}</option>
                  </select>
                  <select value={design.spacing} onChange={e => setDesign(d => ({ ...d, spacing: e.target.value }))} className="w-full border rounded-lg p-1.5">
                    <option value="compact">{isAr ? 'مسافات مضغوطة' : 'Compact'}</option>
                    <option value="normal">{isAr ? 'مسافات متوازنة' : 'Normal'}</option>
                    <option value="relaxed">{isAr ? 'مسافات واسعة' : 'Relaxed'}</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="font-bold block mb-1.5">{isAr ? 'إعدادات الصورة' : 'Photo Style'}</label>
                <div className="space-y-1.5">
                  <select value={design.photoShape} onChange={e => setDesign(d => ({ ...d, photoShape: e.target.value }))} className="w-full border rounded-lg p-1.5">
                    <option value="circle">{isAr ? 'صورة دائرية' : 'Circle'}</option>
                    <option value="rounded">{isAr ? 'مربعة ناعمة' : 'Rounded'}</option>
                    <option value="square">{isAr ? 'مربعة رسمية' : 'Square'}</option>
                  </select>
                  <select value={design.photoSize} onChange={e => setDesign(d => ({ ...d, photoSize: e.target.value }))} className="w-full border rounded-lg p-1.5">
                    <option value="sm">{isAr ? 'حجم صغير' : 'Small'}</option>
                    <option value="md">{isAr ? 'حجم متوسط' : 'Medium'}</option>
                    <option value="lg">{isAr ? 'حجم كبير' : 'Large'}</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col justify-between">
                <label className="flex items-center gap-2 font-bold cursor-pointer">
                  <input type="checkbox" checked={design.showPhoto} onChange={e => setDesign(d => ({ ...d, showPhoto: e.target.checked }))} />
                  {isAr ? 'إظهار الصورة الشخصية' : 'Show Photo'}
                </label>
                <button onClick={() => { setDesign(DEFAULT_DESIGN); notify(isAr ? 'تمت إعادة ضبط التصميم' : 'Design reset'); }} className="mt-2 py-1.5 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 font-bold flex items-center justify-center gap-1">
                  <RotateCcw className="w-3.5 h-3.5" /> {isAr ? 'إعادة ضبط' : 'Reset'}
                </button>
              </div>
            </div>
          )}

          {/* Mobile Horizontal Section Pills (Clean, No Clutter) */}
          {mobileTab === 'edit' && (
            <div className="lg:hidden flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 no-print">
              {sections.map(sec => (
                <button
                  key={sec.id}
                  onClick={() => setActiveSection(sec.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap shrink-0 border transition ${activeSection === sec.id ? 'bg-[#0B1020] text-white border-[#0B1020]' : 'bg-white text-slate-700 border-slate-200'}`}
                >
                  {isAr ? sec.labelAr : sec.labelEn}
                </button>
              ))}
              <button onClick={addCustomSection} className="px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap shrink-0 bg-blue-50 text-[#2563EB] border border-blue-200">
                + {isAr ? 'قسم جديد' : 'Add'}
              </button>
            </div>
          )}

          {/* 3-Pane Studio */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1 print-main">
            {/* Pane 1: Desktop Sections Sidebar */}
            <aside className="hidden lg:block lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-3 space-y-2 h-fit no-print">
              <div className="p-2.5 rounded-xl bg-[#F5F7FB] border border-slate-200">
                <div className="flex justify-between text-[11px] font-bold mb-1">
                  <span>{isAr ? 'اكتمال السيرة الذاتية' : 'CV Completeness'}</span>
                  <span className="text-[#2563EB]">{completeness}%</span>
                </div>
                <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#2563EB] to-[#7C3AED] transition-all duration-300" style={{ width: `${completeness}%` }} />
                </div>
              </div>

              <div className="flex items-center justify-between px-2 pt-1">
                <span className="text-xs font-extrabold text-slate-500 uppercase">{isAr ? 'أقسام السيرة الذاتية' : 'CV Sections'}</span>
                <button onClick={addCustomSection} className="text-xs font-bold text-[#2563EB] flex items-center gap-1 hover:underline">
                  <Plus className="w-3.5 h-3.5" /> {isAr ? 'قسم جديد' : 'Add'}
                </button>
              </div>

              <div className="space-y-1">
                {sections.map((sec, idx) => (
                  <div key={sec.id} className={`flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-bold transition ${activeSection === sec.id ? 'bg-[#0B1020] text-white' : 'hover:bg-slate-100 text-slate-700'}`}>
                    <button onClick={() => setActiveSection(sec.id)} className="flex-1 text-start truncate">{isAr ? sec.labelAr : sec.labelEn}</button>
                    <div className="flex items-center gap-1">
                      {sec.id !== 'personal' && (
                        <>
                          <button onClick={() => moveSection(idx, -1)} className="p-0.5 opacity-70 hover:opacity-100"><ArrowUp className="w-3 h-3" /></button>
                          <button onClick={() => moveSection(idx, 1)} className="p-0.5 opacity-70 hover:opacity-100"><ArrowDown className="w-3 h-3" /></button>
                          <input type="checkbox" checked={sec.visible} onChange={() => toggleSectionVisibility(sec.id)} />
                        </>
                      )}
                      {sec.isCustom && <button onClick={() => deleteCustomSection(sec.id)} className="text-red-400 hover:text-red-500"><Trash2 className="w-3 h-3" /></button>}
                    </div>
                  </div>
                ))}
              </div>
            </aside>

            {/* Pane 2: Data Editor */}
            <section className={`lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 h-fit space-y-4 no-print ${mobileTab === 'preview' ? 'hidden lg:block' : ''}`}>
              {activeSection === 'personal' && (
                <div className="space-y-4">
                  <h2 className="font-extrabold text-base sm:text-lg">{isAr ? 'المعلومات الشخصية' : 'Personal Information'}</h2>
                  <div className="p-3.5 rounded-2xl bg-[#F5F7FB] border border-slate-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold text-[#0B1020] flex items-center gap-1.5">
                        <Camera className="w-4 h-4 text-[#2563EB]" /> {isAr ? 'الصورة الشخصية (اختيارية)' : 'Profile Photo (Optional)'}
                      </span>
                      <label className="flex items-center gap-1.5 text-[11px] font-bold text-slate-600 cursor-pointer">
                        <input type="checkbox" checked={design.showPhoto} onChange={e => setDesign(d => ({ ...d, showPhoto: e.target.checked }))} />
                        {isAr ? 'إظهار' : 'Show'}
                      </label>
                    </div>
                    {selectedTemplate === 'ats' && cv.personal.photo && (
                      <div className="p-2 rounded-lg bg-amber-50 border border-amber-200 text-[11px] text-amber-800 flex items-start gap-1.5">
                        <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                        <span>{isAr ? 'قالب ATS يخفي الصورة تلقائيًا. اختر قالبًا آخر لإظهارها.' : 'ATS template hides photos automatically.'}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-3">
                      <div className={`w-14 h-14 ${design.photoShape === 'rounded' ? 'rounded-xl' : design.photoShape === 'square' ? 'rounded-none' : 'rounded-full'} bg-white border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden shrink-0`}>
                        {cv.personal.photo ? <img src={cv.personal.photo} alt="Avatar" className="w-full h-full object-cover" /> : <Camera className="w-5 h-5 text-slate-400" />}
                      </div>
                      <div className="flex-1 space-y-2 text-xs">
                        <div className="flex flex-wrap gap-2">
                          <label className="cursor-pointer px-3 py-1.5 rounded-lg bg-[#2563EB] text-white font-bold inline-flex items-center gap-1">
                            <Upload className="w-3.5 h-3.5" /> {cv.personal.photo ? (isAr ? 'تغيير' : 'Change') : (isAr ? 'رفع صورة' : 'Upload')}
                            <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                          </label>
                          {cv.personal.photo && (
                            <button onClick={handleRemovePhoto} className="px-3 py-1.5 rounded-lg bg-red-50 text-red-600 font-bold inline-flex items-center gap-1">
                              <ImageOff className="w-3.5 h-3.5" /> {isAr ? 'حذف' : 'Remove'}
                            </button>
                          )}
                        </div>
                        {cv.personal.photo && (
                          <div className="flex flex-wrap items-center gap-2.5 text-[11px] text-slate-600">
                            <label className="flex items-center gap-1"><input type="radio" name="ps" checked={design.photoShape === 'circle'} onChange={() => setDesign(d => ({ ...d, photoShape: 'circle' }))} />{isAr ? 'دائرية' : 'Circle'}</label>
                            <label className="flex items-center gap-1"><input type="radio" name="ps" checked={design.photoShape === 'rounded'} onChange={() => setDesign(d => ({ ...d, photoShape: 'rounded' }))} />{isAr ? 'ناعمة' : 'Rounded'}</label>
                            <label className="flex items-center gap-1"><input type="radio" name="ps" checked={design.photoShape === 'square'} onChange={() => setDesign(d => ({ ...d, photoShape: 'square' }))} />{isAr ? 'رسمية' : 'Square'}</label>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                    <input className="w-full border rounded-xl p-2.5" placeholder={isAr ? 'الاسم الكامل' : 'Full Name'} value={cv.personal.fullName} onChange={e => updatePersonal('fullName', e.target.value)} />
                    <input className="w-full border rounded-xl p-2.5" placeholder={isAr ? 'المسمى الوظيفي' : 'Job Title'} value={cv.personal.jobTitle} onChange={e => updatePersonal('jobTitle', e.target.value)} />
                    <input className="w-full border rounded-xl p-2.5" placeholder={isAr ? 'البريد الإلكتروني' : 'Email'} value={cv.personal.email} onChange={e => updatePersonal('email', e.target.value)} />
                    <input className="w-full border rounded-xl p-2.5" placeholder={isAr ? 'رقم الهاتف' : 'Phone'} value={cv.personal.phone} onChange={e => updatePersonal('phone', e.target.value)} />
                    <input className="w-full border rounded-xl p-2.5" placeholder={isAr ? 'الدولة والمدينة' : 'City, Country'} value={cv.personal.location} onChange={e => updatePersonal('location', e.target.value)} />
                    <input className="w-full border rounded-xl p-2.5" placeholder={isAr ? 'العنوان' : 'Address'} value={cv.personal.address} onChange={e => updatePersonal('address', e.target.value)} />
                    <input className="w-full border rounded-xl p-2.5" placeholder="LinkedIn" value={cv.personal.linkedin} onChange={e => updatePersonal('linkedin', e.target.value)} />
                    <input className="w-full border rounded-xl p-2.5" placeholder="GitHub" value={cv.personal.github} onChange={e => updatePersonal('github', e.target.value)} />
                    <input className="w-full border rounded-xl p-2.5 sm:col-span-2" placeholder={isAr ? 'الموقع الشخصي' : 'Personal Website'} value={cv.personal.website} onChange={e => updatePersonal('website', e.target.value)} />
                  </div>
                </div>
              )}

              {activeSection === 'summary' && (
                <div className="space-y-3 text-xs">
                  <h2 className="font-extrabold text-base sm:text-lg">{isAr ? 'النبذة الشخصية' : 'Professional Summary'}</h2>
                  <textarea rows={4} className="w-full border rounded-xl p-2.5" placeholder={isAr ? 'ملخص مهني...' : 'Professional bio...'} value={cv.summary.bio} onChange={e => updateSummary('bio', e.target.value)} />
                  <textarea rows={2} className="w-full border rounded-xl p-2.5" placeholder={isAr ? 'الأهداف المهنية...' : 'Career objective...'} value={cv.summary.objective} onChange={e => updateSummary('objective', e.target.value)} />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <input className="w-full border rounded-xl p-2.5" placeholder={isAr ? 'التخصص' : 'Specialty'} value={cv.summary.specialty} onChange={e => updateSummary('specialty', e.target.value)} />
                    <input className="w-full border rounded-xl p-2.5" placeholder={isAr ? 'سنوات الخبرة' : 'Years of Experience'} value={cv.summary.yearsExp} onChange={e => updateSummary('yearsExp', e.target.value)} />
                  </div>
                </div>
              )}

              {activeSection === 'experience' && (
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between items-center">
                    <h2 className="font-extrabold text-base sm:text-lg">{isAr ? 'الخبرات المهنية' : 'Work Experience'}</h2>
                    <button onClick={() => addItem('experience', { company: '', role: '', location: '', start: '', end: '', description: '', achievements: '' })} className="px-3 py-1.5 rounded-lg bg-[#2563EB] text-white font-bold flex items-center gap-1"><Plus className="w-3.5 h-3.5" /> {isAr ? 'إضافة' : 'Add'}</button>
                  </div>
                  {cv.experience.map(exp => (
                    <div key={exp.id} className="p-3 rounded-xl bg-slate-50 border space-y-2">
                      <div className="flex justify-end"><button onClick={() => removeItem('experience', exp.id)} className="text-red-500"><Trash2 className="w-4 h-4" /></button></div>
                      <input className="w-full border rounded-lg p-2 bg-white" placeholder={isAr ? 'المسمى الوظيفي' : 'Role'} value={exp.role} onChange={e => updateItem('experience', exp.id, 'role', e.target.value)} />
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <input className="w-full border rounded-lg p-2 bg-white" placeholder={isAr ? 'اسم الشركة' : 'Company'} value={exp.company} onChange={e => updateItem('experience', exp.id, 'company', e.target.value)} />
                        <input className="w-full border rounded-lg p-2 bg-white" placeholder={isAr ? 'مكان العمل' : 'Location'} value={exp.location} onChange={e => updateItem('experience', exp.id, 'location', e.target.value)} />
                        <input className="w-full border rounded-lg p-2 bg-white" placeholder={isAr ? 'من' : 'Start'} value={exp.start} onChange={e => updateItem('experience', exp.id, 'start', e.target.value)} />
                        <input className="w-full border rounded-lg p-2 bg-white" placeholder={isAr ? 'إلى' : 'End'} value={exp.end} onChange={e => updateItem('experience', exp.id, 'end', e.target.value)} />
                      </div>
                      <textarea rows={2} className="w-full border rounded-lg p-2 bg-white" placeholder={isAr ? 'المهام والمسؤوليات' : 'Responsibilities'} value={exp.description} onChange={e => updateItem('experience', exp.id, 'description', e.target.value)} />
                      <input className="w-full border rounded-lg p-2 bg-white" placeholder={isAr ? 'أبرز الإنجازات' : 'Key Achievements'} value={exp.achievements} onChange={e => updateItem('experience', exp.id, 'achievements', e.target.value)} />
                    </div>
                  ))}
                </div>
              )}

              {activeSection === 'education' && (
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between items-center">
                    <h2 className="font-extrabold text-base sm:text-lg">{isAr ? 'التعليم' : 'Education'}</h2>
                    <button onClick={() => addItem('education', { institution: '', major: '', degree: '', start: '', end: '', gpa: '' })} className="px-3 py-1.5 rounded-lg bg-[#2563EB] text-white font-bold flex items-center gap-1"><Plus className="w-3.5 h-3.5" /> {isAr ? 'إضافة' : 'Add'}</button>
                  </div>
                  {cv.education.map(edu => (
                    <div key={edu.id} className="p-3 rounded-xl bg-slate-50 border space-y-2">
                      <div className="flex justify-end"><button onClick={() => removeItem('education', edu.id)} className="text-red-500"><Trash2 className="w-4 h-4" /></button></div>
                      <input className="w-full border rounded-lg p-2 bg-white" placeholder={isAr ? 'الجامعة أو المؤسسة' : 'University'} value={edu.institution} onChange={e => updateItem('education', edu.id, 'institution', e.target.value)} />
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <input className="w-full border rounded-lg p-2 bg-white" placeholder={isAr ? 'الدرجة العلمية' : 'Degree'} value={edu.degree} onChange={e => updateItem('education', edu.id, 'degree', e.target.value)} />
                        <input className="w-full border rounded-lg p-2 bg-white" placeholder={isAr ? 'التخصص' : 'Major'} value={edu.major} onChange={e => updateItem('education', edu.id, 'major', e.target.value)} />
                        <input className="w-full border rounded-lg p-2 bg-white" placeholder={isAr ? 'من' : 'Start'} value={edu.start} onChange={e => updateItem('education', edu.id, 'start', e.target.value)} />
                        <input className="w-full border rounded-lg p-2 bg-white" placeholder={isAr ? 'إلى' : 'End'} value={edu.end} onChange={e => updateItem('education', edu.id, 'end', e.target.value)} />
                      </div>
                      <input className="w-full border rounded-lg p-2 bg-white" placeholder={isAr ? 'المعدل (اختياري)' : 'GPA (Optional)'} value={edu.gpa} onChange={e => updateItem('education', edu.id, 'gpa', e.target.value)} />
                    </div>
                  ))}
                </div>
              )}

              {activeSection === 'skills' && (
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between items-center">
                    <h2 className="font-extrabold text-base sm:text-lg">{isAr ? 'المهارات' : 'Skills'}</h2>
                    <button onClick={() => addItem('skills', { name: '', category: isAr ? 'تقنية' : 'Technical', level: '' })} className="px-3 py-1.5 rounded-lg bg-[#2563EB] text-white font-bold flex items-center gap-1"><Plus className="w-3.5 h-3.5" /> {isAr ? 'إضافة' : 'Add'}</button>
                  </div>
                  {cv.skills.map(sk => (
                    <div key={sk.id} className="grid grid-cols-12 gap-1.5 items-center">
                      <input className="col-span-5 border rounded-lg p-2" placeholder={isAr ? 'المهارة' : 'Skill'} value={sk.name} onChange={e => updateItem('skills', sk.id, 'name', e.target.value)} />
                      <select className="col-span-3 border rounded-lg p-2 bg-white" value={sk.category} onChange={e => updateItem('skills', sk.id, 'category', e.target.value)}>
                        <option value={isAr ? 'تقنية' : 'Technical'}>{isAr ? 'تقنية' : 'Tech'}</option>
                        <option value={isAr ? 'شخصية' : 'Soft'}>{isAr ? 'شخصية' : 'Soft'}</option>
                        <option value={isAr ? 'إدارية' : 'Management'}>{isAr ? 'إدارية' : 'Admin'}</option>
                      </select>
                      <input className="col-span-3 border rounded-lg p-2" placeholder={isAr ? 'المستوى' : 'Level'} value={sk.level} onChange={e => updateItem('skills', sk.id, 'level', e.target.value)} />
                      <button onClick={() => removeItem('skills', sk.id)} className="col-span-1 text-red-500 flex justify-center"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  ))}
                </div>
              )}

              {activeSection === 'projects' && (
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between items-center">
                    <h2 className="font-extrabold text-base sm:text-lg">{isAr ? 'المشاريع' : 'Projects'}</h2>
                    <button onClick={() => addItem('projects', { name: '', tech: '', description: '', link: '' })} className="px-3 py-1.5 rounded-lg bg-[#2563EB] text-white font-bold flex items-center gap-1"><Plus className="w-3.5 h-3.5" /> {isAr ? 'إضافة' : 'Add'}</button>
                  </div>
                  {cv.projects.map(pr => (
                    <div key={pr.id} className="p-3 rounded-xl bg-slate-50 border space-y-2">
                      <div className="flex justify-end"><button onClick={() => removeItem('projects', pr.id)} className="text-red-500"><Trash2 className="w-4 h-4" /></button></div>
                      <input className="w-full border rounded-lg p-2 bg-white" placeholder={isAr ? 'اسم المشروع' : 'Project Name'} value={pr.name} onChange={e => updateItem('projects', pr.id, 'name', e.target.value)} />
                      <input className="w-full border rounded-lg p-2 bg-white" placeholder={isAr ? 'التقنيات المستخدمة' : 'Tech'} value={pr.tech} onChange={e => updateItem('projects', pr.id, 'tech', e.target.value)} />
                      <input className="w-full border rounded-lg p-2 bg-white" placeholder={isAr ? 'رابط المشروع' : 'Link'} value={pr.link} onChange={e => updateItem('projects', pr.id, 'link', e.target.value)} />
                      <textarea rows={2} className="w-full border rounded-lg p-2 bg-white" placeholder={isAr ? 'وصف المشروع' : 'Description'} value={pr.description} onChange={e => updateItem('projects', pr.id, 'description', e.target.value)} />
                    </div>
                  ))}
                </div>
              )}

              {activeSection === 'certifications' && (
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between items-center">
                    <h2 className="font-extrabold text-base sm:text-lg">{isAr ? 'الدورات والشهادات' : 'Certifications'}</h2>
                    <button onClick={() => addItem('certifications', { title: '', issuer: '', date: '', link: '' })} className="px-3 py-1.5 rounded-lg bg-[#2563EB] text-white font-bold flex items-center gap-1"><Plus className="w-3.5 h-3.5" /> {isAr ? 'إضافة' : 'Add'}</button>
                  </div>
                  {cv.certifications.map(c => (
                    <div key={c.id} className="p-3 rounded-xl bg-slate-50 border space-y-2">
                      <div className="flex justify-end"><button onClick={() => removeItem('certifications', c.id)} className="text-red-500"><Trash2 className="w-4 h-4" /></button></div>
                      <input className="w-full border rounded-lg p-2 bg-white" placeholder={isAr ? 'اسم الدورة أو الشهادة' : 'Title'} value={c.title} onChange={e => updateItem('certifications', c.id, 'title', e.target.value)} />
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <input className="w-full border rounded-lg p-2 bg-white" placeholder={isAr ? 'الجهة المانحة' : 'Issuer'} value={c.issuer} onChange={e => updateItem('certifications', c.id, 'issuer', e.target.value)} />
                        <input className="w-full border rounded-lg p-2 bg-white" placeholder={isAr ? 'التاريخ' : 'Date'} value={c.date} onChange={e => updateItem('certifications', c.id, 'date', e.target.value)} />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeSection === 'languages' && (
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between items-center">
                    <h2 className="font-extrabold text-base sm:text-lg">{isAr ? 'اللغات' : 'Languages'}</h2>
                    <button onClick={() => addItem('languages', { name: '', level: '' })} className="px-3 py-1.5 rounded-lg bg-[#2563EB] text-white font-bold flex items-center gap-1"><Plus className="w-3.5 h-3.5" /> {isAr ? 'إضافة' : 'Add'}</button>
                  </div>
                  {cv.languages.map(l => (
                    <div key={l.id} className="flex gap-2 items-center">
                      <input className="flex-1 border rounded-lg p-2 min-w-0" placeholder={isAr ? 'اللغة' : 'Language'} value={l.name} onChange={e => updateItem('languages', l.id, 'name', e.target.value)} />
                      <input className="w-28 border rounded-lg p-2" placeholder={isAr ? 'المستوى' : 'Level'} value={l.level} onChange={e => updateItem('languages', l.id, 'level', e.target.value)} />
                      <button onClick={() => removeItem('languages', l.id)} className="text-red-500"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  ))}
                </div>
              )}

              {activeSection === 'volunteering' && (
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between items-center">
                    <h2 className="font-extrabold text-base sm:text-lg">{isAr ? 'الأعمال التطوعية' : 'Volunteering'}</h2>
                    <button onClick={() => addItem('volunteering', { title: '', org: '', period: '', details: '' })} className="px-3 py-1.5 rounded-lg bg-[#2563EB] text-white font-bold flex items-center gap-1"><Plus className="w-3.5 h-3.5" /> {isAr ? 'إضافة' : 'Add'}</button>
                  </div>
                  {cv.volunteering.map(v => (
                    <div key={v.id} className="p-3 rounded-xl bg-slate-50 border space-y-2">
                      <div className="flex justify-end"><button onClick={() => removeItem('volunteering', v.id)} className="text-red-500"><Trash2 className="w-4 h-4" /></button></div>
                      <input className="w-full border rounded-lg p-2 bg-white" placeholder={isAr ? 'النشاط' : 'Title'} value={v.title} onChange={e => updateItem('volunteering', v.id, 'title', e.target.value)} />
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <input className="w-full border rounded-lg p-2 bg-white" placeholder={isAr ? 'الجهة' : 'Org'} value={v.org} onChange={e => updateItem('volunteering', v.id, 'org', e.target.value)} />
                        <input className="w-full border rounded-lg p-2 bg-white" placeholder={isAr ? 'الفترة' : 'Period'} value={v.period} onChange={e => updateItem('volunteering', v.id, 'period', e.target.value)} />
                      </div>
                      <textarea rows={2} className="w-full border rounded-lg p-2 bg-white" placeholder={isAr ? 'التفاصيل' : 'Details'} value={v.details} onChange={e => updateItem('volunteering', v.id, 'details', e.target.value)} />
                    </div>
                  ))}
                </div>
              )}

              {activeSection === 'references' && (
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between items-center">
                    <h2 className="font-extrabold text-base sm:text-lg">{isAr ? 'المراجع' : 'References'}</h2>
                    <button onClick={() => addItem('references', { name: '', role: '', contact: '' })} className="px-3 py-1.5 rounded-lg bg-[#2563EB] text-white font-bold flex items-center gap-1"><Plus className="w-3.5 h-3.5" /> {isAr ? 'إضافة' : 'Add'}</button>
                  </div>
                  {cv.references.map(r => (
                    <div key={r.id} className="p-3 rounded-xl bg-slate-50 border space-y-2">
                      <div className="flex justify-end"><button onClick={() => removeItem('references', r.id)} className="text-red-500"><Trash2 className="w-4 h-4" /></button></div>
                      <input className="w-full border rounded-lg p-2 bg-white" placeholder={isAr ? 'الاسم' : 'Name'} value={r.name} onChange={e => updateItem('references', r.id, 'name', e.target.value)} />
                      <input className="w-full border rounded-lg p-2 bg-white" placeholder={isAr ? 'المنصب' : 'Role'} value={r.role} onChange={e => updateItem('references', r.id, 'role', e.target.value)} />
                      <input className="w-full border rounded-lg p-2 bg-white" placeholder={isAr ? 'بيانات التواصل' : 'Contact'} value={r.contact} onChange={e => updateItem('references', r.id, 'contact', e.target.value)} />
                    </div>
                  ))}
                </div>
              )}

              {activeSection.startsWith('custom_') && (() => {
                const custom = cv.customSections.find(c => c.id === activeSection);
                if (!custom) return null;
                return (
                  <div className="space-y-3 text-xs">
                    <h2 className="font-extrabold text-base sm:text-lg">{isAr ? 'قسم مخصص' : 'Custom Section'}</h2>
                    <input className="w-full border rounded-xl p-2.5" value={custom.title} onChange={e => {
                      const val = e.target.value;
                      setCv(prev => ({ ...prev, customSections: prev.customSections.map(c => c.id === custom.id ? { ...c, title: val } : c) }));
                      setSections(prev => prev.map(s => s.id === custom.id ? { ...s, labelAr: val, labelEn: val } : s));
                    }} />
                    <textarea rows={5} className="w-full border rounded-xl p-2.5" placeholder={isAr ? 'اكتب محتوى القسم هنا...' : 'Write content...'} value={custom.content} onChange={e => setCv(prev => ({ ...prev, customSections: prev.customSections.map(c => c.id === custom.id ? { ...c, content: e.target.value } : c) }))} />
                  </div>
                );
              })()}

              <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs font-bold">
                <button onClick={goPrevSection} disabled={activeIdx <= 0} className="px-3 py-1.5 rounded-lg border border-slate-200 disabled:opacity-40 hover:bg-slate-50 flex items-center gap-1">
                  {isAr ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />} {isAr ? 'السابق' : 'Prev'}
                </button>
                <button onClick={goNextSection} disabled={activeIdx >= sections.length - 1} className="px-3 py-1.5 rounded-lg bg-[#0B1020] text-white disabled:opacity-40 hover:bg-[#2563EB] transition flex items-center gap-1">
                  {isAr ? 'التالي' : 'Next'} {isAr ? <ChevronLeft className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                </button>
              </div>
            </section>

            {/* Pane 3: Auto-Fitting Live A4 Preview (Zero Horizontal Scroll!) */}
            <section className={`lg:col-span-5 flex flex-col items-center w-full print-main ${mobileTab === 'edit' ? 'hidden lg:flex' : ''}`}>
              <div className="w-full flex items-center justify-between bg-white rounded-xl border border-slate-200 px-3 py-2 mb-3 text-xs no-print">
                <span className="font-bold text-slate-600">{isAr ? 'معاينة مباشرة (A4)' : 'Live A4 Preview'}</span>
                <div className="flex items-center gap-2">
                  <button onClick={() => setZoomMul(z => Math.max(0.7, +(z - 0.1).toFixed(2)))} className="p-1 rounded hover:bg-slate-100"><ZoomOut className="w-4 h-4" /></button>
                  <span className="font-mono font-bold">{Math.round(zoomMul * 100)}%</span>
                  <button onClick={() => setZoomMul(z => Math.min(1.2, +(z + 0.1).toFixed(2)))} className="p-1 rounded hover:bg-slate-100"><ZoomIn className="w-4 h-4" /></button>
                </div>
              </div>
              <ResponsiveA4Frame zoomMultiplier={zoomMul} isPrintable={true}>
                {renderCVDocument()}
              </ResponsiveA4Frame>
            </section>
          </div>
        </main>
      )}

      
      {/* ATS PRO STUDIO (DEDICATED ELITE PORTAL) */}
      {view === 'ats' && (
        <main className="flex-1 max-w-7xl mx-auto px-3 sm:px-6 py-6 w-full space-y-6 print-main">
          {/* Elite Portal Header */}
          <div className="rounded-3xl bg-gradient-to-r from-[#0B1020] via-[#131C3A] to-[#1E1B4B] text-white p-5 sm:p-7 shadow-xl border border-white/10 flex flex-wrap items-center justify-between gap-4 no-print">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-[11px] font-bold">
                <ShieldCheck className="w-3.5 h-3.5" /> ATS PRO STUDIO • 100% PARSER COMPLIANT
              </div>
              <h1 className="text-xl sm:text-3xl font-extrabold">
                {isAr ? 'بوابة ATS الاحترافية' : 'ATS Pro Studio'}
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
                {isAr
                  ? 'بيئة عمل نخبوية خالية من الصور والأعمدة المعقدة، مصممة خصيصًا لاجتياز أنظمة الفرز الآلي في الشركات العالمية والمنظمات الدولية.'
                  : 'An elite, single-column, photo-free workspace engineered to pass Applicant Tracking Systems at top companies.'}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => setShowImportModal(true)} className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-1.5">
                <FileUp className="w-4 h-4" /> {isAr ? 'استيراد سيرة' : 'Import CV'}
              </button>
              <button onClick={() => { setCv(isAr ? SAMPLE_CV_AR : SAMPLE_CV_EN); notify(isAr ? 'تمت تعبئة بيانات تجريبية' : 'Sample loaded'); }} className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold">
                {t.loadSample}
              </button>
              <button onClick={() => { setSelectedTemplate(atsTemplate); setView('builder'); }} className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white text-xs font-bold shadow flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" /> {isAr ? 'تعديل بيانات السيرة' : 'Edit CV Data'}
              </button>
            </div>
          </div>

          {/* 3 Pure ATS Templates Selector */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 no-print">
            {ATS_TEMPLATES.map(tpl => (
              <button
                key={tpl.id}
                onClick={() => { setAtsTemplate(tpl.id); setSelectedTemplate(tpl.id); }}
                className={`text-start p-4 rounded-2xl border-2 transition bg-white ${atsTemplate === tpl.id ? 'border-[#2563EB] shadow-lg ring-2 ring-[#2563EB]/20' : 'border-slate-200 hover:border-slate-300'}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-[#0B1020] text-white">{tpl.badge}</span>
                  {atsTemplate === tpl.id && <CheckCircle2 className="w-5 h-5 text-[#2563EB]" />}
                </div>
                <div className="font-extrabold text-sm sm:text-base text-[#0B1020]">{isAr ? tpl.nameAr : tpl.nameEn}</div>
                <p className="text-xs text-slate-600 mt-1">{isAr ? tpl.descAr : tpl.descEn}</p>
              </button>
            ))}
          </div>

          {/* Main Split: Left Tools (Score + JD Matcher) | Right Live Pure ATS A4 Preview */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start print-main">
            {/* Left Column: ATS Score + Job Matcher */}
            <div className="lg:col-span-5 space-y-5 no-print">
              {/* Live ATS Score Card */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-extrabold text-base flex items-center gap-2">
                    <Award className="w-5 h-5 text-[#2563EB]" />
                    {isAr ? 'فاحص جودة ATS الفوري' : 'Live ATS Score Checker'}
                  </h2>
                  <span className={`text-lg font-extrabold px-3 py-1 rounded-xl ${atsEval.score >= 80 ? 'bg-emerald-50 text-emerald-700' : atsEval.score >= 50 ? 'bg-amber-50 text-amber-700' : 'bg-red-50 text-red-700'}`}>
                    {atsEval.score}%
                  </span>
                </div>

                <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${atsEval.score >= 80 ? 'bg-emerald-500' : atsEval.score >= 50 ? 'bg-amber-500' : 'bg-red-500'}`}
                    style={{ width: `${atsEval.score}%` }}
                  />
                </div>

                <ul className="space-y-2 text-xs">
                  {atsEval.checks.map((chk, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      {chk.ok ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      )}
                      <span className={chk.ok ? 'text-slate-700' : 'text-slate-900 font-semibold'}>
                        {isAr ? chk.labelAr : chk.labelEn}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Job Description Keyword Matcher */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3">
                <h2 className="font-extrabold text-base flex items-center gap-2">
                  <SearchCheck className="w-5 h-5 text-[#7C3AED]" />
                  {isAr ? 'مُطابِق الوصف الوظيفي (Keywords)' : 'Job Description Keyword Matcher'}
                </h2>
                <p className="text-xs text-slate-600">
                  {isAr
                    ? 'الصق نص الإعلان الوظيفي هنا لنقارن سيرتك معه ونستخرج الكلمات المفتاحية المفقودة (داخل متصفحك فقط).'
                    : 'Paste the job description here to see your match score and missing keywords (processed locally).'}
                </p>
                <textarea
                  rows={4}
                  className="w-full border rounded-xl p-3 text-xs"
                  placeholder={isAr ? 'الصق متطلبات الوظيفة أو الإعلان الوظيفي هنا...' : 'Paste job requirements here...'}
                  value={jobDesc}
                  onChange={e => setJobDesc(e.target.value)}
                />

                {jdMatch && (
                  <div className="space-y-3 pt-2 border-t border-slate-100">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span>{isAr ? 'نسبة تطابق الكلمات المفتاحية:' : 'Keyword Match Rate:'}</span>
                      <span className="text-[#2563EB] text-sm font-extrabold">{jdMatch.percent}%</span>
                    </div>

                    {jdMatch.matched.length > 0 && (
                      <div>
                        <div className="text-[11px] font-bold text-emerald-700 mb-1.5">{isAr ? 'كلمات موجودة في سيرتك:' : 'Matched Keywords:'}</div>
                        <div className="flex flex-wrap gap-1.5">
                          {jdMatch.matched.map(k => (
                            <span key={k} className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-semibold">✓ {k}</span>
                          ))}
                        </div>
                      </div>
                    )}

                    {jdMatch.missing.length > 0 && (
                      <div>
                        <div className="text-[11px] font-bold text-amber-700 mb-1.5">{isAr ? 'كلمات مفقودة (اضغط لإضافتها لمهاراتك):' : 'Missing Keywords (Click to add to Skills):'}</div>
                        <div className="flex flex-wrap gap-1.5">
                          {jdMatch.missing.map(k => (
                            <button
                              key={k}
                              onClick={() => {
                                addItem('skills', { name: k, category: isAr ? 'تقنية' : 'Technical', level: '' });
                                notify(isAr ? `تمت إضافة "${k}" إلى مهاراتك` : `Added "${k}" to Skills`);
                              }}
                              className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100 text-[11px] font-semibold transition"
                            >
                              + {k}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Live Pure ATS A4 Preview + Direct Export */}
            <div className="lg:col-span-7 space-y-3 print-main">
              <div className="bg-white rounded-2xl border border-slate-200 p-3 flex flex-wrap items-center justify-between gap-2 no-print">
                <span className="text-xs font-extrabold text-[#0B1020] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  {isAr ? 'معاينة ATS النقية (A4)' : 'Pure ATS A4 Preview'}
                </span>
                <div className="flex flex-wrap gap-2">
                  <button onClick={handleExportPDF} className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white text-xs font-bold flex items-center gap-1.5 shadow">
                    <Printer className="w-3.5 h-3.5" /> {isAr ? 'تنزيل ATS PDF' : 'Export ATS PDF'}
                  </button>
                  <button onClick={handleExportWord} className="px-4 py-2 rounded-xl bg-[#0B1020] text-white text-xs font-bold flex items-center gap-1.5">
                    <FileDown className="w-3.5 h-3.5" /> {isAr ? 'تنزيل ATS Word' : 'Export ATS Word'}
                  </button>
                </div>
              </div>

              <ResponsiveA4Frame zoomMultiplier={1} isPrintable={true}>
                {renderCVDocument(cv, atsTemplate, false)}
              </ResponsiveA4Frame>
            </div>
          </div>
        </main>
      )}

      {/* EXPORT VIEW */}
      {view === 'export' && (
        <main className="flex-1 max-w-5xl mx-auto px-3 sm:px-5 py-6 w-full space-y-5 print-main">
          <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 flex flex-wrap items-center justify-between gap-4 no-print">
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold">{t.exportReady}</h1>
              <p className="text-xs text-slate-600 mt-1">{t.privacyBanner}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button onClick={handleExportPDF} className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white text-xs font-bold flex items-center gap-1.5 shadow">
                <Printer className="w-4 h-4" /> {t.downloadPdf}
              </button>
              <button onClick={handleExportWord} className="px-4 py-2.5 rounded-xl bg-[#0B1020] text-white text-xs font-bold flex items-center gap-1.5">
                <FileDown className="w-4 h-4" /> {t.downloadWord}
              </button>
              <button onClick={handleExportJSON} className="px-4 py-2.5 rounded-xl bg-blue-50 text-[#2563EB] text-xs font-bold flex items-center gap-1.5">
                <FileJson className="w-4 h-4" /> {t.downloadJson}
              </button>
              <button onClick={() => setView('builder')} className="px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-bold hover:bg-slate-50">
                {t.editCv}
              </button>
            </div>
          </div>

          <ResponsiveA4Frame zoomMultiplier={1} isPrintable={true}>
            {renderCVDocument()}
          </ResponsiveA4Frame>
        </main>
      )}

      {/* IMPORT CV MODAL */}
      {showImportModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 no-print">
          <div className="bg-white rounded-2xl max-w-lg w-full p-5 sm:p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3">
              <h2 className="font-extrabold text-base sm:text-lg flex items-center gap-2">
                <FileUp className="w-5 h-5 text-[#2563EB]" /> {isAr ? 'استيراد سيرة ذاتية سابقة' : 'Import Previous CV'}
              </h2>
              <button onClick={() => setShowImportModal(false)} className="p-1.5 rounded-lg hover:bg-slate-100"><X className="w-4 h-4" /></button>
            </div>

            {/* AI Parsing Engine Selector */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5 text-xs">
              <div className="font-extrabold text-[#0B1020] flex items-center gap-1.5">
                <Brain className="w-4 h-4 text-[#7C3AED]" />
                {isAr ? 'خوارزمية الذكاء الاصطناعي لتحليل وتوزيع البيانات:' : 'AI Parsing & Classification Engine:'}
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setAiMode('local')}
                  className={`p-2 rounded-xl border text-start transition ${aiMode === 'local' ? 'bg-[#0B1020] text-white border-[#0B1020]' : 'bg-white text-slate-700 border-slate-200'}`}
                >
                  <div className="font-bold flex items-center gap-1"><Cpu className="w-3.5 h-3.5 text-blue-400" /> {isAr ? 'ذكاء محلي (فوري)' : 'Local AI (Offline)'}</div>
                  <div className="text-[10px] opacity-80 mt-0.5">{isAr ? 'خصوصية 100% داخل المتصفح' : '100% in-browser privacy'}</div>
                </button>
                <button
                  type="button"
                  onClick={() => setAiMode('gemini')}
                  className={`p-2 rounded-xl border text-start transition ${aiMode === 'gemini' ? 'bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white border-transparent' : 'bg-white text-slate-700 border-slate-200'}`}
                >
                  <div className="font-bold flex items-center gap-1"><Sparkles className="w-3.5 h-3.5" /> {isAr ? 'Gemini AI المتقدم' : 'Gemini AI Pro'}</div>
                  <div className="text-[10px] opacity-80 mt-0.5">{isAr ? 'دقة فائقة (بمفتاحك الخاص)' : 'Ultra accuracy (Own Key)'}</div>
                </button>
              </div>
              {aiMode === 'gemini' && (
                <div className="space-y-2 pt-1">
                  <input
                    type="password"
                    className="w-full border rounded-lg p-2 bg-white text-xs font-mono"
                    placeholder={isAr ? 'أدخل مفتاح Gemini API Key الخاص بك (يُحفظ مؤقتًا في الذاكرة فقط)' : 'Enter your Gemini API Key (in-memory only)'}
                    value={geminiApiKey}
                    onChange={e => setGeminiApiKey(e.target.value)}
                  />
                  <label className="flex items-start gap-2 text-[11px] text-slate-600 cursor-pointer">
                    <input type="checkbox" checked={aiConsent} onChange={e => setAiConsent(e.target.checked)} className="mt-0.5" />
                    <span>{isAr ? 'أوافق على إرسال نص سيرتي الذاتية إلى Gemini AI لتحليله وتوزيعه في الحقول.' : 'I consent to sending my CV text to Gemini AI for smart parsing.'}</span>
                  </label>
                </div>
              )}
            </div>

            <div className="p-4 rounded-xl bg-[#F5F7FB] border-2 border-dashed border-[#2563EB]/40 text-center space-y-2">
              <Upload className="w-7 h-7 text-[#2563EB] mx-auto" />
              <div className="text-xs font-bold">{isAr ? 'اختر ملف سيرتك الذاتية من جهازك (أي صيغة)' : 'Choose your CV file (Any Format)'}</div>
              <p className="text-[11px] text-slate-500">
                {isAr
                  ? 'يدعم ملفات PDF و Word (.docx / .doc) و HTML و TXT و JSON — المعالجة 100% داخل متصفحك'
                  : 'Supports PDF, Word (.docx / .doc), HTML, TXT, and JSON — 100% in-browser'}
              </p>
              <label className={`inline-block cursor-pointer px-4 py-2 rounded-xl bg-[#2563EB] text-white text-xs font-bold hover:opacity-95 ${importingFile ? 'opacity-60 pointer-events-none' : ''}`}>
                {importingFile ? (isAr ? 'جاري قراءة وتحليل الملف...' : 'Reading & parsing file...') : (isAr ? 'اختيار ملف (PDF / Word / نص)' : 'Choose File (PDF / Word / Text)')}
                <input
                  type="file"
                  accept="*/*"
                  onChange={handleImportFile}
                  className="hidden"
                />
              </label>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold flex items-center gap-1.5">
                <ClipboardPaste className="w-4 h-4 text-[#7C3AED]" />
                {isAr ? 'أو انسخ نص سيرتك الذاتية (من PDF أو Word) والصقه هنا:' : 'Or paste your CV text (from PDF/Word) here:'}
              </label>
              <textarea
                rows={5}
                className="w-full border rounded-xl p-3 text-xs"
                placeholder={isAr ? 'الصق نص سيرتك الذاتية هنا ليتم استخراج الاسم والتواصل والخبرات والمهارات تلقائيًا...' : 'Paste your CV text here to auto-extract name, contact, experience, and skills...'}
                value={pasteText}
                onChange={e => setPasteText(e.target.value)}
              />
              <button
                onClick={handleImportPastedText}
                disabled={!pasteText.trim()}
                className="w-full py-2.5 rounded-xl bg-[#0B1020] text-white text-xs font-bold disabled:opacity-40 hover:bg-[#2563EB] transition"
              >
                {importingFile ? (isAr ? 'جاري التحليل والترتيب بالذكاء الاصطناعي...' : 'AI Parsing & Organizing...') : (isAr ? 'ترتيب وتوزيع النص بالذكاء الاصطناعي' : 'AI Smart Parse & Organize Text')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Template Preview Modal */}
      {previewTemplateModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 no-print">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden">
            <div className="px-4 py-3 border-b flex items-center justify-between">
              <span className="font-extrabold text-sm">{isAr ? 'معاينة القالب' : 'Template Preview'}</span>
              <div className="flex items-center gap-2">
                <button onClick={() => { setSelectedTemplate(previewTemplateModal); setPreviewTemplateModal(null); setView('builder'); }} className="px-4 py-1.5 rounded-lg bg-[#2563EB] text-white text-xs font-bold">
                  {isAr ? 'استخدام القالب' : 'Use Template'}
                </button>
                <button onClick={() => setPreviewTemplateModal(null)} className="p-1.5 rounded-lg hover:bg-slate-100"><X className="w-4 h-4" /></button>
              </div>
            </div>
            <div className="p-3 sm:p-6 overflow-y-auto bg-[#F5F7FB]">
              <ResponsiveA4Frame zoomMultiplier={1}>
                {renderCVDocument(isAr ? SAMPLE_CV_AR : SAMPLE_CV_EN, previewTemplateModal, true)}
              </ResponsiveA4Frame>
            </div>
          </div>
        </div>
      )}

      {/* Clear Confirmation Modal */}
      {showClearModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 no-print">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 space-y-4">
            <div className="flex items-center gap-2 text-red-600 font-extrabold">
              <AlertTriangle className="w-5 h-5" /> {isAr ? 'تأكيد مسح البيانات' : 'Confirm Clear Data'}
            </div>
            <p className="text-xs text-slate-600">
              {isAr ? 'هل أنت متأكد من مسح جميع بيانات السيرة الذاتية من الذاكرة المؤقتة؟' : 'Are you sure you want to clear all CV data from memory?'}
            </p>
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowClearModal(false)} className="px-4 py-2 rounded-lg border text-xs font-bold">{isAr ? 'إلغاء' : 'Cancel'}</button>
              <button onClick={() => { setCv(EMPTY_CV); setSections(DEFAULT_SECTIONS); setShowClearModal(false); notify(isAr ? 'تم مسح كافة البيانات' : 'All data cleared'); }} className="px-4 py-2 rounded-lg bg-red-600 text-white text-xs font-bold">
                {isAr ? 'نعم، امسح الكل' : 'Yes, Clear All'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer with Developer Contact Links */}
      <footer className="bg-[#0B1020] text-slate-300 py-10 mt-auto border-t border-white/10 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-start">
            <div>
              <div className="font-extrabold text-white text-lg tracking-tight">AYASH CV STUDIO</div>
              <div className="text-xs text-slate-400 mt-1">Build Your Career. Design Your Future.</div>
            </div>

            <div className="space-y-2 text-center md:text-end">
              <div className="text-xs text-slate-400">{isAr ? 'تطوير وإشراف:' : 'Developed by:'}</div>
              <div className="font-extrabold text-white text-sm">{DEVELOPER_INFO.name}</div>
              <div className="text-xs text-blue-400">{DEVELOPER_INFO.title} • <span className="font-mono text-purple-400">{DEVELOPER_INFO.tagline}</span></div>
            </div>
          </div>

          <div className="pt-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-400">
              {isAr ? 'للتواصل مع المطور أو الاستفسار أو طلب خدمة:' : 'Contact the developer for inquiries or custom projects:'}
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <a
                href={DEVELOPER_INFO.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 transition shadow"
              >
                <MessageCircle className="w-4 h-4" /> {isAr ? 'واتساب' : 'WhatsApp'}
              </a>
              <a
                href={DEVELOPER_INFO.website}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-1.5 transition"
              >
                <Globe className="w-4 h-4 text-blue-400" /> {isAr ? 'الموقع الإلكتروني' : 'Website'}
              </a>
              <a
                href={DEVELOPER_INFO.smartmed}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#7C3AED] hover:opacity-90 text-white text-xs font-bold flex items-center gap-1.5 transition shadow"
              >
                <ExternalLink className="w-4 h-4" /> SMARTMED AI
              </a>
              <a
                href={DEVELOPER_INFO.email}
                className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-1.5 transition"
              >
                <Mail className="w-4 h-4 text-purple-400" /> {isAr ? 'البريد الإلكتروني' : 'Email'}
              </a>
              <a
                href={DEVELOPER_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl bg-[#0A66C2] hover:opacity-90 text-white text-xs font-bold flex items-center gap-1.5 transition"
              >
                <Linkedin className="w-4 h-4" /> LinkedIn
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
