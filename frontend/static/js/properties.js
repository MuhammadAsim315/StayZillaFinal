class PropertyManager {
    static async loadProperties(page = 1) {
        try {
            const properties = await ApiService.getProperties(page);
            const container = document.querySelector('#properties .grid');
            
            // Clear existing properties
            container.innerHTML = '';
            
            properties.properties.forEach(property => {
                const propertyCard = this.createPropertyCard(property);
                container.appendChild(propertyCard);
            });
            
            // Add pagination if needed
            if (properties.pages > 1) {
                this.addPagination(properties.current_page, properties.pages);
            }
        } catch (error) {
            console.error('Error loading properties:', error);
            showNotification('Failed to load properties.', 'error');
        }
    }

    static createPropertyCard(property) {
        const template = `
            <div class="property-card fade-in-scroll">
                <div class="relative h-64 bg-gradient-to-br from-purple-400 to-purple-600 overflow-hidden">
                    <img src="/static/uploads/${property.images[0] || 'default.jpg'}" alt="${property.title}" class="absolute inset-0 w-full h-full object-cover" />
                    <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    <div class="status-badge status-${property.status}">${property.status}</div>
                    <div class="absolute bottom-4 left-4 text-white">
                        <div class="flex items-center space-x-2">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            </svg>
                            <span class="text-sm">${property.city}</span>
                        </div>
                    </div>
                </div>
                <div class="p-6">
                    <h3 class="text-2xl font-bold mb-2 text-gray-800">${property.title}</h3>
                    <p class="text-gray-600 mb-4 flex items-center space-x-4">
                        <span class="flex items-center">
                            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2v10"></path>
                            </svg>
                            ${property.bedrooms} bed
                        </span>
                        <span class="flex items-center">
                            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10v11M20 10v11"></path>
                            </svg>
                            ${property.bathrooms} bath
                        </span>
                        <span class="flex items-center">
                            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"></path>
                            </svg>
                            ${property.area} sq ft
                        </span>
                    </p>
                    <div class="flex justify-between items-center">
                        <div>
                            <span class="text-3xl font-bold price-text">${property.price}</span>
                            <span class="text-gray-600">/month</span>
                        </div>
                        <div class="flex space-x-2">
                            <button class="p-2 rounded-full bg-gray-100 hover:bg-purple-100 transition-colors favorite-btn" data-property-id="${property.id}">
                                <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                                </svg>
                            </button>
                            <a href="/property/${property.id}" class="btn-primary text-sm px-4 py-2">View Details</a>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        const div = document.createElement('div');
        div.innerHTML = template.trim();
        return div.firstChild;
    }

    static addPagination(currentPage, totalPages) {
        // Add pagination implementation here
    }
}

// Load properties when the page loads
document.addEventListener('DOMContentLoaded', () => {
    PropertyManager.loadProperties();
});