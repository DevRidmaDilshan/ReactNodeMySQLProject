// // commition.routes.js
// module.exports = (app) => {
//     // Define your routes and route handling logic here
//     app.get('/example', (req, res) => {
//       // Your route logic
//     });

//     // More routes...
//   };
// import express from 'express';
// import {
//     getCommitions,
//     updateCommitions
// } from '../controllers/commition.controller.js';
// // import { protect } from '../middleware/authMiddleware.js';

// const router = express.Router();

// // router.post('/', registerOrder);
// router.get('/', getCommitions);
// router.put('/', updateCommitions)

// export default router;
import express from 'express';
import {
    createCommition,
    getAllCommitions,
    getCommitionById,
    updateCommition,
    deleteCommition,
} from '../controllers/commition.controller.js';

const router = express.Router();

router.post('/', createCommition);
router.get('/', getAllCommitions);
router.get('/:id', getCommitionById);
router.put('/:id', updateCommition);
router.delete('/:id', deleteCommition);

export default router;
