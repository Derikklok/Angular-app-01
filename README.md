# Angular App with Backend Integration Guide

This guide explains how to properly integrate backend services with Angular and deploy to Vercel without CORS or build errors.

## 🚀 Quick Start

1. **Clone the repository**
2. **Install dependencies**: `npm install`
3. **Run locally**: `npm start`
4. **Build for production**: `npm run build`
5. **Deploy to Vercel**: Push to GitHub (auto-deploys)

## 📁 Project Structure

```
src/
├── app/
│   ├── components/          # Angular components
│   │   ├── roles/           # Roles management
│   │   ├── employee/        # Employee management
│   │   ├── client/          # Client management
│   │   ├── designation/     # Designation management
│   │   └── master/          # Master component
│   ├── services/            # API services
│   │   └── master.service.ts
│   ├── model/               # TypeScript interfaces
│   │   └── interface/
│   │       └── role.ts
│   └── environments/        # Environment configuration
│       ├── environment.ts   # Development
│       └── environment.prod.ts # Production
├── environments/            # Environment files (root level)
└── vercel.json             # Vercel deployment configuration
```

## 🔧 Environment Configuration

### Environment Files Setup

Create environment files in `src/environments/`:

**`src/environments/environment.ts` (Development)**
```typescript
export const environment = {
  production: false,
  apiBaseUrl: '/api',  // Use relative path for Vercel proxy
  apiTimeout: 30000,
  appName: 'My First App',
  appVersion: '1.0.0'
};
```

**`src/environments/environment.prod.ts` (Production)**
```typescript
export const environment = {
  production: true,
  apiBaseUrl: '/api',  // Use relative path for Vercel proxy
  apiTimeout: 30000,
  appName: 'My First App',
  appVersion: '1.0.0'
};
```

### Using Environment Variables in Services

**Example: `src/app/services/master.service.ts`**
```typescript
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIResponse } from '../model/interface/role';
import { environment } from '../../environments/environment'; // Correct import path

@Injectable({
  providedIn: 'root'
})
export class MasterService {
  constructor(private http: HttpClient) { }

  getDesignations(): Observable<APIResponse> {
    return this.http.get<APIResponse>(`${environment.apiBaseUrl}/ClientStrive/GetAllDesignation`);
  }
}
```

**Example: Component using the service**
```typescript
import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIResponse, IRole } from '../../model/interface/role';
import { environment } from '../../../environments/environment'; // Correct import path

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css',
})
export class RolesComponent implements OnInit {
  roleList: IRole[] = [];
  http = inject(HttpClient);

  ngOnInit(): void {
    this.getAllRoles();
  }

  getAllRoles() {
    this.http.get<APIResponse>(`${environment.apiBaseUrl}/ClientStrive/GetAllRoles`)
      .subscribe((res: APIResponse) => {
        this.roleList = res.data;
      });
  }
}
```

## 🌐 Vercel Configuration

### `vercel.json` Setup

Create `vercel.json` in your project root:

