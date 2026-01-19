// Hoteliers & Subscriptions Index Page
// Clean, well-structured admin page using reusable components

import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import AdminNav from '@/Components/AdminNav';

// Admin Components
import { 
    StatCard, 
    TabButton,
    ClockIcon, 
    UsersIcon, 
    CrownIcon, 
    StarIcon, 
    EyeIcon, 
    CurrencyIcon,
    formatNumber 
} from '@/Components/Admin';

// Tab Components
import ClaimsTab from '@/Components/Admin/Claims/ClaimsTab';
import HoteliersTab from '@/Components/Admin/Claims/HoteliersTab';
import SubscriptionsTab from '@/Components/Admin/Claims/SubscriptionsTab';

// Modal Components
import SubscriptionModal from '@/Components/Admin/Claims/SubscriptionModal';
import TemporaryAccessModal from '@/Components/Admin/Claims/TemporaryAccessModal';

export default function ClaimsIndex({ claims, hoteliers, subscriptions, filters, stats }) {
    // State
    const [activeTab, setActiveTab] = useState(filters.tab || 'claims');
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
    const [showAccessModal, setShowAccessModal] = useState(false);
    const [selectedHotelier, setSelectedHotelier] = useState(null);

    // Handlers
    const handleTabChange = (tab) => {
        setActiveTab(tab);
        router.get(route('admin.claims.index'), { 
            tab, 
            status: filters.status,
            search: searchTerm,
            tier: filters.tier 
        }, { preserveState: true });
    };

    const handleFilter = (key, value) => {
        router.get(route('admin.claims.index'), { 
            tab: activeTab,
            status: key === 'status' ? value : filters.status,
            search: key === 'search' ? value : searchTerm,
            tier: key === 'tier' ? value : filters.tier,
        }, { preserveState: true });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        handleFilter('search', searchTerm);
    };

    const clearFilters = () => {
        setSearchTerm('');
        router.get(route('admin.claims.index'), { tab: activeTab }, { preserveState: true });
    };

    const openSubscriptionModal = (hotelier) => {
        setSelectedHotelier(hotelier);
        setShowSubscriptionModal(true);
    };

    const openAccessModal = (hotelier) => {
        setSelectedHotelier(hotelier);
        setShowAccessModal(true);
    };

    const closeModals = () => {
        setShowSubscriptionModal(false);
        setShowAccessModal(false);
        setSelectedHotelier(null);
    };

    return (
        <>
            <Head title="Hoteliers & Subscriptions" />
            
            <div className="min-h-screen bg-gray-50 font-sans">
                <AdminNav stats={{ pending_claims: stats.pending_claims }} />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    {/* Page Header */}
                    <PageHeader />

                    {/* Stats Overview */}
                    <StatsGrid stats={stats} />

                    {/* Tabs Navigation */}
                    <TabsNavigation 
                        activeTab={activeTab} 
                        onTabChange={handleTabChange}
                        pendingCount={stats.pending_claims}
                    />

                    {/* Content Area */}
                    <div className="bg-white rounded-b-xl shadow-sm border border-gray-100 border-t-0">
                        {/* Filter Bar */}
                        <FilterBar 
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                            onSearch={handleSearch}
                            onFilter={handleFilter}
                            onClear={clearFilters}
                            activeTab={activeTab}
                            filters={filters}
                        />

                        {/* Tab Content */}
                        {activeTab === 'claims' && (
                            <ClaimsTab claims={claims} />
                        )}
                        
                        {activeTab === 'hoteliers' && (
                            <HoteliersTab 
                                hoteliers={hoteliers}
                                onManageSubscription={openSubscriptionModal}
                                onGrantAccess={openAccessModal}
                            />
                        )}
                        
                        {activeTab === 'subscriptions' && (
                            <SubscriptionsTab subscriptions={subscriptions} />
                        )}
                    </div>
                </div>
            </div>

            {/* Modals */}
            {showSubscriptionModal && selectedHotelier && (
                <SubscriptionModal
                    hotelier={selectedHotelier}
                    onClose={closeModals}
                />
            )}

            {showAccessModal && selectedHotelier && (
                <TemporaryAccessModal
                    hotelier={selectedHotelier}
                    onClose={closeModals}
                />
            )}
        </>
    );
}

// Page Sub-Components
function PageHeader() {
    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Hoteliers & Subscriptions</h1>
                <p className="text-gray-500 text-sm mt-1">
                    Manage hotel claims, hotelier accounts, and subscriptions
                </p>
            </div>
        </div>
    );
}

function StatsGrid({ stats }) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
            <StatCard 
                label="Pending Claims" 
                value={stats.pending_claims} 
                icon={<ClockIcon />}
                color="yellow"
            />
            <StatCard 
                label="Total Hoteliers" 
                value={stats.total_hoteliers} 
                icon={<UsersIcon />}
                color="blue"
            />
            <StatCard 
                label="Premium" 
                value={stats.premium_tier} 
                icon={<CrownIcon />}
                color="purple"
            />
            <StatCard 
                label="Enhanced" 
                value={stats.enhanced_tier} 
                icon={<StarIcon />}
                color="orange"
            />
            <StatCard 
                label="Total Views" 
                value={formatNumber(stats.total_hotel_views)} 
                icon={<EyeIcon />}
                color="green"
            />
            <StatCard 
                label="Revenue" 
                value={`€${formatNumber(stats.total_revenue)}`} 
                icon={<CurrencyIcon />}
                color="emerald"
            />
        </div>
    );
}

function TabsNavigation({ activeTab, onTabChange, pendingCount }) {
    return (
        <div className="bg-gray-50 rounded-t-xl border border-gray-100 border-b-0 shadow-sm">
            <div className="flex gap-1 px-4 pt-4 overflow-x-auto">
                <TabButton 
                    active={activeTab === 'claims'} 
                    onClick={() => onTabChange('claims')}
                    badge={pendingCount}
                >
                    Hotel Claims
                </TabButton>
                <TabButton 
                    active={activeTab === 'hoteliers'} 
                    onClick={() => onTabChange('hoteliers')}
                >
                    Hoteliers
                </TabButton>
                <TabButton 
                    active={activeTab === 'subscriptions'} 
                    onClick={() => onTabChange('subscriptions')}
                >
                    Subscriptions
                </TabButton>
            </div>
        </div>
    );
}

function FilterBar({ searchTerm, setSearchTerm, onSearch, onFilter, onClear, activeTab, filters }) {
    return (
        <div className="p-4 border-b border-gray-100">
            <form onSubmit={onSearch} className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search by name, email, or hotel..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
                    />
                </div>
                
                {activeTab === 'claims' && (
                    <select
                        value={filters.status}
                        onChange={(e) => onFilter('status', e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
                    >
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                        <option value="all">All Status</option>
                    </select>
                )}
                
                {(activeTab === 'hoteliers' || activeTab === 'subscriptions') && (
                    <select
                        value={filters.tier}
                        onChange={(e) => onFilter('tier', e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
                    >
                        <option value="all">All Tiers</option>
                        <option value="free">Free</option>
                        <option value="enhanced">Enhanced</option>
                        <option value="premium">Premium</option>
                    </select>
                )}
                
                <button
                    type="submit"
                    className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm font-medium"
                >
                    Search
                </button>
                <button
                    type="button"
                    onClick={onClear}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                >
                    Clear
                </button>
            </form>
        </div>
    );
}
