# Developer Notes

This version is a static frontend + localStorage CMS demo for Khidmatul Ummah.

## Main updates in this build

- Bengali admin UI.
- Light green/white admin theme for better readability.
- Text overflow/wrapping fixes for Bengali content cards and tables.
- Separate Donor module.
- Website donation submissions are added to both `donations` and `donors` collections.
- Text editor includes homepage/admin main text keys.
- Shura member add/edit/delete flow is included.

## Data source

`js/data.js` seeds default data and stores updates in browser localStorage key:

`khidmatulUmmahCMS_v3_bangla_admin`

## Production notes

For production, migrate localStorage data structures to database tables:

- projects
- donations
- donors
- donation_accounts
- books
- shura_members
- website_texts
- media_files
- admin_users

Add secure authentication, server-side validation, role-based permission, upload handling, backups and audit logs.
