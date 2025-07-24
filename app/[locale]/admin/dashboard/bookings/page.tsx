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
  LogOut,
  ArrowLeft,
  Sparkles,
  Plane
} from 'lucide-react';
import { DestinationSelector } from '@/components/admin/DestinationSelector';
import { motion, AnimatePresence } from 'framer-motion';
import { FlightPriceChecker } from '@/components/admin/FlightPriceChecker';

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

export default function AdminBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [revealDestination, setRevealDestination] = useState('');
  const [showDestinationSelector, setShowDestinationSelector] = useState(false);
  const [bookingForDestination, setBookingForDestination] = useState<Booking | null>(null);

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

  const handleOpenDestinationSelector = (booking: Booking) => {
    setBookingForDestination(booking);
    setShowDestinationSelector(true);
  };

  const handleDestinationSelected = () => {
    setShowDestinationSelector(false);
    setBookingForDestination(null);
    fetchBookings(); // Refresh the bookings list
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <a href="/nl/admin/dashboard" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Dashboard</span>
              </a>
              <div className="w-8 h-8 bg-gradient-to-br from-green-800 to-green-900 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">YNS</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">Booking Management</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Settings className="w-5 h-5" />
              </button>
              <button 
                onClick={() => window.location.href = '/nl/admin'}
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Flight Price Checker */}
        <div className="mb-6">
          <FlightPriceChecker onPricesUpdated={fetchBookings} />
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search bookings by ID, name, or email..."
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
        </div>

        {/* Bookings Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
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
                    Payment
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
                {loading ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                      Loading bookings...
                    </td>
                  </tr>
                ) : bookings.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                      No bookings found
                    </td>
                  </tr>
                ) : (
                  bookings.map((booking) => (
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
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPaymentStatusColor(booking.paymentStatus)}`}>
                          {booking.paymentStatus}
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
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          {!booking.destination && (
                            <button
                              onClick={() => {
                                handleOpenDestinationSelector(booking);
                              }}
                              className="text-purple-600 hover:text-purple-900 flex items-center space-x-1"
                              title="Smart Destination Selection"
                            >
                              <Sparkles className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={() => updateBookingStatus(booking.bookingId, booking.status === 'confirmed' ? 'pending' : 'confirmed')}
                            className="text-blue-600 hover:text-blue-900"
                            title="Toggle Status"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Destination Selector Modal */}
      <AnimatePresence>
        {showDestinationSelector && bookingForDestination && (
          <DestinationSelector
            booking={bookingForDestination}
            onDestinationSelected={handleDestinationSelected}
            onClose={() => setShowDestinationSelector(false)}
          />
        )}
      </AnimatePresence>

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
                  <div>
                    <span className="text-gray-500">Status:</span>
                    <div className="font-medium">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedBooking.status)}`}>
                        {selectedBooking.status}
                      </span>
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-500">Payment Status:</span>
                    <div className="font-medium">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPaymentStatusColor(selectedBooking.paymentStatus)}`}>
                        {selectedBooking.paymentStatus}
                      </span>
                    </div>
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
                  <h4 className="font-medium text-gray-900 mb-3">Manual Destination Reveal</h4>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Sparkles className="w-4 h-4 text-yellow-600" />
                      <span className="text-sm font-medium text-yellow-800">Recommendation</span>
                    </div>
                    <p className="text-sm text-yellow-700">
                      Use the Smart Destination Selection (✨) button for AI-powered suggestions with flight price comparison.
                    </p>
                  </div>
                  <div className="flex space-x-3 mb-4">
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
                  <button
                    onClick={() => {
                      setSelectedBooking(null);
                      handleOpenDestinationSelector(selectedBooking);
                    }}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Use Smart Selection</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}