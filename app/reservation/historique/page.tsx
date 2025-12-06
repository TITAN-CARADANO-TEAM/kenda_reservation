'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BookingData } from '../page';

export default function HistoriquePage() {
  const router = useRouter();
  const [history, setHistory] = useState<BookingData[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('reservations') || '[]');
    if (stored.length === 0) {
      const randomData: BookingData = {
        date: '2025-12-06',
        time: '14:00',
        pickupLocation: 'Rond-point Himbi',
        destination: 'Aéroport de Goma',
        passengers: 2,
        phone: '0700000000',
        email: 'user@example.com',
        agency: 'Jonam',
        price: 15.5,
      };
      setHistory([randomData]);
      localStorage.setItem('reservations', JSON.stringify([randomData]));
    } else {
      setHistory([stored[0]]); // Limite à un seul enregistrement
    }
  }, []);

  const handleEdit = () => {
    router.push(`/reservation?edit=1&data=${encodeURIComponent(JSON.stringify(history[0]))}`);
  };

  const handleDelete = () => {
    setHistory([]);
    localStorage.removeItem('reservations');
  };

  const handleGoToConfirmation = () => {
    router.push(`/reservation/confirmation?data=${encodeURIComponent(JSON.stringify(history[0]))}`);
  };

  return (
    <main className="h-full overflow-y-auto bg-black text-white pt-safe pb-32 px-4">
      <header className="sticky top-0 z-10 bg-black/80 backdrop-blur-md -mx-4 px-4 py-4 mb-6 border-b border-[#1A1A1A]">
        <h1 className="text-xl text-center font-bold text-white">Historique des Réservations</h1>
      </header>

      {history.length === 0 ? (
        <p className="text-center text-warning">Aucune réservation pour le moment</p>
      ) : (
        <div className="card bg-black text-warning border-warning p-4">
          {Object.entries(history[0]).map(([key, value]) => (
            <div key={key}>
              <strong>{key.replace(/([A-Z])/g, ' $1')}:</strong> {value}
            </div>
          ))}
          <div className="mt-4 flex gap-2">
            <button className="btn btn-outline-warning w-1/3" onClick={handleEdit}>✏️ Modifier</button>
            <button className="btn btn-outline-warning w-1/3" onClick={handleGoToConfirmation}>📄 Confirmation</button>
            <button className="btn btn-outline-danger w-1/3" onClick={handleDelete}>❌ Supprimer</button>
          </div>
        </div>
      )}
    </main>
  );
}
