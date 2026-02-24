import sqlite3
import os
from datetime import datetime

def view_database():
    db_file = "essentialng.db"
    
    if not os.path.exists(db_file):
        print(f" Database file '{db_file}' not found!")
        print("\n📁 Files in current directory:")
        for file in os.listdir('.'):
            print(f"  {file}")
        return
    
    print(f"🔍 Analyzing: {db_file}")
    print(f"   Size: {os.path.getsize(db_file):,} bytes")
    print(f"   Modified: {datetime.fromtimestamp(os.path.getmtime(db_file))}")
    print("=" * 70)
    
    try:
        conn = sqlite3.connect(db_file)
        cursor = conn.cursor()
        
        # Get all tables
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
        tables = [t[0] for t in cursor.fetchall()]
        
        print(f"📊 Found {len(tables)} table(s): {tables}")
        print()
        
        for table in tables:
            # Get row count
            cursor.execute(f"SELECT COUNT(*) FROM {table};")
            row_count = cursor.fetchone()[0]
            
            print(f"📋 Table: {table} ({row_count} rows)")
            print("-" * 50)
            
            # Get column info
            cursor.execute(f"PRAGMA table_info({table});")
            columns = cursor.fetchall()
            
            # Print column headers
            if table == 'users':
                col_names = [col[1] for col in columns]
                print(f"{col_names[0]:<5} {col_names[1]:<20} {col_names[2]:<30} Password Hash")
                print("-" * 80)
                
                # Get all data
                cursor.execute(f"SELECT * FROM {table};")
                rows = cursor.fetchall()
                
                for row in rows:
                    # Show full data
                    print(f"{row[0]:<5} {row[1]:<20} {row[2]:<30} {row[3]}")
            else:
                # For other tables, show structure
                for col in columns:
                    print(f"  {col[1]:15} {col[2]:10} {'PK' if col[5] else ''}")
            
            print()
        
        conn.close()
        
        print("=" * 70)
        print("💡 Quick login test:")
        print("   Use any username/email from above with the password you registered with")
        
    except Exception as e:
        print(f"❌ Error: {e}")

# ✅ NEW: Admin promotion function (added at the end)
def make_user_admin(email):
    """Promote a user to admin by email"""
    try:
        conn = sqlite3.connect("essentialng.db")
        cursor = conn.cursor()
        
        # Check if is_admin column exists
        cursor.execute("PRAGMA table_info(users);")
        columns = [col[1] for col in cursor.fetchall()]
        
        if 'is_admin' not in columns:
            print("❌ 'is_admin' column not found in users table.")
            print("   Please update your database first.")
            return
        
        # Check if user exists
        cursor.execute("SELECT id, username, email, is_admin FROM users WHERE email = ?", (email,))
        user = cursor.fetchone()
        
        if not user:
            print(f"❌ User with email '{email}' not found.")
            print("   Make sure you've registered first.")
            return
        
        # Check if already admin
        if user[3] == 1:
            print(f"✅ User {user[1]} ({email}) is already an admin!")
            return
        
        # Make admin
        cursor.execute("UPDATE users SET is_admin = 1 WHERE email = ?", (email,))
        conn.commit()
        
        print(f"✅ SUCCESS! User {user[1]} ({email}) is now an admin!")
        
        # Show updated user
        cursor.execute("SELECT id, username, email, is_admin FROM users WHERE email = ?", (email,))
        updated = cursor.fetchone()
        print(f"   ID: {updated[0]}, Username: {updated[1]}, Admin: {updated[3]}")
        
        conn.close()
        
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    view_database()
    
    # ✅ NEW: Add this to promote yourself to admin
    print("\n" + "=" * 70)
    print("👑 ADMIN PROMOTION")
    print("=" * 70)
    
    admin_email = "idowu.tobi.saas.dev@gmail.com"
    make_user_admin(admin_email)