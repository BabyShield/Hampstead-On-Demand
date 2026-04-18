import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import ServicesList from "@/components/ServicesList";
import { Service } from "@/types";
import { services as staticServices } from "@/lib/data";

export const maxDuration = 5;
export const revalidate = 300; // Cache for 5 minutes — avoids DB hit on every request

// Type for the raw service data from Supabase join query
interface ServiceRow {
  id: string;
  category_id: string;
  title: string;
  description: string | null;
  price: number;
  duration_minutes: number | null;
  features: string[] | null;
  is_active: boolean;
  created_at: string;
  category: { name: string } | null;
}

export default async function ServicesPage({
  searchParams,
}: {
  searchParams: { category?: string; search?: string };
}) {
  const categoryFilter = searchParams.category;
  const searchQuery = searchParams.search;

  let services: Service[];

  try {
    const supabase = createServerComponentClient({ cookies });

    // AbortController gives us a hard 4-second timeout independent of maxDuration
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);

    const { data: servicesData, error } = await supabase
      .from('services')
      .select('*, category:categories(name)')
      .eq('is_active', true)
      .abortSignal(controller.signal);

    clearTimeout(timeout);

    if (error) {
      console.error('Supabase services fetch error:', error.message);
      // Fall back to static data so the page still renders
      services = staticServices;
    } else {
      // Transform database rows to frontend Service type with proper typing
      services = (servicesData as ServiceRow[] || []).map((s) => ({
        id: s.id,
        category_id: s.category_id,
        category: s.category?.name || 'Uncategorized',
        title: s.title,
        description: s.description || '',
        price: s.price,
        duration: `${s.duration_minutes || 0} mins`,
        duration_minutes: s.duration_minutes || 0,
        features: s.features || [],
        is_active: s.is_active,
      }));
    }
  } catch (err) {
    console.error('Services page fetch failed, using static fallback:', err);
    services = staticServices;
  }

  // Filter by category if provided (handles partial matching like "plumbing" -> "Plumbing & Heating")
  if (categoryFilter) {
    const filterLower = categoryFilter.toLowerCase();
    services = services.filter(s => {
      const categoryLower = s.category.toLowerCase();
      return categoryLower.includes(filterLower) ||
        filterLower.includes(categoryLower.split(' ')[0]);
    });
  }

  // Filter by search query if provided
  if (searchQuery) {
    const queryLower = searchQuery.toLowerCase();
    services = services.filter(s =>
      s.title.toLowerCase().includes(queryLower) ||
      s.description.toLowerCase().includes(queryLower) ||
      s.category.toLowerCase().includes(queryLower)
    );
  }

  return (
    <>
      <main className="min-h-screen bg-muted/30">
        <Navbar />
        <ServicesList services={services} categoryFilter={categoryFilter} searchQuery={searchQuery} />
      </main>
      <Footer />
    </>
  );
}
