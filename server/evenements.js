Meteor.publish('evenements', function () {
    return Evenements.find();
});
