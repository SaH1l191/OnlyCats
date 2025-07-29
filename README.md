OnlyCatz - Premium Content & E-commerce Platform

This project is a content subscription platform similar to OnlyFans, but themed around cats (OnlyCatz/OnlyHorse). It's built with Next.js 14, TypeScript, Prisma, and PostgreSQL.

Core Functionalities:

#### 1. Authentication & User Management
•  Kinde Auth integration for secure user authentication
•  User profile management with profile updates
•  Two-tier user experience: public (unauthenticated) vs authenticated users

#### 2. Subscription System
•  Stripe integration for payment processing
•  Monthly ($59) and Yearly ($499) subscription plans
•  Subscription management with automatic renewal
•  Webhook handling for payment confirmations
•  Email notifications (welcome emails, receipts) via Resend

#### 3. Content Management System
•  Admin dashboard (/secret-dashboard) with three main tabs:
•  Content Tab: Create and publish posts (images/videos)
•  Store Tab: Manage merchandise products
•  Analytics Tab: View platform analytics
•  Public vs Premium content differentiation
•  Cloudinary integration for media upload and management
•  Posts can be marked as public or subscription-only

#### 4. E-commerce Store
•  Merchandise store (/merch) selling physical products
•  Product management system with inventory tracking
•  Order processing with shipping address collection
•  Size selection for apparel
•  Order confirmation emails

#### 5. Social Features
•  Like system for posts
•  Comment system on posts
•  User interaction tracking
•  Real-time updates using TanStack Query

#### 6. UI/UX Features
•  Responsive design with Tailwind CSS
•  Dark/Light theme toggle
•  shadcn/ui components for consistent design
•  Skeleton loading states for better UX
•  Toast notifications for user feedback

#### 7. Database Schema
The platform manages several entities:
•  Users (with subscription status)
•  Posts (with media content)
•  Comments and Likes
•  Subscriptions (with plan details)
•  Products and Orders
•  Shipping Addresses

#### 8. Content Delivery
•  Cloudinary for optimized image/video delivery
•  Video player integration for premium content
•  Image optimization with Next.js Image component

#### 9. Email System
•  Welcome emails for new subscribers
•  Receipt emails for merchandise purchases
•  HTML email templates using React Email

#### 10. Analytics & Admin Features
•  Admin-only dashboard for content creators
•  Analytics tracking (revenue, subscriptions, engagement)
•  Product inventory management
•  Content moderation capabilities

Key Pages:
•  / - Landing page (auth screen) or home feed (for logged-in users)
•  /pricing - Subscription plans
•  /merch - Merchandise store
•  /secret-dashboard - Admin panel
•  /update-profile - User profile management
