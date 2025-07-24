"use client";

import { useState } from 'react';
import { Plane, RefreshCw, Euro, Calendar, Users, AlertCircle, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface FlightPriceCheckerProps {
  onPricesUpdated?: () => void;
}

export function FlightPriceChecker({ onPricesUpdated }: FlightPriceCheckerProps) {
  const [loading, setLoading] = useState(false);
  const [departDate, setDepartDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // Set default dates (next month)
  useState(() => {
    const nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    const returnDateDefault = new Date(nextMonth);
    returnDateDefault.setDate(returnDateDefault.getDate() + 2);
    
    setDepartDate(nextMonth.toISOString().split('T')[0]);
    setReturnDate(returnDateDefault.toISOString().split('T')[0]);
  });

  const handleUpdateFlightPrices = async () => {
    if (!departDate) {
      setError('Please select a departure date');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/admin/destinations/bulk-update-flights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          departDate,
          returnDate: returnDate || undefined
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data);
        if (onPricesUpdated) {
          onPricesUpdated();
        }
      } else {
        setError(data.error || 'Failed to update flight prices');
      }
    } catch (error) {
      setError('Network error while updating flight prices');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
          <Plane className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Flight Price Checker</h3>
          <p className="text-sm text-gray-600">Update flight prices for all destinations</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="w-4 h-4 inline mr-1" />
              Departure Date
            </label>
            <input
              type="date"
              value={departDate}
              onChange={(e) => setDepartDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="w-4 h-4 inline mr-1" />
              Return Date (Optional)
            </label>
            <input
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3"
          >
            <AlertCircle className="w-5 h-5 text-red-500" />
            <span className="text-red-700">{error}</span>
          </motion.div>
        )}

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-50 border border-green-200 rounded-lg p-4"
          >
            <div className="flex items-center space-x-3 mb-3">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="font-medium text-green-800">Flight Prices Updated</span>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Destinations Updated:</span>
                <div className="font-semibold text-gray-900">{result.destinationsUpdated}</div>
              </div>
              <div>
                <span className="text-gray-600">Flight Prices Found:</span>
                <div className="font-semibold text-gray-900">{result.flightPrices}</div>
              </div>
            </div>
          </motion.div>
        )}

        <button
          onClick={handleUpdateFlightPrices}
          disabled={loading || !departDate}
          className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? (
            <>
              <RefreshCw className="w-5 h-5 animate-spin" />
              <span>Updating Flight Prices...</span>
            </>
          ) : (
            <>
              <Plane className="w-5 h-5" />
              <span>Update All Flight Prices</span>
            </>
          )}
        </button>

        <div className="text-xs text-gray-500 text-center">
          This will check flight prices from Amsterdam (AMS) to all destination airports using the Aviasales API.
        </div>
      </div>
    </div>
  );
}