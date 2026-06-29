# EventHub - Event Management System

A complete event management platform built with HTML, CSS, Bootstrap, Tailwind, and JavaScript. Features event browsing, booking with seat selection, ticket generation, user/organizer/admin dashboards, and chat support.

## Features

### Public Pages
- **Landing Page** - Hero section with video background, featured events, categories, testimonials
- **Events Page** - Browse all events with search and filter functionality
- **Event Detail Page** - View event details, venue information, reviews
- **Calendar Page** - Interactive calendar showing events by date
- **Chat Support** - Live chat interface for customer support

### User Features
- **Authentication** - Login and register with role-based access
- **Booking System** - Interactive seat selection with pricing
- **Ticket Generation** - Digital tickets with QR codes
- **User Dashboard** - View bookings, saved events, statistics

### Organizer Features
- **Organizer Dashboard** - Manage events, view analytics, track revenue
- **Event Management** - Create and edit events
- **Attendee Management** - View and manage event attendees

### Admin Features
- **Admin Dashboard** - System overview and user management
- **User Management** - Manage users, organizers, and permissions
- **System Status** - Monitor server, database, and payment gateway status

## How to Run

### Option 1: Direct File Access (Recommended for Windows)

1. Navigate to the static folder:
   ```
   cd c:\Users\bauch\OneDrive\Documents\Pinnable\Event_Management-main\Event_Management-main\static
   ```

2. Open `index.html` in your web browser:
   - Double-click `index.html` file
   - Or right-click and select "Open with" → Choose your browser (Chrome, Edge, Firefox)

3. The application will open in your browser and you can navigate through all pages

### Option 2: Using Python Simple HTTP Server

1. Open a terminal/command prompt

2. Navigate to the static folder:
   ```
   cd c:\Users\bauch\OneDrive\Documents\Pinnable\Event_Management-main\Event_Management-main\static
   ```

3. Run the Python server:
   ```
   python -m http.server 8000
   ```

4. Open your browser and visit:
   ```
   http://localhost:8000
   ```

### Option 3: Using VS Code Live Server

1. Install the "Live Server" extension in VS Code

2. Right-click on `index.html` in the static folder

3. Select "Open with Live Server"

4. The application will open automatically in your browser

## Project Structure

```
static/
├── index.html              # Landing page
├── events.html             # Events listing page
├── event.html              # Event detail page
├── booking.html            # Seat selection and booking
├── ticket.html             # Generated ticket page
├── calendar.html           # Events calendar
├── chat.html               # Chat support
├── login.html              # Login page
├── register.html           # Registration page
├── contact.html            # Contact form
├── test.html               # Test page for debugging
├── styles.css              # Main stylesheet with animations
├── data.js                 # Event and site data
├── static.js               # JavaScript functionality
├── app.js                  # Landing page scripts
├── dashboard/              # User dashboard
│   └── index.html
├── organizer/              # Organizer dashboard
│   └── index.html
└── admin/                  # Admin dashboard
    └── index.html
```

## User Guide

### For Regular Users

1. **Browse Events**: Visit the Events page to see all available events
2. **Search & Filter**: Use the search bar and filters to find specific events
3. **View Details**: Click on any event to see full details
4. **Book Tickets**: Click "Book Tickets" to select seats and complete booking
5. **Get Ticket**: After booking, you'll receive a digital ticket with QR code
6. **View Dashboard**: Login to see your bookings and statistics

### For Organizers

1. **Login**: Select "Organizer" role when logging in
2. **Create Events**: Use the dashboard to create new events
3. **Manage Bookings**: View all bookings for your events
4. **Track Revenue**: Monitor your event performance and earnings

### For Admins

1. **Login**: Select "Admin" role when logging in
2. **Manage Users**: View and manage all users in the system
3. **Monitor System**: Check system status and resolve issues
4. **View Reports**: Access platform-wide analytics

## Login Credentials (Demo)

Since this is a static demo, you can use any email and password to login:

