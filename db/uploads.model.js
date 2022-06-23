module.exports = mongoose => {
    const Upload = mongoose.model(
        "Upload",
        mongoose.Schema(
            {
                key: String,
                value: String,
            },
            { timestamps: true }
        )
    )

    return Upload;
}