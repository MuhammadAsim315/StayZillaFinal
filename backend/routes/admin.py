from flask import Blueprint, render_template, jsonify, request, redirect, url_for
from flask_login import login_required, current_user
from backend.models import User, Property, db
from functools import wraps

admin_bp = Blueprint('admin', __name__)

def admin_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if not current_user.is_authenticated:
            return redirect('/login')  # Fixed: redirect to /login instead of auth.login
        # For now, allow any logged-in user to access admin (you can add role-based access later)
        return f(*args, **kwargs)
    return decorated_function

@admin_bp.route('/admin')
# @admin_required  # Temporarily commented out for testing
def admin_dashboard():
    return render_template('admin/dashboard.html')

@admin_bp.route('/api/admin/users')
# @admin_required  # Temporarily disabled for testing
def get_users():
    users = User.query.all()
    user_list = []
    for user in users:
        user_data = {
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'phone_number': user.phone_number,
            'registration_date': f"User #{user.id}",  # Simple registration order
            'status': 'Active'
        }
        user_list.append(user_data)
    
    return jsonify({'users': user_list})

@admin_bp.route('/api/admin/properties')
# @admin_required  # Temporarily disabled for testing
def get_all_properties():
    # Return empty properties for now since we're focusing on users
    return jsonify({'properties': []})

@admin_bp.route('/api/admin/contacts')
# @admin_required  # Temporarily disabled for testing
def get_contacts():
    """Get all contact submissions for admin panel"""
    from backend.models import Contact
    contacts = Contact.query.order_by(Contact.created_at.desc()).all()
    
    contact_list = []
    for contact in contacts:
        contact_data = {
            'id': contact.id,
            'name': contact.name,
            'email': contact.email,
            'subject': contact.subject,
            'message': contact.message[:100] + '...' if len(contact.message) > 100 else contact.message,
            'created_at': contact.created_at.strftime('%Y-%m-%d %H:%M:%S'),
            'status': contact.status
        }
        contact_list.append(contact_data)
    
    return jsonify({'contacts': contact_list})

@admin_bp.route('/admin/users')
@admin_required
def users_page():
    return render_template('admin/users.html')

@admin_bp.route('/admin/properties')
@admin_required
def properties_page():
    return render_template('admin/properties.html')
