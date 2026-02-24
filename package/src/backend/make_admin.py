# make_admin.py
from users import make_admin, get_db

db = next(get_db())
email = "Admin_user@outlook.com"  # Your email

admin_user = make_admin(db, email)

if admin_user:
    print(f"SUCCESS! User {admin_user.email} is now an admin!")
    print(f"User ID: {admin_user.id}")
    print(f"Username: {admin_user.username}")
    print(f"Admin Status: {admin_user.is_admin}")
else:
    print(f"ERROR: User with email {email} not found!")
    print("   Make sure you've registered with this email first.")