'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { OfficeCard } from '@/components/office';
import HomeHeader from '@/components/layout/HomeHeader';
import SearchBar from '@/components/home/SearchBar';

// Données pour les derniers espaces
const latestOffices = [
  {
    id: '1',
    title: 'Tech Hub Barcelona',
    neighborhood: 'Gràcia',
    price: 250,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCkymoCDZSfKDXoOLfpH-SF5xL4ow_P0m-G0DuACY7KVNm5LVwaotWQp_jJ9kvUZ7pK2qIz26b96_J-USBDBbrf0qzVMWImLoXRPH1OUIvNCi5g3_xb1DGc8DkSb5YRvy4_DRNdzPUwJ7k_RkzsKdbwjSkwSz-nzQIR1boHlaBCNLm9P-2rw74RYceRR_YGUnjwWb3DcMN8_6RxWHX8GUIknqEFqB4vRmQIBwSVCTlwF9hmY7xZDRAnc5-wfbOsK12GGDoRAVh43yM'
  },
  {
    id: '2',
    title: 'Innovation Center',
    neighborhood: 'Eixample',
    price: 300,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCorAg_zr3eA9BCZIbWRoDAneMChZJfSVbtW1KWFO-lXRKpkT7RGAuXH1vcYf_cwjf1sIJP_n_YdGBa6920MZpnKxW2AnB5LJyT9V1NId_cFrbUyeJbb1v2asJ3T9yQ7mrWRYPWPda2TXF0RA2WO-b09rTtbq6nNoCrs_cWU2xwYWER3M0420seuXgHbRMNjJXG5Ao7Z8Xle1OgfDRgSXq3pTMBQY2YI-IwJiB1JauOJBgpQU8NmjXAOlMb7LiQVNBB4jTOH3vKBhE'
  },
  {
    id: '3',
    title: 'Startup Garage',
    neighborhood: 'Poblenou',
    price: 200,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBGo3VUNY8ETKqXc74B45mqKueWAGiBYJcrmQ05KldW9OoMgABmOQXHs5rUENImKadzB7gHkVD4Mu-xMl3ckwKEXQpuwmHLgPBxtoJvKb79mpYE0N5zDCFHBO5q_oYLcU0wjom5LWdM0IjKSv3U01u_UzfBpWgP53yIfY7sHGVHrvnfghIT9DBOZM-ZQYfwu-7gAxX6xK0Eo4qroCScdui6ijsXu1Y68nkX5w4_OAVJPePsOWWxpbX1D0LUZht7VAXaiylveYQuLOk'
  },
  {
    id: '4',
    title: 'Digital Nomad Nest',
    neighborhood: 'Gothic Quarter',
    price: 280,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDgwzxyglzwpZxceMDAO5eTBjhDMrNkQieitoPyYZcEBZgmPec38K9J_ZlhtBILevqpvmkQE4XZfWImnWy5HhKcuukucR0BZF6jQdvtxSCsyumgY7HFJFj5HDahJLBi6TGrz7Hqyj2X7v3rdplMZhe5XTvwFBWi13ZGG0F4kNslKxHNiyGGnKRbZzwD2YMnGW3epkLILDkwYsR4pz-Eo'
  }
];

// Données pour les témoignages
const testimonials = [
  {
    id: 1,
    name: 'Marie Dubois',
    company: 'TechHub Barcelona',
    role: 'CEO & Co-founder',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    quote: 'French Tech Barcelona nous a permis de trouver l&apos;espace parfait pour notre équipe. L&apos;ambiance collaborative et la proximité avec d&apos;autres startups tech sont inestimables.',
    rating: 5
  },
  {
    id: 2,
    name: 'Pierre Martin',
    company: 'Innovation Lab',
    role: 'CTO',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    quote: 'La qualité des espaces et la communauté French Tech nous ont convaincus de nous installer à Barcelone. C&apos;est exactement ce dont nous avions besoin pour grandir.',
    rating: 5
  },
  {
    id: 3,
    name: 'Sophie Bernard',
    company: 'Startup Garage',
    role: 'Product Manager',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    quote: 'Un écosystème exceptionnel qui combine l&apos;excellence technique française avec l&apos;énergie créative de Barcelone. Je recommande vivement !',
    rating: 5
  }
];

