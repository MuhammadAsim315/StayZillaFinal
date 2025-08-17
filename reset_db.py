#!/usr/bin/env python3
"""Reset database script - Use this to recreate the database with correct schema"""

import os
import sys
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from backend import create_app, db

def reset_database():
    """Drop all tables and recreate them"""
    app = create_app()
    
    with app.app_context():
        print("🗑️  Dropping all existing tables...")
        db.drop_all()
        
        print("🔨 Creating new tables with correct schema...")
        db.create_all()
        
        print("✅ Database reset complete!")
        print("📊 Tables created:")
        
        # List all tables
        inspector = db.inspect(db.engine)
        for table_name in inspector.get_table_names():
            print(f"   - {table_name}")
            
        print("\n🚀 You can now start your server with: python run.py")

if __name__ == '__main__':
    reset_database()

