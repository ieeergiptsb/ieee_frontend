"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PillNav from "@/components/ui/PillNav";
import { authService } from '@/lib/auth';

const navItems = [
  { label: "IEEE", href: "/" },
  { label: "About", href: "/about" },
  { label: "Events", href: "/events" },
  { label: "Chapters", href: "#chapters" },
  { label: "Team", href: "/team" },
  { label: "Contact", href: "/contact" },
];

import { 
  Users, Calendar, Key, FileText, Settings, 
  Plus, Edit, Trash2, Search, Download, 
  Loader2, X, Check, AlertCircle, BarChart3,
  UserCheck, UserX, Mail, Phone, Clock
} from 'lucide-react';

const AdminDashboard = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('stats');
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [membershipCodes, setMembershipCodes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  useEffect(() => {
    const checkAuth = async () => {
      if (!authService.isAuthenticated()) {
        router.push('/');
        return;
      }

      try {
        const currentUser = await authService.getCurrentUser();
        if (!currentUser || currentUser.role !== 'admin') {
          router.push('/dashboard');
          return;
        }

        setUser(currentUser);
        await fetchStats();
        await fetchUsers();
        await fetchEvents();
        await fetchRegistrations();
        await fetchMembershipCodes();
      } catch (err) {
        console.error('Auth error:', err);
        router.push('/');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const fetchStats = async () => {
    try {
      const token = authService.getToken();
      const response = await fetch(`${API_URL}/admin/stats`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (err) {
      console.error('Error fetching stats:', err);
    }
  };

  const fetchUsers = async () => {
    try {
      const token = authService.getToken();
      const response = await fetch(`${API_URL}/admin/users`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      }
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  const fetchEvents = async () => {
    try {
      const token = authService.getToken();
      const response = await fetch(`${API_URL}/admin/events`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setEvents(data);
      }
    } catch (err) {
      console.error('Error fetching events:', err);
    }
  };

  const fetchRegistrations = async () => {
    try {
      const token = authService.getToken();
      const response = await fetch(`${API_URL}/admin/registrations`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setRegistrations(data);
      }
    } catch (err) {
      console.error('Error fetching registrations:', err);
    }
  };

  const fetchMembershipCodes = async () => {
    try {
      const token = authService.getToken();
      const response = await fetch(`${API_URL}/admin/membership-codes`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setMembershipCodes(data);
      }
    } catch (err) {
      console.error('Error fetching membership codes:', err);
    }
  };

  const handleDelete = async (type, id) => {
    if (!confirm(`Are you sure you want to delete this ${type}?`)) return;

    try {
      const token = authService.getToken();
      const response = await fetch(`${API_URL}/admin/${type}/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        // Refresh data
        if (type === 'users') await fetchUsers();
        else if (type === 'events') await fetchEvents();
        else if (type === 'registrations') await fetchRegistrations();
        else if (type === 'membership-codes') await fetchMembershipCodes();
        await fetchStats();
      }
    } catch (err) {
      console.error('Delete error:', err);
      alert('Failed to delete');
    }
  };

  const handleExport = async (eventId) => {
    try {
      const token = authService.getToken();
      const response = await fetch(`${API_URL}/admin/events/${eventId}/export`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `event-${eventId}-registrations.json`;
        a.click();
      }
    } catch (err) {
      console.error('Export error:', err);
    }
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-purple-400" />
      </div>
    );
  }

  const filteredUsers = users.filter(u => 
    u.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredEvents = events.filter(e =>
    e.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full min-h-screen bg-black text-white relative overflow-x-hidden">
      <div className="relative z-10 w-full bg-black">
        <PillNav items={navItems} />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Admin Dashboard</h1>
            <p className="text-white/70">Manage users, events, and registrations</p>
          </div>

          {/* Stats Cards */}
          {stats && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <StatCard icon={Users} label="Total Users" value={stats.total_users} color="purple" />
              <StatCard icon={UserCheck} label="Active Users" value={stats.active_users} color="green" />
              <StatCard icon={Calendar} label="Total Events" value={stats.total_events} color="blue" />
              <StatCard icon={FileText} label="Registrations" value={stats.total_registrations} color="yellow" />
            </div>
          )}

          {/* Tabs */}
          <div className="mb-6 flex flex-wrap gap-2 border-b border-white/10">
            {[
              { id: 'stats', label: 'Statistics', icon: BarChart3 },
              { id: 'users', label: 'Users', icon: Users },
              { id: 'events', label: 'Events', icon: Calendar },
              { id: 'registrations', label: 'Registrations', icon: FileText },
              { id: 'codes', label: 'Membership Codes', icon: Key }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-purple-400 text-white'
                    : 'border-transparent text-white/60 hover:text-white'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Search */}
          {(activeTab === 'users' || activeTab === 'events') && (
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
                <input
                  type="text"
                  placeholder={`Search ${activeTab}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-purple-400/50"
                />
              </div>
            </div>
          )}

          {/* Content */}
          <div className="bg-black/40 border border-white/10 rounded-lg p-6 backdrop-blur-md">
            {activeTab === 'stats' && stats && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <h3 className="text-lg font-semibold text-white mb-4">User Statistics</h3>
                  <div className="space-y-2">
                    <StatRow label="Total Users" value={stats.total_users} />
                    <StatRow label="Active Users" value={stats.active_users} />
                    <StatRow label="IEEE Members" value={stats.ieee_members} />
                    <StatRow label="Non-Members" value={stats.non_members} />
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <h3 className="text-lg font-semibold text-white mb-4">Event Statistics</h3>
                  <div className="space-y-2">
                    <StatRow label="Total Events" value={stats.total_events} />
                    <StatRow label="Upcoming Events" value={stats.upcoming_events} />
                    <StatRow label="Total Registrations" value={stats.total_registrations} />
                    <StatRow label="Active Codes" value={stats.active_membership_codes} />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-white">Users ({filteredUsers.length})</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left py-3 px-4 text-white/80">Name</th>
                        <th className="text-left py-3 px-4 text-white/80">Email</th>
                        <th className="text-left py-3 px-4 text-white/80">Role</th>
                        <th className="text-left py-3 px-4 text-white/80">Status</th>
                        <th className="text-left py-3 px-4 text-white/80">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map(user => (
                        <tr key={user.id} className="border-b border-white/5 hover:bg-white/5">
                          <td className="py-3 px-4 text-white">{user.full_name}</td>
                          <td className="py-3 px-4 text-white/80">{user.email}</td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-1 rounded text-xs bg-purple-500/20 text-purple-300">
                              {user.role}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded text-xs ${
                              user.is_active ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'
                            }`}>
                              {user.is_active ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <button
                              onClick={() => handleDelete('users', user.id)}
                              className="text-red-400 hover:text-red-300"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'events' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-white">Events ({filteredEvents.length})</h2>
                  <button
                    onClick={() => {
                      setModalType('create-event');
                      setShowModal(true);
                    }}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-500 hover:bg-purple-600 text-white transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Create Event</span>
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredEvents.map(event => (
                    <div key={event.id} className="p-4 rounded-lg bg-white/5 border border-white/10">
                      <h3 className="text-white font-semibold mb-2">{event.title}</h3>
                      <p className="text-white/60 text-sm mb-2">{event.location}</p>
                      <p className="text-white/60 text-xs mb-4">
                        {event.registration_count} registrations
                      </p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleExport(event.id)}
                          className="flex-1 px-3 py-1 rounded text-xs bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 transition-all flex items-center justify-center gap-1"
                        >
                          <Download className="w-3 h-3" />
                          Export
                        </button>
                        <button
                          onClick={() => handleDelete('events', event.id)}
                          className="px-3 py-1 rounded text-xs bg-red-500/20 text-red-300 hover:bg-red-500/30 transition-all"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'registrations' && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white mb-4">Registrations ({registrations.length})</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left py-3 px-4 text-white/80">Event</th>
                        <th className="text-left py-3 px-4 text-white/80">Name</th>
                        <th className="text-left py-3 px-4 text-white/80">Email</th>
                        <th className="text-left py-3 px-4 text-white/80">Phone</th>
                        <th className="text-left py-3 px-4 text-white/80">Date</th>
                        <th className="text-left py-3 px-4 text-white/80">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {registrations.map(reg => (
                        <tr key={reg.id} className="border-b border-white/5 hover:bg-white/5">
                          <td className="py-3 px-4 text-white">{reg.event_title}</td>
                          <td className="py-3 px-4 text-white/80">{reg.participant_name}</td>
                          <td className="py-3 px-4 text-white/80">{reg.participant_email}</td>
                          <td className="py-3 px-4 text-white/80">{reg.participant_phone || '-'}</td>
                          <td className="py-3 px-4 text-white/60 text-sm">
                            {new Date(reg.registered_at).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4">
                            <button
                              onClick={() => handleDelete('registrations', reg.id)}
                              className="text-red-400 hover:text-red-300"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'codes' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-white">Membership Codes ({membershipCodes.length})</h2>
                  <button
                    onClick={() => {
                      setModalType('create-code');
                      setShowModal(true);
                    }}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-500 hover:bg-purple-600 text-white transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Create Code</span>
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {membershipCodes.map(code => (
                    <div key={code.id} className="p-4 rounded-lg bg-white/5 border border-white/10">
                      <div className="flex justify-between items-start mb-2">
                        <code className="text-purple-300 font-mono text-sm">{code.code}</code>
                        <span className={`px-2 py-1 rounded text-xs ${
                          code.is_active ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'
                        }`}>
                          {code.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      <p className="text-white/60 text-xs mb-2">
                        Uses: {code.current_uses} / {code.max_uses || '∞'}
                      </p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleDelete('membership-codes', code.id)}
                          className="flex-1 px-3 py-1 rounded text-xs bg-red-500/20 text-red-300 hover:bg-red-500/30 transition-all"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      {showModal && (
        <Modal
          type={modalType}
          onClose={() => {
            setShowModal(false);
            setModalType(null);
            setSelectedItem(null);
          }}
          onSuccess={() => {
            setShowModal(false);
            setModalType(null);
            if (modalType === 'create-event') fetchEvents();
            if (modalType === 'create-code') fetchMembershipCodes();
            fetchStats();
          }}
        />
      )}
    </div>
  );
};

const Modal = ({ type, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const token = authService.getToken();
      const url = type === 'create-event' 
        ? `${API_URL}/admin/events`
        : `${API_URL}/admin/membership-codes`;
      
      // Convert datetime-local to ISO format
      const payload = { ...formData };
      if (type === 'create-event' && payload.event_date) {
        payload.start_time = new Date(payload.event_date).toISOString();
        delete payload.event_date;
      }
      if (type === 'create-code' && payload.expires_at) {
        payload.expires_at = new Date(payload.expires_at).toISOString();
      }
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        onSuccess();
      } else {
        const data = await response.json();
        setError(data.detail || 'Failed to create');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="bg-black/95 border border-white/10 rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">
            {type === 'create-event' ? 'Create Event' : 'Create Membership Code'}
          </h2>
          <button onClick={onClose} className="text-white/60 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/20 border border-red-500/30 text-red-300 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {type === 'create-event' ? (
            <>
              <div>
                <label className="block text-sm text-white/80 mb-1">Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title || ''}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-purple-400/50"
                />
              </div>
              <div>
                <label className="block text-sm text-white/80 mb-1">Slug *</label>
                <input
                  type="text"
                  required
                  value={formData.slug || ''}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-purple-400/50"
                />
              </div>
              <div>
                <label className="block text-sm text-white/80 mb-1">Description</label>
                <textarea
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-purple-400/50"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm text-white/80 mb-1">Location</label>
                <input
                  type="text"
                  value={formData.location || ''}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-purple-400/50"
                />
              </div>
              <div>
                <label className="block text-sm text-white/80 mb-1">Event Date</label>
                <input
                  type="datetime-local"
                  value={formData.event_date || ''}
                  onChange={(e) => setFormData({ ...formData, event_date: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-purple-400/50"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="is_public"
                  checked={formData.is_public !== false}
                  onChange={(e) => setFormData({ ...formData, is_public: e.target.checked })}
                  className="rounded border-white/20 bg-white/5"
                />
                <label htmlFor="is_public" className="text-sm text-white/80">Public Event</label>
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-sm text-white/80 mb-1">Code *</label>
                <input
                  type="text"
                  required
                  value={formData.code || ''}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-purple-400/50 font-mono"
                />
              </div>
              <div>
                <label className="block text-sm text-white/80 mb-1">Max Uses (leave empty for unlimited)</label>
                <input
                  type="number"
                  value={formData.max_uses || ''}
                  onChange={(e) => setFormData({ ...formData, max_uses: e.target.value ? parseInt(e.target.value) : null })}
                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-purple-400/50"
                />
              </div>
              <div>
                <label className="block text-sm text-white/80 mb-1">Expires At (optional)</label>
                <input
                  type="datetime-local"
                  value={formData.expires_at || ''}
                  onChange={(e) => setFormData({ ...formData, expires_at: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-purple-400/50"
                />
              </div>
            </>
          )}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 rounded-lg bg-purple-500 hover:bg-purple-600 text-white transition-all disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const StatCard = ({ icon: Icon, label, value, color = 'purple' }) => {
  const colorClasses = {
    purple: 'border-purple-400/30 bg-purple-500/10',
    blue: 'border-blue-400/30 bg-blue-500/10',
    green: 'border-green-400/30 bg-green-500/10',
    yellow: 'border-yellow-400/30 bg-yellow-500/10',
  };

  return (
    <div className={`p-4 rounded-lg border ${colorClasses[color]}`}>
      <div className="flex items-center justify-between mb-2">
        <Icon className={`w-5 h-5 text-${color}-400`} />
      </div>
      <p className="text-3xl font-bold text-white mb-1">{value}</p>
      <p className="text-white/60 text-sm">{label}</p>
    </div>
  );
};

const StatRow = ({ label, value }) => (
  <div className="flex justify-between">
    <span className="text-white/60">{label}</span>
    <span className="text-white font-semibold">{value}</span>
  </div>
);

export default AdminDashboard;

