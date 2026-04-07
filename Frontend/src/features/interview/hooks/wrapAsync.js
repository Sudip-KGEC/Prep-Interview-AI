export const handleAsync = async (callback , setLoading) => {
    setLoading(true)
    try {
        return await callback()
    } catch (error) {
        console.error(error)
        return null
    } finally {
        setLoading(false)
    }
}