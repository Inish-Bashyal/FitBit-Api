const express = require('express');
const router = express.Router();
const Routine = require('../models/Routines');
const { verifyAdmin } = require('../middlewares/auth')

router.route('/')
    .get((req, res, next) => {
        Routine.find()
            .then((routines) => res.json(routines))
            .catch(next)
    })
    .post(verifyAdmin, (req, res, next) => {
        Routine.create(req.body)
            .then((routine) => {
                res.status(201).json(routine)
            })
            .catch(next)
    })
    .put((req, res) => {
        res.status(405).json({ error: "method not allowed" })
    })
    .delete(verifyAdmin, (req, res, next) => {
        Routine.deleteMany()
            .then((result) => {
                res.json(result)
            })
            .catch(next)
    })


router.route('/:routine_id')
    .get((req, res, next) => {
        Routine.findById(req.params.routine_id)
            .then((routine) => {
                if (!routine) return res.status(404).json({ error: 'Routine not found' })
                res.json(routine)
            }).catch(next)
    })
    .post((req, res) => {
        res.status(405).json({ error: "Method not allowed" })
    })
    .put(verifyAdmin, (req, res, next) => {
        Routine.findByIdAndUpdate(
            req.params.routine_id,
            { $set: req.body },
            { new: true }
        )
            .then((updated) => res.json(updated))
            .catch(next)
    })
    .delete(verifyAdmin, (req, res, next) => {
        Routine.findByIdAndDelete(req.params.routine_id)
            .then((reply) => {
                res.status(204).end()
            }).catch(next)
    })



router.route('/:routine_id/remarks')
    .get((req, res, next) => {
        Routine.findById(req.params.routine_id)
            .then((routine) => {
                if (!routine) return res.status(404).json({ error: 'routine not found' })
                res.json(routine.remarks)
            }).catch(next)
    })
    .post((req, res, next) => {
        Routine.findById(req.params.routine_id)
            .then((routine) => {
                if (!routine) return res.status(404).json({ error: 'routine not found' })
                const remarks = {
                    text: req.body.text,
                    user: req.user.id,
                    completed: req.body.completed
                }
                Routine.remarks.push(remarks)
                routine.save()
                    .then((routine) => res
                        .status(201)
                        .json(routine.remarks[routine.remarks.length - 1]))
                    .catch(next)
            }).catch(next)
    })
    .delete(verifyAdmin, (req, res, next) => {
        Routine.findById(req.params.routine_id)
            .then((routine) => {
                if (!routine) return res.status(404).json({ error: 'Routine not found' })
                routine.remarks = []
                routine.save()
                    .then((routine) => res.status(204).end())
                    .catch(next)
            }).catch(next)
    })

    router.route('/:routine_id/remarks/:remark_id')
    .get((req, res, next) => {
        Routine.findById(req.params.routine_id)
            .then((routine) => {
                if (!routine) return res.status(404).json({ error: 'Routine not found' })
                const remark = routine.remarks.id(req.params.remark_id)
                res.json(remark)
            }).catch(next)
    })
    .put((req, res, next) => {
        Routine.findById(req.params.routine_id)
            .then((routine) => {
                if (!routine) return res.status(404).json({ error: 'Routine not found' })
                let remark = routine.remarks.id(remark_id)
                if (remark.user != req.user.id) {
                    return res.status(403).json({ error: 'You are not authorized' })
                }
                routine.remarks = routine.remarks.map((r) => {
                    if (r._id == req.params.remark_id) {
                        r.text = req.body.text,
                        r.completed = req.body.completed
                    }
                    return r
                })
                routine.save()
                    .then(routine => {
                        res.json(routine.remarks.id(req.params.remark_id))
                    }).catch(next)
            }).catch(next)
    })
    .delete((req, res, next) => {
        Routine.findById(req.params.routine_id)
            .then((routine) => {
                if (!routine) return res.status(404).json({ error: 'Routine not found' })
                let remark = routine.remarks.id(remark_id)
                if (remark.user != req.user.id) {
                    return res.status(403).json({ error: 'you are not authorized' })
                }
                routine.remarks = routine.remarks.filter((r) => r._id != req.params.remark_id)
                routine.save()
                    .then(routine => res.status(204).end())
                    .catch(next)
            }).catch(next)
    })
module.exports = router