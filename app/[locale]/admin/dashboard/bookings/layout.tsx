import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bookings Management - YourNextStadium Admin',
  description: 'Manage mystery football trip bookings and destination reveals.',
};

export default function BookingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}