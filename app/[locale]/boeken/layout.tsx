import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Boek Je Mystery Trip - YourNextStadium',
  description: 'Boek je mystery voetbalreis naar Europa\'s mooiste stadions. Bestemming blijft geheim tot de onthulling!',
};

export default function BookingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}