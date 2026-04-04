'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BlogPost } from '@/lib/types';
import { Clock, User } from 'lucide-react';

interface BlogCardProps {
  post: BlogPost;
  index?: number;
}

export default function BlogCard({ post, index = 0 }: BlogCardProps) {
  const tags = Array.isArray(post.tags) ? post.tags : [];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={post.imagen}
          alt={post.titulo}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-3">
          {tags.map((tag, i) => (
            <span key={i} className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
        
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-amber-600 transition-colors">
          {post.titulo}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
        
        <div className="flex items-center justify-between pt-4 border-t text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span>{post.autor}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{post.lectura} min lectura</span>
          </div>
        </div>
        
        <Link
          href={`/blog/${post.slug}`}
          className="block mt-4 w-full text-center border-2 border-gray-900 text-gray-900 py-2 rounded-xl font-semibold hover:bg-gray-900 hover:text-white transition-colors"
        >
          Leer Articulo
        </Link>
      </div>
    </motion.div>
  );
}
