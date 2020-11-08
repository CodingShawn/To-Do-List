let pubsub = {
    events: {},

    publish: function(eventName, data) {
        if(!Array.isArray(this.events[eventName])) {
            return;
        } 
        this.events[eventName].forEach(callback => {
            callback(data);
        });
    },

    subscribe: function(eventName, callback) {
        if(!Array.isArray(this.events[eventName])) {
            this.events[eventName] = [];
        }
        this.events[eventName].push(callback);
    }
};

export default pubsub;