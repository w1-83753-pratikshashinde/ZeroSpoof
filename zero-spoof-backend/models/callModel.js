const db = require('../config/db');
const validStatuses = ['white', 'black', 'gray'];

const callModel = {
        getAllCalls() {
            return new Promise((resolve, reject) => {
                const query = 'SELECT * FROM call_logs ORDER BY timestamp DESC';
                db.query(query, (err, results) => {
                    if (err) {
                        console.error('❌ Database Error:', err);
                        return reject(err);
                    }
                    resolve(results);
                });
            });
        },

    // ✅ Check Spoofing Status (Database First, Then Apply Spam Detection)
    checkSpoofing(phone) {
        return new Promise((resolve, reject) => {
            const normalizedPhone = phone.replace(/\D/g, ''); // Normalize number (remove spaces, dashes, etc.)

            // 🔍 Step 1: Check if the number exists in the `call_logs` table
            const query = 'SELECT status FROM call_logs WHERE phone = ? ORDER BY timestamp DESC LIMIT 1';
            db.query(query, [normalizedPhone], (err, result) => {
                if (err) {
                    console.error('❌ Database Error:', err);
                    return reject(err);
                }

                if (result.length > 0) {
                    const status = result[0].status;
                    console.log(`📞 Incoming Call from ${normalizedPhone} - Status: ${status} (From DB)`);
                    return resolve(status);
                } 

                // 🔍 Step 2: If not in database, check spam rules
                if (normalizedPhone.startsWith('140') || !/^[789]\d{9}$/.test(normalizedPhone)) {
                    console.log(`🚨 Auto-detected Spam Caller: ${normalizedPhone} (Blacklisted)`);
                    return resolve('black');
                }

                // ❌ Step 3: If not found in DB & not spam → Default to "gray"
                console.log(`⚠️ Unknown Caller (Gray) - ${normalizedPhone}`);
                return resolve('gray');
            });
        });
    },

    // ✅ Log Call Details
    logCall(phone, totp = '000000', status) {
        return new Promise((resolve, reject) => {
            const normalizedPhone = phone.replace(/\D/g, ''); // Normalize number

            if (!validStatuses.includes(status)) {
                console.error(`❌ Invalid status: ${status}`);
                return reject(new Error(`Invalid status: ${status}. Allowed values: white, black, gray`));
            }

            const query = 'INSERT INTO call_logs (phone, totp, status, timestamp) VALUES (?, ?, ?, NOW())';
            db.query(query, [normalizedPhone, totp, status], (err, result) => {
                if (err) {
                    console.error('❌ Failed to log call:', err);
                    return reject(err);
                }
                console.log(`✅ Call Logged Successfully: ${normalizedPhone} - Status: ${status}`);
                resolve(result);
            });
        });
    },

    isBlacklisted(phone) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM blacklist WHERE phone = ?';
            db.query(query, [phone], (err, result) => {
                if (err) {
                    console.error('❌ Database Error:', err);
                    return reject(err);
                }
                resolve(result.length > 0);
            });
        });
    },

    // ✅ Log Call Only If Not Blacklisted
    async logCall(phone, totp = '000000', status) {
        try {
            const normalizedPhone = phone.replace(/\D/g, '');
            
            // 🚨 Step 1: Check Blacklist Before Logging
            const isBlocked = await this.isBlacklisted(normalizedPhone);
            if (isBlocked) {
                console.log(`🚨 Blocked Call Attempt: ${normalizedPhone} (Blacklisted)`);
                return { blocked: true, message: 'Call blocked due to blacklist entry' };
            }

            // ✅ Step 2: Proceed with Call Logging
            const query = 'INSERT INTO call_logs (phone, totp, status, timestamp) VALUES (?, ?, ?, NOW())';
            return new Promise((resolve, reject) => {
                db.query(query, [normalizedPhone, totp, status], (err, result) => {
                    if (err) {
                        console.error('❌ Failed to log call:', err);
                        return reject(err);
                    }
                    console.log(`✅ Call Logged Successfully: ${normalizedPhone} - Status: ${status}`);
                    resolve(result);
                });
            });
        } catch (error) {
            console.error('❌ Error in logCall:', error);
            throw error;
        }
    },

    // ✅ Add Number to Blacklist
    addToBlacklist(phone, reason = 'Spam') {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO blacklist (phone, reason) VALUES (?, ?) ON DUPLICATE KEY UPDATE reason = ?';
            db.query(query, [phone, reason, reason], (err, result) => {
                if (err) {
                    console.error('❌ Error adding to blacklist:', err);
                    return reject(err);
                }
                console.log(`🚨 Number Blacklisted: ${phone}`);
                resolve(result);
            });
        });
    },

    // ✅ Remove Number from Blacklist
    removeFromBlacklist(phone) {
        return new Promise((resolve, reject) => {
            const query = 'DELETE FROM blacklist WHERE phone = ?';
            db.query(query, [phone], (err, result) => {
                if (err) {
                    console.error('❌ Error removing from blacklist:', err);
                    return reject(err);
                }
                console.log(`✅ Number Removed from Blacklist: ${phone}`);
                resolve(result);
            });
        });
    }






};






module.exports = callModel;
