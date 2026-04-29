# Dactoe | Enterprise Inventory & Analytics System

Dactoe is a high-performance, **PWA-ready** management solution designed for real-time inventory tracking, warehouse logistics, and sales analytics. Built with a focus on administrative control and data-driven decision-making.

## 🎯 Project Goal
To provide a robust, mobile-ready platform that empowers administrators to manage product lifecycles, track warehouse movements via spatial mapping, and monitor business health through real-time revenue analytics.

## 🛠 Tech Stack

* **Frontend:** React 18, TypeScript, Tailwind CSS, shadcn/ui.
* **State & Data:** TanStack Query (v5), TanStack Router, Zustand.
* **Forms:** React Hook Form + Zod.
* **Backend:** Supabase (PostgreSQL, Auth, RLS).
* **PWA:** Vite PWA Plugin for offline capability and mobile installation.

## 🌟 Key Features

### 🔐 Admin Control & Security
* **Role-Based Access (RBAC):** Secure admin-only routes and actions enforced via Supabase Row-Level Security.
* **User Activity Logs:** Comprehensive audit trails tracking every "Create, Update, Delete" action to ensure accountability.

### 📦 Advanced Inventory & Logistics
* **PWA Ready:** Installable on iOS and Android with offline caching support for warehouse environments with spotty connectivity.
* **Warehouse Mapping:** Visual "Map View" to navigate and locate products physically within the storage facility.
* **Low-Stock Intelligence:** Real-time alerts and a dedicated dashboard view for items requiring immediate replenishment.

### 📊 Business Intelligence Dashboard
* **Revenue Analytics:** High-level overview of sales performance and financial health.
* **Product Insights:** Data visualization for "Best Selling" vs. "Underperforming" inventory.
* **Stock Health:** Distribution charts showing inventory value and category breakdowns.

## 🏗 Technical Implementation

### 1. PWA Implementation
Utilized `vite-plugin-pwa` to configure service workers, allowing the app to stay performant and accessible even when the network is unstable.

### 2. Relational Logic & Audit Logging
Implemented **PostgreSQL Triggers** that automatically populate an `activity_logs` table whenever a product is modified. This ensures the audit trail is immutable and handled at the database level rather than the client level.

### 3. Spatial Product Mapping
Developed a coordinate-based mapping system (or Category-Aisle-Shelf logic) that allows users to pinpoint the exact location of a SKU, reducing "pick time" in the warehouse.

### 4. Reactive Analytics
Combined **Zustand** and **TanStack Query** to create a reactive dashboard. Financial data stays in sync with inventory changes without requiring manual page refreshes.
