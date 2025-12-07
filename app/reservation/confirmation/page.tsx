'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { BookingData } from '../page';

export default function ConfirmationPage() {
  const router = useRouter();
  const [booking, setBooking] = useState<BookingData>({
    date: '2025-12-06',
    time: '14:00',
    pickupLocation: 'Rond-point Himbi',
    destination: 'Aéroport de Goma',
    passengers: 2,
    phone: '0700000000',
    email: 'user@example.com',
    agency: 'Jonam',
    price: 15.5,
  });

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const data = query.get('data');
    if (data) setBooking(JSON.parse(data));
  }, []);

  const handleSaveToHistory = () => {
    const history = JSON.parse(localStorage.getItem('reservations') || '[]');
    history.push(booking);
    localStorage.setItem('reservations', JSON.stringify(history));
    router.push('/rides');
  };

  const handleEdit = () => {
    router.push(`/reservation?edit=1&data=${encodeURIComponent(JSON.stringify(booking))}`);
  };

  const handleCancel = () => {
    router.push('/reservation');
  };

  const handlePayNow = () => {
    alert(`Paiement effectué pour ${booking.price.toFixed(2)} $`);
    handleSaveToHistory();
  };

  const handlePayLater = () => {
    alert('Vous pouvez payer après la course.');
    handleSaveToHistory();
  };

  return (
    <main className="h-full overflow-y-auto bg-black text-white pt-safe pb-32 px-4">
  <header className="sticky top-0 z-10 bg-black/80 backdrop-blur-md -mx-4 px-4 py-4 mb-6 border-b border-[#1A1A1A]">
    <h1 className="text-xl text-center font-bold text-white">Confirmation de Réservation</h1>
  </header>

  <div className="card bg-black text-warning border-warning p-4 w-full max-w-md mx-auto">
    <h4 className="mb-2 text-warning text-center">Détails de la réservation</h4>
    <ul className="list-group list-group-flush text-light">
      {Object.entries(booking).map(([key, value]) => (
        <li key={key} className="list-group-item bg-black flex justify-between text-light">
          <span className="font-bold">{key.replace(/([A-Z])/g, ' $1')}:</span>
          <span>{value}</span>
        </li>
      ))}
    </ul>

    <div className="mt-4 flex flex-col gap-2">
      <button className="btn btn-outline-warning fw-bold w-full py-2" onClick={handleEdit}>Modifier</button>
      <button className="btn btn-outline-warning fw-bold w-full py-2" onClick={handlePayNow}>Payer maintenant ({booking.price.toFixed(2)} $)</button>
      <button className="btn btn-outline-warning fw-bold w-full py-2" onClick={handlePayLater}>Payer après la course</button>
      <button className="btn btn-outline-danger fw-bold w-full py-2" onClick={handleCancel}>Annuler</button>
    </div>
  </div>
</main>

  );
}
