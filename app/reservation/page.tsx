'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export interface BookingData {
  date: string;
  time: string;
  pickupLocation: string;
  destination: string;
  passengers: number;
  phone: string;
  email: string;
  agency: string;
  price: number;
}

export default function BookingPage() {
  const router = useRouter();

  const [formData, setFormData] = useState<BookingData>({
    date: '',
    time: '',
    pickupLocation: '',
    destination: '',
    passengers: 1,
    phone: '',
    email: '',
    agency: '',
    price: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'passengers' ? Number(value) : value,
    }));
  };

  const calculatePrice = (pickup: string, dest: string, passengers: number) => {
    if (!pickup || !dest) return 0;
    const baseFare = 5;
    const distanceFactor = 2;
    const dist = Math.abs(pickup.length - dest.length);
    return baseFare + dist * distanceFactor + passengers * 1.5;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.date || !formData.time || !formData.pickupLocation || !formData.destination || !formData.agency) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }
    const price = calculatePrice(formData.pickupLocation, formData.destination, formData.passengers);
    router.push(
      `/reservation/confirmation?data=${encodeURIComponent(JSON.stringify({...formData, price}))}`
    );
  };

  return (
    <main className="h-full overflow-y-auto bg-black text-white pt-safe pb-32 px-4">
      <header className="sticky top-0 z-10 bg-black/80 backdrop-blur-md -mx-4 px-4 py-4 mb-6 border-b border-[#1A1A1A]">
        <h1 className="text-xl text-center font-bold text-white">Réservation Taxi</h1>
      </header>

      <div className="card bg-black text-warning border-secondary">
        <div className="card-header">
          <p className='text-light mb-0'>Réservez votre taxi pour les prochains jours</p>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label fw-bold">Date *</label>
                <input type="date" className="form-control" name="date" value={formData.date} onChange={handleChange} required/>
              </div>
              <div className="col-md-6">
                <label className="form-label fw-bold">Heure *</label>
                <input type="time" className="form-control" name="time" value={formData.time} onChange={handleChange} required/>
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold">Lieu de départ *</label>
              <input type="text" className="form-control" name="pickupLocation" placeholder="Ex: Rond-point Himbi" value={formData.pickupLocation} onChange={handleChange} required/>
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold">Destination *</label>
              <input type="text" className="form-control" name="destination" placeholder="Ex: Aéroport de Goma" value={formData.destination} onChange={handleChange} required/>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label fw-bold">Passagers *</label>
                <select className="form-select" name="passengers" value={formData.passengers} onChange={handleChange}>
                  {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n} passager{n>1?'s':''}</option>)}
                </select>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label fw-bold">Agence *</label>
                <select className="form-select" name="agency" value={formData.agency} onChange={handleChange} required>
                  <option value="">Choisir une agence</option>
                  {['Jonam','Josky','Kivucar','Nangolu Coach'].map(a => <option key={a} value={a}>{a}</option>)}
                </select>
              </div>
            </div>
            <div className="mb-3">
              <p className="fw-bold">Prix estimé: {calculatePrice(formData.pickupLocation, formData.destination, formData.passengers).toFixed(2)} $</p>
            </div>
            <button type="submit" className="btn btn-outline-warning w-100 fw-bold py-2">Confirmer la Réservation</button>
          </form>
        </div>
      </div>
    </main>
  );
}
