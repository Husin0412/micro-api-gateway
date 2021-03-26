const apiAdatapter = require('../../apiAdapter');
const {
    URL_SERVICE_COURSE
} = process.env;

const api = apiAdatapter(URL_SERVICE_COURSE);

module.exports = async (req, res) => {
    try {
        const lesson = await api.get(`/api/image-courses`, {
            params: {
                ...req.query,
            }
        });
        return res.json(lesson.data)
    } catch (error) {

        if (error.code === 'ECONNREFUSED') {
            return res.status(500).json({
                status: 'error',
                message: 'service image-courses unavailable'
            });
        }

        const {
            status,
            data
        } = error.response;
        return res.status(status).json(data)
    }
}