module.exports = mongoose => {
    const Events = mongoose.model(
        "Events",
        mongoose.Schema(
            {
                key: String,
                eventsData: Array,
                eventTime: Date
            },
            { timestamps: true }
        )
    )

    return Events;
}