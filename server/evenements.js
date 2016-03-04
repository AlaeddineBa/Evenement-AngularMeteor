Meteor.publish('evenements', function () {
    return Evenements.find({});
});
Meteor.methods({
    insertEvent: function(event){
        Evenements.insert({firstname: event.firstname, lastname: event.lastname, date: event.date, ville: event.ville, base64: event.base64}, function(error, result){});
    },
    updateEvent: function(event){
        Evenements.update({_id:event._id}, { $set:{firstname: event.firstname, lastname: event.lastname, date: event.date, ville: event.ville, base64: event.base64}});

    },
    removeEvent: function(id){
        Evenements.remove(id);
    },
    sendEmail: function (text) {
        //check([text], [String]);

        this.unblock();

        Email.send({
            to: 'alaeddine.baghdadi1@gmail.com',
            from: 'alaeddine.baghdadi1@gmail.com',
            subject: 'New message from contact form',
            text: text
        });
    }
})
