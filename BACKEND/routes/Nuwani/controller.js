const {User,Faqs,Comp} = require('../../models/Nuwani/model');


const getUsers = (req, res, next) => {
    User.find()
        .then(response => {
            res.json({ response })
        })
        .catch(error => {
            res.json({ error })
        });
};

const addUser = (req, res, next) => {
    const user = new User({
        id: req.body.id,
        fname: req.body.fname,
        service: req.body.service,
        feedback: req.body.feedback,
        selectedStarCount: req.body.selectedStarCount,
    });
    user.save()
    .then(response => {
        res.json({ response })
    })
    .catch(error => {
        res.json({ error })
    });
}

const updateUser = (req, res, next) => {
    
        const {id, fname, service, feedback, selectedStarCount } = req.body;
    
        User.updateOne({ id: id }, { $set: { service: service, fname: fname, feedback: feedback, selectedStarCount: selectedStarCount } })
        .then(response => {
            res.json({ response });
        })
        .catch(error => {
            res.json({ error });
        });
}

const deleteUser = (req, res, next) => {
    
    const id = req.body.id;

    User.deleteOne({ id: id })
    .then(response => {
        res.json({ response });
    })
    .catch(error => {
        res.json({ error });
    });
}

const getFaqs = (req, res, next) => {
    Faqs.find()
        .then(response => {
            res.json({ response })
        })
        .catch(error => {
            res.json({ error })
        });
};

const addFaqs = (req, res, next) => {
    const faq = new Faqs({
        id: req.body.id,
        faqquestion: req.body.faqquestion,
        faqanswer: req.body.faqanswer,
    });
    faq.save()
    .then(response => {
        res.json({ response })
    })
    .catch(error => {
        res.json({ error })
    });
}

const updateFaqs = (req, res, next) => {
    const { id, faqquestion, faqanswer } = req.body;

    Faqs.findByIdAndUpdate(id, { faqquestion: faqquestion, faqanswer: faqanswer }, { new: true })
        .then(updatedFaq => {
            res.json({ response: updatedFaq });
        })
        .catch(error => {
            res.json({ error });
        });
}


const deleteFaqs = (req, res, next) => {
    const id = req.body.id;

    Faqs.findByIdAndDelete(id)
        .then(response => {
            res.json({ response });
        })
        .catch(error => {
            res.json({ error });
        });
}




const getComps = (req, res, next) => {
    Comp.find()
        .then(response => {
            res.json({ response })
        })
        .catch(error => {
            res.json({ error })
        });
};

const addComps = (req, res, next) => {
    const comp = new Comp({
        id: req.body.id,
        uname: req.body.uname,
        email: req.body.email,
        category: req.body.category,
        complaint: req.body.complaint,
        
    });
    comp.save()
    .then(response => {
        res.json({ response })
    })
    .catch(error => {
        res.json({ error })
    });
}

const updateComps = (req, res, next) => {
    const { id, uname, email, category, complaint} = req.body;

    Comp.findByIdAndUpdate(id, { uname: uname, email: email, category: category, complaint: complaint}, { new: true })
        .then(updatedComp => {
            res.json({ response: updatedComp });
        })
        .catch(error => {
            res.json({ error });
        });
}

const deleteComps = (req, res, next) => {
    const id = req.body.id;

    Comp.findByIdAndDelete(id)
        .then(response => {
            res.json({ response });
        })
        .catch(error => {
            res.json({ error });
        });
}




exports.getUsers = getUsers;
exports.addUser = addUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;

exports.getFaqs = getFaqs;
exports.addFaqs = addFaqs;
exports.updateFaqs = updateFaqs;
exports.deleteFaqs = deleteFaqs;

exports.getComps = getComps;
exports.addComps = addComps;
exports.updateComps = updateComps;
exports.deleteComps = deleteComps;