from flask import Blueprint, request, jsonify
from backend.models import Contact, db
from datetime import datetime

contact_bp = Blueprint('contact', __name__)

@contact_bp.route('/api/contact', methods=['POST'])
def submit_contact():
    """Submit a contact form"""
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['name', 'email', 'subject', 'message']
        for field in required_fields:
            if not data.get(field):
                return jsonify({'error': f'{field} is required'}), 400
        
        # Create new contact entry
        contact = Contact(
            name=data['name'],
            email=data['email'],
            subject=data['subject'],
            message=data['message']
        )
        
        db.session.add(contact)
        db.session.commit()
        
        return jsonify({
            'message': 'Contact form submitted successfully!',
            'id': contact.id
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Failed to submit contact form'}), 500

@contact_bp.route('/api/admin/contacts', methods=['GET'])
def get_contacts():
    """Get all contact submissions (admin only)"""
    try:
        contacts = Contact.query.order_by(Contact.created_at.desc()).all()
        
        contact_list = []
        for contact in contacts:
            contact_data = {
                'id': contact.id,
                'name': contact.name,
                'email': contact.email,
                'subject': contact.subject,
                'message': contact.message,
                'created_at': contact.created_at.strftime('%Y-%m-%d %H:%M:%S'),
                'status': contact.status
            }
            contact_list.append(contact_data)
        
        return jsonify({'contacts': contact_list})
        
    except Exception as e:
        return jsonify({'error': 'Failed to fetch contacts'}), 500

@contact_bp.route('/api/admin/contacts/<int:contact_id>/status', methods=['PUT'])
def update_contact_status(contact_id):
    """Update contact status (admin only)"""
    try:
        data = request.get_json()
        new_status = data.get('status')
        
        if new_status not in ['unread', 'read', 'replied']:
            return jsonify({'error': 'Invalid status'}), 400
        
        contact = Contact.query.get_or_404(contact_id)
        contact.status = new_status
        db.session.commit()
        
        return jsonify({'message': 'Status updated successfully'})
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Failed to update status'}), 500

@contact_bp.route('/api/admin/contacts/<int:contact_id>', methods=['DELETE'])
def delete_contact(contact_id):
    """Delete a contact submission (admin only)"""
    try:
        contact = Contact.query.get_or_404(contact_id)
        db.session.delete(contact)
        db.session.commit()
        
        return jsonify({'message': 'Contact deleted successfully'})
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Failed to delete contact'}), 500