```json
{
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "https://freeapi.miniprojectideas.com/api/$1"
    },
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

**Key Points:**
- **API Proxy**: Routes `/api/*` calls to your backend API
- **SPA Routing**: Routes all other requests to `index.html` for Angular routing
- **CORS Solution**: Proxy eliminates CORS issues by making requests appear to come from your domain

## 🔍 Common Issues & Solutions

### 1. Build Errors - Import Path Issues

**Error:**
```
Could not resolve "../../environments/environment"
TS2307: Cannot find module '../../environments/environment'
```

**Solution:**
Check your import paths based on file location:

- From `src/app/services/`: `import { environment } from '../../environments/environment';`
- From `src/app/components/roles/`: `import { environment } from '../../../environments/environment';`
- From `src/app/components/employee/`: `import { environment } from '../../../environments/environment';`

### 2. CORS Errors

**Error:**
```
Access to XMLHttpRequest at 'https://api.example.com' from origin 'https://your-app.vercel.app' 
has been blocked by CORS policy
```

**Solution:**
- Use relative API paths (`/api`) instead of absolute URLs
- Configure Vercel proxy in `vercel.json`
- Never use `https://api.example.com` directly in production

### 3. 404 API Errors

**Error:**
```
Failed to load resource: the server responded with a status of 404
```

**Solutions:**
1. **Verify API endpoint exists**: Test with curl or Postman
2. **Check Vercel proxy configuration**: Ensure `vercel.json` routes correctly
3. **Use correct API paths**: Match your backend API structure

### 4. Environment Variables Not Working

**Issues:**
- Environment files not found
- Wrong import paths
- Missing environment configuration

**Solutions:**
1. **Create environment files** in `src/environments/`
2. **Use correct import paths** (see examples above)
3. **Configure both dev and prod** environments
4. **Use relative paths** for API calls

## 📋 Step-by-Step Integration Process

### 1. Set Up Environment Configuration

```bash
# Create environment files
mkdir src/environments
touch src/environments/environment.ts
touch src/environments/environment.prod.ts
```

### 2. Configure API Service

```typescript
// Create or update your service
import { environment } from '../../environments/environment';

export class YourService {
  private apiUrl = environment.apiBaseUrl;
  
  getData() {
    return this.http.get(`${this.apiUrl}/your-endpoint`);
  }
}
```

### 3. Configure Vercel Deployment

```json
// vercel.json
{
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "https://your-api-domain.com/api/$1"
    },
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### 4. Test Locally

```bash
# Install dependencies
npm install

# Run development server
npm start

# Test build
npm run build
```

### 5. Deploy to Vercel

```bash
# Commit changes
git add .
git commit -m "Add backend integration"
git push origin main

# Vercel auto-deploys from GitHub
```

## 🛠️ Development Workflow

### Local Development
1. **Start Angular dev server**: `npm start`
2. **Use proxy for API calls**: Configure `proxy.conf.json` for local development
3. **Test API integration**: Verify endpoints work locally

### Production Deployment
1. **Build Angular app**: `npm run build`
2. **Configure Vercel**: Update `vercel.json` with correct API proxy
3. **Deploy**: Push to GitHub (auto-deploys)
4. **Test production**: Verify API calls work on deployed site

## 📚 API Integration Best Practices

### 1. Use Environment Variables
- ✅ Store API URLs in environment files
- ✅ Use different configs for dev/prod
- ✅ Never hardcode API URLs

### 2. Handle Errors Properly
```typescript
getData() {
  return this.http.get(`${environment.apiBaseUrl}/endpoint`)
    .pipe(
      catchError(error => {
        console.error('API Error:', error);
        return throwError(error);
      })
    );
}
```

### 3. Use TypeScript Interfaces
```typescript
export interface APIResponse<T> {
  message: string;
  result: boolean;
  data: T;
}

export interface IRole {
  roleId: number;
  role: string;
}
```

### 4. Implement Loading States
```typescript
export class YourComponent {
  loading = false;
  
  getData() {
    this.loading = true;
    this.service.getData().subscribe({
      next: (data) => {
        this.loading = false;
        // Handle success
      },
      error: (error) => {
        this.loading = false;
        // Handle error
      }
    });
  }
}
```

## 🔧 Troubleshooting Checklist

- [ ] Environment files created in `src/environments/`
- [ ] Import paths are correct (relative to file location)
- [ ] `vercel.json` configured with API proxy
- [ ] Using relative API paths (`/api`) not absolute URLs
- [ ] API endpoints tested and working
- [ ] Build successful locally (`npm run build`)
- [ ] No TypeScript errors
- [ ] CORS issues resolved with proxy

## 📞 Support

If you encounter issues:

1. **Check build logs** in Vercel dashboard
2. **Verify API endpoints** with curl/Postman
3. **Test locally** before deploying
4. **Check browser console** for errors
5. **Review this README** for common solutions

## 🎯 Key Takeaways

1. **Always use environment variables** for API configuration
2. **Use Vercel proxy** to avoid CORS issues
3. **Test locally first** before deploying
4. **Use relative paths** for API calls in production
5. **Configure both dev and prod** environments
6. **Handle errors gracefully** in your services

---

**Happy coding! 🚀**