- **User Login**: Select "User" role → Redirects to User Dashboard
- **Organizer Login**: Select "Organizer" role → Redirects to Organizer Dashboard  
- **Admin Login**: Select "Admin" role → Redirects to Admin Dashboard

## Booking Flow

1. Navigate to Events page
2. Click on an event to view details
3. Click "Book Tickets" button
4. Select seats from the interactive seat map
5. View order summary and total price
6. Select payment method (Razorpay/Stripe)
7. Click "Confirm Booking"
8. Receive your digital ticket with QR code
9. View ticket in your dashboard

## Technologies Used

- **HTML5** - Structure and semantics
- **CSS3** - Styling and animations
- **Bootstrap 5.3.3** - Responsive UI framework
- **Tailwind CSS** - Utility-first CSS framework
- **JavaScript (ES6+)** - Interactivity and functionality
- **LocalStorage** - Data persistence for bookings and user sessions

## Features Implemented

### Animations & Transitions
- Fade-in-up animations on scroll
- Scale-in effects for modals and cards
- Slide-in animations for side panels
- Hover effects on interactive elements
- Staggered animation delays for sequential reveals
- Intersection Observer for scroll-triggered animations

### Interactive Elements
- Dynamic event filtering and search
- Interactive seat selection
- Real-time price calculation
- QR code generation for tickets
- Chat interface with auto-responses
- Dashboard with live statistics

### Data Management
- Event data stored in JavaScript objects
- Booking data persisted in LocalStorage
- User session management
- Role-based access control

## Browser Compatibility

- Chrome (Recommended)
- Edge
- Firefox
- Safari
- Opera

## Troubleshooting

### Login Not Working

**Problem**: Login form not visible or not redirecting to dashboard

**Solution**:
1. Open `test.html` in your browser to verify the static folder is working
2. Open browser console (F12) and check for JavaScript errors
3. Make sure you're opening files directly from the static folder
4. Try clearing browser cache and LocalStorage:
   - Press F12 to open DevTools
   - Go to Application tab → Local Storage
   - Right-click and clear all data
   - Refresh the page and try again

### Dashboard Not Loading

**Problem**: After login, dashboard doesn't load or redirects back to login

**Solution**:
1. Check browser console for error messages (F12)
2. Verify LocalStorage has the correct values:
   - `isLoggedIn` should be "true"
   - `userRole` should match the dashboard you're trying to access
3. Make sure you're accessing the correct dashboard URL:
   - User: `dashboard/index.html`
   - Organizer: `organizer/index.html`
   - Admin: `admin/index.html`

### Booking Not Working

**Problem**: Seat selection not showing or booking not completing

**Solution**:
1. Make sure you're accessing booking page from an event detail page
2. Check that the URL has `?id=` parameter with event ID
3. Open browser console to check for JavaScript errors
4. Verify `data.js` is loaded correctly

### Pages Not Connecting

**Problem**: Navigation links not working or pages not loading

**Solution**:
1. Verify all HTML files are in the correct folders
2. Check that relative paths in href attributes are correct
3. Use `test.html` to verify all page links are accessible
4. If using a server, make sure the server is running on the correct port

### Styles Not Loading

**Problem**: Pages look unstyled or animations not working

**Solution**:
1. Check that `styles.css` is in the static folder
2. Verify Bootstrap CDN link is accessible
3. Check Tailwind CSS script is loading
4. Clear browser cache and refresh

### Console Debugging

To debug issues, open browser console (F12) and look for:
- Red error messages
- Console.log statements (added for debugging)
- Network errors for failed resource loading

The application includes console.log statements for:
- Login attempts
- Dashboard loading
- Booking process
- Data loading

## Notes

- This is a static demo application
- All data is stored in browser LocalStorage
- Payment integration is simulated (no real transactions)
- Chat support uses simulated responses
- Images are from Unsplash/Pexels (free stock photos)
- Video background from Pexels (free stock video)

## Support

For any issues or questions, please use the chat support feature in the application or contact the development team.

## License

This project is for demonstration purposes only.
