# IncidentIQ

IncidentIQ is a full-stack AI-powered incident management system that helps IT teams analyze, track, and resolve system incidents. Users can submit incident logs, receive AI-generated analysis using Google's Gemini API, collaborate through comments, and manage incidents through an intuitive web application. The application demonstrates the integration of modern web technologies, Supabase for backend services and authentication, Google's Gemini API for AI-powered incident analysis, and GitHub Actions with Vercel for automated CI/CD and deployment.

## Business Value

IncidentIQ helps IT support teams streamline incident management by combining AI-assisted analysis with an easy-to-use incident tracking system.

Key benefits include:

- Faster incident triage through AI-generated summaries and severity assessment.
- Improved troubleshooting with AI-suggested causes and recommended fixes.
- Better team collaboration through incident assignments, comments, and activity logs.
- Improved visibility into incident status and resolution progress.
- Reduced manual effort by automating the initial analysis of system logs.

## Features

- User authentication with Supabase
- Create and manage incidents
- AI-powered incident analysis using Google Gemini
- AI-generated:
  - Summary
  - Severity level
  - Possible cause
  - Suggested fixes
- Dashboard with incident statistics
- View all incidents
- View personal incidents
- Assign incidents to yourself
- Mark incidents as resolved
- Comment on incidents
- Activity logging
- Responsive design for desktop and mobile
- Dark modern user interface

## Key Pages

- Dashboard – Displays key incident statistics and the incidents currently assigned to the logged-in user.
- New Incident – Allows users to submit an incident title and error log for AI-powered analysis and create a new incident.
- My Incidents – Displays all incidents assigned to the logged-in user and allows them to manage their assigned work.
- All Incidents – Displays all reported incidents with filtering options.
- Incident Details – Displays detailed incident information, AI-generated analysis, comments, assignment status, and resolution actions.
- Authentication – Secure user registration and login using Supabase Auth.

## Tech Stack

### Frontend
- Next.js 15 (App Router)
- React
- TypeScript
- Tailwind CSS

### Backend
- Supabase
- PostgreSQL

### Authentication
- Supabase Auth

### AI
- Google Gemini API

### CI/CD
- GitHub Actions

### Deployment
- Vercel

### Version Control
- Git
- GitHub


## Screenshots

### Dashboard

<img width="1912" height="862" alt="Screenshot 2026-07-27 150932" src="https://github.com/user-attachments/assets/c52ad1f5-6b57-4745-a6db-83263204dc68" />


### Incident

<img width="1917" height="862" alt="Screenshot 2026-07-27 151145" src="https://github.com/user-attachments/assets/24ea94e7-da28-4de6-af7d-08ade1dc84c0" />


<img width="1912" height="852" alt="Screenshot 2026-07-27 150949" src="https://github.com/user-attachments/assets/7a1c4627-a740-4d12-86c6-3f4852de6bbd" />

### AI Analysis

<img width="721" height="793" alt="Screenshot 2026-07-27 151047" src="https://github.com/user-attachments/assets/7bf39f25-ac39-43e4-8ccd-02ee46daa62c" />
<img width="710" height="855" alt="Screenshot 2026-07-27 151118" src="https://github.com/user-attachments/assets/054c330e-47ce-45b3-8d67-4c8d0d804c59" />

### Assignment, Resolution & Comments


<img width="1912" height="865" alt="Screenshot 2026-07-27 151203" src="https://github.com/user-attachments/assets/d09964d7-3b57-43de-a3ce-aa5536e126c4" />

<img width="1917" height="848" alt="Screenshot 2026-07-27 151211" src="https://github.com/user-attachments/assets/bb11477d-bc63-4395-a62b-e6342af63f0e" />



## Installation

Clone the repository:

```bash
git clone https://github.com/siddiq672004/Incidentiq.git
```

Navigate to the project:

```bash
cd incidentiq
```

Install dependencies:

```bash
npm install
```

Create a `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
GEMINI_API_KEY=your_gemini_api_key
```

Run the development server:

```bash
npm run dev
```

Open:

```
http://localhost:3000
```

## AI Workflow

1. User submits an incident title and log.
2. The application sends the incident title and log to the Google Gemini API.
3. Gemini analyzes the incident.
4. The AI returns:
   - Summary
   - Severity
   - Possible cause
   - Suggested fixes
5. The incident and analysis are stored in Supabase.
6. Users can assign, comment on, and resolve incidents.

## CI/CD

This project uses GitHub Actions for Continuous Integration (CI) and Vercel for Continuous Deployment (CD).

### Continuous Integration
- GitHub Actions automatically runs on every push to the `main` branch.
- The workflow installs project dependencies and builds the application to verify successful compilation.

### Continuous Deployment
- Vercel is connected to the GitHub repository.
- Every successful push to the `main` branch automatically triggers a new deployment.

## Future Improvements

- Email notifications
- Search and filtering
- Incident categories
- File attachments
- Admin dashboard
- Real-time updates
- Incident history timeline
- Role-based access control (Admin, Support Engineer, User)


## Live Demo

https://incidentiq-orcin.vercel.app/login

## Demo Account

Email: test@example.com

Password: password123

## Repository

GitHub Repository:
https://github.com/siddiq672004/Incidentiq

## Author

K Mohammed Siddiq

GitHub:
https://github.com/siddiq672004

LinkedIn:
https://www.linkedin.com/in/kmohammedsiddiq/
