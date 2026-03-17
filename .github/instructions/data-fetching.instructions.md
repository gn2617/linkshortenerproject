---
description: "Read this file to understand how to fetch data in the project."
---
# Data Fetching Instructions
 This document provides guidelines for fetching data in the Link Shortener project. It covers best practices for server-side and client-side data fetching, as well as how to handle authentication and database interactions.

 ## 1. Use server Components for data fetching

 In Next.js, ALWAYS use server components for data fetching whenever possible. NEVER use client components for data fetching. Server components allow you to fetch data directly on the server, which can improve performance and reduce the amount of client-side JavaScript. This allows for faster page loads and better SEO.

 ## 2. Data fetching Methods
  ALWAYS use the helper function in the /data directory to fetch data. NEVER fetch data directly in your components. This helps to keep your components clean and focused on rendering, while the data fetching logic is centralized in one place.

  ALL Hemper function in the /data directory should use Drizzle ORM for database interactions. NEVER use raw SQL queries or another ORM. This ensures consistency across the project and leverages the benefits of Drizzle ORM, such as type safety and query building.

