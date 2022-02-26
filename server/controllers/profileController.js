const profileModel = require("../model/profileModel")
const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')


//@route POST /api/v1/profile/save
//@desc to save user details in its profile
async function postProfile(req, res) {
    try {


        let data = req.body;
        let isExist = await profileModel.findOne({ user: data.user })
        // data.skills = data.skills[0].split(',').map(skills => skills.trim())
        let skills = data.skills.split(',')
        data.skills = skills;
        let profile = new profileModel(data);
        if (!isExist) {
            profile.save();
            return res.status(200).json("saved")
        }
        // let user = await profileModel.findByIdAndUpdate({ user: data.user }, data)
        let user = await profileModel.findOneAndUpdate({ user: data.user }, data)
        return res.status(200).json("saved");
    } catch (error) {
        res.status(400).json(error.message);
    }
}


async function getProfile(req, res) {
    try {
        let prof = await profileModel.findOne({ user: req.body.user })
        res.status(200).json(prof)

    } catch (error) {
        res.status(400).json(error.message)
    }
}

async function getAllProfiles(req, res) {

    try {
        let data = await profileModel.find();
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json(error.message)
    }
}

module.exports = { getProfile, postProfile, getAllProfiles }