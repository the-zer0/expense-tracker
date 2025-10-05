💰 Expense Tracker Application
This is a personal web application designed to help users easily track their income and expenses. It uses vanilla JavaScript, HTML, and CSS for a dynamic frontend, while leveraging Supabase as a powerful, cloud-based backend for both user authentication and data storage.

✨ Project Features
This application offers a complete experience for managing personal finances:

Secure User Authentication: Users can Sign In and Sign Up using email and password, handled securely by Supabase Auth.

Full Data Control (CRUD):

Create: Quickly add new expense or income records with an amount, date, type, category, and note.

Read: Fetch and display a list of all personal records in a single table.

Update: Edit existing records via a modal interface to correct amounts, dates, or notes.

Delete: Permanently remove records with a single click.

Financial Summary: Calculates and displays the Total Income, Total Spending, and current Net Balance in real-time.

Filtering: Provides input fields to filter the main table by Category and a Date Range (From/To) to analyze spending over specific periods.

Modern UI: Features a clean, "neon-themed" design using standard CSS.

🛠️ Installation and Setup
To get this project running locally and connect it to your own database, follow these steps:

Prerequisites
You need a Supabase account to host your backend services.

1. Database Setup
Create a Project: Set up a new project in your Supabase dashboard.

Get Credentials: Find your unique supabaseUrl and supabaseKey (the anon public key).

Create the expenses Table: You will need to create a table named expenses in your Supabase database with the following structure (Supabase will typically auto-create the id and created_at fields):


id	UUID	Primary Key, auto-generated
user_id	UUID	Crucial: Links the record to the owner (User's ID from Auth)
amount	numeric	The value of the transaction
date	date	The date of the transaction
type	text	'income' or 'expense'
category	text	The category (e.g., 'Food', 'Salary')
note	text	Optional description

You are asking for a detailed description of your Expense Tracker project, formatted as a README file.

Here is a comprehensive README for your beginner-friendly project, detailing its purpose, features, setup, and file structure.

💰 Expense Tracker Application
This is a personal web application designed to help users easily track their income and expenses. It uses vanilla JavaScript, HTML, and CSS for a dynamic frontend, while leveraging Supabase as a powerful, cloud-based backend for both user authentication and data storage.

✨ Project Features
This application offers a complete experience for managing personal finances:

Secure User Authentication: Users can Sign In and Sign Up using email and password, handled securely by Supabase Auth.

Full Data Control (CRUD):

Create: Quickly add new expense or income records with an amount, date, type, category, and note.

Read: Fetch and display a list of all personal records in a single table.

Update: Edit existing records via a modal interface to correct amounts, dates, or notes.

Delete: Permanently remove records with a single click.

Financial Summary: Calculates and displays the Total Income, Total Spending, and current Net Balance in real-time.

Filtering: Provides input fields to filter the main table by Category and a Date Range (From/To) to analyze spending over specific periods.

Modern UI: Features a clean, "neon-themed" design using standard CSS.

🛠️ Installation and Setup
To get this project running locally and connect it to your own database, follow these steps:

Prerequisites
You need a Supabase account to host your backend services.

===================================================================================================================================================================

1. Database Setup
Create a Project: Set up a new project in your Supabase dashboard.

Get Credentials: Find your unique supabaseUrl and supabaseKey (the anon public key).

Create the expenses Table: You will need to create a table named expenses in your Supabase database with the following structure (Supabase will typically auto-create the id and created_at fields):

Column Name	Data Type	Purpose
id	UUID	Primary Key, auto-generated
user_id	UUID	Crucial: Links the record to the owner (User's ID from Auth)
amount	numeric	The value of the transaction
date	date	The date of the transaction
type	text	'income' or 'expense'
category	text	The category (e.g., 'Food', 'Salary')
note	text	Optional description

===================================================================================================================================================================

2. Configure Credentials
Update the Supabase connection details in both auth.js and dashboard.js with your own project's URL and Key:
const supabaseUrl = 'YOUR_SUPABASE_URL'; // e.g., 'https://xxkjkrauwifjqvjazmis.supabase.co'
const supabaseKey = 'YOUR_ANON_KEY';
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

===================================================================================================================================================================

3. Run Locally
Open index.html in your web browser. You can now sign up and begin tracking expenses!

🗺️ File Structure

index.html -> The landing page containing the Sign In form.
auth.js	-> Handles user authentication logic: signing up new users and signing in existing ones via the Supabase Auth API.
dashboard.html -> The main application interface containing the summary cards, the "Add Record" form, the filters, and the expense table.
dashboard.js ->	The core application script. Manages data fetching, CRUD operations, local filtering, and updating the summary statistics.
style.css ->	Defines all visual styles for the application, including the mobile-friendly layout and "neon" color scheme.
type	text	'income' or 'expense'
category	text	The category (e.g., 'Food', 'Salary')
note	text	Optional description
