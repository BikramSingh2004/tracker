# 📊 tracker – offline first page analytics

FOR admin portal access 
Gmail for login:    admin@example.com
Pass :     12345

i build a fullstack app using **next.js app router** + **mongodb**  
main feature is to track which user is visiting which page and how much time they are spending.

## 🛠 tech used

- next.js 15 (app router)
- mongodb atlas
- tailwind + shadcn ui
- localforage for offline data
- jwt based admin login

## 🔄 how it works

- when user open any page, `trackPage()` is called
- it stores start time, userId, sessionId, and page path
- on page unload, it calculates duration and stores it in localForage
- once user comes online, all events are synced to mongodb via `/api/sync`
- admin can login and check all analytics at `/admin/dashboard`

## 📁 dashboard

admin dashboard has filters:

- filter by page
- filter by userId or sessionId
- date range filter also

you can apply filters in any combo

## 🚀 deployment

- frontend + backend hosted on **vercel**
- used vercel environment variable for mongodb uri

## ⚠️ notes

- initially I saved page as `page1`, `page2`, but now using real path like `/about`
- handled both using `pageMap`
- date filter was tricky in mongodb, so handled with proper ISO time
- added basic login:  
  - email: `admin@example.com`  
  - password: `12345`

## 🧠 what I learned

- offline sync logic
- how to store + filter data properly in mongodb
- using useEffect smartly for tracking
- real-time + offline first architecture

## ✅ features

- analytics per page
- user session level tracking
- offline → sync once back online
- dashboard with filters

---

thanks for checking ✌️  

- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
