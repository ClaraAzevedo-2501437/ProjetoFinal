const ROLES = {
    PUBLIC: 'PUBLIC',
    DOCENTE: 'DOCENTE',
    ADMIN: 'ADMIN',
};

function requireRole(...allowedRoles) {
    return (req, res, next) => {
        // Public routes don't need authentication
        if (allowedRoles.includes(ROLES.PUBLIC)) {
            return next();
        }

        // Check if user is authenticated
        if (!req.user) {
            return res.status(401).json({ error: 'Authentication required' });
        }

        // Check if user has required role
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ 
                error: 'Insufficient permissions',
                required: allowedRoles,
                current: req.user.role
            });
        }

        next();
    };
}

module.exports = {
    requireRole,
    ROLES,
};
