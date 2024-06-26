const { getCases,getCaseById,createCase} = require('../models/casesModel');


async function GetCases(req, res) {
        const c = await getCases();
        res.send(c)
    }

   
async function GetCaseById(req, res){
    const c = await getCaseById(req.params.id);
    res.send(c)
}

async function CreateCase(req,res){
    const caseDetails ={
        prosecutor_id:req.params.prosecutor_id,
        defendant_id:req.params.defendant_id,
        issue:req.params.issue
    }
    const c = await createCase(caseDetails)
    res.send(c)
}

    module.exports = {GetCaseById,GetCases,CreateCase};
