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
  UserPlus,
  Mail,
  Trash2
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

interface WaitlistUser {
  id: string;
  email: string;
  name: string | null;
  position: number;
  source: string;
  createdAt: string;
  updatedAt: string;
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('bookings');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [waitlistUsers, setWaitlistUsers] = useState<WaitlistUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [revealDestination, setRevealDestination] = useState('');
  const [waitlistSearchTerm, setWaitlistSearchTerm] = useState('');
  const [waitlistPage, setWaitlistPage] = useState(1);
  const [waitlistTotal, setWaitlistTotal] = useState(0);
  const [pendingSuggestions, setPendingSuggestions] = useState<any[]>([]);

  useEffect(() => {
    if (activeTab === 'bookings') {
      fetchBookings();
    } else if (activeTab === 'waitlist') {
      fetchWaitlistUsers();
    } else if (activeTab === 'pending') {
      fetchPendingSuggestions();
    }
  }, [activeTab, statusFilter, searchTerm, waitlistSearchTerm, waitlistPage]);

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

  const fetchWaitlistUsers = async () => {
    try {
      const params = new URLSearchParams();
      if (waitlistSearchTerm) params.append('search', waitlistSearchTerm);
      params.append('page', waitlistPage.toString());
      params.append('limit', '50');

      const response = await fetch(`/api/admin/waitlist?${params}`);
      const data = await response.json();

      if (response.ok) {
        setWaitlistUsers(data.users);
        setWaitlistTotal(data.total);
      }
    } catch (error) {
      console.error('Error fetching waitlist users:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPendingSuggestions = async () => {
    try {
      const response = await fetch('/api/admin/pending-suggestions');
      const data = await response.json();

      if (response.ok) {
        setPendingSuggestions(data.pendingSuggestions);
      }
    } catch (error) {
      console.error('Error fetching pending suggestions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApproveSuggestion = async (bookingId: string, destinationId: string) => {
    try {
      const response = await fetch('/api/admin/select-destination', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          bookingId, 
          destinationId,
          adminNotes: 'Auto-approved cheapest destination'
        }),
      });

      if (response.ok) {
        alert('Destination approved and revealed!');
        fetchPendingSuggestions();
        fetchBookings();
      }
    } catch (error) {
      console.error('Error approving suggestion:', error);
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

  const deleteWaitlistUser = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user from the waitlist?')) {
      return;
    }

    try {
      const response = await fetch('/api/admin/waitlist', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: userId }),
      });

