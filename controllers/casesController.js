const { getCases, getCaseById, createCase, getCaseByUserId, geFullCases, updateLastEnter } = require('../models/casesModel');

async function GetCases(req, res) {
    try {
        const c = await getCases();
        res.send(c);
    }
    catch (error) {
        return error;
    }
}

async function GeFullCases(req, res) {
    try {
        const c = await geFullCases();
        res.send(c);
    }
    catch (error) {
        return error;
    }
}


async function GetCaseById(req, res) {
    try {
        const c = await getCaseById(req.params.id);
        res.send(c);
    }
    catch (error) {
        return error;
    }
}

async function CreateCase(req, res) {
    const caseDetails = {
        prosecutor_id: req.body.prosecutor_id,
        defendant_id: req.body.defendant_id,
        issue: req.body.issue
    }
    try {
        const c = await createCase(caseDetails)
        res.send(c);
    }
    catch (error) {
        return error;
    }
}

async function GetCaseByUserId(req, res) {
    try {
        const c = await getCaseByUserId(req.params.id);
        res.send(c);
    }
    catch (error) {
        return error;
    }
}
async function UpdateLastEnter(req, res) {
    try {
        const c = await updateLastEnter(req.params.id);
        res.send(c);
    }
    catch (error) {
        return error;
    }
}
module.exports = { GetCaseById, GetCases, CreateCase, GetCaseByUserId, GeFullCases, UpdateLastEnter };
