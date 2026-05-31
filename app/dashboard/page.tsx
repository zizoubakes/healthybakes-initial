import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import DashboardContent from './DashboardContent';

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/auth/signin?callbackUrl=/dashboard');
  }

  return <DashboardContent user={session.user} />;
}
