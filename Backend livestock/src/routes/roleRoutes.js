const express = require('express');
const router = express.Router();
const { getAllRoles, getAllRolesById, createRole, updateRole, deleteRole } = require('../controllers/roleController');

router.get('/', getAllRoles);
router.get('/:id', getAllRolesById);
router.post('/', createRole);
router.put('/:id', updateRole);
router.delete('/:id', deleteRole);

module.exports = router;