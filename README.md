# Josh Ellman Portfolio

A modern, responsive portfolio website built with Next.js, featuring an admin dashboard for project management and MongoDB integration.

## Features

- **Modern Design**: Clean, professional layout with smooth animations
- **Responsive**: Optimized for all device sizes
- **Admin Dashboard**: Secure admin panel for managing projects
- **Database Integration**: MongoDB for storing projects and admin data
- **Authentication**: JWT-based authentication for admin access
- **Dynamic Content**: Projects are fetched from the database
- **Loading States**: Skeleton loading for better UX

## Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Database**: MongoDB
- **Authentication**: JWT, bcryptjs
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

The `.env.local` file has been created with default values. For production, update the following:

```env
# MongoDB Configuration
# Replace YOUR_PASSWORD_HERE with your actual MongoDB Atlas password
MONGODB_URI=mongodb+srv://tripsfoppish21:YOUR_PASSWORD_HERE@ellamngroup.v6itga9.mongodb.net/portfolio?retryWrites=true&w=majority
MONGODB_DB=portfolio

# Admin Configuration (password: "admin123")
ADMIN_PASSWORD_HASH=$2a$12$ujpWrWoSq5kAQ1jHCHGen.q7LeKx57QUXudEUD4s3Q1BiY5O8s5gG

# JWT Configuration
JWT_SECRET=ellamngroup_secure_jwt_key_for_production_2024

# NextAuth Configuration
NEXTAUTH_URL=https://ellamngroup.vercel.app
NEXTAUTH_SECRET=ellamngroup_secure_nextauth_secret_for_production_2024

# Environment
NODE_ENV=production
```

### 3. Database Setup

#### Option A: Local Development
1. Install MongoDB locally
2. Start MongoDB service
3. Set the connection string to `mongodb://localhost:27017/portfolio` in `.env.local`
4. Run the local database initialization script:
   ```bash
   node scripts/init-db.js
   ```

#### Option B: Production (MongoDB Atlas)
1. Ensure your MongoDB Atlas connection string is properly configured in `.env.local`
2. Replace `YOUR_PASSWORD_HERE` with your actual MongoDB Atlas password
3. Run the production database population script:
   ```bash
   node scripts/populate-atlas-db.js
   ```

The production script will:
- Connect to your MongoDB Atlas database
- Create necessary collections and indexes
- Add a default admin user (username: `admin`, password: `admin123`)
- Insert sample projects if none exist

### 4. Running the Application

#### Development Mode

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

#### Production Mode

Build and start the application in production mode:

```bash
npm run build
npm start
```

### 5. Deployment

The application is configured for deployment on Vercel. The production URL will be:

- Main portfolio: https://ellamngroup.vercel.app
- Admin dashboard: https://ellamngroup.vercel.app/admin

## Admin Dashboard

Access the admin dashboard at `http://localhost:3000/admin`

**Default Login:**
- Password: `admin123`

### Admin Features

- **Project Management**: Create, edit, and delete projects
- **Featured Projects**: Mark projects as featured for homepage display
- **Image Management**: Add project images via URL
- **Technology Tags**: Manage technology stacks for each project
- **Secure Authentication**: JWT-based session management

## Project Structure

```
├── app/
│   ├── admin/              # Admin dashboard
│   ├── api/                # API routes
│   │   ├── auth/           # Authentication endpoints
│   │   └── projects/       # Project CRUD endpoints
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Homepage
├── lib/
│   ├── auth.ts             # Authentication utilities
│   ├── models.ts           # TypeScript interfaces
│   └── mongodb.ts          # Database connection
├── scripts/
│   ├── generate-hash.js    # Password hash generator
│   └── init-db.js          # Database initialization
└── .env.local              # Environment variables
```

## Security Notes

- Change the default admin password in production
- Use strong, unique values for JWT_SECRET and NEXTAUTH_SECRET
- Enable MongoDB authentication in production
- Use HTTPS in production environments

## API Endpoints

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects?featured=true` - Get featured projects only
- `POST /api/projects` - Create new project (auth required)
- `GET /api/projects/[id]` - Get single project
- `PUT /api/projects/[id]` - Update project (auth required)
- `DELETE /api/projects/[id]` - Delete project (auth required)

### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/logout` - Admin logout
- `GET /api/auth/verify` - Verify authentication

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.