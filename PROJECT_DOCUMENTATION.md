# Sunbed Ranker - Hotel Pool & Sun Comparison Platform

A comprehensive hotel comparison website focused specifically on **pools, sunbeds, and leisure quality**. This platform answers real holiday questions like:

- 🏖️ Will I struggle to get a sunbed?
- ☀️ Is the pool sunny all day or shaded?
- 🔇 Is it quiet and relaxing or noisy and busy?
- 👨‍👩‍👧 Is it good for families or adults only?

## 🌟 Key Features

### For Holidaymakers (Public Users)
- **Smart Hotel Search** - Search by destination with advanced filtering
- **Pool & Sun Scoring System** - Hotels ranked by actual pool experience quality (0-10 scale)
- **Detailed Pool Metrics**:
  - Sunbed-to-guest ratios
  - Sun exposure times
  - Pool variety (infinity, rooftop, heated, kids pools)
  - Atmosphere ratings (quiet, family, party)
  - Cleanliness and maintenance scores
- **Side-by-Side Comparison** - Compare up to 4 hotels at once
- **Multiple Score Types**:
  - Overall Pool & Sun Score
  - Family-Friendly Score
  - Quiet Sun Score
  - Party Vibe Score
- **Affiliate Integration** - Direct booking links to Booking.com, Expedia, and hotel websites

### For Admins
- **Hotel Management** - Add, edit, and manage hotel listings
- **Pool Criteria Management** - Update detailed pool and sunbed information
- **Scoring System Control** - Adjust scoring weights without code changes
- **Hotel Claims** - Approve/reject hotelier ownership claims
- **Review Moderation** - Approve and moderate user reviews
- **Analytics Dashboard** - View site statistics and performance

### For Hoteliers
- **Claim Hotel Profile** - Request ownership of hotel listings
- **Enhanced Listings** - Premium subscription tiers (Free → Enhanced → Premium)
- **Direct Booking Links** - Promote own booking engines
- **Performance Analytics** - View clicks, impressions, and engagement

## 🏗️ Technical Stack

- **Backend**: Laravel 11 (PHP)
- **Frontend**: React 18 + Inertia.js
- **Styling**: Tailwind CSS
- **Database**: MySQL/PostgreSQL
- **Authentication**: Laravel Breeze

## 📊 Database Structure

### Core Tables
- `destinations` - Countries and regions
- `hotels` - Hotel basic information and cached scores
- `pool_criteria` - Detailed pool and sunbed metrics
- `scoring_weights` - Configurable scoring algorithm weights
- `hotel_claims` - Hotelier ownership requests
- `reviews` - User reviews and ratings
- `hotel_analytics` - Daily performance tracking
- `users` - Authentication with roles (user, hotelier, admin)

## 🎯 Scoring System

The platform uses a **weighted scoring algorithm** that calculates multiple score types:

### Scoring Factors
1. **Sunbed Ratio** (Weight: 2.5) - Sunbeds per guest
2. **Sun Exposure** (Weight: 2.0) - All-day sun vs limited
3. **Pool Variety** (Weight: 1.8) - Number and types of pools
4. **Atmosphere** (Weight: 1.5) - Quiet, family, lively, party
5. **Cleanliness** (Weight: 1.7) - Maintenance and water quality
6. **Family Features** (Weight: 1.0) - Kids pools, lifeguards, activities

Each factor is scored 0-5, then weighted and scaled to produce a 0-10 final score.

### Multiple Score Perspectives
- **Overall Score** - Balanced across all factors
- **Family Score** - Emphasizes kids features and safety
- **Quiet Score** - Prioritizes relaxation and low noise
- **Party Score** - Highlights lively atmosphere and bars

## 🚀 Getting Started

### Prerequisites
- PHP 8.2+
- Composer
- Node.js 18+
- MySQL/PostgreSQL

### Installation

1. **Install PHP dependencies**
```bash
composer install
```

2. **Install JavaScript dependencies**
```bash
npm install
```

3. **Environment Setup**
```bash
cp .env.example .env
php artisan key:generate
```

4. **Configure Database**
Edit `.env` with your database credentials:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=sunbedranker
DB_USERNAME=root
DB_PASSWORD=
```

5. **Run Migrations**
```bash
php artisan migrate
```

This will create:
- All database tables
- Default scoring weights
- User roles structure

6. **Build Frontend Assets**
```bash
npm run dev
```

For production:
```bash
npm run build
```

7. **Start Development Server**
```bash
php artisan serve
```

Visit: `http://localhost:8000`

### Create First Admin User

```bash
php artisan tinker
```

```php
$user = \App\Models\User::create([
    'name' => 'Admin User',
    'email' => 'admin@sunbedranker.com',
    'password' => bcrypt('password'),
    'role' => 'admin',
]);
```

## 📁 Project Structure

