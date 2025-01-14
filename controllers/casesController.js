const { getCases, getCaseById, createCase, getCaseByUserId, geFullCases, updateLastEnter } = require('../models/casesModel');
const {getUserById} = require('../models/usersModel')

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
        console.log("I enter to getfullcases")
        const user = await getUserById(req.user);
        console.log(user);
        if (user.userRole == 3 || user.userRole == 2) {
            console.log("admin permission")
            const c = await geFullCases();
            res.send(c);
        }
        else if (user.userRole == 1) {
            console.log("user permission")
            const c = await getCaseByUserId();
            res.send(c);
        }
        }   catch (error) {
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
