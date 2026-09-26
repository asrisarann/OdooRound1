import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Building2, MapPin, Plus, CheckCircle2, X } from 'lucide-react';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('warehouses');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const warehouses = [
    { id: 1, name: 'Main Warehouse', code: 'WH/Central', address: 'Plot 42, Central Zone', active: true },
    { id: 2, name: 'North Depot', code: 'WH/North', address: 'Industrial Area B', active: true }
  ];

  const locations = [
    { id: 1, name: 'Stock Rack A-01', parent: 'WH/Central/Stock', type: 'Internal', barcode: 'LOC-001' },
    { id: 2, name: 'Receiving Dock', parent: 'WH/Central/Input', type: 'Input', barcode: 'LOC-002' },
    { id: 3, name: 'Dispatch Bay 1', parent: 'WH/Central/Output', type: 'Output', barcode: 'LOC-003' }
  ];

  return (
    <div className="page-wrapper">
      <svg 
        className="bg-canvas"
        viewBox="0 0 1440 720" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <path stroke="#E2E8F0" strokeOpacity="0.7" d="M-15.227 702.342H1439.7" />
        <circle cx="711.819" cy="372.562" r="308.334" stroke="#E2E8F0" strokeOpacity="0.7" />
        <circle cx="16.942" cy="20.834" r="308.334" stroke="#E2E8F0" strokeOpacity="0.7" />
        <path stroke="#E2E8F0" strokeOpacity="0.7" d="M-15.227 573.66H1439.7M-15.227 164.029H1439.7" />
        <circle cx="782.595" cy="411.166" r="308.334" stroke="#E2E8F0" strokeOpacity="0.7" />
      </svg>

      <Navbar />

      <main style={{ flex: 1, padding: '2.5rem 0 4rem' }}>
        <div className="container">
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            marginBottom: '1.75rem'
          }}>
            <div>
              <h1 style={{
                fontSize: '1.85rem',
                fontWeight: 700,
                color: 'var(--text-main)',
                letterSpacing: '-0.02em',
                margin: 0
              }}>
                Settings
              </h1>
              <p style={{
                fontSize: '0.875rem',
                color: 'var(--text-muted)',
                marginTop: '0.2rem'
              }}>
                Configure warehouses, locations, and storage bins
              </p>
            </div>

            <button onClick={() => setIsModalOpen(true)} className="btn btn-primary">
              <Plus size={16} />
              <span>{activeTab === 'warehouses' ? 'Add Warehouse' : 'Add Location'}</span>
            </button>
          </div>

          <div style={{
            display: 'flex',
            gap: '0.5rem',
            borderBottom: '1px solid var(--border-color)',
            marginBottom: '1.75rem'
          }}>
            <button
              onClick={() => setActiveTab('warehouses')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.65rem 1rem',
                border: 'none',
                background: 'transparent',
                borderBottom: activeTab === 'warehouses' ? '2px solid var(--primary)' : '2px solid transparent',
                color: activeTab === 'warehouses' ? 'var(--primary)' : 'var(--text-muted)',
                fontWeight: activeTab === 'warehouses' ? 600 : 500,
                fontSize: '0.875rem',
                cursor: 'pointer'
              }}
            >
              <Building2 size={16} />
              <span>Warehouse</span>
            </button>

            <button
              onClick={() => setActiveTab('locations')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.65rem 1rem',
                border: 'none',
                background: 'transparent',
                borderBottom: activeTab === 'locations' ? '2px solid var(--primary)' : '2px solid transparent',
                color: activeTab === 'locations' ? 'var(--primary)' : 'var(--text-muted)',
                fontWeight: activeTab === 'locations' ? 600 : 500,
                fontSize: '0.875rem',
                cursor: 'pointer'
              }}
            >
              <MapPin size={16} />
              <span>Locations</span>
            </button>
          </div>

          {activeTab === 'warehouses' ? (
            <div className="data-table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Warehouse Name</th>
                    <th>Code</th>
                    <th>Address</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {warehouses.map(wh => (
                    <tr key={wh.id}>
                      <td style={{ fontWeight: 600 }}>{wh.name}</td>
                      <td><code>{wh.code}</code></td>
                      <td style={{ color: 'var(--text-muted)' }}>{wh.address}</td>
                      <td><span className="badge badge-emerald"><CheckCircle2 size={12} /> Active</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="data-table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Location Name</th>
                    <th>Parent Location</th>
                    <th>Type</th>
                    <th>Barcode</th>
                  </tr>
                </thead>
                <tbody>
                  {locations.map(loc => (
                    <tr key={loc.id}>
                      <td style={{ fontWeight: 600 }}>{loc.name}</td>
                      <td style={{ color: 'var(--text-muted)' }}><code>{loc.parent}</code></td>
                      <td><span className="badge badge-neutral">{loc.type}</span></td>
                      <td style={{ color: 'var(--text-muted)' }}><code>{loc.barcode}</code></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {isModalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.4)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
          padding: '1rem'
        }}>
          <div style={{
            width: '100%',
            maxWidth: '480px',
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-lg)',
            padding: '1.75rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, margin: 0 }}>
                {activeTab === 'warehouses' ? 'Add Warehouse' : 'Add Location'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 500, marginBottom: '0.3rem' }}>Name</label>
                  <input type="text" placeholder="Enter name" required style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 500, marginBottom: '0.3rem' }}>Identifier / Code</label>
                  <input type="text" placeholder="Code" required style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '1rem' }}>
                  <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-secondary">Cancel</button>
                  <button type="submit" className="btn btn-primary">Save</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
