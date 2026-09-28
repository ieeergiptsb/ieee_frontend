import CSHero from '@/components/cs-page/CSHero';
import CSAbout from '@/components/cs-page/CSAbout';
import CSProjects from '@/components/cs-page/CSProjects';
import CSTeam from '@/components/cs-page/CSTeam';

export default function CSPage() {
  return (
    <main className="bg-black min-h-screen">
      <CSHero />
      <CSAbout />
      <CSProjects />
      <CSTeam />
    </main>
  );
}
