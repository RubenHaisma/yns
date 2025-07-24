"use client";

import { useState, useEffect } from 'react';
import { 
  MapPin, 
  Plane, 
  Euro, 
  Clock, 
  Check, 
  X, 
  RefreshCw, 
  AlertCircle,
  Sparkles,
  Trophy,
  Building
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FlightOption {
  price: number;
  currency: string;
  airline: string;
  flightNumber?: string;
  duration?: number;
  stops?: number;
  departureTime?: string;
  arrivalTime?: string;
  bookingToken?: string;
  originAirport: string;
}

interface DestinationOption {
  id: string;
  name: string;
  city: string;
  country: string;
  league: string;
  stadium: string;
  airport: string;
  flightOptions: FlightOption[];
  isRandomPick?: boolean;
  reason: string;
  avgFlightPrice?: number; // Added for new logic
  lastFlightCheck?: string; // Added for new logic
}

interface Booking {
  id: string;
  bookingId: string;
  name: string;
  email: string;
  package: string;
  date: string;
  travelers: number;
  preferences?: any;
}

interface DestinationSelectorProps {
  booking: Booking;
  onDestinationSelected: () => void;
  onClose: () => void;
}

export function DestinationSelector({ booking, onDestinationSelected, onClose }: DestinationSelectorProps) {
  const [destinations, setDestinations] = useState<DestinationOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [selecting, setSelecting] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState<string | null>(null);
  const [adminNotes, setAdminNotes] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [refreshingFlights, setRefreshingFlights] = useState(false);

  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/admin/destinations');
      const data = await response.json();
      if (response.ok) {
        setDestinations(data.destinations);
      } else {
        setError(data.error || 'Failed to fetch destinations');
      }
    } catch (error) {
      setError('Network error while fetching destinations');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectDestination = async (destinationId: string) => {
    setSelecting(true);
    setError(null);

    try {
      const response = await fetch('/api/admin/select-destination', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          bookingId: booking.bookingId, 
          destinationId,
          adminNotes: adminNotes.trim() || undefined
        }),
      });

      const data = await response.json();

      if (response.ok) {
        onDestinationSelected();
      } else {
        setError(data.error || 'Failed to select destination');
      }
    } catch (error) {
      setError('Network error while selecting destination');
    } finally {
      setSelecting(false);
    }
  };

  const handleRefreshFlights = async () => {
    setRefreshingFlights(true);
    setError(null);
    try {
      // Calculate depart and return date
      const departDate = new Date(booking.date);
      const returnDate = new Date(departDate);
      returnDate.setDate(departDate.getDate() + 2);
      const departDateStr = departDate.toISOString().split('T')[0];
      const returnDateStr = returnDate.toISOString().split('T')[0];
      // Trigger backend bulk update
      const response = await fetch('/api/admin/destinations/bulk-update-flights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ departDate: departDateStr, returnDate: returnDateStr })
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error || 'Failed to refresh flight data');
        setRefreshingFlights(false);
        return;
      }
      // After backend update, reload destinations
      await fetchDestinations();
    } catch (error) {
      setError('Network error while refreshing flight data');
    } finally {
      setRefreshingFlights(false);
    }
  };

  const getPackageIcon = (packageType: string) => {
    switch (packageType) {
      case 'basic': return '🎫';
      case 'comfort': return '✈️';
      case 'premium': return '👑';
      default: return '📦';
    }
  };

  const includesFlight = booking.package === 'comfort' || booking.package === 'premium';

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-green-800 to-green-900 text-white p-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold mb-2">Select Mystery Destination</h2>
              <div className="flex items-center space-x-4 text-green-100">
                <span>{getPackageIcon(booking.package)} {booking.package}</span>
                <span>👥 {booking.travelers} travelers</span>
                <span>📅 {new Date(booking.date).toLocaleDateString()}</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Booking Info */}
        <div className="p-6 bg-gray-50 border-b">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-sm text-gray-600">Customer</div>
              <div className="font-semibold text-gray-900">{booking.name}</div>
              <div className="text-sm text-gray-500">{booking.email}</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-sm text-gray-600">Booking ID</div>
              <div className="font-mono font-semibold text-gray-900">{booking.bookingId}</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-sm text-gray-600">Flight Required</div>
              <div className="font-semibold text-gray-900">
                {includesFlight ? (
                  <span className="text-green-600">✈️ Yes</span>
                ) : (
                  <span className="text-gray-500">🎫 No (Basic package)</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {/* Controls */}
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              All Destinations
            </h3>
            <button
              onClick={handleRefreshFlights}
              disabled={loading || refreshingFlights}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${(loading || refreshingFlights) ? 'animate-spin' : ''}`} />
              <span>{refreshingFlights ? 'Refreshing...' : 'Refresh'}</span>
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center space-x-3"
            >
              <AlertCircle className="w-5 h-5 text-red-500" />
              <span className="text-red-700">{error}</span>
            </motion.div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <div className="inline-flex items-center space-x-3">
                <RefreshCw className="w-6 h-6 animate-spin text-green-600" />
                <span className="text-gray-600">
                  {includesFlight ? 'Checking flight prices...' : 'Finding destinations...'}
                </span>
              </div>
            </div>
          )}

          {/* Destination Options */}
          {!loading && destinations.length > 0 && (
            <div className="space-y-4">
              {destinations.map((destination, index) => (
                <motion.div
                  key={destination.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={`relative border-2 rounded-xl p-6 cursor-pointer transition-all ${
                    selectedDestination === destination.id
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-green-300 hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedDestination(destination.id)}
                >
                  {/* No recommendation or real-time badges */}
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-700 rounded-xl flex items-center justify-center">
                          <Building className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-gray-900">{destination.city}</h4>
                          <p className="text-gray-600">{destination.country}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center space-x-2">
                          <Trophy className="w-4 h-4 text-orange-500" />
                          <span className="text-sm text-gray-700">{destination.name}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-gray-700">{destination.stadium}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Sparkles className="w-4 h-4 text-purple-500" />
                          <span className="text-sm text-gray-700">{destination.league}</span>
                        </div>
                        {destination.airport && (
                          <div className="flex items-center space-x-2">
                            <Plane className="w-4 h-4 text-blue-500" />
                            <span className="text-sm text-gray-700">{destination.airport}</span>
                          </div>
                        )}
                      </div>

                      {/* Optionally, show avgFlightPrice or lastFlightCheck if available */}
                      {destination.avgFlightPrice && (
                        <div className="text-sm text-green-700 font-bold mb-2">
                          Avg. Flight Price: €{destination.avgFlightPrice}
                        </div>
                      )}
                      {destination.lastFlightCheck && (
                        <div className="text-xs text-gray-500 mb-2">
                          Last checked: {new Date(destination.lastFlightCheck).toLocaleString()}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Admin Notes */}
          {selectedDestination && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200"
            >
              <label className="block text-sm font-medium text-blue-800 mb-2">
                Admin Notes (Optional)
              </label>
              <textarea
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                placeholder="Add any notes about this destination selection..."
                className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                rows={3}
              />
            </motion.div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 bg-gray-50 border-t flex justify-between items-center">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancel
          </button>
          
          <div className="flex items-center space-x-3">
            {selectedDestination && (
              <div className="text-sm text-gray-600">
                {destinations.find(s => s.id === selectedDestination)?.city} selected
              </div>
            )}
            <button
              onClick={() => selectedDestination && handleSelectDestination(selectedDestination)}
              disabled={!selectedDestination || selecting}
              className="flex items-center space-x-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {selecting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Revealing...</span>
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  <span>Reveal Destination</span>
                </>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}