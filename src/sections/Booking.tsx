import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { services } from '../data/services';
import SquarePayment from '../components/SquarePayment';

export default function Booking() {
  const form = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error' | 'payment'>('idle');
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [selectionError, setSelectionError] = useState('');
  const ownerEmail = 'ctkash41@yahoo.com';

  const toggleService = (id: number) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const selectedServices = services.filter((service) => selectedIds.includes(service.id));
  const totalPrice = selectedServices.reduce((sum, service) => {
    const value = Number(service.price.replace(/[^0-9.]/g, '')) || 0;
    return sum + value;
  }, 0);
  // Total in pence for Square
  const totalAmountPence = Math.round(totalPrice * 100);

  const totalDuration = selectedServices.reduce((sum, service) => {
    const value = Number(service.duration.replace(/[^0-9]/g, '')) || 0;
    return sum + value;
  }, 0);
  const servicesLabel = selectedServices
    .map((service) => `${service.title} (${service.price}, ${service.duration})`)
    .join(', ');
  const servicesSummary = servicesLabel || 'None';
  const servicesLine = `${servicesSummary} | Total: £${totalPrice} (${totalDuration}m)`;

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSelectionError('');

    if (selectedIds.length === 0) {
      setSelectionError('Select at least one service.');
      return;
    }

    setLoading(true);

    const SERVICE_ID = 'service_85ysk0p';
    const TEMPLATE_ID = 'template_l0ddk2m';
    const PUBLIC_KEY = 'WcHXLsB92ih9HdAvY';

    if (form.current) {
      emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
        .then((result) => {
            console.log(result.text);
            // Instead of redirecting or finishing, show the payment form
            setStatus('payment');
            setLoading(false);
        }, (error) => {
            console.log(error.text);
            setStatus('error');
            setLoading(false);
        });
    }
  };

  const handlePaymentSuccess = () => {
    setStatus('success');
    form.current?.reset();
    setSelectedIds([]);
  };

  const handlePaymentError = (error: string) => {
    console.error('Payment failed:', error);
    alert(`Payment failed: ${error}`);
    // Keep status as payment so they can try again
  };

  return (
    <section id="book" className="py-16 px-4 bg-white dark:bg-black transition-colors duration-300">
      <div className="container mx-auto max-w-2xl">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-8">Book Appointment</h2>
        
        {status === 'payment' ? (
          <div className="space-y-6">
             <div className="p-4 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-xl mb-4">
               Booking details sent! Please complete payment to confirm.
             </div>
             <SquarePayment 
               amount={totalAmountPence} 
               serviceIds={selectedIds}
               onSuccess={handlePaymentSuccess}
               onError={handlePaymentError}
             />
             <button
               onClick={() => setStatus('idle')}
               className="text-sm text-zinc-500 hover:underline mt-4"
             >
               Go back
             </button>
          </div>
        ) : (
        <form ref={form} onSubmit={handleBookingSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Name</label>
              <input 
                type="text" 
                name="name" 
                id="name"
                required
                className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white transition-all dark:text-white"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Email</label>
              <input 
                type="email" 
                name="email" 
                id="email"
                required
                className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white transition-all dark:text-white"
                placeholder="john@example.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Services</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {services.map((service) => {
                const isSelected = selectedIds.includes(service.id);
                return (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => toggleService(service.id)}
                    className={`text-left rounded-xl border px-4 py-3 transition-colors ${
                      isSelected
                        ? 'bg-zinc-900 text-white border-zinc-900 dark:bg-white dark:text-black dark:border-white'
                        : 'bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white'
                    }`}
                  >
                    <div className="font-semibold">{service.title}</div>
                    <div className={`${isSelected ? 'text-white/80 dark:text-black/80' : 'text-zinc-500 dark:text-zinc-400'} text-sm`}>
                      {service.price} ~ {service.duration}
                    </div>
                  </button>
                );
              })}
            </div>
            {selectionError && (
              <div className="mt-3 text-sm text-red-600 dark:text-red-400">{selectionError}</div>
            )}
          </div>

          {selectedServices.length > 0 && (
            <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-4">
              <div className="flex items-center justify-between text-sm font-medium text-zinc-700 dark:text-zinc-300">
                <span>Basket</span>
                <span>£{totalPrice} · {totalDuration}m</span>
              </div>
              <div className="mt-4 grid gap-2">
                {selectedServices.map((service) => (
                  <div key={service.id} className="flex items-center justify-between rounded-lg border border-zinc-200 dark:border-zinc-800 px-3 py-2">
                    <span className="text-sm text-zinc-800 dark:text-zinc-200">{service.title}</span>
                    <button
                      type="button"
                      onClick={() => toggleService(service.id)}
                      className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Phone</label>
              <input
                type="tel"
                name="phone"
                id="phone"
                required
                className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white transition-all dark:text-white"
                placeholder="07123 456789"
              />
            </div>
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Preferred Date</label>
              <input
                type="date"
                name="date"
                id="date"
                required
                className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white transition-all dark:text-white"
              />
            </div>
          </div>

          <div>
            <label htmlFor="time" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Preferred Time</label>
            <input
              type="time"
              name="time"
              id="time"
              required
              className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white transition-all dark:text-white"
            />
          </div>

          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 px-4 py-3 text-sm text-zinc-600 dark:text-zinc-300">
            {servicesLine}
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Message (Optional)</label>
            <textarea 
              name="message" 
              id="message"
              rows={4}
              className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white transition-all dark:text-white resize-none"
              placeholder="Any specific requests?"
            ></textarea>
          </div>

          <input type="hidden" name="to_email" value={ownerEmail} />
          <input type="hidden" name="services" value={servicesLine} />

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-zinc-900 dark:bg-white text-white dark:text-black font-bold py-4 rounded-xl hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Sending Request...' : 'Book Appointment & Pay'}
          </button>

          {status === 'success' && (
            <div className="p-4 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-xl text-center">
              Booking request sent successfully! We will contact you shortly to confirm.
            </div>
          )}

          {status === 'error' && (
            <div className="p-4 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-xl text-center">
              Something went wrong. Please try again or contact us directly.
            </div>
          )}
        </form>
        )}
      </div>
    </section>
  );
}
