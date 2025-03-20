

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config(); // ✅ Load environment variables

const userRoutes = require('./routes/userRoutes');
const callRoutes = require('./routes/callRoutes');
const router = express.Router();


const app = express();

// ✅ Middleware
app.use(cors({ origin: '*' })); // Allow all origins (change if needed)
app.use(bodyParser.json()); // ✅ Parses JSON requests properly
app.use(bodyParser.urlencoded({ extended: true })); // ✅ Supports URL-encoded data
app.use(express.json());

// ✅ Routes
app.use('/api/users', userRoutes);
app.use('/api/calls', callRoutes);
app.use(cors());
app.use('/api/blacklist/list', router);

// ✅ Error Handling Middleware
app.use((err, req, res, next) => {
    console.error('❌ Server Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
});

// ✅ Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));


app.use(express.json()); // Ensure JSON parsing in your backend

router.get('/api/blacklist/list', (req, res) => {
    db.query('SELECT phone FROM blacklist', (err, results) => {
        if (err) {
            console.error('Database Error:', err);
            return res.status(500).json({ message: 'Database error' });
        }
        res.json(results);
    });
});



app.post('/api/blacklist/add', async (req, res) => {
    console.log('Request received:', req.body); // Debug log
    const { phone } = req.body;

    if (!phone) {
        return res.status(400).json({ error: 'Phone number is required' });
    }

    try {
        // Simulate adding to database (replace with actual DB query)
        console.log(`Blocking phone number: ${phone}`);
        res.status(201).json({ message: 'Number blocked successfully' });
    } catch (error) {
        console.error('Error blocking number:', error);
        res.status(500).json({ error: 'Failed to block number' });
    }
});


app.use(express.json()); // Ensure JSON body parsing

app.delete('/api/blacklist/remove', async (req, res) => {
    console.log('Received request:', req.body); // Debugging

    const { phone } = req.body;
    if (!phone) {
        return res.status(400).json({ error: 'Phone number is required' });
    }

    try {
        console.log(`Removing phone number: ${phone}`);
        // Simulate database deletion (Replace with actual DB logic)
        res.status(200).json({ message: 'Number unblocked successfully' });
    } catch (error) {
        console.error('Error unblocking number:', error);
        res.status(500).json({ error: 'Failed to unblock number' });
    }
});
