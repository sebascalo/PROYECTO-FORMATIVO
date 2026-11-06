const express = require('express');
const router = express.Router();
const { getAllUserRoles, getAllUserRolesById, createUserRole, updateUserRole, deleteUserRole } = require('../controllers/userRoleController');

router.get('/', getAllUserRoles);
router.get('/:id', getAllUserRolesById);
router.post('/', createUserRole);
router.put('/:id', updateUserRole);
router.delete('/:id', deleteUserRole);

module.exports = router;