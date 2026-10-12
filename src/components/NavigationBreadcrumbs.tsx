import React from 'react';
import {
  Home,
  ArrowRight,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  FlaskConical,
  Beaker,
  Scale,
  Newspaper,
  Award,
  Layers,
  Wine,
  DollarSign,
  Bot,
  Bookmark,
  BookOpen,
  Printer,
} from 'lucide-react';
import { SupportedLanguage } from '../types/i18n';
import { t } from '../utils/i18n';

interface NavigationBreadcrumbsProps {
  activeTab: string;
  onNavigate: (tabId: string) => void;
  onGoBack: () => void;
  canGoBack: boolean;
  previousTabLabel?: string;
  currentLang: SupportedLanguage;
  onOpenPrintModal?: () => void;
}

export const NavigationBreadcrumbs: React.FC<NavigationBreadcrumbsProps> = ({
  activeTab,
  onNavigate,
  onGoBack,
  canGoBack,
  previousTabLabel,
  currentLang,
  onOpenPrintModal,
}) => {
  const isRtl = currentLang === 'ar' || currentLang === 'fa';
  const BackArrow = isRtl ? ArrowRight : ArrowLeft;
  const ChevronIcon = isRtl ? ChevronLeft : ChevronRight;

  const tabLabels: Record<string, { label: string; icon: React.ComponentType<{ className?: string }> }> = {
    home: { label: t('nav_home', currentLang), icon: Home },
    concentration: { label: t('nav_calc', currentLang), icon: Beaker },
    perfume_news: { label: t('nav_news', currentLang), icon: Newspaper },
    world_perfumes: { label: t('nav_world_perfumes', currentLang), icon: Award },
    raw_materials: { label: t('nav_raw_materials', currentLang), icon: FlaskConical },
    pyramid: { label: t('nav_pyramid', currentLang), icon: Layers },
    alcohol: { label: t('nav_alcohol', currentLang), icon: Wine },
    costing: { label: t('nav_costing', currentLang), icon: DollarSign },
    master_ai: { label: t('nav_ai_master', currentLang), icon: Bot },
    library: { label: t('nav_library', currentLang), icon: Bookmark },
    guide: { label: t('nav_guide', currentLang), icon: BookOpen },
  };

  const currentTabInfo = tabLabels[activeTab] || { label: activeTab, icon: Sparkles };
  const TabIcon = currentTabInfo.icon;

  const quickNavItems = [
    { id: 'concentration', label: isRtl ? 'حاسبة التراكيز' : 'Concentration', icon: Beaker },
    { id: 'pyramid', label: isRtl ? 'الهرم العطري' : 'Pyramid', icon: Layers },
    { id: 'alcohol', label: isRtl ? 'تخفيف الكحول' : 'Alcohol', icon: Wine },
    { id: 'costing', label: isRtl ? 'التكاليف والأرباح' : 'Costing', icon: DollarSign },
    { id: 'perfume_news', label: isRtl ? 'أخبار العطور' : 'News', icon: Newspaper },
    { id: 'world_perfumes', label: isRtl ? 'العطور العالمية' : 'World Iconic', icon: Award },
    { id: 'raw_materials', label: isRtl ? 'المواد الخام' : 'Raw Materials', icon: FlaskConical },
    { id: 'master_ai', label: isRtl ? 'خبير العطور AI' : 'AI Master', icon: Bot },
    { id: 'library', label: isRtl ? 'دفتر الوصفات' : 'My Formulas', icon: Bookmark },
    { id: 'guide', label: isRtl ? 'دليل التعتيق' : 'Aging Guide', icon: BookOpen },
  ];

  if (activeTab === 'home') {
    return null;
  }

  return (
    <div className="mb-6 bg-white/90 backdrop-blur-md border border-stone-200/90 rounded-2xl p-3 sm:p-4 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        
        {/* Navigation Action Buttons & Breadcrumbs */}
        <div className="flex flex-wrap items-center gap-2">
          {/* 1. Primary Back to Home Button */}
          <button
            onClick={() => onNavigate('home')}
            className="px-3.5 py-2 bg-stone-900 hover:bg-amber-900 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs transition-all cursor-pointer group"
            title={isRtl ? 'العودة إلى الصفحة الرئيسية للمنصة' : 'Back to Home'}
          >
            <Home className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
            <span>{isRtl ? 'العودة للرئيسية' : 'Home'}</span>
          </button>

          {/* 2. Previous Section Back Button (if history exists) */}
          {canGoBack && (
            <button
              onClick={onGoBack}
              className="px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-stone-200"
              title={isRtl ? 'رجوع للقسم السابق' : 'Back to previous section'}
            >
              <BackArrow className="w-3.5 h-3.5 text-stone-600" />
              <span>{isRtl ? 'رجوع' : 'Back'}</span>
              {previousTabLabel && (
                <span className="hidden md:inline text-stone-500 text-[11px]">
                  ({previousTabLabel})
                </span>
              )}
            </button>
          )}

          {/* 3. Breadcrumb Path */}
          <div className="flex items-center gap-1.5 text-xs text-stone-500 font-medium mr-2">
            <button
              onClick={() => onNavigate('home')}
              className="hover:text-amber-800 cursor-pointer flex items-center gap-1"
            >
              <span>{isRtl ? 'الرئيسية' : 'Home'}</span>
            </button>
            <ChevronIcon className="w-3.5 h-3.5 text-stone-400" />
            <div className="flex items-center gap-1.5 font-bold text-stone-900 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200/60">
              <TabIcon className="w-3.5 h-3.5 text-amber-700" />
              <span>{currentTabInfo.label}</span>
            </div>
          </div>
        </div>

        {/* Quick Action: Print Spec Sheet Shortcut */}
        {onOpenPrintModal && (
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onOpenPrintModal}
              className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-colors border border-stone-200 cursor-pointer"
              title="طباعة بطاقة مواصفات تصنيع العطر"
            >
              <Printer className="w-3.5 h-3.5 text-amber-800" />
              <span>{isRtl ? 'طباعة بطاقة التصنيع' : 'Print Spec Sheet'}</span>
            </button>
          </div>
        )}
      </div>

      {/* Horizontal Quick-Jump Chips for instant tab switching without leaving */}
      <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs">
        <span className="text-[11px] font-bold text-stone-400 shrink-0 ml-1">
          {isRtl ? 'انتقال سريع:' : 'Jump to:'}
        </span>
        {quickNavItems.map((item) => {
          const ItemIcon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`whitespace-nowrap px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all flex items-center gap-1 cursor-pointer shrink-0 ${
                isActive
                  ? 'bg-amber-100 text-amber-950 font-bold border border-amber-300'
                  : 'bg-stone-50 text-stone-600 hover:bg-stone-100 hover:text-stone-900 border border-stone-200/60'
              }`}
            >
              <ItemIcon className={`w-3 h-3 ${isActive ? 'text-amber-800' : 'text-stone-500'}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
