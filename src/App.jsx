import React, { useState, useMemo } from 'react';
import {
  FileText, Sparkles, Shield, Download, Globe, Layout, CheckCircle2,
  ChevronRight, ChevronLeft, Plus, Trash2, Eye, Palette, ArrowUp, ArrowDown,
  RotateCcw, ZoomIn, ZoomOut, User, Briefcase, GraduationCap, Wrench,
  Award, FolderGit2, Languages, HeartHandshake, Users, Printer, FileDown,
  Menu, X, ChevronDown, Lock, Layers, Sliders, Upload, AlertTriangle
} from 'lucide-react';

const TEMPLATES = [
  { id: 'classic', nameAr: 'الكلاسيكي الرسمي', nameEn: 'Professional Classic', descAr: 'تصميم رسمي متوازن يناسب الشركات والجهات الحكومية.', descEn: 'Formal balanced layout ideal for corporate and government roles.', layout: 'top-header', tag: 'Corporate' },
  { id: 'executive', nameAr: 'الإداري العصري', nameEn: 'Modern Executive', descAr: 'ترويسة داكنة فخمة مع عمود جانبي للمهارات واللغات.', descEn: 'Executive dark header with a structured sidebar for skills.', layout: 'sidebar-left', tag: 'Executive' },
  { id: 'minimal', nameAr: 'البسيط الأنيق', nameEn: 'Minimal Clean', descAr: 'مساحات بيضاء مريحة وخطوط واضحة تبرز المحتوى.', descEn: 'Clean whitespace and crisp typography that puts content first.', layout: 'minimal', tag: 'Minimal' },
  { id: 'creative', nameAr: 'الإبداعي للمصممين', nameEn: 'Creative Portfolio', descAr: 'شريط جانبي ملون وتوزيع جريء للمبدعين والمطورين.', descEn: 'Bold colored sidebar crafted for designers and creatives.', layout: 'creative-side', tag: 'Creative' },
  { id: 'ats', nameAr: 'متوافق مع ATS', nameEn: 'ATS Friendly', descAr: 'عمود واحد نظيف مصمم لاجتياز أنظمة الفرز الآلي.', descEn: 'Single-column structure engineered for ATS scanners.', layout: 'ats', tag: 'ATS' },
  { id: 'technical', nameAr: 'مطور البرمجيات', nameEn: 'Technical Developer', descAr: 'لمسة تقنية مخصصة للمبرمجين ومهندسي الذكاء الاصطناعي.', descEn: 'Tech-focused layout tailored for software & AI engineers.', layout: 'tech', tag: 'Tech' },
  { id: 'academic', nameAr: 'الأكاديمي والبحثي', nameEn: 'Academic CV', descAr: 'يركز على التعليم والأبحاث والشهادات الأكاديمية.', descEn: 'Highlights education, publications, and academic honors.', layout: 'academic', tag: 'Academic' },
  { id: 'medical', nameAr: 'الكوادر الطبية', nameEn: 'Medical Professional', descAr: 'تصميم هادئ ومنظم للأطباء والصيادلة والكوادر الصحية.', descEn: 'Calm, structured layout for doctors and healthcare staff.', layout: 'medical', tag: 'Medical' },
  { id: 'graduate', nameAr: 'الخريجين الجدد', nameEn: 'Fresh Graduate', descAr: 'يبرز التعليم والمشاريع والمهارات قبل الخبرة العملية.', descEn: 'Emphasizes education, projects, and skills for new grads.', layout: 'graduate', tag: 'Graduate' },
  { id: 'international', nameAr: 'الاحترافي الدولي', nameEn: 'International Professional', descAr: 'معيار عالمي أنيق للتقديم على الوظائف والمنح الدولية.', descEn: 'Global standard layout for international jobs and grants.', layout: 'international', tag: 'Global' },
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
  spacing: 'normal',
  margins: 'normal',
};

const COLOR_PRESETS = ['#2563EB', '#0B1020', '#7C3AED', '#0F766E', '#B91C1C', '#1D4ED8', '#334155'];

