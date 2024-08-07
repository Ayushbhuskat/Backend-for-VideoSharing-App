const asyncHandler = (fn) => async(req,res,next) => {
    try {
        await fn(req , req , next)

    } catch (error) {
        res.status(err.code || 500).json({
            sucess : false,
            message : err.message
        })
    }
}


export {asyncHandler}