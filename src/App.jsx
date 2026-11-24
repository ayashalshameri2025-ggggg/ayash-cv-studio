import React, { useState, useMemo } from 'react';
import {
  Sparkles, Shield, Download, Globe, Layout, CheckCircle2,
  ChevronRight, ChevronLeft, Plus, Trash2, Eye, Palette, ArrowUp, ArrowDown,
  RotateCcw, ZoomIn, ZoomOut, Printer, FileDown, Menu, X, ChevronDown,
  Lock, Upload, AlertTriangle, Camera, ImageOff, Info
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
  { id: 'summary', labelAr: 'النبذة الشخصية', labelEn: 'Professional Summary', visible: true },
  { id: 'experience', labelAr: 'الخبرات المهنية', labelEn: 'Work Experience', visible: true },
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
  photoShape: 'circle', // circle | rounded | square
  photoSize: 'md', // sm | md | lg
  spacing: 'normal', // compact | normal | relaxed
  margins: 'normal', // compact | normal | wide
};

const COLOR_PRESETS = ['#2563EB', '#0B1020', '#7C3AED', '#0F766E', '#B91C1C', '#1D4ED8', '#334155'];

const escapeHtml = (str = '') =>
  String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

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
  const [zoom, setZoom] = useState(0.75);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [mobileTab, setMobileTab] = useState('edit');
  const [openFaq, setOpenFaq] = useState(0);
  const [showClearModal, setShowClearModal] = useState(false);
  const [toast, setToast] = useState('');

  const isAr = lang === 'ar';
  const dir = isAr ? 'rtl' : 'ltr';

  const notify = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2800);
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

  const t = useMemo(() => ({
    navHome: isAr ? 'الرئيسية' : 'Home',
    navTemplates: isAr ? 'القوالب' : 'Templates',
    navFeatures: isAr ? 'المميزات' : 'Features',
    navHow: isAr ? 'كيفية الاستخدام' : 'How It Works',
    navFaq: isAr ? 'الأسئلة الشائعة' : 'FAQ',
    startNow: isAr ? 'ابدأ الآن' : 'Start Now',
    heroTitle: isAr ? 'سيرتك الذاتية... أول خطوة نحو مستقبلك المهني' : 'Your CV... The First Step Toward Your Future Career',
    heroDesc: isAr ? 'أنشئ سيرة ذاتية احترافية تعكس مهاراتك وخبراتك وتمنحك حضورًا مميزًا أمام أصحاب العمل، بخصوصية تامة داخل متصفحك.' : 'Create a professional CV that showcases your skills and experience with complete in-browser privacy.',
    ctaCreate: isAr ? 'أنشئ سيرتك الذاتية الآن' : 'Build Your CV Now',
    ctaExplore: isAr ? 'استكشف القوالب' : 'Explore Templates',
    privacyBanner: isAr ? 'خصوصيتك أولويتنا. تتم معالجة بيانات سيرتك الذاتية داخل متصفحك فقط، ولا نقوم بحفظها على خوادمنا.' : 'Your privacy is our priority. Your CV data is processed strictly inside your browser and is never stored on any server.',
    loadSample: isAr ? 'تعبئة بيانات تجريبية' : 'Load Sample Data',
    clearAll: isAr ? 'مسح كافة البيانات' : 'Clear All Data',
    downloadPdf: isAr ? 'تنزيل PDF' : 'Download PDF',
    downloadWord: isAr ? 'تنزيل Word' : 'Download Word',
    editCv: isAr ? 'تعديل السيرة الذاتية' : 'Edit CV',
    changeTemplate: isAr ? 'تغيير القالب' : 'Change Template',
    exportReady: isAr ? 'مراجعة وتصدير السيرة الذاتية' : 'Review & Export Your CV',
  }), [isAr]);

  const updatePersonal = (field, value) => {
    setCv(prev => ({ ...prev, personal: { ...prev.personal, [field]: value } }));
  };

  const updateSummary = (field, value) => {
    setCv(prev => ({ ...prev, summary: { ...prev.summary, [field]: value } }));
  };

  const addItem = (key, templateObj) => {
    setCv(prev => ({ ...prev, [key]: [...prev[key], { ...templateObj, id: Date.now() }] }));
  };

  const updateItem = (key, id, field, value) => {
    setCv(prev => ({
      ...prev,
      [key]: prev[key].map(item => (item.id === id ? { ...item, [field]: value } : item))
    }));
  };

  const removeItem = (key, id) => {
    setCv(prev => ({ ...prev, [key]: prev[key].filter(item => item.id !== id) }));
  };

  const moveSection = (index, direction) => {
    const newArr = [...sections];
    const target = index + direction;
    if (target < 1 || target >= newArr.length) return;
    [newArr[index], newArr[target]] = [newArr[target], newArr[index]];
    setSections(newArr);
  };

  const toggleSectionVisibility = (id) => {
    setSections(prev => prev.map(s => (s.id === id ? { ...s, visible: !s.visible } : s)));
  };

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

  const handleExportPDF = () => {
    window.print();
  };

  // Dedicated clean inline-CSS Word generator compatible with MS Word & WPS Office
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
          ${cv.summary.objective ? `<p style="margin:4px 0;color:#475569;">${escapeHtml(cv.summary.objective)}</p>` : ''}
          ${(cv.summary.specialty || cv.summary.yearsExp) ? `<p style="margin:4px 0;font-size:10pt;color:#334155;">${cv.summary.specialty ? `<b>${isAr ? 'التخصص:' : 'Specialty:'}</b> ${escapeHtml(cv.summary.specialty)} &nbsp;&nbsp;` : ''}${cv.summary.yearsExp ? `<b>${isAr ? 'سنوات الخبرة:' : 'Experience:'}</b> ${escapeHtml(cv.summary.yearsExp)}` : ''}</p>` : ''}`;
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
          ${cv.projects.map(p => `
            <div style="margin-bottom:8px;">
              <p style="margin:0;font-weight:bold;">${escapeHtml(p.name)} ${p.link ? `<span style="font-weight:normal;color:${accent};font-size:9.5pt;">(${escapeHtml(p.link)})</span>` : ''}</p>
              ${p.tech ? `<p style="margin:2px 0;color:${accent};font-size:10pt;">${escapeHtml(p.tech)}</p>` : ''}
              ${p.description ? `<p style="margin:2px 0;">${escapeHtml(p.description)}</p>` : ''}
            </div>`).join('')}`;
      }
      if (id === 'certifications' && cv.certifications.length > 0) {
        return `${sectionTitle(isAr ? 'الدورات والشهادات' : 'Certifications')}
          <ul style="margin:4px 0;padding-${align}:18px;">
            ${cv.certifications.map(c => `<li style="margin-bottom:4px;"><b>${escapeHtml(c.title)}</b> — ${escapeHtml(c.issuer)}${c.date ? ` (${escapeHtml(c.date)})` : ''}${c.link ? ` [${escapeHtml(c.link)}]` : ''}</li>`).join('')}
          </ul>`;
      }
      if (id === 'languages' && cv.languages.length > 0) {
        return `${sectionTitle(isAr ? 'اللغات' : 'Languages')}
          <p style="margin:4px 0;">${cv.languages.map(l => `<b>${escapeHtml(l.name)}:</b> ${escapeHtml(l.level)}`).join(' &nbsp;&nbsp;|&nbsp;&nbsp; ')}</p>`;
      }
      if (id === 'volunteering' && cv.volunteering.length > 0) {
        return `${sectionTitle(isAr ? 'الأعمال التطوعية' : 'Volunteering')}
          ${cv.volunteering.map(v => `<p style="margin:4px 0;"><b>${escapeHtml(v.title)}</b> — ${escapeHtml(v.org)}${v.period ? ` (${escapeHtml(v.period)})` : ''}${v.details ? `<br/>${escapeHtml(v.details)}` : ''}</p>`).join('')}`;
      }
      if (id === 'references' && cv.references.length > 0) {
        return `${sectionTitle(isAr ? 'المراجع' : 'References')}
          ${cv.references.map(r => `<p style="margin:3px 0;"><b>${escapeHtml(r.name)}</b>${r.role ? ` — ${escapeHtml(r.role)}` : ''}${r.contact ? ` — ${escapeHtml(r.contact)}` : ''}</p>`).join('')}`;
      }
      const custom = cv.customSections.find(c => c.id === id);
      if (custom && (custom.title || custom.content)) {
        return `${sectionTitle(custom.title)}<p style="margin:4px 0;white-space:pre-line;">${escapeHtml(custom.content)}</p>`;
      }
      return '';
    }).join('');

    const wordHtml = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40" dir="${dir}" lang="${lang}">
      <head>
        <meta charset="utf-8" />
        <title>${escapeHtml(cv.personal.fullName || 'AYASH CV STUDIO')}</title>
        <style>
          @page { size: A4; margin: 1.5cm; }
          body { font-family: '${design.fontFamily}', 'Arial', sans-serif; direction: ${dir}; text-align: ${align}; color: #0B1020; font-size: 11pt; }
        </style>
      </head>
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
      </body>
      </html>
    `;

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

  // Navigate to previous / next section in editor
  const activeIdx = sections.findIndex(s => s.id === activeSection);
  const goPrevSection = () => { if (activeIdx > 0) setActiveSection(sections[activeIdx - 1].id); };
  const goNextSection = () => { if (activeIdx < sections.length - 1) setActiveSection(sections[activeIdx + 1].id); };

  const renderCVDocument = (data = cv, tplId = selectedTemplate, mini = false) => {
    const accent = tplId === 'ats' ? '#0B1020' : tplId === 'medical' ? '#0F766E' : design.accentColor;
    const fontClass = design.fontFamily === 'IBM Plex Sans Arabic' ? 'font-ibm' : design.fontFamily === 'Inter' ? 'font-inter' : 'font-cairo';
    const padClass = design.margins === 'compact' ? 'p-5' : design.margins === 'wide' ? 'p-10' : 'p-7';
    const gapClass = design.spacing === 'compact' ? 'space-y-3' : design.spacing === 'relaxed' ? 'space-y-6' : 'space-y-4';
    const textSize = design.fontSize === 'sm' ? 'text-xs' : design.fontSize === 'lg' ? 'text-base' : 'text-sm';

    const visibleMap = Object.fromEntries(sections.map(s => [s.id, s.visible]));

    const photoShapeCls =
      design.photoShape === 'rounded' ? 'rounded-2xl'
      : design.photoShape === 'square' ? 'rounded-none'
      : 'rounded-full';
    const photoSizeCls =
      design.photoSize === 'sm' ? 'w-16 h-16'
      : design.photoSize === 'lg' ? 'w-28 h-28'
      : 'w-22 h-22 w-[88px] h-[88px]';

    const headingCls =
      design.headingStyle === 'pill' && tplId !== 'ats'
        ? 'inline-block px-3 py-0.5 rounded-full text-white font-bold text-xs uppercase tracking-wider mb-2'
        : design.headingStyle === 'left-bar' && tplId !== 'ats'
        ? `font-bold text-sm uppercase tracking-wide mb-2 ${isAr ? 'border-r-4 pr-2' : 'border-l-4 pl-2'}`
        : 'font-bold text-sm uppercase tracking-wide pb-1 mb-2 border-b-2';

    const headingStyleObj =
      design.headingStyle === 'pill' && tplId !== 'ats'
        ? { backgroundColor: accent }
        : { color: accent, borderColor: accent };

    // Template-specific section priority ordering (while respecting user visibility)
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
      if (!visibleMap[secId]) return null;
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
            {(data.summary.specialty || data.summary.yearsExp) && (
              <div className={`flex flex-wrap gap-3 mt-1.5 text-xs ${txtSub}`}>
                {data.summary.specialty && <span><strong>{isAr ? 'التخصص:' : 'Specialty:'}</strong> {data.summary.specialty}</span>}
                {data.summary.yearsExp && <span><strong>{isAr ? 'سنوات الخبرة:' : 'Experience:'}</strong> {data.summary.yearsExp}</span>}
              </div>
            )}
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
        // Group skills by category if categories exist
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
                      <span
                        key={sk.id}
                        className={`px-2.5 py-0.5 rounded-md text-xs font-medium ${darkSide ? 'bg-white/15 text-white border border-white/20' : 'bg-slate-100 text-slate-800 border border-slate-200'}`}
                      >
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
                  {c.link && <span className="text-blue-500 ms-1 font-mono text-[10px]">[{c.link}]</span>}
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
    const showPhotoHere = design.showPhoto && data.personal.photo && tplId !== 'ats';

    // SPECIAL LAYOUT 1: CREATIVE (Full-height colored sidebar)
    if (tplId === 'creative') {
      const sideIds = ['skills', 'languages', 'certifications', 'references'];
      return (
        <div id={mini ? undefined : 'cv-a4-preview'} dir={dir} className={`bg-white text-[#0B1020] ${fontClass} ${textSize} w-full min-h-[297mm] shadow-xl border border-slate-200 overflow-hidden print-container grid grid-cols-12`}>
          <div className={`col-span-4 text-white ${padClass} ${gapClass}`} style={{ backgroundColor: accent }}>
            <div className="text-center space-y-2 pb-4 border-b border-white/25">
              {showPhotoHere && (
                <img src={data.personal.photo} alt="Profile" className={`${photoSizeCls} ${photoShapeCls} object-cover border-4 border-white/80 shadow-lg mx-auto`} />
              )}
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

    // SPECIAL LAYOUT 2: CLASSIC & ACADEMIC (Centered formal header)
    if (tplId === 'classic' || tplId === 'academic') {
      return (
        <div id={mini ? undefined : 'cv-a4-preview'} dir={dir} className={`bg-white text-[#0B1020] ${fontClass} ${textSize} w-full min-h-[297mm] shadow-xl border border-slate-200 overflow-hidden print-container`}>
          <div className={`${padClass} text-center border-b-4 border-double`} style={{ borderColor: accent }}>
            {showPhotoHere && (
              <img src={data.personal.photo} alt="Profile" className={`${photoSizeCls} ${photoShapeCls} object-cover border-2 border-slate-200 shadow mx-auto mb-3`} />
            )}
            <h1 className="text-2xl font-extrabold text-[#0B1020]">{data.personal.fullName || (isAr ? 'الاسم الكامل' : 'Your Full Name')}</h1>
            <p className="text-sm font-semibold mt-1" style={{ color: accent }}>{data.personal.jobTitle || (isAr ? 'المسمى الوظيفي' : 'Job Title')}</p>
            {contactItems.length > 0 && (
              <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 mt-2 text-xs text-slate-600">
                {contactItems.map((item, idx) => <span key={idx}>{idx > 0 ? ' | ' : ''}{item}</span>)}
              </div>
            )}
          </div>
          <div className={`${padClass} ${gapClass}`}>
            {orderedIds.map(id => renderSectionBlock(id))}
          </div>
        </div>
      );
    }

    // SPECIAL LAYOUT 3: MINIMAL (Asymmetric split header)
    if (tplId === 'minimal') {
      return (
        <div id={mini ? undefined : 'cv-a4-preview'} dir={dir} className={`bg-white text-[#0B1020] ${fontClass} ${textSize} w-full min-h-[297mm] shadow-xl border border-slate-200 overflow-hidden print-container`}>
          <div className={`${padClass} flex items-center justify-between gap-4 border-b border-slate-200`}>
            <div className="flex items-center gap-4">
              {showPhotoHere && (
                <img src={data.personal.photo} alt="Profile" className={`${photoSizeCls} ${photoShapeCls} object-cover border border-slate-200 shrink-0`} />
              )}
              <div>
                <h1 className="text-2xl font-extrabold tracking-tight">{data.personal.fullName || (isAr ? 'الاسم الكامل' : 'Your Full Name')}</h1>
                <p className="text-sm text-slate-500 font-medium mt-0.5">{data.personal.jobTitle || (isAr ? 'المسمى الوظيفي' : 'Job Title')}</p>
              </div>
            </div>
            <div className="text-[11px] text-slate-500 text-end space-y-0.5">
              {contactItems.slice(0, 4).map((item, idx) => <div key={idx}>{item}</div>)}
            </div>
          </div>
          <div className={`${padClass} ${gapClass}`}>
            {orderedIds.map(id => renderSectionBlock(id))}
          </div>
        </div>
      );
    }

    // SPECIAL LAYOUT 4: INTERNATIONAL (Card Header + Bottom 2-Col Grid)
    if (tplId === 'international') {
      const bottomIds = ['skills', 'languages'];
      return (
        <div id={mini ? undefined : 'cv-a4-preview'} dir={dir} className={`bg-white text-[#0B1020] ${fontClass} ${textSize} w-full min-h-[297mm] shadow-xl border border-slate-200 overflow-hidden print-container ${padClass} ${gapClass}`}>
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {showPhotoHere && (
                <img src={data.personal.photo} alt="Profile" className={`${photoSizeCls} ${photoShapeCls} object-cover border-2 border-white shadow shrink-0`} />
              )}
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
          </div>
          <div className={gapClass}>
            {orderedIds.filter(id => !bottomIds.includes(id)).map(id => renderSectionBlock(id))}
          </div>
          <div className="grid grid-cols-2 gap-6 pt-2 border-t border-slate-200">
            {bottomIds.map(id => <div key={id}>{renderSectionBlock(id)}</div>)}
          </div>
        </div>
      );
    }

    // STANDARD & SIDEBAR LAYOUTS (executive, technical, medical, graduate, ats)
    const isSidebarTemplate = ['executive', 'technical', 'medical'].includes(tplId);
    const headerBg =
      tplId === 'executive' ? '#0B1020'
      : tplId === 'technical' ? '#0F172A'
      : tplId === 'medical' ? '#F0FDFA'
      : tplId === 'graduate' ? '#EFF6FF'
      : 'transparent';
    const headerDark = ['executive', 'technical'].includes(tplId);

    return (
      <div
        id={mini ? undefined : 'cv-a4-preview'}
        dir={dir}
        className={`bg-white text-[#0B1020] ${fontClass} ${textSize} w-full min-h-[297mm] shadow-xl border border-slate-200 overflow-hidden print-container`}
      >
        {tplId === 'medical' && <div className="h-2.5 w-full bg-[#0F766E]" />}
        {tplId === 'graduate' && <div className="h-2 w-full" style={{ backgroundColor: accent }} />}
        <div
          className={`${padClass} ${headerDark ? 'text-white' : 'border-b-2'}`}
          style={{ backgroundColor: headerBg, borderColor: headerDark ? 'transparent' : accent }}
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {showPhotoHere && (
                <img
                  src={data.personal.photo}
                  alt="Profile"
                  className={`${photoSizeCls} ${photoShapeCls} object-cover border-2 ${headerDark ? 'border-white/80' : 'border-slate-200'} shadow-md shrink-0`}
                />
              )}
              <div>
                <h1 className={`text-2xl font-extrabold ${headerDark ? 'text-white' : 'text-[#0B1020]'}`}>
                  {data.personal.fullName || (isAr ? 'الاسم الكامل' : 'Your Full Name')}
                </h1>
                <p className={`text-sm font-semibold mt-0.5 ${headerDark ? 'text-blue-200' : ''}`} style={!headerDark ? { color: accent } : {}}>
                  {data.personal.jobTitle || (isAr ? 'المسمى الوظيفي' : 'Professional Job Title')}
                </p>
                {tplId === 'medical' && (data.summary.specialty || data.summary.yearsExp) && (
                  <div className="flex flex-wrap gap-2 mt-1.5">
                    {data.summary.specialty && <span className="px-2 py-0.5 rounded bg-teal-100 text-teal-800 text-[11px] font-bold">{data.summary.specialty}</span>}
                    {data.summary.yearsExp && <span className="px-2 py-0.5 rounded bg-white border border-teal-200 text-teal-800 text-[11px] font-bold">{data.summary.yearsExp}</span>}
                  </div>
                )}
              </div>
            </div>
            {tplId === 'technical' && (
              <div className="text-[11px] font-mono bg-white/10 px-2.5 py-1 rounded text-blue-200 shrink-0">
                {'<DEV_CV />'}
              </div>
            )}
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
              {orderedIds
                .filter(id => !['skills', 'languages', 'certifications', 'references'].includes(id))
                .map(id => renderSectionBlock(id))}
            </div>
          </div>
        ) : (
          <div className={`${padClass} ${gapClass}`}>
            {orderedIds.map(id => renderSectionBlock(id))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div dir={dir} className="min-h-screen bg-[#F5F7FB] text-[#0B1020] flex flex-col">
      {toast && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 bg-[#0B1020] text-white px-5 py-2.5 rounded-xl shadow-2xl text-xs font-bold flex items-center gap-2 no-print">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          {toast}
        </div>
      )}

      {/* Navbar */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-slate-200 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <button onClick={() => setView('landing')} className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0B1020] via-[#2563EB] to-[#7C3AED] flex items-center justify-center text-white font-extrabold shadow">
              A
            </div>
            <div className="text-start">
              <div className="font-extrabold text-sm sm:text-base tracking-tight text-[#0B1020]">AYASH CV STUDIO</div>
              <div className="text-[10px] text-slate-500 font-mono">Code meets intelligence</div>
            </div>
          </button>

          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-700">
            <button onClick={() => setView('landing')} className="hover:text-[#2563EB] transition">{t.navHome}</button>
            <button onClick={() => setView('templates')} className="hover:text-[#2563EB] transition">{t.navTemplates}</button>
            <button onClick={() => { setView('landing'); setTimeout(() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' }), 50); }} className="hover:text-[#2563EB] transition">{t.navFeatures}</button>
            <button onClick={() => { setView('landing'); setTimeout(() => document.getElementById('how')?.scrollIntoView({ behavior: 'smooth' }), 50); }} className="hover:text-[#2563EB] transition">{t.navHow}</button>
            <button onClick={() => { setView('landing'); setTimeout(() => document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' }), 50); }} className="hover:text-[#2563EB] transition">{t.navFaq}</button>
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setLang(isAr ? 'en' : 'ar')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-bold hover:bg-slate-50"
            >
              <Globe className="w-4 h-4 text-[#2563EB]" />
              {isAr ? 'EN' : 'عربي'}
            </button>
            <button
              onClick={() => setView('builder')}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white text-xs font-bold shadow hover:opacity-95 transition"
            >
              <Sparkles className="w-4 h-4" />
              {t.startNow}
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
            <button onClick={() => { setView('builder'); setMobileMenu(false); }} className="block w-full text-start py-1.5 text-[#2563EB]">{t.startNow}</button>
          </div>
        )}
      </header>

      {/* Privacy Strip */}
      <div className="bg-[#0B1020] text-slate-200 text-xs py-2 px-4 text-center flex items-center justify-center gap-2 no-print">
        <Lock className="w-3.5 h-3.5 text-[#7C3AED] shrink-0" />
        <span>{t.privacyBanner}</span>
      </div>

      {/* LANDING VIEW */}
      {view === 'landing' && (
        <main className="flex-1">
          <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14 lg:py-20 grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#2563EB] text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                Build Your Career. Design Your Future.
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight text-[#0B1020]">
                {t.heroTitle}
              </h1>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                {t.heroDesc}
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setView('builder')}
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white font-bold shadow-lg shadow-blue-500/20 hover:opacity-95 transition flex items-center gap-2"
                >
                  {t.ctaCreate}
                  {isAr ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setView('templates')}
                  className="px-6 py-3.5 rounded-xl bg-white border border-slate-200 font-bold text-[#0B1020] hover:border-[#2563EB] transition"
                >
                  {t.ctaExplore}
                </button>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-tr from-[#2563EB]/15 to-[#7C3AED]/15 rounded-3xl blur-2xl" />
              <div className="relative bg-white rounded-2xl shadow-2xl border border-slate-200 p-5 space-y-4">
                <div className="bg-[#0B1020] text-white rounded-xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#2563EB] to-[#7C3AED] flex items-center justify-center font-extrabold text-sm border-2 border-white/70">AM</div>
                    <div>
                      <div className="font-extrabold text-base sm:text-lg">AYASH MAHMOUD ALSHAMERI</div>
                      <div className="text-xs text-blue-300">Software & AI Developer</div>
                    </div>
                  </div>
                  <div className="px-2.5 py-1 rounded-lg bg-[#2563EB] text-[10px] font-bold">A4 READY</div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-1 bg-slate-50 rounded-xl p-3 space-y-2">
                    <div className="h-2.5 w-16 bg-[#2563EB] rounded" />
                    <div className="h-2 w-full bg-slate-200 rounded" />
                    <div className="h-2 w-4/5 bg-slate-200 rounded" />
                    <div className="h-2.5 w-14 bg-[#7C3AED] rounded mt-4" />
                    <div className="h-2 w-full bg-slate-200 rounded" />
                  </div>
                  <div className="col-span-2 space-y-2.5 p-2">
                    <div className="h-2.5 w-28 bg-[#0B1020] rounded" />
                    <div className="h-2 w-full bg-slate-200 rounded" />
                    <div className="h-2 w-11/12 bg-slate-200 rounded" />
                    <div className="h-2.5 w-24 bg-[#2563EB] rounded mt-3" />
                    <div className="h-2 w-full bg-slate-200 rounded" />
                    <div className="h-2 w-5/6 bg-slate-200 rounded" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="features" className="bg-white py-16 border-y border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-center mb-10">
                {isAr ? 'مميزات AYASH CV STUDIO' : 'Why Choose AYASH CV STUDIO'}
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { icon: Layout, ar: '10 قوالب مختلفة البنية', en: '10 Distinct Layouts', dAr: 'كل قالب يمتلك توزيعًا وهيكلة مختلفة تناسب تخصصك.', dEn: 'Every template features a unique layout structure.' },
                  { icon: Camera, ar: 'صورة شخصية اختيارية', en: 'Optional Profile Photo', dAr: 'أضف صورتك الشخصية (دائرية أو مربعة) وتحكم بحجمها أو أخفها بضغطة زر.', dEn: 'Upload an optional photo with shape & size controls.' },
                  { icon: Eye, ar: 'معاينة مباشرة A4', en: 'Live A4 Preview', dAr: 'شاهد كل تعديل فورًا على صفحة A4 جاهزة للطباعة.', dEn: 'See every edit instantly on print-ready A4.' },
                  { icon: Globe, ar: 'دعم العربية والإنجليزية', en: 'Arabic RTL & English LTR', dAr: 'تبديل فوري للغة واتجاه الكتابة بدون أخطاء.', dEn: 'Seamless bilingual direction switching.' },
                  { icon: Download, ar: 'تصدير PDF وWord منسّق', en: 'Polished PDF & Word', dAr: 'ملفات PDF نصية وملفات Word متوافقة مع MS Word وWPS.', dEn: 'Selectable PDF and cleanly formatted Word files.' },
                  { icon: Shield, ar: 'خصوصية تامة للبيانات', en: '100% Privacy First', dAr: 'لا حسابات ولا خوادم؛ كل شيء داخل متصفحك فقط.', dEn: 'Zero servers, zero tracking, in-memory only.' },
                ].map((f, idx) => (
                  <div key={idx} className="p-6 rounded-2xl bg-[#F5F7FB] border border-slate-200 hover:border-[#2563EB] transition">
                    <div className="w-11 h-11 rounded-xl bg-white shadow-sm flex items-center justify-center text-[#2563EB] mb-4">
                      <f.icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-lg mb-1">{isAr ? f.ar : f.en}</h3>
                    <p className="text-sm text-slate-600">{isAr ? f.dAr : f.dEn}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="how" className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-center mb-10">
              {isAr ? '5 خطوات بسيطة لسيرة ذاتية احترافية' : '5 Simple Steps to Your New CV'}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                { n: '01', ar: 'اختر قالبك المفضل', en: 'Choose a Template' },
                { n: '02', ar: 'أدخل بياناتك', en: 'Enter Your Details' },
                { n: '03', ar: 'خصص تصميم سيرتك', en: 'Customize Design' },
                { n: '04', ar: 'عاين النتيجة', en: 'Preview Live' },
                { n: '05', ar: 'حمّل سيرتك الذاتية', en: 'Download PDF / Word' },
              ].map((s, i) => (
                <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 text-center">
                  <div className="text-2xl font-extrabold text-[#2563EB] font-mono mb-2">{s.n}</div>
                  <div className="font-bold text-sm">{isAr ? s.ar : s.en}</div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white py-16 border-y border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl sm:text-3xl font-extrabold">{isAr ? 'القوالب المميزة' : 'Featured Templates'}</h2>
                <button onClick={() => setView('templates')} className="text-sm font-bold text-[#2563EB] hover:underline">
                  {isAr ? 'عرض جميع القوالب (10)' : 'View All 10 Templates'}
                </button>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {TEMPLATES.slice(0, 4).map(tpl => (
                  <div key={tpl.id} className="rounded-2xl border border-slate-200 bg-[#F5F7FB] p-4 flex flex-col justify-between">
                    <div>
                      <div className="h-36 rounded-xl bg-white border border-slate-200 p-3 mb-3 overflow-hidden">
                        <div className={`h-5 rounded mb-2 ${tpl.id === 'classic' ? 'mx-auto w-2/3 bg-[#0B1020]' : tpl.id === 'creative' ? 'w-full bg-[#2563EB]' : 'w-3/4 bg-[#0B1020]'}`} />
                        <div className="h-2 rounded bg-[#2563EB]/40 mb-2 w-1/2" />
                        <div className="space-y-1.5 mt-3">
                          <div className="h-1.5 rounded bg-slate-200 w-full" />
                          <div className="h-1.5 rounded bg-slate-200 w-5/6" />
                          <div className="h-1.5 rounded bg-slate-200 w-4/6" />
                        </div>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-[#2563EB]">{tpl.tag}</span>
                      <h3 className="font-bold mt-2">{isAr ? tpl.nameAr : tpl.nameEn}</h3>
                      <p className="text-xs text-slate-600 mt-1">{isAr ? tpl.descAr : tpl.descEn}</p>
                    </div>
                    <button
                      onClick={() => { setSelectedTemplate(tpl.id); setView('builder'); }}
                      className="mt-4 w-full py-2 rounded-xl bg-[#0B1020] text-white text-xs font-bold hover:bg-[#2563EB] transition"
                    >
                      {isAr ? 'استخدام هذا القالب' : 'Use Template'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="faq" className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-center mb-8">
              {isAr ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
            </h2>
            <div className="space-y-3">
              {[
                { qAr: 'هل يتم حفظ بياناتي أو صورتي على الإنترنت؟', aAr: 'لا إطلاقًا. تعمل المنصة بالكامل داخل ذاكرة متصفحك المؤقتة دون خوادم أو قواعد بيانات أو LocalStorage.', qEn: 'Is my data or photo saved online?', aEn: 'Never. Everything runs strictly in your browser memory with zero servers or storage.' },
                { qAr: 'هل يمكنني إضافة صورة شخصية للسيرة الذاتية؟', aAr: 'نعم، الصورة الشخصية اختيارية بالكامل؛ يمكنك تفعيلها أو إخفاؤها وتحديد شكلها وحجمها بسهولة.', qEn: 'Can I add a profile photo?', aEn: 'Yes, the profile photo is completely optional with shape, size, and visibility controls.' },
                { qAr: 'هل ملفات PDF وWord قابلة للتعديل والبحث؟', aAr: 'نعم، ملفات PDF نصية قابلة للبحث والنسخ، وملفات Word منسقة وقابلة للتعديل في MS Word وWPS Office.', qEn: 'Are exported PDF & Word files editable?', aEn: 'Yes, PDFs are selectable vector text and Word files are formatted for MS Word & WPS.' },
              ].map((item, idx) => (
                <div key={idx} className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                    className="w-full px-5 py-4 flex items-center justify-between font-bold text-sm text-start"
                  >
                    <span>{isAr ? item.qAr : item.qEn}</span>
                    <ChevronDown className={`w-4 h-4 transition ${openFaq === idx ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaq === idx && (
                    <div className="px-5 pb-4 text-sm text-slate-600">{isAr ? item.aAr : item.aEn}</div>
                  )}
                </div>
              ))}
            </div>
          </section>
        </main>
      )}

      {/* TEMPLATES LIBRARY VIEW */}
      {view === 'templates' && (
        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-10 w-full">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold">{isAr ? 'مكتبة القوالب الاحترافية' : 'Professional Templates Library'}</h1>
              <p className="text-sm text-slate-600 mt-1">{isAr ? '10 قوالب مصممة بعناية ومختلفة في البنية والتوزيع.' : '10 structurally distinct templates ready to customize.'}</p>
            </div>
            <button onClick={() => setView('builder')} className="px-4 py-2 rounded-xl bg-[#2563EB] text-white text-sm font-bold">
              {isAr ? 'العودة للمحرر' : 'Go to Builder'}
            </button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TEMPLATES.map(tpl => (
              <div key={tpl.id} className={`rounded-2xl bg-white border-2 p-5 flex flex-col justify-between transition ${selectedTemplate === tpl.id ? 'border-[#2563EB] shadow-lg' : 'border-slate-200'}`}>
                <div>
                  <div className="h-44 rounded-xl bg-[#F5F7FB] border border-slate-200 p-3 mb-4 overflow-hidden">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#0B1020] text-white">{tpl.tag}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{tpl.layout}</span>
                    </div>
                    <div className="bg-white h-28 rounded-lg border border-slate-200 overflow-hidden flex">
                      {tpl.id === 'creative' && (
                        <div className="w-1/3 bg-[#2563EB] p-2 space-y-1.5">
                          <div className="w-5 h-5 rounded-full bg-white/80 mx-auto" />
                          <div className="h-1.5 bg-white/70 rounded w-full" />
                          <div className="h-1 bg-white/50 rounded w-2/3 mx-auto" />
                        </div>
                      )}
                      {['executive', 'technical', 'medical'].includes(tpl.id) && (
                        <div className="w-1/3 bg-slate-100 p-2 space-y-1.5 border-e">
                          <div className={`h-2 rounded w-3/4 ${tpl.id === 'medical' ? 'bg-teal-600' : 'bg-[#2563EB]'}`} />
                          <div className="h-1.5 bg-slate-300 rounded w-full" />
                          <div className="h-1.5 bg-slate-300 rounded w-2/3" />
                        </div>
                      )}
                      <div className="flex-1 p-2.5 space-y-1.5">
                        <div className={`h-3 rounded ${tpl.id === 'classic' || tpl.id === 'academic' ? 'mx-auto w-1/2 bg-[#0B1020]' : tpl.id === 'ats' ? 'w-2/3 bg-black' : 'w-2/3 bg-[#0B1020]'}`} />
                        <div className={`h-1.5 rounded ${tpl.id === 'classic' || tpl.id === 'academic' ? 'mx-auto w-1/3 bg-blue-400' : 'w-1/2 bg-[#7C3AED]/50'}`} />
                        <div className="h-1.5 bg-slate-200 rounded w-full mt-2" />
                        <div className="h-1.5 bg-slate-200 rounded w-5/6" />
                        <div className="h-1.5 bg-slate-200 rounded w-3/4" />
                      </div>
                    </div>
                  </div>
                  <h3 className="font-extrabold text-lg">{isAr ? tpl.nameAr : tpl.nameEn}</h3>
                  <p className="text-xs text-slate-600 mt-1">{isAr ? tpl.descAr : tpl.descEn}</p>
                </div>
                <div className="flex gap-2 mt-5">
                  <button
                    onClick={() => setPreviewTemplateModal(tpl.id)}
                    className="flex-1 py-2 rounded-xl border border-slate-200 text-xs font-bold hover:bg-slate-50 flex items-center justify-center gap-1"
                  >
                    <Eye className="w-3.5 h-3.5" /> {isAr ? 'معاينة' : 'Preview'}
                  </button>
                  <button
                    onClick={() => { setSelectedTemplate(tpl.id); setView('builder'); }}
                    className="flex-1 py-2 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white text-xs font-bold"
                  >
                    {isAr ? 'استخدام القالب' : 'Use Template'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      )}

      {/* BUILDER VIEW */}
      {view === 'builder' && (
        <main className="flex-1 max-w-[1600px] mx-auto w-full px-3 sm:px-5 py-5 flex flex-col gap-4 print-main">
          {/* Top Action Bar */}
          <div className="bg-white rounded-2xl border border-slate-200 p-3 flex flex-wrap items-center justify-between gap-2 no-print">
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => { setCv(isAr ? SAMPLE_CV_AR : SAMPLE_CV_EN); notify(isAr ? 'تمت تعبئة بيانات تجريبية' : 'Sample data loaded'); }}
                className="px-3 py-1.5 rounded-lg bg-blue-50 text-[#2563EB] text-xs font-bold hover:bg-blue-100"
              >
                {t.loadSample}
              </button>
              <button
                onClick={() => setShowClearModal(true)}
                className="px-3 py-1.5 rounded-lg bg-red-50 text-red-600 text-xs font-bold hover:bg-red-100"
              >
                {t.clearAll}
              </button>
              <button
                onClick={() => setShowDesignPanel(!showDesignPanel)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 border ${showDesignPanel ? 'bg-[#0B1020] text-white border-[#0B1020]' : 'bg-white text-slate-700 border-slate-200'}`}
              >
                <Palette className="w-3.5 h-3.5" /> {isAr ? 'تخصيص التصميم' : 'Customize Design'}
              </button>
              <button
                onClick={() => setView('templates')}
                className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-bold hover:bg-slate-50"
              >
                {t.changeTemplate}
              </button>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex lg:hidden border border-slate-200 rounded-lg overflow-hidden text-xs font-bold">
                <button onClick={() => setMobileTab('edit')} className={`px-3 py-1.5 ${mobileTab === 'edit' ? 'bg-[#2563EB] text-white' : 'bg-white'}`}>{isAr ? 'تحرير' : 'Edit'}</button>
                <button onClick={() => setMobileTab('preview')} className={`px-3 py-1.5 ${mobileTab === 'preview' ? 'bg-[#2563EB] text-white' : 'bg-white'}`}>{isAr ? 'معاينة' : 'Preview'}</button>
              </div>
              <button
                onClick={() => setView('export')}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white text-xs font-bold flex items-center gap-1.5 shadow"
              >
                <Download className="w-4 h-4" /> {isAr ? 'المراجعة والتنزيل' : 'Review & Export'}
              </button>
            </div>
          </div>

          {/* Design Panel */}
          {showDesignPanel && (
            <div className="bg-white rounded-2xl border border-slate-200 p-4 grid sm:grid-cols-2 lg:grid-cols-6 gap-4 text-xs no-print">
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
                    <option value="sm">{isAr ? 'خط صغير' : 'Small Font'}</option>
                    <option value="base">{isAr ? 'خط متوسط' : 'Medium Font'}</option>
                    <option value="lg">{isAr ? 'خط كبير' : 'Large Font'}</option>
                  </select>
                  <select value={design.headingStyle} onChange={e => setDesign(d => ({ ...d, headingStyle: e.target.value }))} className="w-full border rounded-lg p-1.5">
                    <option value="underline">{isAr ? 'عناوين بخط سفلي' : 'Underline'}</option>
                    <option value="left-bar">{isAr ? 'شريط جانبي' : 'Side Bar'}</option>
                    <option value="pill">{isAr ? 'بطاقة ملونة' : 'Colored Pill'}</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="font-bold block mb-1.5">{isAr ? 'الهوامش والمسافات' : 'Margins & Spacing'}</label>
                <div className="space-y-1.5">
                  <select value={design.margins} onChange={e => setDesign(d => ({ ...d, margins: e.target.value }))} className="w-full border rounded-lg p-1.5">
                    <option value="compact">{isAr ? 'هوامش مضغوطة' : 'Compact Margins'}</option>
                    <option value="normal">{isAr ? 'هوامش متوازنة' : 'Normal Margins'}</option>
                    <option value="wide">{isAr ? 'هوامش واسعة' : 'Wide Margins'}</option>
                  </select>
                  <select value={design.spacing} onChange={e => setDesign(d => ({ ...d, spacing: e.target.value }))} className="w-full border rounded-lg p-1.5">
                    <option value="compact">{isAr ? 'مسافات مضغوطة' : 'Compact Spacing'}</option>
                    <option value="normal">{isAr ? 'مسافات متوازنة' : 'Normal Spacing'}</option>
                    <option value="relaxed">{isAr ? 'مسافات واسعة' : 'Relaxed Spacing'}</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="font-bold block mb-1.5">{isAr ? 'إعدادات الصورة' : 'Photo Style'}</label>
                <div className="space-y-1.5">
                  <select value={design.photoShape} onChange={e => setDesign(d => ({ ...d, photoShape: e.target.value }))} className="w-full border rounded-lg p-1.5">
                    <option value="circle">{isAr ? 'صورة دائرية' : 'Circle Photo'}</option>
                    <option value="rounded">{isAr ? 'مربعة ناعمة' : 'Rounded Square'}</option>
                    <option value="square">{isAr ? 'مربعة رسمية' : 'Sharp Square'}</option>
                  </select>
                  <select value={design.photoSize} onChange={e => setDesign(d => ({ ...d, photoSize: e.target.value }))} className="w-full border rounded-lg p-1.5">
                    <option value="sm">{isAr ? 'حجم صغير' : 'Small Size'}</option>
                    <option value="md">{isAr ? 'حجم متوسط' : 'Medium Size'}</option>
                    <option value="lg">{isAr ? 'حجم كبير' : 'Large Size'}</option>
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

          {/* 3-Pane Studio */}
          <div className="grid lg:grid-cols-12 gap-4 flex-1 print-main">
            {/* Pane 1: Sections Sidebar */}
            <aside className={`lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-3 space-y-2 h-fit no-print ${mobileTab === 'preview' ? 'hidden lg:block' : ''}`}>
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
                  <div
                    key={sec.id}
                    className={`flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-bold transition ${activeSection === sec.id ? 'bg-[#0B1020] text-white' : 'hover:bg-slate-100 text-slate-700'}`}
                  >
                    <button onClick={() => setActiveSection(sec.id)} className="flex-1 text-start truncate">
                      {isAr ? sec.labelAr : sec.labelEn}
                    </button>
                    <div className="flex items-center gap-1">
                      {sec.id !== 'personal' && (
                        <>
                          <button onClick={() => moveSection(idx, -1)} className="p-0.5 opacity-70 hover:opacity-100" title="Up"><ArrowUp className="w-3 h-3" /></button>
                          <button onClick={() => moveSection(idx, 1)} className="p-0.5 opacity-70 hover:opacity-100" title="Down"><ArrowDown className="w-3 h-3" /></button>
                          <input type="checkbox" checked={sec.visible} onChange={() => toggleSectionVisibility(sec.id)} title="Toggle" />
                        </>
                      )}
                      {sec.isCustom && (
                        <button onClick={() => deleteCustomSection(sec.id)} className="text-red-400 hover:text-red-500"><Trash2 className="w-3 h-3" /></button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </aside>

            {/* Pane 2: Data Editor */}
            <section className={`lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-5 h-fit space-y-4 no-print ${mobileTab === 'preview' ? 'hidden lg:block' : ''}`}>
              {activeSection === 'personal' && (
                <div className="space-y-4">
                  <h2 className="font-extrabold text-lg">{isAr ? 'المعلومات الشخصية' : 'Personal Information'}</h2>

                  {/* Enhanced Optional Photo Box */}
                  <div className="p-4 rounded-2xl bg-[#F5F7FB] border border-slate-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold text-[#0B1020] flex items-center gap-1.5">
                        <Camera className="w-4 h-4 text-[#2563EB]" />
                        {isAr ? 'الصورة الشخصية (اختيارية)' : 'Profile Photo (Optional)'}
                      </span>
                      <label className="flex items-center gap-1.5 text-[11px] font-bold text-slate-600 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={design.showPhoto}
                          onChange={e => setDesign(d => ({ ...d, showPhoto: e.target.checked }))}
                        />
                        {isAr ? 'إظهار في السيرة' : 'Show on CV'}
                      </label>
                    </div>

                    {selectedTemplate === 'ats' && cv.personal.photo && (
                      <div className="p-2 rounded-lg bg-amber-50 border border-amber-200 text-[11px] text-amber-800 flex items-start gap-1.5">
                        <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                        <span>{isAr ? 'قالب ATS يخفي الصورة تلقائيًا لرفع نسبة القبول الآلي. اختر قالبًا آخر لإظهار الصورة.' : 'ATS template hides photos automatically for scanner compatibility. Pick another template to show it.'}</span>
                      </div>
                    )}

                    <div className="flex items-center gap-4">
                      <div className={`w-16 h-16 ${design.photoShape === 'rounded' ? 'rounded-xl' : design.photoShape === 'square' ? 'rounded-none' : 'rounded-full'} bg-white border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden shrink-0`}>
                        {cv.personal.photo ? (
                          <img src={cv.personal.photo} alt="Avatar" className="w-full h-full object-cover" />
                        ) : (
                          <Camera className="w-6 h-6 text-slate-400" />
                        )}
                      </div>
                      <div className="flex-1 space-y-2 text-xs">
                        <div className="flex flex-wrap gap-2">
                          <label className="cursor-pointer px-3 py-1.5 rounded-lg bg-[#2563EB] text-white font-bold hover:opacity-95 inline-flex items-center gap-1.5">
                            <Upload className="w-3.5 h-3.5" />
                            {cv.personal.photo ? (isAr ? 'تغيير الصورة' : 'Change') : (isAr ? 'رفع صورة' : 'Upload')}
                            <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                          </label>
                          {cv.personal.photo && (
                            <button onClick={handleRemovePhoto} className="px-3 py-1.5 rounded-lg bg-red-50 text-red-600 font-bold hover:bg-red-100 inline-flex items-center gap-1">
                              <ImageOff className="w-3.5 h-3.5" /> {isAr ? 'حذف' : 'Remove'}
                            </button>
                          )}
                        </div>
                        {cv.personal.photo && (
                          <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-600">
                            <label className="flex items-center gap-1 cursor-pointer">
                              <input type="radio" name="photoShape" checked={design.photoShape === 'circle'} onChange={() => setDesign(d => ({ ...d, photoShape: 'circle' }))} />
                              {isAr ? 'دائرية' : 'Circle'}
                            </label>
                            <label className="flex items-center gap-1 cursor-pointer">
                              <input type="radio" name="photoShape" checked={design.photoShape === 'rounded'} onChange={() => setDesign(d => ({ ...d, photoShape: 'rounded' }))} />
                              {isAr ? 'مربعة ناعمة' : 'Rounded'}
                            </label>
                            <label className="flex items-center gap-1 cursor-pointer">
                              <input type="radio" name="photoShape" checked={design.photoShape === 'square'} onChange={() => setDesign(d => ({ ...d, photoShape: 'square' }))} />
                              {isAr ? 'رسمية' : 'Square'}
                            </label>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3 text-xs">
                    <input className="border rounded-xl p-2.5" placeholder={isAr ? 'الاسم الكامل' : 'Full Name'} value={cv.personal.fullName} onChange={e => updatePersonal('fullName', e.target.value)} />
                    <input className="border rounded-xl p-2.5" placeholder={isAr ? 'المسمى الوظيفي' : 'Job Title'} value={cv.personal.jobTitle} onChange={e => updatePersonal('jobTitle', e.target.value)} />
                    <input className="border rounded-xl p-2.5" placeholder={isAr ? 'البريد الإلكتروني' : 'Email'} value={cv.personal.email} onChange={e => updatePersonal('email', e.target.value)} />
                    <input className="border rounded-xl p-2.5" placeholder={isAr ? 'رقم الهاتف' : 'Phone'} value={cv.personal.phone} onChange={e => updatePersonal('phone', e.target.value)} />
                    <input className="border rounded-xl p-2.5" placeholder={isAr ? 'الدولة والمدينة' : 'City, Country'} value={cv.personal.location} onChange={e => updatePersonal('location', e.target.value)} />
                    <input className="border rounded-xl p-2.5" placeholder={isAr ? 'العنوان' : 'Address'} value={cv.personal.address} onChange={e => updatePersonal('address', e.target.value)} />
                    <input className="border rounded-xl p-2.5" placeholder="LinkedIn" value={cv.personal.linkedin} onChange={e => updatePersonal('linkedin', e.target.value)} />
                    <input className="border rounded-xl p-2.5" placeholder="GitHub" value={cv.personal.github} onChange={e => updatePersonal('github', e.target.value)} />
                    <input className="border rounded-xl p-2.5 sm:col-span-2" placeholder={isAr ? 'الموقع الشخصي' : 'Personal Website'} value={cv.personal.website} onChange={e => updatePersonal('website', e.target.value)} />
                  </div>
                </div>
              )}

              {activeSection === 'summary' && (
                <div className="space-y-3 text-xs">
                  <h2 className="font-extrabold text-lg">{isAr ? 'النبذة الشخصية' : 'Professional Summary'}</h2>
                  <textarea rows={4} className="w-full border rounded-xl p-2.5" placeholder={isAr ? 'ملخص مهني...' : 'Professional bio...'} value={cv.summary.bio} onChange={e => updateSummary('bio', e.target.value)} />
                  <textarea rows={2} className="w-full border rounded-xl p-2.5" placeholder={isAr ? 'الأهداف المهنية...' : 'Career objective...'} value={cv.summary.objective} onChange={e => updateSummary('objective', e.target.value)} />
                  <div className="grid grid-cols-2 gap-3">
                    <input className="border rounded-xl p-2.5" placeholder={isAr ? 'التخصص' : 'Specialty'} value={cv.summary.specialty} onChange={e => updateSummary('specialty', e.target.value)} />
                    <input className="border rounded-xl p-2.5" placeholder={isAr ? 'سنوات الخبرة' : 'Years of Experience'} value={cv.summary.yearsExp} onChange={e => updateSummary('yearsExp', e.target.value)} />
                  </div>
                </div>
              )}

              {activeSection === 'experience' && (
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between items-center">
                    <h2 className="font-extrabold text-lg">{isAr ? 'الخبرات المهنية' : 'Work Experience'}</h2>
                    <button onClick={() => addItem('experience', { company: '', role: '', location: '', start: '', end: '', description: '', achievements: '' })} className="px-3 py-1.5 rounded-lg bg-[#2563EB] text-white font-bold flex items-center gap-1"><Plus className="w-3.5 h-3.5" /> {isAr ? 'إضافة خبرة' : 'Add'}</button>
                  </div>
                  {cv.experience.map(exp => (
                    <div key={exp.id} className="p-3 rounded-xl bg-slate-50 border space-y-2">
                      <div className="flex justify-end"><button onClick={() => removeItem('experience', exp.id)} className="text-red-500"><Trash2 className="w-4 h-4" /></button></div>
                      <input className="w-full border rounded-lg p-2 bg-white" placeholder={isAr ? 'المسمى الوظيفي' : 'Role'} value={exp.role} onChange={e => updateItem('experience', exp.id, 'role', e.target.value)} />
                      <div className="grid grid-cols-2 gap-2">
                        <input className="border rounded-lg p-2 bg-white" placeholder={isAr ? 'اسم الشركة' : 'Company'} value={exp.company} onChange={e => updateItem('experience', exp.id, 'company', e.target.value)} />
                        <input className="border rounded-lg p-2 bg-white" placeholder={isAr ? 'مكان العمل' : 'Location'} value={exp.location} onChange={e => updateItem('experience', exp.id, 'location', e.target.value)} />
                        <input className="border rounded-lg p-2 bg-white" placeholder={isAr ? 'من (تاريخ البداية)' : 'Start Date'} value={exp.start} onChange={e => updateItem('experience', exp.id, 'start', e.target.value)} />
                        <input className="border rounded-lg p-2 bg-white" placeholder={isAr ? 'إلى (تاريخ النهاية)' : 'End Date'} value={exp.end} onChange={e => updateItem('experience', exp.id, 'end', e.target.value)} />
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
                    <h2 className="font-extrabold text-lg">{isAr ? 'التعليم' : 'Education'}</h2>
                    <button onClick={() => addItem('education', { institution: '', major: '', degree: '', start: '', end: '', gpa: '' })} className="px-3 py-1.5 rounded-lg bg-[#2563EB] text-white font-bold flex items-center gap-1"><Plus className="w-3.5 h-3.5" /> {isAr ? 'إضافة مؤهل' : 'Add'}</button>
                  </div>
                  {cv.education.map(edu => (
                    <div key={edu.id} className="p-3 rounded-xl bg-slate-50 border space-y-2">
                      <div className="flex justify-end"><button onClick={() => removeItem('education', edu.id)} className="text-red-500"><Trash2 className="w-4 h-4" /></button></div>
                      <input className="w-full border rounded-lg p-2 bg-white" placeholder={isAr ? 'الجامعة أو المؤسسة' : 'University'} value={edu.institution} onChange={e => updateItem('education', edu.id, 'institution', e.target.value)} />
                      <div className="grid grid-cols-2 gap-2">
                        <input className="border rounded-lg p-2 bg-white" placeholder={isAr ? 'الدرجة العلمية' : 'Degree'} value={edu.degree} onChange={e => updateItem('education', edu.id, 'degree', e.target.value)} />
                        <input className="border rounded-lg p-2 bg-white" placeholder={isAr ? 'التخصص' : 'Major'} value={edu.major} onChange={e => updateItem('education', edu.id, 'major', e.target.value)} />
                        <input className="border rounded-lg p-2 bg-white" placeholder={isAr ? 'تاريخ البداية' : 'Start'} value={edu.start} onChange={e => updateItem('education', edu.id, 'start', e.target.value)} />
                        <input className="border rounded-lg p-2 bg-white" placeholder={isAr ? 'تاريخ التخرج' : 'Graduation'} value={edu.end} onChange={e => updateItem('education', edu.id, 'end', e.target.value)} />
                      </div>
                      <input className="w-full border rounded-lg p-2 bg-white" placeholder={isAr ? 'المعدل (اختياري)' : 'GPA (Optional)'} value={edu.gpa} onChange={e => updateItem('education', edu.id, 'gpa', e.target.value)} />
                    </div>
                  ))}
                </div>
              )}

              {activeSection === 'skills' && (
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between items-center">
                    <h2 className="font-extrabold text-lg">{isAr ? 'المهارات' : 'Skills'}</h2>
                    <button onClick={() => addItem('skills', { name: '', category: isAr ? 'تقنية' : 'Technical', level: '' })} className="px-3 py-1.5 rounded-lg bg-[#2563EB] text-white font-bold flex items-center gap-1"><Plus className="w-3.5 h-3.5" /> {isAr ? 'إضافة مهارة' : 'Add'}</button>
                  </div>
                  {cv.skills.map(sk => (
                    <div key={sk.id} className="grid grid-cols-12 gap-1.5 items-center">
                      <input className="col-span-5 border rounded-lg p-2" placeholder={isAr ? 'اسم المهارة' : 'Skill'} value={sk.name} onChange={e => updateItem('skills', sk.id, 'name', e.target.value)} />
                      <select className="col-span-3 border rounded-lg p-2 bg-white" value={sk.category} onChange={e => updateItem('skills', sk.id, 'category', e.target.value)}>
                        <option value={isAr ? 'تقنية' : 'Technical'}>{isAr ? 'تقنية' : 'Technical'}</option>
                        <option value={isAr ? 'شخصية' : 'Soft'}>{isAr ? 'شخصية' : 'Soft'}</option>
                        <option value={isAr ? 'إدارية' : 'Management'}>{isAr ? 'إدارية' : 'Management'}</option>
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
                    <h2 className="font-extrabold text-lg">{isAr ? 'المشاريع' : 'Projects'}</h2>
                    <button onClick={() => addItem('projects', { name: '', tech: '', description: '', link: '' })} className="px-3 py-1.5 rounded-lg bg-[#2563EB] text-white font-bold flex items-center gap-1"><Plus className="w-3.5 h-3.5" /> {isAr ? 'إضافة مشروع' : 'Add'}</button>
                  </div>
                  {cv.projects.map(pr => (
                    <div key={pr.id} className="p-3 rounded-xl bg-slate-50 border space-y-2">
                      <div className="flex justify-end"><button onClick={() => removeItem('projects', pr.id)} className="text-red-500"><Trash2 className="w-4 h-4" /></button></div>
                      <input className="w-full border rounded-lg p-2 bg-white" placeholder={isAr ? 'اسم المشروع' : 'Project Name'} value={pr.name} onChange={e => updateItem('projects', pr.id, 'name', e.target.value)} />
                      <input className="w-full border rounded-lg p-2 bg-white" placeholder={isAr ? 'التقنيات المستخدمة' : 'Technologies'} value={pr.tech} onChange={e => updateItem('projects', pr.id, 'tech', e.target.value)} />
                      <input className="w-full border rounded-lg p-2 bg-white" placeholder={isAr ? 'رابط المشروع (اختياري)' : 'Project Link (Optional)'} value={pr.link} onChange={e => updateItem('projects', pr.id, 'link', e.target.value)} />
                      <textarea rows={2} className="w-full border rounded-lg p-2 bg-white" placeholder={isAr ? 'وصف المشروع' : 'Description'} value={pr.description} onChange={e => updateItem('projects', pr.id, 'description', e.target.value)} />
                    </div>
                  ))}
                </div>
              )}

              {activeSection === 'certifications' && (
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between items-center">
                    <h2 className="font-extrabold text-lg">{isAr ? 'الدورات والشهادات' : 'Certifications'}</h2>
                    <button onClick={() => addItem('certifications', { title: '', issuer: '', date: '', link: '' })} className="px-3 py-1.5 rounded-lg bg-[#2563EB] text-white font-bold flex items-center gap-1"><Plus className="w-3.5 h-3.5" /> {isAr ? 'إضافة شهادة' : 'Add'}</button>
                  </div>
                  {cv.certifications.map(c => (
                    <div key={c.id} className="p-3 rounded-xl bg-slate-50 border space-y-2">
                      <div className="flex justify-end"><button onClick={() => removeItem('certifications', c.id)} className="text-red-500"><Trash2 className="w-4 h-4" /></button></div>
                      <input className="w-full border rounded-lg p-2 bg-white" placeholder={isAr ? 'اسم الدورة أو الشهادة' : 'Title'} value={c.title} onChange={e => updateItem('certifications', c.id, 'title', e.target.value)} />
                      <div className="grid grid-cols-2 gap-2">
                        <input className="border rounded-lg p-2 bg-white" placeholder={isAr ? 'الجهة المانحة' : 'Issuer'} value={c.issuer} onChange={e => updateItem('certifications', c.id, 'issuer', e.target.value)} />
                        <input className="border rounded-lg p-2 bg-white" placeholder={isAr ? 'التاريخ' : 'Date'} value={c.date} onChange={e => updateItem('certifications', c.id, 'date', e.target.value)} />
                      </div>
                      <input className="w-full border rounded-lg p-2 bg-white" placeholder={isAr ? 'رابط الشهادة (اختياري)' : 'Certificate Link (Optional)'} value={c.link} onChange={e => updateItem('certifications', c.id, 'link', e.target.value)} />
                    </div>
                  ))}
                </div>
              )}

              {activeSection === 'languages' && (
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between items-center">
                    <h2 className="font-extrabold text-lg">{isAr ? 'اللغات' : 'Languages'}</h2>
                    <button onClick={() => addItem('languages', { name: '', level: '' })} className="px-3 py-1.5 rounded-lg bg-[#2563EB] text-white font-bold flex items-center gap-1"><Plus className="w-3.5 h-3.5" /> {isAr ? 'إضافة لغة' : 'Add'}</button>
                  </div>
                  {cv.languages.map(l => (
                    <div key={l.id} className="flex gap-2 items-center">
                      <input className="flex-1 border rounded-lg p-2" placeholder={isAr ? 'اللغة' : 'Language'} value={l.name} onChange={e => updateItem('languages', l.id, 'name', e.target.value)} />
                      <input className="w-28 border rounded-lg p-2" placeholder={isAr ? 'مستوى الإتقان' : 'Level'} value={l.level} onChange={e => updateItem('languages', l.id, 'level', e.target.value)} />
                      <button onClick={() => removeItem('languages', l.id)} className="text-red-500"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  ))}
                </div>
              )}

              {activeSection === 'volunteering' && (
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between items-center">
                    <h2 className="font-extrabold text-lg">{isAr ? 'الأعمال التطوعية والأنشطة' : 'Volunteering'}</h2>
                    <button onClick={() => addItem('volunteering', { title: '', org: '', period: '', details: '' })} className="px-3 py-1.5 rounded-lg bg-[#2563EB] text-white font-bold flex items-center gap-1"><Plus className="w-3.5 h-3.5" /> {isAr ? 'إضافة نشاط' : 'Add'}</button>
                  </div>
                  {cv.volunteering.map(v => (
                    <div key={v.id} className="p-3 rounded-xl bg-slate-50 border space-y-2">
                      <div className="flex justify-end"><button onClick={() => removeItem('volunteering', v.id)} className="text-red-500"><Trash2 className="w-4 h-4" /></button></div>
                      <input className="w-full border rounded-lg p-2 bg-white" placeholder={isAr ? 'النشاط أو المبادرة' : 'Title'} value={v.title} onChange={e => updateItem('volunteering', v.id, 'title', e.target.value)} />
                      <div className="grid grid-cols-2 gap-2">
                        <input className="border rounded-lg p-2 bg-white" placeholder={isAr ? 'الجهة' : 'Organization'} value={v.org} onChange={e => updateItem('volunteering', v.id, 'org', e.target.value)} />
                        <input className="border rounded-lg p-2 bg-white" placeholder={isAr ? 'الفترة الزمنية' : 'Period'} value={v.period} onChange={e => updateItem('volunteering', v.id, 'period', e.target.value)} />
                      </div>
                      <textarea rows={2} className="w-full border rounded-lg p-2 bg-white" placeholder={isAr ? 'التفاصيل' : 'Details'} value={v.details} onChange={e => updateItem('volunteering', v.id, 'details', e.target.value)} />
                    </div>
                  ))}
                </div>
              )}

              {activeSection === 'references' && (
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between items-center">
                    <h2 className="font-extrabold text-lg">{isAr ? 'المراجع (اختياري)' : 'References'}</h2>
                    <button onClick={() => addItem('references', { name: '', role: '', contact: '' })} className="px-3 py-1.5 rounded-lg bg-[#2563EB] text-white font-bold flex items-center gap-1"><Plus className="w-3.5 h-3.5" /> {isAr ? 'إضافة مرجع' : 'Add'}</button>
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
                    <h2 className="font-extrabold text-lg">{isAr ? 'قسم مخصص' : 'Custom Section'}</h2>
                    <input
                      className="w-full border rounded-xl p-2.5"
                      value={custom.title}
                      onChange={e => {
                        const val = e.target.value;
                        setCv(prev => ({ ...prev, customSections: prev.customSections.map(c => c.id === custom.id ? { ...c, title: val } : c) }));
                        setSections(prev => prev.map(s => s.id === custom.id ? { ...s, labelAr: val, labelEn: val } : s));
                      }}
                    />
                    <textarea
                      rows={5}
                      className="w-full border rounded-xl p-2.5"
                      placeholder={isAr ? 'اكتب محتوى القسم هنا...' : 'Write section content...'}
                      value={custom.content}
                      onChange={e => setCv(prev => ({ ...prev, customSections: prev.customSections.map(c => c.id === custom.id ? { ...c, content: e.target.value } : c) }))}
                    />
                  </div>
                );
              })()}

              {/* Quick Section Navigation Footer */}
              <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs font-bold">
                <button
                  onClick={goPrevSection}
                  disabled={activeIdx <= 0}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 disabled:opacity-40 hover:bg-slate-50 flex items-center gap-1"
                >
                  {isAr ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
                  {isAr ? 'القسم السابق' : 'Previous'}
                </button>
                <button
                  onClick={goNextSection}
                  disabled={activeIdx >= sections.length - 1}
                  className="px-3 py-1.5 rounded-lg bg-[#0B1020] text-white disabled:opacity-40 hover:bg-[#2563EB] transition flex items-center gap-1"
                >
                  {isAr ? 'القسم التالي' : 'Next'}
                  {isAr ? <ChevronLeft className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                </button>
              </div>
            </section>

            {/* Pane 3: Live A4 Preview */}
            <section className={`lg:col-span-5 flex flex-col items-center print-main ${mobileTab === 'edit' ? 'hidden lg:flex' : ''}`}>
              <div className="w-full flex items-center justify-between bg-white rounded-xl border border-slate-200 px-3 py-2 mb-3 text-xs no-print">
                <span className="font-bold text-slate-600">{isAr ? 'معاينة مباشرة (A4)' : 'Live A4 Preview'}</span>
                <div className="flex items-center gap-2">
                  <button onClick={() => setZoom(z => Math.max(0.45, +(z - 0.1).toFixed(2)))} className="p-1 rounded hover:bg-slate-100"><ZoomOut className="w-4 h-4" /></button>
                  <span className="font-mono font-bold">{Math.round(zoom * 100)}%</span>
                  <button onClick={() => setZoom(z => Math.min(1.1, +(z + 0.1).toFixed(2)))} className="p-1 rounded hover:bg-slate-100"><ZoomIn className="w-4 h-4" /></button>
                </div>
              </div>
              <div className="w-full overflow-auto flex justify-center pb-8 print-main">
                <div className="print-reset-wrapper" style={{ width: '210mm', transform: `scale(${zoom})`, transformOrigin: 'top center' }}>
                  {renderCVDocument()}
                </div>
              </div>
            </section>
          </div>
        </main>
      )}

      {/* EXPORT VIEW */}
      {view === 'export' && (
        <main className="flex-1 max-w-5xl mx-auto px-4 py-8 w-full space-y-6 print-main">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-wrap items-center justify-between gap-4 no-print">
            <div>
              <h1 className="text-2xl font-extrabold">{t.exportReady}</h1>
              <p className="text-xs text-slate-600 mt-1">{t.privacyBanner}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button onClick={handleExportPDF} className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white text-xs font-bold flex items-center gap-2 shadow">
                <Printer className="w-4 h-4" /> {t.downloadPdf}
              </button>
              <button onClick={handleExportWord} className="px-5 py-2.5 rounded-xl bg-[#0B1020] text-white text-xs font-bold flex items-center gap-2">
                <FileDown className="w-4 h-4" /> {t.downloadWord}
              </button>
              <button onClick={() => setView('builder')} className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold hover:bg-slate-50">
                {t.editCv}
              </button>
              <button onClick={() => setView('templates')} className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold hover:bg-slate-50">
                {t.changeTemplate}
              </button>
            </div>
          </div>

          <div className="flex justify-center overflow-auto print-main">
            <div className="w-[210mm] print-reset-wrapper">{renderCVDocument()}</div>
          </div>
        </main>
      )}

      {/* Template Preview Modal */}
      {previewTemplateModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 no-print">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden">
            <div className="px-5 py-3 border-b flex items-center justify-between">
              <span className="font-extrabold">{isAr ? 'معاينة القالب' : 'Template Preview'}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => { setSelectedTemplate(previewTemplateModal); setPreviewTemplateModal(null); setView('builder'); }}
                  className="px-4 py-1.5 rounded-lg bg-[#2563EB] text-white text-xs font-bold"
                >
                  {isAr ? 'استخدام هذا القالب' : 'Use This Template'}
                </button>
                <button onClick={() => setPreviewTemplateModal(null)} className="p-1.5 rounded-lg hover:bg-slate-100"><X className="w-4 h-4" /></button>
              </div>
            </div>
            <div className="p-6 overflow-auto bg-[#F5F7FB] flex justify-center">
              <div className="w-[210mm] scale-75 origin-top">
                {renderCVDocument(isAr ? SAMPLE_CV_AR : SAMPLE_CV_EN, previewTemplateModal, true)}
              </div>
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
              {isAr ? 'هل أنت متأكد من مسح جميع بيانات السيرة الذاتية من الذاكرة المؤقتة؟ لا يمكن التراجع عن هذه الخطوة.' : 'Are you sure you want to clear all CV data from memory? This cannot be undone.'}
            </p>
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowClearModal(false)} className="px-4 py-2 rounded-lg border text-xs font-bold">{isAr ? 'إلغاء' : 'Cancel'}</button>
              <button
                onClick={() => { setCv(EMPTY_CV); setSections(DEFAULT_SECTIONS); setShowClearModal(false); notify(isAr ? 'تم مسح كافة البيانات' : 'All data cleared'); }}
                className="px-4 py-2 rounded-lg bg-red-600 text-white text-xs font-bold"
              >
                {isAr ? 'نعم، امسح الكل' : 'Yes, Clear All'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-[#0B1020] text-slate-300 py-10 mt-auto no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-start">
          <div>
            <div className="font-extrabold text-white text-lg">AYASH CV STUDIO</div>
            <div className="text-xs text-slate-400 mt-1">Build Your Career. Design Your Future.</div>
          </div>
          <div className="text-xs space-y-0.5 sm:text-end">
            <div className="text-slate-400">Developed by:</div>
            <div className="font-bold text-white">AYASH MAHMOUD ALSHAMERI</div>
            <div className="text-blue-400">Software & AI Developer</div>
            <div className="font-mono text-[11px] text-purple-400">Code meets intelligence.</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
