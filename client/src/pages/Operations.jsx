import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { 
  Plus, 
  Search, 
  ArrowDownLeft, 
  ArrowUpRight, 
  SlidersHorizontal,
  CheckCircle2,
  AlertCircle,
  Hourglass,
  Clock,
  X
} from 'lucide-react';

export default function Operations() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'receipts', 'deliveries', 'adjustments'
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tabParam = params.get('tab');
    if (tabParam && ['receipts', 'deliveries', 'adjustments'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [location.search]);

  // Clean UI data representation
  const operationsList = [
    { id: 'WH/IN/0001', type: 'receipts', partner: 'Supplier A', sourceDoc: 'PO-001', scheduledDate: '2026-09-26', status: 'Ready' },
    { id: 'WH/IN/0002', type: 'receipts', partner: 'Supplier B', sourceDoc: 'PO-002', scheduledDate: '2026-09-24', status: 'Late' },
    { id: 'WH/OUT/0001', type: 'deliveries', partner: 'Customer X', sourceDoc: 'SO-001', scheduledDate: '2026-09-25', status: 'Late' },
    { id: 'WH/OUT/0002', type: 'deliveries', partner: 'Customer Y', sourceDoc: 'SO-002', scheduledDate: '2026-09-27', status: 'Waiting' },
    { id: 'WH/ADJ/0001', type: 'adjustments', partner: 'Internal Audit', sourceDoc: 'ADJ-001', scheduledDate: '2026-09-26', status: 'Done' }
  ];

  const filteredOperations = operationsList.filter((item) => {
    const matchesTab = activeTab === 'all' || item.type === activeTab;
    const matchesSearch = item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.partner.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesTab && matchesSearch && matchesStatus;
  });

  const renderStatusBadge = (status) => {
    switch (status) {
      case 'Ready':
        return <span className="badge badge-emerald"><CheckCircle2 size={12} /> Ready</span>;
      case 'Late':
        return <span className="badge badge-rose"><AlertCircle size={12} /> Late</span>;
      case 'Waiting':
        return <span className="badge badge-amber"><Hourglass size={12} /> Waiting</span>;
      case 'Done':
        return <span className="badge badge-neutral"><CheckCircle2 size={12} /> Done</span>;
      default:
        return <span className="badge badge-neutral">{status}</span>;
    }
  };

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
          {/* Header */}
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
                Operations
              </h1>
              <p style={{
                fontSize: '0.875rem',
                color: 'var(--text-muted)',
                marginTop: '0.2rem'
              }}>
                Receipts, Deliveries, and Inventory Adjustments
              </p>
            </div>

            <button
              onClick={() => setIsNewModalOpen(true)}
              className="btn btn-primary"
            >
              <Plus size={16} />
              <span>New Operation</span>
            </button>
          </div>

          {/* Navigation Tabs */}
          <div style={{
            display: 'flex',
            gap: '0.5rem',
            borderBottom: '1px solid var(--border-color)',
            marginBottom: '1.5rem',
            overflowX: 'auto'
          }}>
            <button
              onClick={() => setActiveTab('all')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.65rem 1rem',
                border: 'none',
                background: 'transparent',
                borderBottom: activeTab === 'all' ? '2px solid var(--primary)' : '2px solid transparent',
                color: activeTab === 'all' ? 'var(--primary)' : 'var(--text-muted)',
                fontWeight: activeTab === 'all' ? 600 : 500,
                fontSize: '0.875rem',
                cursor: 'pointer'
              }}
            >
              <span>All</span>
            </button>

            <button
              onClick={() => setActiveTab('receipts')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.65rem 1rem',
                border: 'none',
                background: 'transparent',
                borderBottom: activeTab === 'receipts' ? '2px solid var(--primary)' : '2px solid transparent',
                color: activeTab === 'receipts' ? 'var(--primary)' : 'var(--text-muted)',
                fontWeight: activeTab === 'receipts' ? 600 : 500,
                fontSize: '0.875rem',
                cursor: 'pointer'
              }}
            >
              <ArrowDownLeft size={16} />
              <span>Receipts</span>
            </button>

            <button
              onClick={() => setActiveTab('deliveries')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.65rem 1rem',
                border: 'none',
                background: 'transparent',
                borderBottom: activeTab === 'deliveries' ? '2px solid var(--primary)' : '2px solid transparent',
                color: activeTab === 'deliveries' ? 'var(--primary)' : 'var(--text-muted)',
                fontWeight: activeTab === 'deliveries' ? 600 : 500,
                fontSize: '0.875rem',
                cursor: 'pointer'
              }}
            >
              <ArrowUpRight size={16} />
              <span>Deliveries</span>
            </button>

            <button
              onClick={() => setActiveTab('adjustments')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.65rem 1rem',
                border: 'none',
                background: 'transparent',
                borderBottom: activeTab === 'adjustments' ? '2px solid var(--primary)' : '2px solid transparent',
                color: activeTab === 'adjustments' ? 'var(--primary)' : 'var(--text-muted)',
                fontWeight: activeTab === 'adjustments' ? 600 : 500,
                fontSize: '0.875rem',
                cursor: 'pointer'
              }}
            >
              <SlidersHorizontal size={16} />
              <span>Inventory Adjustments</span>
            </button>
          </div>

          {/* Search and Filters */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            marginBottom: '1.25rem'
          }}>
            <div style={{ position: 'relative', width: '100%', maxWidth: '320px' }}>
              <Search
                size={16}
                style={{
                  position: 'absolute',
                  left: '0.75rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-subtle)'
                }}
              />
              <input
                type="text"
                placeholder="Search operations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.5rem 0.75rem 0.5rem 2.25rem',
                  fontSize: '0.85rem',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid var(--border-color)',
                  backgroundColor: '#FFFFFF',
                  outline: 'none'
                }}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                Status:
              </span>
              {['all', 'Ready', 'Late', 'Waiting', 'Done'].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  style={{
                    padding: '0.25rem 0.75rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    border: '1px solid',
                    borderColor: statusFilter === status ? 'var(--primary)' : 'var(--border-color)',
                    backgroundColor: statusFilter === status ? 'var(--primary-light)' : '#FFFFFF',
                    color: statusFilter === status ? 'var(--primary)' : 'var(--text-muted)',
                    cursor: 'pointer'
                  }}
                >
                  {status === 'all' ? 'All' : status}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="data-table-container">
            <div style={{ overflowX: 'auto' }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Reference</th>
                    <th>Partner / Contact</th>
                    <th>Source Document</th>
                    <th>Scheduled Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOperations.map((item) => (
                    <tr key={item.id}>
                      <td style={{ fontWeight: 600, color: 'var(--primary)' }}>
                        {item.id}
                      </td>
                      <td style={{ fontWeight: 500 }}>
                        {item.partner}
                      </td>
                      <td style={{ color: 'var(--text-muted)' }}>
                        <code>{item.sourceDoc}</code>
                      </td>
                      <td style={{ color: item.status === 'Late' ? 'var(--rose-main)' : 'var(--text-muted)' }}>
                        {item.scheduledDate}
                      </td>
                      <td>
                        {renderStatusBadge(item.status)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* Modal */}
      {isNewModalOpen && (
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
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, margin: 0 }}>Create Operation</h3>
              <button onClick={() => setIsNewModalOpen(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); setIsNewModalOpen(false); }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 500, marginBottom: '0.3rem' }}>Type</label>
                  <select style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                    <option>Receipt</option>
                    <option>Delivery</option>
                    <option>Inventory Adjustment</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 500, marginBottom: '0.3rem' }}>Partner</label>
                  <input type="text" placeholder="e.g. Partner Name" required style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '1rem' }}>
                  <button type="button" onClick={() => setIsNewModalOpen(false)} className="btn btn-secondary">Cancel</button>
                  <button type="submit" className="btn btn-primary">Create</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
