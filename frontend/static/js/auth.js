document.addEventListener('DOMContentLoaded', () => {
    // Sign In Form Handler
    const signinForm = document.getElementById('signin-form-element');
    signinForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitBtn = e.target.querySelector('button[type="submit"]');
        const email = e.target.querySelector('input[type="email"]').value;
        const password = e.target.querySelector('input[type="password"]').value;

        // Show loading state
        submitBtn.innerHTML = `
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Signing in...
        `;
        submitBtn.disabled = true;

        try {
            const response = await ApiService.login(email, password);
            showNotification('Welcome back! Sign in successful.', 'success');
            window.location.href = '/'; // Redirect to home page
        } catch (error) {
            showNotification('Invalid email or password.', 'error');
        } finally {
            submitBtn.innerHTML = 'Sign In';
            submitBtn.disabled = false;
        }
    });

    // Sign Up Form Handler
    const signupForm = document.getElementById('signup-form-element');
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitBtn = e.target.querySelector('button[type="submit"]');
        
        const userData = {
            email: e.target.querySelector('input[type="email"]').value,
            password: e.target.querySelector('input[placeholder="Create a strong password"]').value,
            first_name: e.target.querySelector('input[placeholder="John"]').value,
            last_name: e.target.querySelector('input[placeholder="Doe"]').value,
            phone_number: e.target.querySelector('input[type="tel"]').value,
            username: `${e.target.querySelector('input[placeholder="John"]').value.toLowerCase()}_${Math.random().toString(36).substr(2, 5)}`
        };

        // Show loading state
        submitBtn.innerHTML = `
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Creating account...
        `;
        submitBtn.disabled = true;

        try {
            const response = await ApiService.register(userData);
            showNotification('Account created successfully! Please sign in.', 'success');
            // Switch to sign in form
            document.getElementById('switch-to-signin').click();
        } catch (error) {
            showNotification('Registration failed. Please try again.', 'error');
        } finally {
            submitBtn.innerHTML = 'Create Account';
            submitBtn.disabled = false;
        }
    });
});