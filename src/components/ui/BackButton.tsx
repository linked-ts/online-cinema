'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function BackButton() {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Button
        onClick={() => router.back()}
        variant="ghost"
        className="group mb-6 flex items-center space-x-2 text-neutral-400 hover:text-white hover:bg-neutral-800/50 transition-all duration-300 rounded-md p-2 pl-1"
      >
        <span className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-neutral-800/70 group-hover:bg-indigo-500/20 transition-colors duration-300">
          <ArrowLeft className="w-4 h-4 group-hover:text-indigo-400 transition-colors duration-300" />
          <span className="absolute inset-0 scale-0 rounded-full bg-indigo-500/10 group-hover:scale-150 transition-transform duration-500" />
        </span>
        <span className="font-medium">Back</span>
      </Button>
    </motion.div>
  );
}