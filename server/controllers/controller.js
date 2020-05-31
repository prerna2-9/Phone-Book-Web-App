const Contact = require('../Database/schema');


exports.get = async (req, res) => {
    Contact.find()
    .select('_id name email phone dob')
    .exec()
    .then(data => {
        const page = req.params.page;
        const begin = parseInt(page) * 4;
        const end = 4 + parseInt(begin);
        return res.status(200).json({
            data: data.slice(begin,end),
            success: true,
            message: 'Contacts List',
            pages: Math.ceil(data.length / 4),
        })
    })
    .catch(err => {
        console.log(err);

        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        })
    })
}

exports.search = async (req, res)=>{
    Contact.find()
    .select('_id name email phone dob')
    .exec()
    .then(data => {
        const page = req.params.page;
        const begin = parseInt(page) * 4;
        const end = 4 + parseInt(begin);
        const filter = data.filter(eachData => {
            if(eachData.name.toLowerCase().includes(req.params.search)){
                return true;
            }
            if(eachData.phone.includes(req.params.search)){
                return true;
            }
            if(eachData.email.includes(req.params.search)){
                return true;
            }

            return false;
        })
        return res.status(200).json({
            data: filter.slice(begin,end),
            success: true,
            message: 'Contacts List',
            pages: Math.ceil(filter.length / 4),
        })
    })
    .catch(err => {
        console.log(err);

        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        })
    })
}

exports.save = async (req, res) => {
    const {name, phone, email, dob} = req.body;

    const found = await Contact.findOne({phone: phone}).exec();

    if(found) {
        return res.json({
            success: false,
            message: 'A contact with the phone already exist',
        })
    }

    const contact = new Contact();
    contact.name = name;
    contact.phone = phone;
    contact.email = email;
    contact.dob = dob;
    contact.save()
    .then(() => {
        return res.status(200).json({
            success: true,
            message: 'Contact Saved',
            
            contact: contact,
        })
    })
    .catch((err) => {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        })
    })
}

exports.delete = async (req, res) => {
    Contact.findByIdAndDelete(req.params.id)
    .then(()=>{
        return res.status(200).json({
            success: true,
            message: 'Contact Deleted Successfully',
        })
    })
    .catch((err) => {
        console.log(err);
        return res.status(500).json({
            success: true,
            message: 'Internal Server Error',
        })
    })
}

exports.update = async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    const {name, email, phone} = req.body;
    contact.name = name;
    contact.email = email;
    contact.phone = phone;
    contact.save()
    .then(()=>{
        res.status(200).json({
            success: true,
            message: 'COnatct Updated Successfully',
        })
    })
    .catch((err) => {
        console.log(err)
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        })
    })
}