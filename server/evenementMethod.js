Meteor.methods({
    insertEvent: function(event){
        Evenements.insert({titre: event.titre, desc: event.desc, date: event.date, type: event.type, base64: event.base64}, function(error, result){});
    },
    updateEvent: function(event){
        Evenements.update({_id:event._id}, { $set:{titre: event.titre, desc: event.desc, date: event.date, type: event.type, base64: event.base64}});

    },
    removeEvent: function(id){
        Evenements.remove(id);
    }
})