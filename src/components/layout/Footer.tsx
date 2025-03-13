"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Github, 
  Twitter, 
  Instagram, 
  Youtube, 
  Mail, 
  MessageCircle, 
  HelpCircle, 
  Shield, 
  Film 
} from 'lucide-react';

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
}

interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

const FooterLink: React.FC<FooterLinkProps> = ({ href, children }) => (
  <motion.a 
    href={href}
    className="text-gray-400 hover:text-purple-500 transition-colors duration-200"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    {children}
  </motion.a>
);

const SocialLink: React.FC<SocialLinkProps> = ({ href, icon, label }) => (
  <motion.a 
    href={href}
    aria-label={label}
    className="bg-gray-800 p-2 rounded-full text-gray-400 hover:text-purple-500 hover:bg-gray-700 transition-colors duration-200"
    whileHover={{ scale: 1.1, rotate: 5 }}
    whileTap={{ scale: 0.9 }}
  >
    {icon}
  </motion.a>
);

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      } 
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.footer 
      className="bg-gray-900 border-t border-gray-800"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main footer section */}
        <div className="flex flex-wrap justify-between items-start gap-8">
          {/* Logo and description */}
          <motion.div 
            className="w-full md:w-auto max-w-sm"
            variants={itemVariants}
          >
            <div className="flex items-center gap-2 mb-3">
              <Film className="text-purple-500" size={24} />
              <h3 className="text-purple-500 text-xl font-bold">Online Cinema</h3>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Погрузитесь в мир кино с нашей обширной коллекцией фильмов и сериалов в высоком качестве
            </p>
          </motion.div>
          
          {/* Navigation links - horizontal layout */}
          <motion.div 
            className="flex flex-wrap gap-x-12 gap-y-6"
            variants={itemVariants}
          >
            {/* Quick Links */}
            <div className="min-w-[120px]">
              <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                <Heart size={16} className="text-purple-500" />
                <span>Популярное</span>
              </h4>
              <ul className="space-y-2">
                <li><FooterLink href="#">Новинки</FooterLink></li>
                <li><FooterLink href="#">Топ рейтинга</FooterLink></li>
                <li><FooterLink href="#">Скоро на сайте</FooterLink></li>
              </ul>
            </div>
            
            {/* Categories */}
            <div className="min-w-[120px]">
              <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                <Film size={16} className="text-purple-500" />
                <span>Категории</span>
              </h4>
              <ul className="space-y-2">
                <li><FooterLink href="#">Фильмы</FooterLink></li>
                <li><FooterLink href="#">Сериалы</FooterLink></li>
                <li><FooterLink href="#">Аниме</FooterLink></li>
              </ul>
            </div>
            
            {/* Support */}
            <div className="min-w-[120px]">
              <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                <HelpCircle size={16} className="text-purple-500" />
                <span>Поддержка</span>
              </h4>
              <ul className="space-y-2">
                <li><FooterLink href="#">FAQ</FooterLink></li>
                <li><FooterLink href="#">О нас</FooterLink></li>
                <li><FooterLink href="#">Контакты</FooterLink></li>
              </ul>
            </div>
            
            {/* Legal */}
            <div className="min-w-[120px]">
              <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                <Shield size={16} className="text-purple-500" />
                <span>Правовое</span>
              </h4>
              <ul className="space-y-2">
                <li><FooterLink href="#">Правила сайта</FooterLink></li>
                <li><FooterLink href="#">Конфиденциальность</FooterLink></li>
                <li><FooterLink href="#">Правообладателям</FooterLink></li>
              </ul>
            </div>
          </motion.div>
        </div>
        
        {/* Bottom section with social links */}
        <motion.div 
          className="border-t border-gray-800 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center"
          variants={itemVariants}
        >
          <p className="text-sm text-gray-400">
            © {currentYear} Online Cinema. Все права защищены.
          </p>
          
          <div className="flex items-center gap-4 mt-4 sm:mt-0">
            <SocialLink href="#" icon={<Twitter size={18} />} label="Twitter" />
            <SocialLink href="#" icon={<Instagram size={18} />} label="Instagram" />
            <SocialLink href="#" icon={<Youtube size={18} />} label="YouTube" />
            <SocialLink href="#" icon={<Github size={18} />} label="GitHub" />
            <SocialLink href="#" icon={<Mail size={18} />} label="Email" />
            <SocialLink href="#" icon={<MessageCircle size={18} />} label="Chat" />
          </div>
        </motion.div>
        
        {/* Button */}
        <motion.div 
          className="mt-6 flex justify-center"
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <a 
            href="#top" 
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-purple-800 text-white px-6 py-2 rounded-full text-sm font-medium hover:from-purple-700 hover:to-purple-900 transition-all duration-300"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            Наверх
          </a>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;