```
app/
├── Http/
│   ├── Controllers/
│   │   ├── HomeController.php              # Public homepage
│   │   ├── DestinationController.php       # Destination listings
│   │   ├── HotelController.php             # Hotel profiles
│   │   ├── ComparisonController.php        # Side-by-side comparison
│   │   └── Admin/
│   │       ├── AdminDashboardController.php
│   │       ├── HotelManagementController.php
│   │       └── ClaimManagementController.php
│   └── Middleware/
│       ├── EnsureUserIsAdmin.php
│       └── EnsureUserIsHotelier.php
├── Models/
│   ├── Destination.php
│   ├── Hotel.php
│   ├── PoolCriteria.php
│   ├── Review.php
│   ├── HotelClaim.php
│   ├── HotelAnalytic.php
│   └── ScoringWeight.php
└── Services/
    └── HotelScoringService.php             # Scoring algorithm

resources/js/
├── Pages/
│   ├── Home.jsx                            # Homepage
│   ├── Destinations/
│   │   └── Show.jsx                        # Destination listing page
│   ├── Hotels/
│   │   └── Show.jsx                        # Hotel profile page
│   ├── Comparison/
│   │   └── Index.jsx                       # Comparison page
│   └── Admin/
│       ├── Dashboard.jsx
│       ├── Hotels/
│       │   ├── Index.jsx
│       │   ├── Create.jsx
│       │   └── Edit.jsx
│       └── Claims/
│           └── Index.jsx

database/migrations/
├── 2024_12_17_000001_create_destinations_table.php
├── 2024_12_17_000002_create_hotels_table.php
├── 2024_12_17_000003_create_pool_criteria_table.php
├── 2024_12_17_000004_create_scoring_weights_table.php
├── 2024_12_17_000005_create_hotel_claims_table.php
├── 2024_12_17_000006_create_reviews_table.php
└── 2024_12_17_000008_create_hotel_analytics_table.php
```

## 🔐 User Roles & Permissions

### User (Default)
- Browse hotels
- View destination pages
- Compare hotels
- Leave reviews (when implemented)

### Hotelier
- All user permissions
- Claim hotel profiles
- Edit owned hotel information (premium features)
- View analytics for owned hotels

### Admin
- Full system access
- Manage all hotels and destinations
- Approve/reject hotel claims
- Moderate reviews
- Adjust scoring weights
- View all analytics

## 💰 Revenue Streams

1. **Affiliate Commissions** - Booking.com, Expedia, direct links
2. **Hotel Subscriptions**:
   - **Free** - Basic listing
   - **Enhanced** - Premium placement, extra photos
   - **Premium** - Featured listings, direct booking, analytics
3. **Sponsored Placements** - Featured positions in search results
4. **Advertising** - Banner ads and sponsored content

## 🎨 Key Pages

### Public Pages
- `/` - Homepage with featured destinations and top hotels
- `/destinations/{slug}` - Destination page with filterable hotels
- `/hotels/{slug}` - Detailed hotel profile with scores and booking
- `/compare?hotels=1,2,3` - Side-by-side comparison

### Admin Pages
- `/admin` - Admin dashboard
- `/admin/hotels` - Hotel management
- `/admin/hotels/create` - Add new hotel
- `/admin/hotels/{id}/edit` - Edit hotel and pool criteria
- `/admin/claims` - Review hotel ownership claims

## 🔧 Customizing Scoring Weights

Admins can adjust scoring weights in the database via `scoring_weights` table:

```php
// Example: Increase importance of sunbed ratio
DB::table('scoring_weights')
    ->where('criteria_name', 'sunbed_ratio')
    ->update(['weight' => 3.0]);

// Recalculate all scores
$scoringService = app(\App\Services\HotelScoringService::class);
$scoringService->recalculateAllScores();
```

Or use the admin interface (future feature).

## 📈 Next Steps / Roadmap

### Phase 2 - Enhanced Features
- [ ] Search autocomplete with destination suggestions
- [ ] User review system with photo uploads
- [ ] Email notifications for hoteliers
- [ ] Hotel image gallery management
- [ ] Advanced filters (price range, star rating)
- [ ] Map view integration (Google Maps)

### Phase 3 - Business Features
- [ ] Subscription payment integration (Stripe)
- [ ] Email marketing integration
- [ ] Blog/content management system
- [ ] SEO optimization tools
- [ ] Multi-language support

### Phase 4 - Advanced Analytics
- [ ] Revenue tracking
- [ ] A/B testing framework
- [ ] User behavior analytics
- [ ] Hotelier performance dashboard
- [ ] Automated reporting

## 🐛 Troubleshooting

### Scores not calculating?
```bash
php artisan tinker
$service = app(\App\Services\HotelScoringService::class);
$service->recalculateAllScores();
```

### Frontend not updating?
```bash
npm run build
php artisan optimize:clear
```

### Database issues?
```bash
php artisan migrate:fresh --seed
```

## 📝 License

This project is proprietary software. All rights reserved.

## 🤝 Contributing

This is a commercial project. Contact the development team for contribution guidelines.

---

**Built with Laravel, React, and a passion for better holidays! ☀️🏊**
