"use client";

import { useState, useEffect } from 'react';
import { 
  Users, 
  MapPin, 
  CreditCard, 
  Calendar, 
  Eye, 
  Edit, 
  Send,
  Plus,
  Search,
  Filter,
  Download,
  Bell,
  Settings,
  LogOut
} from 'lucide-react';

interface Booking {
  id: string;
  bookingId: string;
  name: string;
  email: string;
  package: string;
  date: string;
  travelers: number;
  totalPrice: string;
  status: string;
  paymentStatus: string;
  destination?: string;
  revealedAt?: string;
  createdAt: string;
  preferences?: any;
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('bookings');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [revealDestination, setRevealDestination] = useState('');

  useEffect(() => {
    fetchBookings();
  }, [statusFilter, searchTerm]);

  const fetchBookings = async () => {
    try {
      const params = new URLSearchParams();
      if (statusFilter !== 'all') params.append('status', statusFilter);
      if (searchTerm) params.append('search', searchTerm);

      const response = await fetch(`/api/admin/bookings?${params}`);
      const data = await response.json();

      if (response.ok) {
        setBookings(data.bookings);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRevealDestination = async (bookingId: string) => {
    if (!revealDestination.trim()) return;

    try {
      const response = await fetch('/api/admin/reveal-destination', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingId, destination: revealDestination }),
      });

      if (response.ok) {
        alert('Destination revealed successfully!');
        setRevealDestination('');
        setSelectedBooking(null);
        fetchBookings();
      }
    } catch (error) {
      console.error('Error revealing destination:', error);
    }
  };

  const updateBookingStatus = async (bookingId: string, status: string) => {
    try {
      const response = await fetch('/api/admin/bookings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingId, updates: { status } }),
      });

      if (response.ok) {
        fetchBookings();
      }
    } catch (error) {
      console.error('Error updating booking:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const stats = [
    { label: 'Total Bookings', value: bookings.length, icon: Users, color: 'from-blue-500 to-blue-600' },
    { label: 'Confirmed', value: bookings.filter(b => b.status === 'confirmed').length, icon: CreditCard, color: 'from-green-500 to-green-600' },
    { label: 'Pending', value: bookings.filter(b => b.status === 'pending').length, icon: Calendar, color: 'from-yellow-500 to-yellow-600' },
    { label: 'Revealed', value: bookings.filter(b => b.destination).length, icon: Eye, color: 'from-purple-500 to-purple-600' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-to-br from-green-800 to-green-900 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">YNS</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Settings className="w-5 h-5" />
              </button>
              <button 
                onClick={() => window.location.href = '/admin'}
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'bookings', label: 'Bookings', icon: Users, href: '/admin/dashboard/bookings' },
                { id: 'destinations', label: 'Destinations', icon: MapPin },
                { id: 'analytics', label: 'Analytics', icon: CreditCard },
              ].map((tab) => (
                <a
                  key={tab.id}
                  href={tab.href || '#'}
                  onClick={!tab.href ? () => setActiveTab(tab.id) : undefined}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </a>
              ))}
            </nav>
          </div>

          {/* Bookings Tab */}
          {activeTab === 'bookings' && (
            <div className="p-6">
              <div className="mb-6 text-center">
                <p className="text-gray-600 mb-4">
                  For detailed booking management, visit the dedicated bookings page.
                </p>
                <a
                  href="/admin/dashboard/bookings"
                  className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  <Users className="w-4 h-4 mr-2" />
                  Manage Bookings
                </a>
              </div>
              
              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search bookings..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>
                
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="all">All Status</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="pending">Pending</option>
                  <option value="cancelled">Cancelled</option>
                </select>

                <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>
              </div>

              {/* Bookings Table */}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 opacity-50">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Booking
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Trip Details
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Destination
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {bookings.slice(0, 5).map((booking) => (
                      <tr key={booking.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{booking.bookingId}</div>
                            <div className="text-sm text-gray-500">{new Date(booking.createdAt).toLocaleDateString()}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{booking.name}</div>
                            <div className="text-sm text-gray-500">{booking.email}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{booking.package}</div>
                            <div className="text-sm text-gray-500">
                              {new Date(booking.date).toLocaleDateString()} • {booking.travelers} travelers
                            </div>
                            <div className="text-sm font-medium text-green-600">{booking.totalPrice}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(booking.status)}`}>
                            {booking.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {booking.destination ? (
                            <div>
                              <div className="text-sm font-medium text-gray-900">{booking.destination}</div>
                              <div className="text-sm text-gray-500">
                                Revealed {new Date(booking.revealedAt!).toLocaleDateString()}
                              </div>
                            </div>
                          ) : (
                            <span className="text-sm text-gray-500">Not revealed</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => setSelectedBooking(booking)}
                              className="text-green-600 hover:text-green-900"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            {!booking.destination && (
                              <button
                                onClick={() => {
                                  setSelectedBooking(booking);
                                  setRevealDestination('');
                                }}
                                className="text-purple-600 hover:text-purple-900"
                              >
                                <Send className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="text-center py-4 text-gray-500">
                  Showing preview only. <a href="/admin/dashboard/bookings" className="text-green-600 hover:text-green-800">View all bookings →</a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Booking Detail Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">
                  Booking Details - {selectedBooking.bookingId}
                </h3>
                <button
                  onClick={() => setSelectedBooking(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Customer Info */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Customer Information</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Name:</span>
                    <div className="font-medium">{selectedBooking.name}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Email:</span>
                    <div className="font-medium">{selectedBooking.email}</div>
                  </div>
                </div>
              </div>

              {/* Trip Details */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Trip Details</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Package:</span>
                    <div className="font-medium">{selectedBooking.package}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Date:</span>
                    <div className="font-medium">{new Date(selectedBooking.date).toLocaleDateString()}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Travelers:</span>
                    <div className="font-medium">{selectedBooking.travelers}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Total Price:</span>
                    <div className="font-medium">{selectedBooking.totalPrice}</div>
                  </div>
                </div>
              </div>

              {/* Preferences */}
              {selectedBooking.preferences && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Customer Preferences</h4>
                  <div className="text-sm space-y-2">
                    {selectedBooking.preferences.hatedTeams?.length > 0 && (
                      <div>
                        <span className="text-gray-500">Hated Teams:</span>
                        <div className="font-medium">{selectedBooking.preferences.hatedTeams.join(', ')}</div>
                      </div>
                    )}
                    {selectedBooking.preferences.visitedCities?.length > 0 && (
                      <div>
                        <span className="text-gray-500">Visited Cities:</span>
                        <div className="font-medium">{selectedBooking.preferences.visitedCities.join(', ')}</div>
                      </div>
                    )}
                    {selectedBooking.preferences.travelStyle && (
                      <div>
                        <span className="text-gray-500">Travel Style:</span>
                        <div className="font-medium">{selectedBooking.preferences.travelStyle}</div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Reveal Destination */}
              {!selectedBooking.destination && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Reveal Destination</h4>
                  <div className="flex space-x-3">
                    <input
                      type="text"
                      value={revealDestination}
                      onChange={(e) => setRevealDestination(e.target.value)}
                      placeholder="Enter destination (e.g., Camp Nou, Barcelona)"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <button
                      onClick={() => handleRevealDestination(selectedBooking.bookingId)}
                      className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                    >
                      Reveal
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}