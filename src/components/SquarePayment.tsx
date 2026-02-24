
import React, { useState } from 'react';
import { CreditCard, PaymentForm } from 'react-square-web-payments-sdk';

interface SquarePaymentProps {
  amount: number;
  serviceIds: number[];
  onSuccess: () => void;
  onError: (error: string) => void;
}

// NOTE: Hardcoded App ID and Location ID for client-side use
// In a real app, these could be passed via props or env vars
const APP_ID = 'sandbox-sq0idb-GF0B24OfaEZ9T1AHhl8c7Q';
const LOCATION_ID = 'L8J...'; // Placeholder, user needs to update this or I need to ask for it again if they didn't provide it.
// Wait, the user did NOT provide Location ID yet. I asked but they skipped.
// I should use a placeholder or try to read it from .env if Vite exposes it.
// Vite exposes VITE_ prefixed vars. I should update .env to have VITE_SQUARE_APP_ID etc.

export default function SquarePayment({ amount, serviceIds, onSuccess, onError }: SquarePaymentProps) {
  // Use import.meta.env for client-side access
  const appId = import.meta.env.VITE_SQUARE_APP_ID || APP_ID;
  const locationId = import.meta.env.VITE_SQUARE_LOCATION_ID || '';

  if (!appId || !locationId) {
    return (
      <div className="text-red-500 text-center p-4">
        Missing Square Configuration (App ID or Location ID).
      </div>
    );
  }

  return (
    <div className="p-4 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800">
      <h3 className="text-lg font-bold mb-4 text-center dark:text-white">Complete Payment</h3>
      <p className="text-center text-sm text-zinc-500 mb-6">
        Total: £{(amount / 100).toFixed(2)}
      </p>
      
      <PaymentForm
        applicationId={appId}
        locationId={locationId}
        cardTokenizeResponseReceived={async (token, verifiedBuyer) => {
          try {
            const response = await fetch('/api/checkout', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                sourceId: token.token,
                selectedServiceIds: serviceIds,
                manualCapture: true, // Request manual capture
              }),
            });
            
            const data = await response.json();
            
            if (response.ok) {
              onSuccess();
            } else {
              onError(data.message || 'Payment failed');
            }
          } catch (err) {
            console.error(err);
            onError('Network error processing payment');
          }
        }}
      >
        <CreditCard />
      </PaymentForm>
    </div>
  );
}