      if (response.ok) {
        fetchWaitlistUsers();
      }
    } catch (error) {
      console.error('Error deleting waitlist user:', error);
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
    { label: 'Pending Approval', value: pendingSuggestions.length, icon: Calendar, color: 'from-yellow-500 to-yellow-600' },
    { label: 'Waitlist', value: waitlistTotal, icon: UserPlus, color: 'from-purple-500 to-purple-600' },
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
                { id: 'bookings', label: 'Bookings', icon: Users, href: '/nl/admin/dashboard/bookings' },
                { id: 'pending', label: 'Pending Approval', icon: Calendar },
                { id: 'waitlist', label: 'Waitlist', icon: UserPlus },
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
                  For detailed booking management with smart destination selection, visit the dedicated bookings page.
                </p>
                <a
                  href="/nl/admin/dashboard/bookings"
                  className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  <Users className="w-4 h-4 mr-2" />
                  Manage Bookings & Destinations
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
                  Showing preview only. <a href="/nl/admin/dashboard/bookings" className="text-green-600 hover:text-green-800">View all bookings →</a>
                </div>
              </div>
            </div>
          )}

          {/* Pending Suggestions Tab */}
          {activeTab === 'pending' && (
            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Bookings Awaiting Destination Approval
                </h3>
                <p className="text-gray-600">
                  These bookings have automatic destination suggestions ready for your approval.
                </p>
              </div>

              {pendingSuggestions.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>No pending destination approvals</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {pendingSuggestions.map((suggestion) => (
                    <div key={suggestion.bookingId} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900">
                            {suggestion.customerName}
                          </h4>
                          <p className="text-gray-600">{suggestion.customerEmail}</p>
                          <p className="text-sm text-gray-500">
                            Booking: {suggestion.bookingId} • {suggestion.package} • {suggestion.travelers} travelers
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-semibold text-gray-900">{suggestion.totalPrice}</div>
                          <div className="text-sm text-gray-500">
                            {new Date(suggestion.date).toLocaleDateString()}
                          </div>
                        </div>
                      </div>

                      {suggestion.topSuggestion && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                          <div className="flex justify-between items-center mb-2">
                            <h5 className="font-semibold text-green-800">
                              Recommended: {suggestion.topSuggestion.city}, {suggestion.topSuggestion.country}
                            </h5>
                            {suggestion.topSuggestion.flightPrice && (
                              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                                €{suggestion.topSuggestion.flightPrice}
                              </span>
                            )}
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm text-green-700 mb-3">
                            <div>
                              <span className="font-medium">Stadium:</span> {suggestion.topSuggestion.stadium}
                            </div>
                            <div>
                              <span className="font-medium">League:</span> {suggestion.topSuggestion.league}
                            </div>
                            <div>
                              <span className="font-medium">Airport:</span> {suggestion.topSuggestion.airport}
                            </div>
                            <div>
                              <span className="font-medium">Team:</span> {suggestion.topSuggestion.name}
                            </div>
                          </div>
                          <p className="text-sm text-green-600 mb-4">
                            {suggestion.topSuggestion.reason}
                          </p>
                          <div className="flex space-x-3">
                            <button
                              onClick={() => handleApproveSuggestion(suggestion.bookingId, suggestion.topSuggestion.destinationId)}
                              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                            >
                              <Send className="w-4 h-4" />
                              <span>Approve & Reveal</span>
                            </button>
                            <a
                              href={`/nl/admin/dashboard/bookings?booking=${suggestion.bookingId}`}
                              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                            >
                              <Eye className="w-4 h-4" />
                              <span>View All Options</span>
                            </a>
                          </div>
                        </div>
                      )}

                      {!suggestion.topSuggestion && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                          <p className="text-yellow-800">
                            No destination suggestions available. 
                            <a href={`/nl/admin/dashboard/bookings?booking=${suggestion.bookingId}`} className="underline ml-1">
                              Manually select destination
                            </a>
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Waitlist Tab */}
          {activeTab === 'waitlist' && (
            <div className="p-6">
              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search waitlist users..."
                      value={waitlistSearchTerm}
                      onChange={(e) => setWaitlistSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>

                <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                  <Download className="w-4 h-4" />
                  <span>Export CSV</span>
                </button>
              </div>

              {/* Waitlist Table */}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Position
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Source
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Joined
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {waitlistUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                              <span className="text-white font-bold text-sm">{user.position}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{user.name || 'Anonymous'}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                            {user.source}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => window.open(`mailto:${user.email}`, '_blank')}
                              className="text-blue-600 hover:text-blue-900"
                              title="Send email"
                            >
                              <Mail className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => deleteWaitlistUser(user.id)}
                              className="text-red-600 hover:text-red-900"
                              title="Delete user"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                {waitlistUsers.length === 0 && !loading && (
                  <div className="text-center py-8 text-gray-500">
                    No waitlist users found.
                  </div>
                )}
                
                {loading && (
                  <div className="text-center py-8 text-gray-500">
                    Loading waitlist users...
                  </div>
                )}
              </div>

              {/* Pagination */}
              {waitlistTotal > 50 && (
                <div className="mt-6 flex justify-between items-center">
                  <div className="text-sm text-gray-700">
                    Showing {((waitlistPage - 1) * 50) + 1} to {Math.min(waitlistPage * 50, waitlistTotal)} of {waitlistTotal} users
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setWaitlistPage(Math.max(1, waitlistPage - 1))}
                      disabled={waitlistPage === 1}
                      className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => setWaitlistPage(waitlistPage + 1)}
                      disabled={waitlistPage * 50 >= waitlistTotal}
                      className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
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