export default function HomePage() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header transparent qui devient opaque au scroll */}
      <HomeHeader onScrollToSection={scrollToSection} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-french-tech-blue to-blue-900 text-white pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Trouvez votre espace de travail idéal à Barcelone
          </h1>
          <p className="text-xl md:text-2xl mb-12 text-blue-100 max-w-3xl mx-auto">
            Rejoignez la communauté French Tech Barcelona et découvrez des espaces de travail exceptionnels dans les meilleurs quartiers de la ville
          </p>

          {/* Search bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <SearchBar />
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/offices"
              className="bg-white text-french-tech-blue px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
            >
              Chercher un espace
            </Link>
            <Link
              href="/offices/create"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-french-tech-blue transition-colors"
            >
              Poster une annonce
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              French Tech Barcelona en chiffres
            </h2>
            <p className="text-xl text-gray-600">
              Une communauté dynamique qui ne cesse de grandir
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center hover:shadow-md transition-shadow">
              <div className="text-3xl md:text-4xl font-bold text-french-tech-blue mb-2">150+</div>
              <div className="text-gray-600">Espaces disponibles</div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center hover:shadow-md transition-shadow">
              <div className="text-3xl md:text-4xl font-bold text-french-tech-blue mb-2">75+</div>
              <div className="text-gray-600">Entreprises membres</div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center hover:shadow-md transition-shadow">
              <div className="text-3xl md:text-4xl font-bold text-french-tech-blue mb-2">12</div>
              <div className="text-gray-600">Quartiers couverts</div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center hover:shadow-md transition-shadow">
              <div className="text-3xl md:text-4xl font-bold text-french-tech-blue mb-2">98%</div>
              <div className="text-gray-600">Satisfaction client</div>
            </div>
          </div>
        </div>
      </section>

      {/* Derniers espaces */}
      <section id="offices" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Derniers espaces ajoutés
            </h2>
            <p className="text-xl text-gray-600">
              Découvrez les nouveaux espaces de travail disponibles
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {latestOffices.map((office) => (
              <OfficeCard key={office.id} office={office} />
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/offices"
              className="bg-french-tech-blue text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-french-tech-blue-600 transition-colors"
            >
              Voir tous les espaces
            </Link>
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ils nous font confiance
            </h2>
            <p className="text-xl text-gray-600">
              Découvrez les témoignages de nos membres French Tech
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-4">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={64}
                    height={64}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.company}</div>
                    <div className="text-xs text-gray-500">{testimonial.role}</div>
                  </div>
                </div>
                
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-yellow-400 text-sm">
                      star
                    </span>
                  ))}
                </div>
                
                <blockquote className="text-gray-700 italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo et description */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-french-tech-blue rounded-lg flex items-center justify-center">
                  <span className="text-white text-lg font-bold">FT</span>
                </div>
                <span className="text-xl font-bold">French Tech Barcelona</span>
              </div>
              <p className="text-gray-300 mb-4 max-w-md">
                La communauté French Tech Barcelona réunit entrepreneurs, startups et entreprises tech françaises installées à Barcelone.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <span className="material-symbols-outlined">facebook</span>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <span className="material-symbols-outlined">twitter</span>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <span className="material-symbols-outlined">linkedin</span>
                </a>
              </div>
            </div>

            {/* Liens utiles */}
            <div>
              <h3 className="font-semibold mb-4">Liens utiles</h3>
              <ul className="space-y-2">
                <li><Link href="/offices" className="text-gray-300 hover:text-white transition-colors">Tous les espaces</Link></li>
                <li><Link href="/offices/create" className="text-gray-300 hover:text-white transition-colors">Poster une annonce</Link></li>
                <li><Link href="/about" className="text-gray-300 hover:text-white transition-colors">À propos</Link></li>
                <li><Link href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center space-x-2">
                  <span className="material-symbols-outlined text-sm">email</span>
                  <span>contact@frenchtech-bcn.com</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="material-symbols-outlined text-sm">phone</span>
                  <span>+34 612 345 678</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="material-symbols-outlined text-sm">location_on</span>
                  <span>Barcelone, Espagne</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 French Tech Barcelona. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
