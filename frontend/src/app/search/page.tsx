import { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SearchPageClient from './SearchPageClient';

export const metadata: Metadata = {
  title: 'Search — EduHub',
  description: 'Search across 55+ curated free learning resources.',
};

export default function SearchPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '5rem' }}>
        <SearchPageClient />
      </main>
      <Footer />
    </>
  );
}
