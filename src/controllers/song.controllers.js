const catchError = require('../utils/catchError');
const Song = require('../models/Song');

const getAll = catchError(async(req, res) => {
    const song = await Song.findAll()
    return res.json(song)
});

const create = catchError(async(req, res) => {
    const { name, artist, genre, releaseDate} = req.body
    const newBody = { name, artist, genre, releaseDate}
    const song = await Song.create(newBody)
    return res.json(song)
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params
    const song = await Song.findByPk(id)
    if (!song) return res.sendStatus(404)
    return res.json(song)
});

const destroy = catchError(async(req, res) => {
    const { id } = req.params
    const song = await Song.findByPk(id)
    if (!song) return res.sendStatus(404)
    await Song.destroy({ where: { id }})
    return res.send('Song Deleted').status(204)
});

const update = catchError(async(req, res) => {
    const { id } = req.params
    const { name, artist, genre, releaseDate } = req.body
    const newBody = { name, artist, genre, releaseDate }

    const song = await Song.findByPk(id)
    if (!song) return res.sendStatus(404)

    const songUpdate = await Song.update(
        newBody,
        { where: {id}, returning:true })

        return res.send(songUpdate )
});

module.exports = {
    getAll,
    create,
    getOne,
    destroy,
    update
}