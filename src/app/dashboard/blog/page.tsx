'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Eye, FileText, Loader2, Pencil, Plus, Search } from 'lucide-react';
import { BlogPost } from '@/lib/types';
import { getClienteBlogs } from '@/lib/api';

const DEFAULT_CLIENTE_ID = '1';

function getTagsArray(tags: string | string[]): string[] {
  if (Array.isArray(tags)) return tags;

  try {
    return JSON.parse(tags || '[]');
  } catch {
    return [];
  }
}

function formatDate(date: string) {
  if (!date) return 'Sin fecha';

  return new Intl.DateTimeFormat('es-MX', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date));
}

export default function DashboardBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [authorFilter, setAuthorFilter] = useState('all');

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await getClienteBlogs(DEFAULT_CLIENTE_ID);
        setPosts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  const authors = useMemo(() => {
    return Array.from(
      new Set(
        posts
          .map((post) => post.autor?.trim())
          .filter((author): author is string => Boolean(author))
      )
    );
  }, [posts]);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const tags = getTagsArray(post.tags);
      const normalizedSearch = searchTerm.trim().toLowerCase();
      const matchesSearch =
        normalizedSearch.length === 0 ||
        post.titulo.toLowerCase().includes(normalizedSearch) ||
        post.slug.toLowerCase().includes(normalizedSearch) ||
        post.excerpt.toLowerCase().includes(normalizedSearch) ||
        post.autor.toLowerCase().includes(normalizedSearch) ||
        tags.some((tag) => tag.toLowerCase().includes(normalizedSearch));

      const matchesAuthor =
        authorFilter === 'all' || post.autor === authorFilter;

      return matchesSearch && matchesAuthor;
    });
  }, [authorFilter, posts, searchTerm]);

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mi Blog</h1>
          <p className="text-gray-600">Administra los posts publicados para tus clientes</p>
        </div>

        <Link
          href="/admin/blog"
          className="inline-flex items-center gap-2 rounded-lg bg-amber-600 px-4 py-2 text-white transition-colors hover:bg-amber-700"
        >
          <Plus className="h-5 w-5" />
          Nuevo Post
        </Link>
      </div>

      <div className="mb-6 rounded-xl bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar posts..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-amber-500 focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <select
            value={authorFilter}
            onChange={(event) => setAuthorFilter(event.target.value)}
            className="rounded-lg border border-gray-300 px-4 py-2 focus:border-amber-500 focus:ring-2 focus:ring-amber-500"
          >
            <option value="all">Todos los autores</option>
            {authors.map((author) => (
              <option key={author} value={author}>
                {author}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl bg-white shadow-sm">
        {loading ? (
          <div className="flex items-center justify-center gap-3 p-12 text-gray-500">
            <Loader2 className="h-5 w-5 animate-spin text-amber-600" />
            <span>Cargando posts...</span>
          </div>
        ) : filteredPosts.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[860px]">
              <thead className="border-b bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Post</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Autor</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Etiquetas</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Lectura</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Fecha</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">Acciones</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {filteredPosts.map((post) => {
                  const tags = getTagsArray(post.tags);

                  return (
                    <tr key={post.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="relative h-16 w-24 overflow-hidden rounded-lg bg-gray-100">
                            {post.imagen ? (
                              <Image
                                src={post.imagen}
                                alt={post.titulo}
                                fill
                                className="object-cover"
                                sizes="96px"
                              />
                            ) : (
                              <div className="flex h-full items-center justify-center">
                                <FileText className="h-5 w-5 text-gray-400" />
                              </div>
                            )}
                          </div>

                          <div className="min-w-0">
                            <p className="font-medium text-gray-900">{post.titulo}</p>
                            <p className="mt-1 line-clamp-2 text-sm text-gray-500">{post.excerpt}</p>
                            <p className="mt-1 text-xs text-gray-400">/{post.slug}</p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-gray-600">{post.autor}</td>

                      <td className="px-6 py-4">
                        <div className="flex max-w-xs flex-wrap gap-2">
                          {tags.length > 0 ? (
                            tags.slice(0, 3).map((tag) => (
                              <span
                                key={`${post.id}-${tag}`}
                                className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700"
                              >
                                {tag}
                              </span>
                            ))
                          ) : (
                            <span className="text-sm text-gray-400">Sin etiquetas</span>
                          )}
                        </div>
                      </td>

                      <td className="px-6 py-4 text-gray-600">{post.lectura} min</td>

                      <td className="px-6 py-4 text-sm text-gray-500">
                        {formatDate(post.fechaPublicacion)}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/blog/${post.slug}`}
                            className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-amber-50 hover:text-amber-600"
                            title="Ver post"
                          >
                            <Eye className="h-4 w-4" />
                          </Link>

                          <Link
                            href="/admin/blog"
                            className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-blue-50 hover:text-blue-600"
                            title="Editar en admin"
                          >
                            <Pencil className="h-4 w-4" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center">
            <p className="mb-4 text-gray-500">No se encontraron posts del blog</p>
            <Link
              href="/admin/blog"
              className="inline-flex items-center gap-2 text-amber-600 hover:underline"
            >
              <Plus className="h-4 w-4" />
              Crear tu primer post
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
