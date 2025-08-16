class ApiService {
    static async login(email, password) {
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password })
            });
            
            if (!response.ok) {
                throw new Error('Login failed');
            }
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    }

    static async register(userData) {
        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData)
            });
            
            if (!response.ok) {
                throw new Error('Registration failed');
            }
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    }

    static async getProperties(page = 1, perPage = 10) {
        try {
            const response = await fetch(`/api/properties?page=${page}&per_page=${perPage}`);
            
            if (!response.ok) {
                throw new Error('Failed to fetch properties');
            }
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Fetch properties error:', error);
            throw error;
        }
    }

    static async createProperty(propertyData) {
        try {
            const formData = new FormData();
            
            // Add property details
            Object.keys(propertyData).forEach(key => {
                if (key !== 'images') {
                    formData.append(key, propertyData[key]);
                }
            });
            
            // Add images
            if (propertyData.images) {
                propertyData.images.forEach(image => {
                    formData.append('images', image);
                });
            }
            
            const response = await fetch('/api/properties', {
                method: 'POST',
                body: formData
            });
            
            if (!response.ok) {
                throw new Error('Failed to create property');
            }
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Create property error:', error);
            throw error;
        }
    }
}