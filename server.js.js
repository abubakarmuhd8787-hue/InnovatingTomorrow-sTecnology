const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Serve static files from the root directory
app.use(express.static('.'));

// Contact form submission endpoint
app.post('/contact', (req, res) => {
    const { name, email, subject, message } = req.body;
    
    // Basic validation
    if (!name || !email || !message) {
        return res.status(400).json({ 
            success: false, 
            message: 'Please fill in all required fields.' 
        });
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ 
            success: false, 
            message: 'Please enter a valid email address.' 
        });
    }
    
    // In a real application, you would:
    // 1. Save to database
    // 2. Send email notification
    // 3. Process the data
    
    console.log('New contact form submission:');
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Subject: ${subject}`);
    console.log(`Message: ${message}`);
    
    // Simulate processing delay
    setTimeout(() => {
        res.json({ 
            success: true, 
            message: 'Thank you for your message! We will get back to you soon.' 
        });
    }, 1000);
});

// Newsletter subscription endpoint
app.post('/subscribe', (req, res) => {
    const { email } = req.body;
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        return res.status(400).json({ 
            success: false, 
            message: 'Please enter a valid email address.' 
        });
    }
    
    // In a real application, you would:
    // 1. Save to database
    // 2. Send confirmation email
    // 3. Add to mailing list
    
    console.log(`New newsletter subscription: ${email}`);
    
    res.json({ 
        success: true, 
        message: 'Thank you for subscribing to our newsletter!' 
    });
});

// API endpoint to get company stats
app.get('/api/stats', (req, res) => {
    // In a real application, this data would come from a database
    res.json({
        projects: 500,
        clients: 120,
        satisfaction: 98,
        experience: 24
    });
});

// Serve HTML files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'home.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'about.html'));
});

app.get('/services', (req, res) => {
    res.sendFile(path.join(__dirname, 'service.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'contact.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
```__