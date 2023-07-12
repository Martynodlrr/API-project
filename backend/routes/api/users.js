const express = require('express');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

router.post('/', async (req, res) => {
    const { email, password, username, firstName, lastName } = req.body;
    const hashedPassword = bcrypt.hashSync(password);

    try {
        const user = await User.create({ email, username, hashedPassword, firstName, lastName });

        const safeUser = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            username: user.username,
        };

        setTokenCookie(res, safeUser);

        return res.json({
            user: safeUser
        });

    } catch (err) {
        const errors = [];
        
        for (const key in err.errors) {
            if (err.errors[key].message.startsWith('User')) {
                errors.push(err.errors[key].message.slice(5));
            } else {
                errors.push(err.errors[key].message);
            }
        }

        return res.status(400).json({ errors });
    }
});

module.exports = router;
