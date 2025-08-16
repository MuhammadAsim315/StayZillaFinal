from flask import Blueprint, request, jsonify, current_app
from flask_login import login_required, current_user
from backend.models import Property, PropertyImage, db
from werkzeug.utils import secure_filename
import os

# Define the blueprint correctly
properties_bp = Blueprint('properties', __name__)

@properties_bp.route('/api/properties', methods=['GET'])
def get_properties():
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)
    
    properties = Property.query.paginate(page=page, per_page=per_page, error_out=False)
    
    return jsonify({
        'properties': [{
            'id': p.id,
            'title': p.title,
            'price': p.price,
            'bedrooms': p.bedrooms,
            'bathrooms': p.bathrooms,
            'area': p.area,
            'address': p.address,
            'city': p.city,
            'status': p.status,
            'images': [img.filename for img in p.images.all()]
        } for p in properties.items],
        'total': properties.total,
        'pages': properties.pages,
        'current_page': properties.page
    })

@properties_bp.route('/api/properties', methods=['POST'])
@login_required
def create_property():
    data = request.form.to_dict()
    images = request.files.getlist('images')
    
    property = Property(
        title=data['title'],
        description=data['description'],
        price=float(data['price']),
        bedrooms=int(data['bedrooms']),
        bathrooms=int(data['bathrooms']),
        area=float(data['area']),
        address=data['address'],
        city=data['city'],
        owner=current_user
    )
    
    db.session.add(property)
    db.session.commit()
    
    # Handle image uploads
    for image in images:
        if image:
            filename = secure_filename(image.filename)
            image.save(os.path.join(current_app.config['UPLOAD_FOLDER'], filename))
            
            property_image = PropertyImage(filename=filename, property=property)
            db.session.add(property_image)
    
    db.session.commit()
    
    return jsonify({'message': 'Property created successfully', 'id': property.id}), 201