export default function App() {
  const [lang, setLang] = useState('ar');
  const [view, setView] = useState('landing'); // landing | templates | builder | export
  const [selectedTemplate, setSelectedTemplate] = useState('executive');
  const [previewTemplateModal, setPreviewTemplateModal] = useState(null);
  const [cv, setCv] = useState(EMPTY_CV);
  const [sections, setSections] = useState(DEFAULT_SECTIONS);
  const [activeSection, setActiveSection] = useState('personal');
  const [design, setDesign] = useState(DEFAULT_DESIGN);
  const [showDesignPanel, setShowDesignPanel] = useState(false);
  const [zoom, setZoom] = useState(0.75);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [mobileTab, setMobileTab] = useState('edit'); // edit | preview
  const [openFaq, setOpenFaq] = useState(0);
  const [showClearModal, setShowClearModal] = useState(false);

  const isAr = lang === 'ar';
  const dir = isAr ? 'rtl' : 'ltr';

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
    if (target < 0 || target >= newArr.length) return;
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
    const reader = new FileReader();
    reader.onload = () => updatePersonal('photo', reader.result);
    reader.readAsDataURL(file);
  };

  const handleExportPDF = () => {
    window.print();
  };

  const handleExportWord = () => {
    const el = document.getElementById('cv-a4-preview');
    if (!el) return;
    const htmlContent = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40' dir='${dir}' lang='${lang}'>
      <head>
        <meta charset='utf-8'>
        <title>${cv.personal.fullName || 'AYASH CV STUDIO'}</title>
        <style>
          body { font-family: ${design.fontFamily}, Arial, sans-serif; direction: ${dir}; color: #0B1020; padding: 20px; }
          h1 { color: ${design.accentColor}; margin-bottom: 4px; }
          h2 { color: ${design.accentColor}; border-bottom: 2px solid ${design.accentColor}; padding-bottom: 4px; margin-top: 16px; }
          p, li { font-size: 11pt; line-height: 1.5; }
        </style>
      </head>
      <body>${el.innerHTML}</body>
      </html>
    `;
    const blob = new Blob(['\ufeff', htmlContent], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${(cv.personal.fullName || 'AYASH_CV').replace(/\s+/g, '_')}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const renderCVDocument = (data = cv, tplId = selectedTemplate, mini = false) => {
    const accent = design.accentColor;
    const fontClass = design.fontFamily === 'IBM Plex Sans Arabic' ? 'font-ibm' : design.fontFamily === 'Inter' ? 'font-inter' : 'font-cairo';
    const padClass = design.margins === 'compact' ? 'p-5' : design.margins === 'wide' ? 'p-10' : 'p-7';
    const gapClass = design.spacing === 'compact' ? 'space-y-3' : design.spacing === 'relaxed' ? 'space-y-6' : 'space-y-4';
    const textSize = design.fontSize === 'sm' ? 'text-xs' : design.fontSize === 'lg' ? 'text-base' : 'text-sm';

    const visibleMap = Object.fromEntries(sections.map(s => [s.id, s.visible]));
    const isSidebarTemplate = ['executive', 'creative', 'technical', 'medical'].includes(tplId);

    const headingCls =
      design.headingStyle === 'pill'
        ? 'inline-block px-3 py-0.5 rounded-full text-white font-bold text-xs uppercase tracking-wider mb-2'
        : design.headingStyle === 'left-bar'
        ? `font-bold text-sm uppercase tracking-wide mb-2 ${isAr ? 'border-r-4 pr-2' : 'border-l-4 pl-2'}`
        : 'font-bold text-sm uppercase tracking-wide pb-1 mb-2 border-b-2';

    const headingStyleObj =
      design.headingStyle === 'pill'
        ? { backgroundColor: accent }
        : { color: accent, borderColor: accent };

    const renderSectionBlock = (secId) => {
      if (!visibleMap[secId]) return null;
      if (secId === 'summary' && (data.summary.bio || data.summary.objective)) {
        return (
          <div key="summary">
            <h3 className={headingCls} style={headingStyleObj}>{isAr ? 'النبذة المهنية' : 'Professional Summary'}</h3>
            {data.summary.bio && <p className="text-slate-700 leading-relaxed">{data.summary.bio}</p>}
            {data.summary.objective && <p className="text-slate-600 mt-1 text-xs">{data.summary.objective}</p>}
          </div>
        );
      }
      if (secId === 'experience' && data.experience.length > 0) {
        return (
          <div key="experience">
            <h3 className={headingCls} style={headingStyleObj}>{isAr ? 'الخبرات المهنية' : 'Work Experience'}</h3>
            <div className="space-y-3">
              {data.experience.map(exp => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline flex-wrap gap-1">
                    <span className="font-bold text-[#0B1020]">{exp.role || (isAr ? 'المسمى الوظيفي' : 'Job Title')}</span>
                    <span className="text-xs text-slate-500">{exp.start} {exp.end ? `- ${exp.end}` : ''}</span>
                  </div>
                  <div className="text-xs font-semibold" style={{ color: accent }}>{exp.company} {exp.location ? `• ${exp.location}` : ''}</div>
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
            <h3 className={headingCls} style={headingStyleObj}>{isAr ? 'التعليم' : 'Education'}</h3>
            <div className="space-y-2">
              {data.education.map(edu => (
                <div key={edu.id}>
                  <div className="flex justify-between items-baseline flex-wrap">
                    <span className="font-bold text-[#0B1020]">{edu.degree} {edu.major ? `- ${edu.major}` : ''}</span>
                    <span className="text-xs text-slate-500">{edu.start} {edu.end ? `- ${edu.end}` : ''}</span>
                  </div>
                  <div className="text-xs text-slate-600">{edu.institution} {edu.gpa ? `• ${edu.gpa}` : ''}</div>
                </div>
              ))}
            </div>
          </div>
        );
      }
      if (secId === 'skills' && data.skills.length > 0) {
        return (
          <div key="skills">
            <h3 className={headingCls} style={headingStyleObj}>{isAr ? 'المهارات' : 'Skills'}</h3>
            <div className="flex flex-wrap gap-1.5">
              {data.skills.map(sk => (
                <span key={sk.id} className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-800 border border-slate-200">
                  {sk.name} {sk.level ? `(${sk.level})` : ''}
                </span>
              ))}
            </div>
          </div>
        );
      }
      if (secId === 'projects' && data.projects.length > 0) {
        return (
          <div key="projects">
            <h3 className={headingCls} style={headingStyleObj}>{isAr ? 'المشاريع' : 'Projects'}</h3>
            <div className="space-y-2">
              {data.projects.map(pr => (
                <div key={pr.id}>
                  <div className="font-bold text-[#0B1020]">{pr.name}</div>
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
            <h3 className={headingCls} style={headingStyleObj}>{isAr ? 'الدورات والشهادات' : 'Certifications'}</h3>
            <ul className="space-y-1">
              {data.certifications.map(c => (
                <li key={c.id} className="text-xs text-slate-700">
                  <span className="font-bold text-[#0B1020]">{c.title}</span> — {c.issuer} {c.date ? `(${c.date})` : ''}
                </li>
              ))}
            </ul>
          </div>
        );
      }
      if (secId === 'languages' && data.languages.length > 0) {
        return (
          <div key="languages">
            <h3 className={headingCls} style={headingStyleObj}>{isAr ? 'اللغات' : 'Languages'}</h3>
            <div className="flex flex-wrap gap-3">
              {data.languages.map(l => (
                <div key={l.id} className="text-xs"><span className="font-bold">{l.name}:</span> <span className="text-slate-600">{l.level}</span></div>
              ))}
            </div>
          </div>
        );
      }
      if (secId === 'volunteering' && data.volunteering.length > 0) {
        return (
          <div key="volunteering">
            <h3 className={headingCls} style={headingStyleObj}>{isAr ? 'الأعمال التطوعية' : 'Volunteering'}</h3>
            <div className="space-y-1.5">
              {data.volunteering.map(v => (
                <div key={v.id} className="text-xs">
                  <span className="font-bold">{v.title}</span> — {v.org} {v.period ? `(${v.period})` : ''}
                  {v.details && <p className="text-slate-600">{v.details}</p>}
                </div>
              ))}
            </div>
          </div>
        );
      }
      if (secId === 'references' && data.references.length > 0) {
        return (
          <div key="references">
            <h3 className={headingCls} style={headingStyleObj}>{isAr ? 'المراجع' : 'References'}</h3>
            <div className="space-y-1">
              {data.references.map(r => (
                <div key={r.id} className="text-xs"><span className="font-bold">{r.name}</span> {r.role ? `• ${r.role}` : ''} {r.contact ? `• ${r.contact}` : ''}</div>
              ))}
            </div>
          </div>
        );
      }
      const custom = data.customSections?.find(c => c.id === secId);
      if (custom && (custom.title || custom.content)) {
        return (
          <div key={custom.id}>
            <h3 className={headingCls} style={headingStyleObj}>{custom.title}</h3>
            <p className="text-slate-700 whitespace-pre-line">{custom.content}</p>
          </div>
        );
      }
      return null;
    };

    const contactItems = [
      data.personal.email,
      data.personal.phone,
      data.personal.location,
      data.personal.linkedin,
      data.personal.github,
      data.personal.website
    ].filter(Boolean);

    const headerBg =
      tplId === 'executive' ? '#0B1020'
      : tplId === 'creative' ? accent
      : tplId === 'technical' ? '#0F172A'
      : tplId === 'medical' ? '#F0FDFA'
      : 'transparent';

    const headerDark = ['executive', 'creative', 'technical'].includes(tplId);

    return (
      <div
        id={mini ? undefined : 'cv-a4-preview'}
        dir={dir}
        className={`bg-white text-[#0B1020] ${fontClass} ${textSize} w-full min-h-[297mm] shadow-xl border border-slate-200 overflow-hidden print-container`}
      >
        {/* Header */}
        <div
          className={`${padClass} ${headerDark ? 'text-white' : 'border-b-2'}`}
          style={{ backgroundColor: headerBg, borderColor: headerDark ? 'transparent' : accent }}
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {design.showPhoto && data.personal.photo && (
                <img src={data.personal.photo} alt="Profile" className="w-20 h-20 rounded-full object-cover border-2 border-white shadow" />
              )}
              <div>
                <h1 className={`text-2xl font-extrabold ${headerDark ? 'text-white' : 'text-[#0B1020]'}`}>
                  {data.personal.fullName || (isAr ? 'الاسم الكامل' : 'Your Full Name')}
                </h1>
                <p className={`text-sm font-semibold mt-0.5 ${headerDark ? 'text-blue-200' : ''}`} style={!headerDark ? { color: accent } : {}}>
                  {data.personal.jobTitle || (isAr ? 'المسمى الوظيفي' : 'Professional Job Title')}
                </p>
              </div>
            </div>
            {tplId === 'technical' && (
              <div className="text-[11px] font-mono bg-white/10 px-2.5 py-1 rounded text-blue-200">
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

        {/* Body */}
        {isSidebarTemplate ? (
          <div className="grid grid-cols-12 min-h-[230mm]">
            <div className={`col-span-4 bg-slate-50 ${padClass} ${gapClass} border-e border-slate-200`}>
              {['skills', 'languages', 'certifications', 'references'].map(renderSectionBlock)}
            </div>
            <div className={`col-span-8 ${padClass} ${gapClass}`}>
              {sections
                .map(s => s.id)
                .filter(id => !['personal', 'skills', 'languages', 'certifications', 'references'].includes(id))
                .map(renderSectionBlock)}
            </div>
          </div>
        ) : (
          <div className={`${padClass} ${gapClass}`}>
            {sections.filter(s => s.id !== 'personal').map(s => renderSectionBlock(s.id))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div dir={dir} className="min-h-screen bg-[#F5F7FB] text-[#0B1020] flex flex-col">
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
          {/* Hero */}
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

            {/* Hero Visual Mockup */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-tr from-[#2563EB]/15 to-[#7C3AED]/15 rounded-3xl blur-2xl" />
              <div className="relative bg-white rounded-2xl shadow-2xl border border-slate-200 p-5 space-y-4">
                <div className="bg-[#0B1020] text-white rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <div className="font-extrabold text-lg">AYASH MAHMOUD ALSHAMERI</div>
                    <div className="text-xs text-blue-300">Software & AI Developer</div>
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

          {/* Features */}
          <section id="features" className="bg-white py-16 border-y border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-center mb-10">
                {isAr ? 'مميزات AYASH CV STUDIO' : 'Why Choose AYASH CV STUDIO'}
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { icon: Layout, ar: 'قوالب احترافية متعددة', en: '10 Distinct Templates', dAr: '10 قوالب مختلفة فعلًا في التوزيع والتصميم.', dEn: '10 genuinely unique structural layouts.' },
                  { icon: Sparkles, ar: 'تصميم سهل وسريع', en: 'Fast & Intuitive', dAr: 'واجهة منظمة تناسب المبتدئين والمحترفين.', dEn: 'Clean workflow for everyone.' },
                  { icon: Eye, ar: 'معاينة مباشرة', en: 'Live A4 Preview', dAr: 'شاهد كل تعديل فورًا على صفحة A4.', dEn: 'See every edit instantly on A4.' },
                  { icon: Globe, ar: 'دعم العربية والإنجليزية', en: 'Arabic RTL & English LTR', dAr: 'تبديل فوري للغة واتجاه الكتابة بدون أخطاء.', dEn: 'Seamless bilingual direction switching.' },
                  { icon: Download, ar: 'تنزيل PDF وWord', en: 'PDF & Word Export', dAr: 'ملفات نصية قابلة للطباعة والتحرير والبحث.', dEn: 'Selectable PDF and editable Word files.' },
                  { icon: Shield, ar: 'خصوصية تامة للبيانات', en: '100% Privacy First', dAr: 'لا حسابات ولا خوادم؛ كل شيء داخل متصفحك.', dEn: 'Zero servers, zero tracking, in-memory only.' },
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

          {/* Steps */}
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

          {/* Featured Templates */}
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
                        <div className="h-5 rounded bg-[#0B1020] mb-2 w-3/4" />
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

          {/* FAQ */}
          <section id="faq" className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-center mb-8">
              {isAr ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
            </h2>
            <div className="space-y-3">
              {[
                { qAr: 'هل يتم حفظ بياناتي على الإنترنت؟', aAr: 'لا إطلاقًا. تعمل المنصة بالكامل داخل ذاكرة متصفحك المؤقتة دون خوادم أو قواعد بيانات أو LocalStorage.', qEn: 'Is my data saved online?', aEn: 'Never. Everything runs strictly in your browser memory with zero servers or storage.' },
                { qAr: 'هل المنصة مجانية وتدعم اللغة العربية؟', aAr: 'نعم، مجانية بالكامل وتدعم العربية (RTL) والإنجليزية (LTR) مع تصدير PDF وWord.', qEn: 'Is it free and bilingual?', aEn: 'Yes, completely free with full Arabic RTL and English LTR support plus PDF & Word export.' },
                { qAr: 'هل ملفات PDF قابلة للبحث وقراءة أنظمة ATS؟', aAr: 'نعم، يتم التصدير كنص حقيقي قابل للتحديد والبحث وليس مجرد صورة.', qEn: 'Are exported PDFs ATS-friendly?', aEn: 'Yes, PDFs are exported as selectable vector text, not flattened images.' },
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
                    <div className="bg-white h-28 rounded-lg border border-slate-200 p-2.5 flex gap-2">
                      {['executive', 'creative', 'technical', 'medical'].includes(tpl.id) && (
                        <div className="w-1/3 bg-slate-100 rounded p-1.5 space-y-1">
                          <div className="h-2 bg-[#2563EB] rounded w-3/4" />
                          <div className="h-1.5 bg-slate-300 rounded w-full" />
                          <div className="h-1.5 bg-slate-300 rounded w-2/3" />
                        </div>
                      )}
                      <div className="flex-1 space-y-1.5">
                        <div className="h-3 bg-[#0B1020] rounded w-2/3" />
                        <div className="h-1.5 bg-[#7C3AED]/50 rounded w-1/2" />
                        <div className="h-1.5 bg-slate-200 rounded w-full mt-2" />
                        <div className="h-1.5 bg-slate-200 rounded w-5/6" />
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
        <main className="flex-1 max-w-[1600px] mx-auto w-full px-3 sm:px-5 py-5 flex flex-col gap-4">
          {/* Top Action Bar */}
          <div className="bg-white rounded-2xl border border-slate-200 p-3 flex flex-wrap items-center justify-between gap-2 no-print">
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setCv(isAr ? SAMPLE_CV_AR : SAMPLE_CV_EN)}
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
                <label className="font-bold block mb-1.5">{isAr ? 'حجم الخط' : 'Font Size'}</label>
                <select value={design.fontSize} onChange={e => setDesign(d => ({ ...d, fontSize: e.target.value }))} className="w-full border rounded-lg p-1.5">
                  <option value="sm">{isAr ? 'صغير' : 'Small'}</option>
                  <option value="base">{isAr ? 'متوسط' : 'Medium'}</option>
                  <option value="lg">{isAr ? 'كبير' : 'Large'}</option>
                </select>
              </div>
              <div>
                <label className="font-bold block mb-1.5">{isAr ? 'شكل العناوين' : 'Heading Style'}</label>
                <select value={design.headingStyle} onChange={e => setDesign(d => ({ ...d, headingStyle: e.target.value }))} className="w-full border rounded-lg p-1.5">
                  <option value="underline">{isAr ? 'خط سفلي' : 'Underline'}</option>
                  <option value="left-bar">{isAr ? 'شريط جانبي' : 'Side Bar'}</option>
                  <option value="pill">{isAr ? 'بطاقة ملونة' : 'Colored Pill'}</option>
                </select>
              </div>
              <div>
                <label className="font-bold block mb-1.5">{isAr ? 'الهوامش والمسافات' : 'Margins & Spacing'}</label>
                <select value={design.margins} onChange={e => setDesign(d => ({ ...d, margins: e.target.value }))} className="w-full border rounded-lg p-1.5">
                  <option value="compact">{isAr ? 'مضغوط' : 'Compact'}</option>
                  <option value="normal">{isAr ? 'متوازن' : 'Normal'}</option>
                  <option value="wide">{isAr ? 'واسع' : 'Wide'}</option>
                </select>
              </div>
              <div className="flex flex-col justify-between">
                <label className="flex items-center gap-2 font-bold cursor-pointer">
                  <input type="checkbox" checked={design.showPhoto} onChange={e => setDesign(d => ({ ...d, showPhoto: e.target.checked }))} />
                  {isAr ? 'إظهار الصورة الشخصية' : 'Show Photo'}
                </label>
                <button onClick={() => setDesign(DEFAULT_DESIGN)} className="mt-2 py-1.5 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 font-bold flex items-center justify-center gap-1">
                  <RotateCcw className="w-3.5 h-3.5" /> {isAr ? 'إعادة ضبط' : 'Reset'}
                </button>
              </div>
            </div>
          )}

          {/* 3-Pane Studio */}
          <div className="grid lg:grid-cols-12 gap-4 flex-1">
            {/* Pane 1: Sections Sidebar */}
            <aside className={`lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-3 space-y-1.5 h-fit no-print ${mobileTab === 'preview' ? 'hidden lg:block' : ''}`}>
              <div className="flex items-center justify-between px-2 py-1 mb-1">
                <span className="text-xs font-extrabold text-slate-500 uppercase">{isAr ? 'أقسام السيرة الذاتية' : 'CV Sections'}</span>
                <button onClick={addCustomSection} className="text-xs font-bold text-[#2563EB] flex items-center gap-1 hover:underline">
                  <Plus className="w-3.5 h-3.5" /> {isAr ? 'قسم جديد' : 'Add'}
                </button>
              </div>
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
            </aside>

            {/* Pane 2: Data Editor */}
            <section className={`lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-5 h-fit space-y-4 no-print ${mobileTab === 'preview' ? 'hidden lg:block' : ''}`}>
              {activeSection === 'personal' && (
                <div className="space-y-3">
                  <h2 className="font-extrabold text-lg">{isAr ? 'المعلومات الشخصية' : 'Personal Information'}</h2>
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
                  <div className="pt-2">
                    <label className="text-xs font-bold block mb-1.5">{isAr ? 'الصورة الشخصية (اختيارية - داخل المتصفح فقط)' : 'Profile Photo (Optional)'}</label>
                    <input type="file" accept="image/*" onChange={handlePhotoUpload} className="text-xs" />
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
                      <input className="w-full border rounded-lg p-2 bg-white" placeholder={isAr ? 'اسم الشركة' : 'Company'} value={exp.company} onChange={e => updateItem('experience', exp.id, 'company', e.target.value)} />
                      <div className="grid grid-cols-2 gap-2">
                        <input className="border rounded-lg p-2 bg-white" placeholder={isAr ? 'من' : 'Start'} value={exp.start} onChange={e => updateItem('experience', exp.id, 'start', e.target.value)} />
                        <input className="border rounded-lg p-2 bg-white" placeholder={isAr ? 'إلى' : 'End'} value={exp.end} onChange={e => updateItem('experience', exp.id, 'end', e.target.value)} />
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
                    <button onClick={() => addItem('skills', { name: '', category: '', level: '' })} className="px-3 py-1.5 rounded-lg bg-[#2563EB] text-white font-bold flex items-center gap-1"><Plus className="w-3.5 h-3.5" /> {isAr ? 'إضافة مهارة' : 'Add'}</button>
                  </div>
                  {cv.skills.map(sk => (
                    <div key={sk.id} className="flex gap-2 items-center">
                      <input className="flex-1 border rounded-lg p-2" placeholder={isAr ? 'اسم المهارة' : 'Skill'} value={sk.name} onChange={e => updateItem('skills', sk.id, 'name', e.target.value)} />
                      <input className="w-24 border rounded-lg p-2" placeholder={isAr ? 'المستوى' : 'Level'} value={sk.level} onChange={e => updateItem('skills', sk.id, 'level', e.target.value)} />
                      <button onClick={() => removeItem('skills', sk.id)} className="text-red-500"><Trash2 className="w-4 h-4" /></button>
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
                      <input className="w-full border rounded-lg p-2 bg-white" placeholder={isAr ? 'الجهة' : 'Organization'} value={v.org} onChange={e => updateItem('volunteering', v.id, 'org', e.target.value)} />
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
            </section>

            {/* Pane 3: Live A4 Preview */}
            <section className={`lg:col-span-5 flex flex-col items-center ${mobileTab === 'edit' ? 'hidden lg:flex' : ''}`}>
              <div className="w-full flex items-center justify-between bg-white rounded-xl border border-slate-200 px-3 py-2 mb-3 text-xs no-print">
                <span className="font-bold text-slate-600">{isAr ? 'معاينة مباشرة (A4)' : 'Live A4 Preview'}</span>
                <div className="flex items-center gap-2">
                  <button onClick={() => setZoom(z => Math.max(0.45, +(z - 0.1).toFixed(2)))} className="p-1 rounded hover:bg-slate-100"><ZoomOut className="w-4 h-4" /></button>
                  <span className="font-mono font-bold">{Math.round(zoom * 100)}%</span>
                  <button onClick={() => setZoom(z => Math.min(1.1, +(z + 0.1).toFixed(2)))} className="p-1 rounded hover:bg-slate-100"><ZoomIn className="w-4 h-4" /></button>
                </div>
              </div>
              <div className="w-full overflow-auto flex justify-center pb-8">
                <div style={{ width: '210mm', transform: `scale(${zoom})`, transformOrigin: 'top center' }}>
                  {renderCVDocument()}
                </div>
              </div>
            </section>
          </div>
        </main>
      )}

      {/* EXPORT VIEW */}
      {view === 'export' && (
        <main className="flex-1 max-w-5xl mx-auto px-4 py-8 w-full space-y-6">
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

          <div className="flex justify-center overflow-auto">
            <div className="w-[210mm]">{renderCVDocument()}</div>
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
                onClick={() => { setCv(EMPTY_CV); setSections(DEFAULT_SECTIONS); setShowClearModal(false); }}
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
