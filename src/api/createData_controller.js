const db = require("../../db");

const Upload = db.Upload;
const Events = db.Events;

exports.create = (req, res) => {

    const key = req.body.key;
    const value = req.body.value;

    Upload.find({ key: key }, function (err, data) {
        if (data.length) {
            res.status(500).send({
                message:
                    "Key already exists."
            })
        } else {
            const newData = new Upload({
                key: key,
                value: value,
            });

            newData
                .save(newData)
                .then(data => {
                    createEvent(key, value, 0);
                    res.send(data);

                })
                .catch(err => {
                    console.log(err);
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while uploading arts."
                    })
                });
        }
    });
}

exports.getEvent = (req, res) => {

    const key = req.body.key;

    Events.find({ key: key }, function (err, data) {
        if (!data.length) {
            res.status(500).send({
                message:
                    "Key doesn't exist."
            })
        } else {
            res.send({ data })
        }
    });
}

exports.get = async (req, res) => {
    const key = req.body.key;


    Upload.find({ key: key }).sort({ date: -1 }).exec(function (err, data) {
        if (!data.length) {
            res.status(500).send({
                message:
                    "Key doesn't exist."
            })
        } else {

            let latestData = data[0]

            for (let i = 1; i < data.length; i++) {
                if (latestData.createdAt < data[i].createdAt) {
                    latestData = data[i];
                }
            }
            res.send({ latestData })
        }
    });
}

const createEvent = (key, value, type) => {
    Events.find({ key: key }, function (err, data) {
        if (data.length == 0) {
            const newEventData = new Events({
                key: key,
                eventsData: [{
                    event: "create",
                    data: {
                        key: key,
                        value: value,
                        eventTime: new Date()
                    }
                }]
            })

            newEventData
                .save(newEventData)
                .then(data => {
                    console.log("eventData:", data);
                })
                .catch(err => {
                    console.log("eventData creat event failed:", err);
                });
        }
        else {

            let eventType = "";
            if (type == 1) {
                eventType = "update";
            }
            else if (type == 2) {
                eventType = "delete"
            }
            const eventData = data[0].eventsData;
            eventData.push({ event: eventType, data: { key: key, value: value, eventTime: new Date() } })
            Events.updateOne({ key: key }, { eventsData: eventData }, function (err) {
                console.log("err:", err)
            })
        }
    })
}

exports.update = (req, res) => {
    const key = req.body.key;
    const value = req.body.value;

    Upload.find({ key: key }, function (err, data) {
        if (!data.length) {
            res.status(500).send({
                message:
                    "Key doesn't exist."
            })
        } else {
            const newData = new Upload({
                key: key,
                value: value,
            });

            newData
                .save(newData)
                .then(data => {
                    createEvent(key, value, 1)
                    res.send(data);
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while uploading arts."
                    })
                });
        }
    });
}

exports.delete = (req, res) => {
    const key = req.body.key;

    Upload.find({ key: key }, function (err, data) {
        if (!data.length) {
            res.status(500).send({
                message:
                    "Key doesn't exist."
            })
        } else {
            Upload.find({ key: key }).deleteMany().exec();
            createEvent(key, "", 2)
            res.send({
                message: `Successfully deleted. key:${key}`
            })
        }
    });
}