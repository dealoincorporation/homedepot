## Environment setup (MongoDB + Auth + Email)

Create a file named `.env.local` in the project root with:

```bash
# Mongo
MONGODB_URI="mongodb+srv://<user>:<pass>@<cluster>/<db>?retryWrites=true&w=majority"

# Auth
JWT_SECRET="change-me-to-a-long-random-string"
# Comma-separated list of emails that should become admins on signup/login
ADMIN_EMAILS="admin@example.com"

# Email (optional; if omitted, emails will be stored but not sent)
SMTP_HOST=""
SMTP_PORT="587"
SMTP_USER=""
SMTP_PASS=""
EMAIL_FROM="Home Depot Careers <no-reply@homedepot.local>"

# Cloudinary (optional; for resume/CV uploads in production)
# If not set, resumes will be saved locally to public/uploads/resumes/
# Get these from https://cloudinary.com/console
CLOUDINARY_CLOUD_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""
```

Notes:
- **Admin users**: if a user signs up with an email listed in `ADMIN_EMAILS`, they get `role=admin`.
- **Email**: if SMTP vars are not set, the app will not crash; it will just skip sending.
- **Cloudinary**: if not configured, resumes will be saved locally (works for development, but not recommended for production). For production, set up a free Cloudinary account at https://cloudinary.com and add your credentials.

