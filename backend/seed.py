from backend import create_app, db
from backend.models import User, Property, PropertyImage
from datetime import datetime

def seed_database():
    app = create_app()
    
    with app.app_context():
        # Create tables
        db.create_all()
        
        # Create a test user
        user = User(
            username="test_user",
            email="test@example.com",
            first_name="Test",
            last_name="User",
            phone_number="+1234567890"
        )
        user.set_password("password123")
        db.session.add(user)
        
        # Create some test properties
        properties = [
            Property(
                title="Luxury Downtown Penthouse",
                description="Beautiful penthouse with city views",
                price=3200.00,
                bedrooms=4,
                bathrooms=3,
                area=1500.0,
                address="123 Main St",
                city="Downtown District",
                status="available",
                owner=user
            ),
            Property(
                title="Cozy Family House",
                description="Perfect for families",
                price=2000.00,
                bedrooms=3,
                bathrooms=2,
                area=1200.0,
                address="456 Oak Ave",
                city="Suburban Area",
                status="available",
                owner=user
            )
        ]
        
        for property in properties:
            db.session.add(property)
        
        db.session.commit()
        print("Database seeded!")

if __name__ == "__main__":
    seed_database()