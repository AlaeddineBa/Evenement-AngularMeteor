Meteor.publish('evenements', function () {

    let events = Evenements.find({});
/*    console.log(events);
    events.forEach(function (a) {
        this.add('image', a.idImage, Images.findOne(a.idImage));
    }
    console.log(events);*/
    return events;
});

/*let events = find ... fetch

 events.foreach
 images

 return events*/


Meteor.publish('villes', function () {
    return Villes.find({});
});
Meteor.methods({
    insertEvent: function (event) {
        Evenements.insert({
            'firstname': event.firstname,
            'lastname': event.lastname,
            'date': event.date,
            'ville': event.ville,
            'idImage': event.idImage,
            /*'base64': event.base64,*/
            'state': event.state
        }, function (error, result) {
        });
    },
    updateEvent: function (event) {
        Evenements.update({_id: event._id}, {
            $set: {
                _id: event._id,
                'firstname': event.firstname,
                'lastname': event.lastname,
                'date': event.date,
                'ville': event.ville,
                'idImage': event.idImage,
                /*'base64': event.base64,*/
                'state': event.state
            }
        });

    },
    removeEvent: function (id) {
        Evenements.remove(id);
    },
    sendEmail: function (from, text) {
        //check([text], [String]);

        this.unblock();

        Email.send({
            to: 'alaeddine.baghdadi1@gmail.com',
            from: from,
            subject: 'New message from contact form',
            text: text
        });
    },
    insertVille: function (ville) {
        Villes.insert({'name': ville}, function (error, result) {
        });
    }
})

