import OfficeCard from '@/components/office/OfficeCard';

// Données de test pour le composant OfficeCard
const demoOffices = [
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
  },
  {
    id: '5',
    title: 'Premium Office Space',
    neighborhood: 'Sant Antoni',
    price: 1200,
    imageUrl: '' // Test avec image manquante
  },
  {
    id: '6',
    title: 'Cozy Workspace',
    neighborhood: 'Born',
    price: 450,
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop'
  }
];

export default function OfficeCardDemoPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">OfficeCard Component Demo</h1>
        
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Fonctionnalités du composant</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>✅ Design exact du Stitch avec structure HTML identique</li>
            <li>✅ Navigation vers /offices/[id] avec Next.js Link</li>
            <li>✅ Optimisation des images avec Next.js Image</li>
            <li>✅ Formatage du prix avec séparateurs de milliers</li>
            <li>✅ Hover effects subtils sur toute la carte</li>
            <li>✅ Fallback vers placeholder si image manquante</li>
            <li>✅ Accessibilité avec ARIA labels</li>
            <li>✅ Responsive design maintenu</li>
          </ul>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Structure HTML de référence</h2>
          <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
{`<div class="flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
  <div class="h-48 w-full bg-cover bg-center" style='background-image: url("IMAGE_URL");'></div>
  <div class="p-4">
    <h3 class="text-lg font-bold text-gray-900">TITLE</h3>
    <p class="text-sm text-gray-600">NEIGHBORHOOD</p>
    <p class="mt-2 text-base font-semibold text-french-tech-blue">PRICE€ / mois</p>
  </div>
</div>`}
          </pre>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Interface TypeScript</h2>
          <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
{`interface Office {
  id: string;
  title: string;
  neighborhood: string;
  price: number;
  imageUrl: string;
}`}
          </pre>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Cartes de démonstration</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {demoOffices.map((office) => (
              <OfficeCard key={office.id} office={office} />
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Classes CSS utilisées</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-medium mb-2">Container principal</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• flex flex-col</li>
                <li>• overflow-hidden</li>
                <li>• rounded-xl</li>
                <li>• border border-gray-200</li>
                <li>• bg-white</li>
                <li>• shadow-sm</li>
                <li>• hover:shadow-md</li>
                <li>• hover:border-gray-300</li>
                <li>• transition-all duration-200</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Contenu</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• text-lg font-bold text-gray-900</li>
                <li>• text-sm text-gray-600</li>
                <li>• text-base font-semibold text-french-tech-blue</li>
                <li>• group-hover:text-french-tech-blue</li>
                <li>• transition-colors duration-200</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
