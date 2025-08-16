from flask import Flask, send_from_directory, render_template
from flask_login import LoginManager
from flask_mail import Mail
from .config import Config
from .models import db, User
import os

# Initialize extensions
login_manager = LoginManager()
mail = Mail()

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

def create_app(config_class=Config):
    app = Flask(__name__,
                static_folder='../frontend/static',
                template_folder='../frontend/templates')
    
    app.config.from_object(config_class)
    
    # Initialize extensions with app
    db.init_app(app)
    login_manager.init_app(app)
    mail.init_app(app)
    
    # Setup login manager
    login_manager.login_view = 'auth.login'
    login_manager.login_message_category = 'info'
    
    # Import blueprints
    from .routes.auth import auth_bp
    from .routes.properties import properties_bp
    from .routes.admin import admin_bp
    
    # Register blueprints
    app.register_blueprint(auth_bp)
    app.register_blueprint(properties_bp)
    app.register_blueprint(admin_bp)
    
    @app.route('/')
    def index():
        return render_template('index.html')
        
    @app.route('/login')
    def login():
        return render_template('login.html')
    
    @app.route('/static/<path:filename>')
    def serve_static(filename):
        return send_from_directory(app.static_folder, filename)
    
    return app