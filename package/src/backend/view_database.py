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

if __name__ == "__main__":
    view_database()